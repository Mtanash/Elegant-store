import { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchBarRef = useRef(null);

  const toggleSearchBar = () => {
    if (showSearchBar) {
      setShowSearchBar(false);
      setSearchQuery("");
    } else {
      setShowSearchBar(true);
      searchBarRef.current.focus();
    }
  };

  const handleSearchFormSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    navigate(`products-search?search=${searchQuery}`);
    setSearchQuery("");
  };

  useEffect(() => {
    if (!showSearchBar) return;

    const handleCloseSearchBarOnClickAway = (e) => {
      if (e.target !== searchBarRef.current) {
        // close search bar
        setShowSearchBar(false);
      }
    };

    document.addEventListener("click", handleCloseSearchBarOnClickAway);

    return () => {
      document.removeEventListener("click", handleCloseSearchBarOnClickAway);
    };
  });

  return (
    <div className="relative">
      <AiOutlineSearch
        onClick={toggleSearchBar}
        className="m-2 cursor-pointer w-8 h-8 text-grey hover:text-deep-blue transition-colors ease-in-out duration-200"
      />
      <form
        className={`absolute right-0 transition-all duration-300 shadow-lg
              ${
                showSearchBar
                  ? "opacity-100 z-0 top-[140%]"
                  : "top-0 -z-10 opacity-0"
              }`}
        onSubmit={handleSearchFormSubmit}
      >
        <div className="flex items-center px-2 py-1 gap-1 bg-pale-white rounded-md ">
          <label htmlFor="search-input">
            <AiOutlineSearch />
          </label>
          <input
            ref={searchBarRef}
            id="search-input"
            className="bg-pale-white px-1 outline-none w-36 md:w-64"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
