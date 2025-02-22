import React from "react";
import { Card, Group } from "@mantine/core";

interface VocabResults {
  translation: string;
  hiragana: string;
  kanji: string;
  vocabularyid: number;
}

interface VocabCardProps {
  vocabResult: VocabResults; // Correctly define the type for the prop
}

function VocabCard({ vocabResult }: VocabCardProps) {
  return (
    <Card
      shadow="sm"
      radius="lg"
      className="max-w-2xl mx-auto mt-8 bg-amber-50 border border-amber-100"
    >
      <h2 className="text-xl font-semibold text-amber-900 mb-6 pb-2 border-b border-amber-200">
        Results
      </h2>

      <Group>
        {vocabResult && (
          <div className="w-full space-y-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm font-medium text-amber-700 mb-1">English</p>
              <h1 className="text-3xl font-semibold text-amber-900">
                {vocabResult.translation}
              </h1>
            </div>

            <div className="flex gap-4">
              <div className="flex-1 p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm font-medium text-amber-700 mb-1">Kanji</p>
                <p className="text-2xl text-amber-900">{vocabResult.kanji}</p>
              </div>

              <div className="flex-1 p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm font-medium text-amber-700 mb-1">
                  Hiragana
                </p>
                <p className="text-2xl text-amber-900">
                  {vocabResult.hiragana}
                </p>
              </div>
            </div>
          </div>
        )}

        {!vocabResult && (
          <div className="w-full p-8 text-center text-amber-700">
            Enter text above to see translation results
          </div>
        )}
      </Group>
    </Card>
  );
}

export default VocabCard;
