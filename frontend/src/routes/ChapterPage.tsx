import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ChapterComponent from "../components/chapters/ChapterComponent";
import VocabularyComponent from "../components/chapters/VocabularyComponent";

interface ExampleProps {
  japanese: string;
  reading?: string;
  translation: string;
  note?: string;
}

interface ExamplesProps {
  examples: ExampleProps[];
  introduction: string;
  patterns: JSON;
}

interface PagerefrenceProps {
  String: string;
  valid: boolean;
}

interface ChapterSectionParams {
  Chapternumber: string;
  Examples: ExamplesProps;
  Grammarid: string;
  Grammartopic: string;
  Pagerefrence: PagerefrenceProps;
}

function ChapterPage() {
  const { chapter } = useParams();

  const [chapterData, setChapterData] = useState<ChapterSectionParams[] | null>(
    null
  );

  if (!chapter) {
    return <div>Chapter not found</div>;
  }

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:8080/v1/getGrammar?chapter_number=${chapter}`)
        .then((response) => {
          console.log(response.data);
          setChapterData(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [chapter]);

  return (
    <div className="bg-amber-50 w-full">
      <div className=" max-w-4xl mx-auto p-6 flex flex-col space-y-8">
        {/* Chapter Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Chapter {chapter}
        </h1>

        {/* Vocabulary Section */}
        <VocabularyComponent chapter={chapter} />

        {/* Chapter Sections */}
        {chapterData &&
          chapterData.map((section, index) => (
            <ChapterComponent
              index={index}
              key={section.Grammarid}
              chapternumber={section.Chapternumber}
              examples={section.Examples}
              grammarid={section.Grammarid}
              grammartopic={section.Grammartopic}
              pagerefrence={section.Pagerefrence}
            />
          ))}
      </div>
    </div>
  );
}

export default ChapterPage;
