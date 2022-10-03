import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCartProducts } from "../features/Cart/cartSlice";
import CartIcon from "./CartIcon";
import HamburgerMenu from "./HamburgerMenu";
import SearchBar from "./SearchBar";
import UserAvatarMenu from "./UserAvatarMenu";

function Header() {
  const navigate = useNavigate();
  const cartProducts = useSelector(selectCartProducts);

  const [isFashionOpen, setIsFashionOpen] = useState(false);
  const fashionButtonRef = useRef(null);
  const fashionPanelRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

  useEffect(() => {
    if (!isFashionOpen) return;

    const handleCloseMenuOnClickAway = (e) => {
      if (e.target !== fashionPanelRef.current) {
        // close mobile menu
        setIsFashionOpen(false);
      }
    };

    document.addEventListener("click", handleCloseMenuOnClickAway);

    return () => {
      document.removeEventListener("click", handleCloseMenuOnClickAway);
    };
  });

  const toggleFashionMenu = (e) => {
    if (e.target === fashionButtonRef.current) {
      setIsFashionOpen(!isFashionOpen);
    }
  };

  return (
    <header className="p-2 shadow-lg">
      <div className="container mx-auto flex flex-row justify-between items-center gap-2">
        <a
          href="/"
          className="text-lg sm:text-2xl font-bold flex-1 md:flex-none"
        >
          Elegant Store
        </a>
        <nav className="flex items-center justify-center gap-3">
          <div className="gap-3 items-center hidden md:flex">
            <div
              className="p-2 font-semibold text-grey hover:text-deep-blue inline-block transition-colors ease-in-out duration-200 relative cursor-pointer"
              onClick={toggleFashionMenu}
              ref={fashionButtonRef}
            >
              Fashion
              <div
                ref={fashionPanelRef}
                className={`absolute w-full top-[150%] right-0 bg-white drop-shadow-lg p-2 flex flex-col items-start transition-opacity ${
                  isFashionOpen ? "opacity-100" : "opacity-0 -z-20"
                }`}
              >
                <button
                  className="py-2 font-normal hover:translate-x-1 transition-transform duration-200"
                  onClick={() => {
                    navigate(`categories/Men Clothes`);
                    setIsFashionOpen(false);
                  }}
                >
                  Men
                </button>
                <button
                  className="py-2 font-normal hover:translate-x-1 transition-transform duration-200"
                  onClick={() => {
                    navigate(`categories/Women Clothes`);
                    setIsFashionOpen(false);
                  }}
                >
                  Women
                </button>
              </div>
            </div>
            <button
              className="p-2 font-semibold text-grey hover:text-deep-blue inline-block transition-colors ease-in-out duration-200"
              onClick={() => navigate(`categories/Bags`)}
            >
              Bags
            </button>
            <button
              className="p-2 font-semibold text-grey hover:text-deep-blue inline-block transition-colors ease-in-out duration-200"
              onClick={() => navigate(`categories/Watches`)}
            >
              Watches
            </button>
            <button
              className="p-2 font-semibold text-grey hover:text-deep-blue inline-block transition-colors ease-in-out duration-200"
              onClick={() => navigate(`categories/Shoes`)}
            >
              Shoes
            </button>
            <button
              className="p-2 font-semibold text-grey hover:text-deep-blue inline-block transition-colors ease-in-out duration-200"
              onClick={() => navigate(`categories/Perfumes`)}
            >
              Perfumes
            </button>
          </div>

          {/* menu */}
          <HamburgerMenu />

          {/* search bar */}
          <SearchBar />
        </nav>

        <div className="flex items-center gap-3">
          {/* cart icon */}
          <CartIcon />
          {/* user menu */}
          <UserAvatarMenu />
        </div>
      </div>
    </header>
  );
}

export default Header;
