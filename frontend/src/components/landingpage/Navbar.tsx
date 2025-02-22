import { useState } from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  selectedChapter: number | null;
  setSelectedChapter: (chapter: number) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  selectedChapter,
  setSelectedChapter,
}) => {
  const chapters: number[] = [16, 17, 18, 19, 20];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleChapterSelect = (chapter: number) => {
    setSelectedChapter(chapter);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="w-screen h-24 py-6 px-12 bg-amber-50 text-black flex items-center justify-between">
      <Link
        to="/"
        className="text-2xl font-bold hover:text-amber-200 hover:underline"
      >
        Genki-Online
      </Link>

      <div>
        <div className="flex items-center space-x-4">
          <Link to="/admin-login" className="text-lg">
            Admin
          </Link>
          <a href="#" className="text-lg">
            About
          </a>
          <div className="relative">
            <button onClick={toggleDropdown} className="text-lg">
              Chapter {selectedChapter ? `${selectedChapter}` : ""}
            </button>
            {isDropdownOpen && (
              <div className="absolute -left-8 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
                {chapters.map((chapter) => (
                  <button
                    key={chapter}
                    onClick={() => handleChapterSelect(chapter)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100
                        ${
                          selectedChapter === chapter
                            ? "bg-amber-50 font-medium"
                            : "text-gray-700"
                        }`}
                  >
                    Chapter {chapter}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
