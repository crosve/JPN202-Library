import { useState, useEffect } from "react";
import axios from "axios";

interface VocabularyProps {
  hiragana: string;
  translation: string;
  kanji: string;
  type: string;
}

function VocabularyComponent({ chapter }: { chapter: string }) {
  const [vocabulary, setVocabulary] = useState<VocabularyProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setVocabulary([]);
    setLoading(true);
    setError(null);

    axios
      .get(`http://localhost:8080/v1/getVocabularyByChapter?chapter=${chapter}`)
      .then((response) => {
        if (response.data.length === 0 || response.data === null) {
          setError("No vocabulary found for this chapter");
          setLoading(false);
          return;
        }
        setVocabulary(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(`Error: ${error.message}`);
        setLoading(false);
      });
  }, [chapter]);

  // Group vocabulary by type for better organization
  const groupedVocabulary = vocabulary.reduce((acc, vocab) => {
    acc[vocab.type] = acc[vocab.type] || [];
    acc[vocab.type].push(vocab);
    return acc;
  }, {} as Record<string, VocabularyProps[]>);

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col p-4">
      <div className="w-full flex justify-center mb-6"></div>

      {loading ? (
        <div className="text-center p-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-green-500 border-t-transparent"></div>
          <p className="mt-2 text-gray-600">Loading vocabulary...</p>
        </div>
      ) : error ? (
        <div className="text-center p-6 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedVocabulary).map(([type, vocabList]) => (
            <div
              key={type}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="bg-green-50 p-3 border-b border-green-100">
                <h3 className="text-lg font-medium text-green-800 capitalize">
                  {type}
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                        Kanji
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                        Hiragana
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/4">
                        Translation
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {vocabList.map((vocab, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-xl font-medium text-gray-900">
                          {vocab.kanji}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-md text-gray-600">
                          {vocab.hiragana}
                        </td>
                        <td className="px-6 py-4 text-md text-gray-700">
                          {vocab.translation}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && vocabulary.length > 0 && (
        <div className="mt-6 text-right text-sm text-gray-500">
          {vocabulary.length} vocabulary items found
        </div>
      )}
    </div>
  );
}

export default VocabularyComponent;
