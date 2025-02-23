import { useState } from "react";
import { Button, JsonInput, Textarea, Group } from "@mantine/core";
import axios from "axios";

interface VocabularyEntry {
  hiragana: string;
  kanji: string;
  translation: string;
  chapter_number: string;
  type: string;
}

function VocabularyCreate() {
  const [jsonInput, setJsonInput] = useState<string>("");
  const [vocabulary, setVocabulary] = useState<VocabularyEntry | null>(null);
  const [error, setError] = useState<string>("");

  // Validate the JSON structure
  const validateVocabularyEntry = (entry: any): entry is VocabularyEntry => {
    return (
      typeof entry.hiragana === "string" &&
      typeof entry.kanji === "string" &&
      typeof entry.translation === "string" &&
      typeof entry.chapter_number === "string" &&
      typeof entry.type === "string"
    );
  };

  const handleSubmit = async () => {
    try {
      setError("");
      const parsedData = JSON.parse(jsonInput);
      console.log("Parsed data:", parsedData);

      // Validate the entry
      if (!validateVocabularyEntry(parsedData)) {
        throw new Error("Invalid vocabulary entry format");
      }

      setVocabulary(parsedData);
      console.log("Vocabulary to insert:", parsedData);

      const response = await axios.post(
        "http://localhost:8080/v1/createVocabulary",
        parsedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminid")}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Vocabulary created successfully", response.data);
        // Optionally clear the form after successful submission
        setJsonInput("");
        setVocabulary(null);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Invalid JSON format");
      console.error("Error creating vocabulary:", error);
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
  "chapter_number": "16",
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

        {vocabulary && (
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
