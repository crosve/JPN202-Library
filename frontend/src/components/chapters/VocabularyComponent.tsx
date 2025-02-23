import { useState, useEffect } from "react";
import axios from "axios";

// "hiragana": "じゅぎょうちゅうに",
// "translation": "",
// "kanji": "授業中に",
// "type": "adverb"
interface VocabularyProps {
  hiragana: string;
  translation: string;
  kanji: string;
  type: string;
}

function VocabularyComponent({ chapter }: { chapter: string }) {
  const [vocabulary, setVocabulary] = useState<VocabularyProps[] | []>([]);
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
          setError("No Vocabulary found");
          setLoading(false);
          return;
        }
        setVocabulary(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [chapter]);
  return (
    <div className="w-full flex flex-col p-4">
      <div className="w-full flex justify-center mb-4">
        <h2 className="text-2xl font-bold text-green-600">Vocabulary</h2>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-3/4 bg-white shadow-lg rounded-lg p-6">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="space-y-4">
              {vocabulary.map((vocab: VocabularyProps, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 hover:bg-gray-100 rounded-lg w-full"
                >
                  <div className="w-1/4 text-left font-medium">
                    {vocab.kanji}
                  </div>
                  <div className="w-1/4 text-left text-gray-600">
                    {vocab.hiragana}
                  </div>
                  <div className="w-1/4 text-left text-gray-600">
                    {vocab.translation}
                  </div>
                  <div className="w-1/4 text-left text-gray-500">
                    {vocab.type}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VocabularyComponent;
