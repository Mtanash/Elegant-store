import { useEffect, useRef, useState } from "react";

const HamburgerMenu = ({ links }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
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
        className={`absolute flex ${
          showMobileMenu ? "scale-y-100" : "scale-y-0"
        } flex-col items-center self-end gap-3 py-8 mt-10 font-bold bg-white w-48 drop-shadow-xl z-20 -right-16 transition-transform ease-in-out duration-300 origin-top md:hidden sm:right-0`}
      >
        {links.map((link) => (
          <a
            key={link.text}
            className="p-2 font-semibold text-grey hover:text-deep-blue inline-block transition-colors ease-in-out duration-200"
            href={link.url}
          >
            {link.text}
          </a>
        ))}
      </div>
    </div>
  );
};

export default HamburgerMenu;
