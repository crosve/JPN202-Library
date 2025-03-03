import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const adminid = localStorage.getItem("adminid");

  const handleChapterSelect = (chapter: number) => {
    setSelectedChapter(chapter);
    navigate(`/chapter/${chapter}`);

    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminid");
    navigate("/");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="w-screen h-24 py-6 px-12 bg-gradient-to-r from-amber-50 to-amber-100 text-black flex items-center justify-between shadow-md">
      <Link
        to="/"
        className="text-2xl font-bold text-amber-800 hover:text-amber-600 transition-colors duration-300 flex items-center"
      >
        <span className="mr-2">🎌</span> Genki-Ejento
      </Link>

      <div className="flex items-center">
        <div className="flex items-center space-x-6">
          <Link
            to="/grammar"
            className="text-lg font-medium text-amber-800 hover:text-amber-600 transition-colors duration-300 relative group"
          >
            Grammar
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>

          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-lg font-medium text-amber-800 hover:text-amber-600 transition-colors duration-300 flex items-center group"
            >
              Chapter {selectedChapter ? `${selectedChapter}` : ""}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1 transform group-hover:rotate-180 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </button>

            {isDropdownOpen && (
              <div className="absolute -left-8 mt-3 w-48 bg-white border border-amber-100 rounded-lg shadow-xl overflow-hidden transform transition-all z-50">
                <div className="max-h-60 overflow-y-auto py-1">
                  {chapters.map((chapter) => (
                    <button
                      key={chapter}
                      onClick={() => handleChapterSelect(chapter)}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors duration-200
                      ${
                        selectedChapter === chapter
                          ? "bg-amber-100 text-amber-800 font-medium"
                          : "text-gray-700 hover:bg-amber-50"
                      }`}
                    >
                      Chapter {chapter}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {adminid && (
            <>
              <Link
                to="/admin/vocabulary/create"
                className="text-lg font-medium text-amber-800 hover:text-amber-600 transition-colors duration-300 relative group"
              >
                Create Vocabulary
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>

              <button
                onClick={() => handleLogout()}
                className="ml-4 text-lg font-medium bg-amber-200 text-amber-800 px-5 py-2 rounded-full shadow-md hover:bg-amber-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
