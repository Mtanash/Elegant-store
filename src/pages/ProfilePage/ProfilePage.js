import { CgArrowRightR, CgProfile } from "react-icons/cg";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdFavorite } from "react-icons/md";

import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import MenuOption from "../../components/MenuOption";

const ProfilePage = () => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => {
    console.log("clicked");
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section className="md:flex min-h-[calc(100vh_-_theme(headerAndFooterHeight))]">
      <div
        className={`bg-white drop-shadow-md h-full  py-3 md:flex flex-col gap-4 absolute -translate-x-full md:relative md:translate-x-0 ${
          isMenuOpen ? "translate-x-0 z-10" : "-translate-x-full"
        } transition-transform`}
      >
        <div
          className="absolute m-4 cursor-pointer md:hidden top-0 -right-[30%] z-10 opacity-80"
          onClick={toggleMenu}
        >
          <CgArrowRightR className="text-3xl text-deep-blue" />
        </div>
        <MenuOption
          text="Profile"
          Icon={CgProfile}
          onOptionButtonClicked={() => {
            navigate("info");
            setIsMenuOpen(false);
          }}
        />
        <MenuOption
          text="Favorite Products"
          Icon={MdFavorite}
          onOptionButtonClicked={() => {
            navigate("favorite-products");
            setIsMenuOpen(false);
          }}
        />
        <MenuOption
          text="My Orders"
          Icon={IoMdCheckmarkCircleOutline}
          onOptionButtonClicked={() => {
            navigate("orders");
            setIsMenuOpen(false);
          }}
        />
      </div>

      <div className="p-2 flex-1">
        <Outlet />
      </div>
    </section>
  );
};

export default ProfilePage;
