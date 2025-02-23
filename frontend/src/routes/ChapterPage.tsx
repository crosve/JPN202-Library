import React from "react";
import { useParams } from "react-router-dom";

function ChapterPage() {
  const { chapter } = useParams();
  return (
    <div>
      <h1>Chapter {chapter}</h1>
    </div>
  );
}

export default ChapterPage;
