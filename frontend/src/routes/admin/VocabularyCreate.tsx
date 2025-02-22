import React, { useState } from "react";
import { Button, JsonInput, Textarea, Group } from "@mantine/core";
import axios from "axios";

interface VocabularyEntry {
  hiragana: string;
  kanji: string;
  translation: string;
  chapterId: number;
  type: string;
}

function VocabularyCreate() {
  const [jsonInput, setJsonInput] = useState<string>("");
  const [vocabulary, setVocabulary] = useState<VocabularyEntry[]>([]);
  const [error, setError] = useState<string>("");

  // Validate the JSON structure
  const validateVocabularyEntry = (entry: any): entry is VocabularyEntry => {
    return (
      typeof entry.hiragana === "string" &&
      typeof entry.kanji === "string" &&
      typeof entry.translation === "string" &&
      typeof entry.chapterId === "number" &&
      typeof entry.type === "string"
    );
  };

  const handleSubmit = async () => {
    try {
      setError("");
      const parsedData = JSON.parse(jsonInput);
      console.log("Parsed data:", parsedData);

      // Handle both single entry and array of entries
      const entries = Array.isArray(parsedData) ? parsedData : [parsedData];

      // Validate each entry
      const isValid = entries.every(validateVocabularyEntry);

      if (!isValid) {
        throw new Error("Invalid vocabulary entry format");
      }

      setVocabulary(entries);
      console.log("Vocabulary to insert:", entries);

      await axios
        .post("http://localhost:8080/v1/createManyVocabulary", entries, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminid")}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("Vocabulary created successfully", res.data);
          }
        });

      // Here you would make your API call to save the data
      // Example: await axios.post('/api/vocabulary', entries);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Invalid JSON format");
    }
  };

  return (
    <div className="w-screen min-h-screen bg-amber-50 py-16 text-black">
      <div className="w-96 bg-white shadow-lg rounded-lg p-8 mx-auto flex flex-col space-y-8">
        <h2 className="text-center text-xl font-bold">Create Vocabulary</h2>

        <JsonInput
          value={jsonInput}
          onChange={setJsonInput}
          error={error}
          placeholder={`{
  "hiragana": "じゅぎょうちゅうに",
  "kanji": "授業中に",
  "translation": "in class; during the class",
  "chapterId": 16,
  "type": "adverb"
}`}
          formatOnBlur
          autosize
          minRows={4}
          className="h-auto"
        />

        <Group>
          <Button onClick={handleSubmit}>Submit Vocabulary</Button>
        </Group>

        {vocabulary.length > 0 && (
          <div>
            <h3 className="mt-4 text-lg font-semibold">Current Vocabulary:</h3>
            <Textarea
              value={JSON.stringify(vocabulary, null, 2)}
              readOnly
              autosize
              minRows={5}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default VocabularyCreate;
