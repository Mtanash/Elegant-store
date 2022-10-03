import { useState } from "react";
import { CgArrowRightR } from "react-icons/cg";
import {
  MdAddBox,
  MdDashboard,
  MdInventory,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";
import UserAvatarMenuOption from "../../components/UserAvatarMenuOption";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section className="min-h-[calc(100vh_-_theme(headerAndFooterHeight))] md:flex">
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
        <UserAvatarMenuOption
          text="Dashboard"
          Icon={MdDashboard}
          onOptionButtonClicked={() => {
            navigate("info");
            setIsMenuOpen(false);
          }}
        />
        <UserAvatarMenuOption
          text="Orders"
          Icon={MdOutlineShoppingCart}
          onOptionButtonClicked={() => {
            navigate("orders");
            setIsMenuOpen(false);
          }}
        />
        <UserAvatarMenuOption
          text="Add Product"
          Icon={MdAddBox}
          onOptionButtonClicked={() => {
            navigate("create-product");
            setIsMenuOpen(false);
          }}
        />
        <UserAvatarMenuOption
          text="Products"
          Icon={MdInventory}
          onOptionButtonClicked={() => {
            navigate("products");
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

export default DashboardPage;
