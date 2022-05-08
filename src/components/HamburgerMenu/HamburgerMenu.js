import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const HamburgerMenu = ({ links }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    if (!showMobileMenu) return;

    const handleCloseMenuOnClickAway = (e) => {
      if (e.target !== menuRef.current) {
        // close mobile menu
        setShowMobileMenu(false);
      }
    };

    document.addEventListener("click", handleCloseMenuOnClickAway);

    return () => {
      document.removeEventListener("click", handleCloseMenuOnClickAway);
    };
  });

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <div className="relative">
      <div
        className="flex flex-col gap-1 w-7 h-7 justify-center items-center cursor-pointer md:hidden "
        onClick={toggleMobileMenu}
      >
        <span className="w-4/5 h-0.5 bg-deep-blue inline-block"></span>
        <span className="w-4/5 h-0.5 bg-deep-blue inline-block"></span>
        <span className="w-4/5 h-0.5 bg-deep-blue inline-block"></span>
      </div>

      {/* mobile menu */}
      <div
        ref={menuRef}
        className={`absolute flex pl-14 ${
          showMobileMenu ? "scale-y-100" : "scale-y-0"
        } flex-col items-start self-end gap-3 py-8 mt-10 font-bold bg-white w-48 drop-shadow-xl z-20 -right-16 transition-transform ease-in-out duration-300 origin-top md:hidden sm:right-0`}
      >
        <div className="p-2 font-semibold text-grey hover:text-deep-blue inline-block transition-colors ease-in-out duration-200">
          Fashion
          <div
            className={`ml-3 w-full flex flex-col items-start transition-opacity`}
          >
            <button
              className="py-1 font-normal hover:translate-x-1 transition-transform duration-200"
              onClick={() => {
                navigate(`category?category=Men Clothes`);
              }}
            >
              Men
            </button>
            <button
              className="py-1 font-normal hover:translate-x-1 transition-transform duration-200"
              onClick={() => {
                navigate(`category?category=Women Clothes`);
              }}
            >
              Women
            </button>
          </div>
        </div>
        <button
          className="p-2 font-semibold text-grey hover:text-deep-blue inline-block transition-colors ease-in-out duration-200"
          onClick={() => navigate(`category?category=Bags`)}
        >
          Bags
        </button>
        <button className="p-2 font-semibold text-grey hover:text-deep-blue inline-block transition-colors ease-in-out duration-200">
          Watches
        </button>
        <button className="p-2 font-semibold text-grey hover:text-deep-blue inline-block transition-colors ease-in-out duration-200">
          Shoes
        </button>
        <button className="p-2 font-semibold text-grey hover:text-deep-blue inline-block transition-colors ease-in-out duration-200">
          Perfumes
        </button>
      </div>
    </div>
  );
};

export default HamburgerMenu;
