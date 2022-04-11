import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCartProducts } from "../../features/Cart/cartSlice";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import SearchBar from "../SearchBar/SearchBar";
import CartIcon from "../CartIcon/CartIcon";
import UserAvatarMenu from "../UserAvatarMenu/UserAvatarMenu";

const links = [
  {
    text: "Fashion",
    url: "#",
  },
  {
    text: "Bags",
    url: "#",
  },
  {
    text: "Watches",
    url: "#",
  },
  {
    text: "Shoes",
    url: "#",
  },
  {
    text: "Perfumes",
    url: "#",
  },
];

function Header() {
  const cartProducts = useSelector(selectCartProducts);

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

  return (
    <header className="p-5 container mx-auto flex flex-row justify-between items-center gap-4">
      <a href="." className="text-xl sm:text-2xl text-bold flex-1 md:flex-none">
        Elegant Store
      </a>
      <nav className="flex items-center justify-center gap-3">
        <div className="gap-3 items-center hidden md:flex">
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

        {/* menu */}
        <HamburgerMenu links={links} />

        {/* search bar */}
        <SearchBar />
      </nav>

      <div className="flex items-center gap-3">
        {/* cart icon */}
        <CartIcon />
        {/* user menu */}
        <UserAvatarMenu />
      </div>
    </header>
  );
}

export default Header;
