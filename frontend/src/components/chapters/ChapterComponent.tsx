import React from "react";

interface ExampleProps {
  japanese: string;
  reading?: string;
  translation: string;
  note?: string;
}

interface ExamplesProps {
  examples: ExampleProps[];
  introduction: string;
  patterns: any;
}

interface PagerefrenceProps {
  String: string;
  valid: boolean;
}

interface ChapterSectionParams {
  index: number;
  key: string;
  chapternumber: string;
  examples: ExamplesProps;
  grammarid: string;
  grammartopic: string;
  pagerefrence: PagerefrenceProps;
}

const ChapterComponent: React.FC<ChapterSectionParams> = ({
  index,
  examples,
  grammartopic,
  pagerefrence,
}) => {
  return (
    <>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white font-bold">
            {index + 1}
          </div>

          <h2 className="text-2xl font-bold text-green-600">{grammartopic}</h2>
        </div>
        <h3 className="text-amber-800">Page Reference {pagerefrence.String}</h3>

        <p className="text-gray-700 leading-relaxed">{examples.introduction}</p>
      </div>

      <div className="space-y-6">
        {/* First Rule Box */}
        <div className="border-2 border-dashed border-green-200 rounded-lg p-4 bg-green-50">
          <div className="mb-2">
            {examples.patterns.map((pattern: any, index: number) => (
              <span key={index} className="font-bold">
                <span className="w-full block">{pattern.form}</span>
                <span> Usage: ({pattern.usage} )</span>
                {pattern.meanings.map((meaning: string, index: number) => (
                  <span key={index} className="block text-gray-700">
                    {meaning}
                  </span>
                ))}
                <line className="block w-full h-0.5 bg-green-300 my-2"></line>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-bold text-gray-800">Examples:</h3>

          {/* Example Section */}
          {examples.examples.map((example: any, index: number) => (
            <div key={index} className="p-4 bg-white rounded shadow">
              <p className="text-lg mb-1">{example.japanese}</p>
              <p className="text-sm text-gray-600 mb-1">{example.reading}</p>
              <p className="italic text-gray-700">{example.translation}</p>
              <p className="text-gray-500">{example.note}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ChapterComponent;
