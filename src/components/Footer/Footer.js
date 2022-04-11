import { AiOutlineLinkedin, AiFillGithub } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-deep-blue text-white p-4 py-9">
      <div className="container mx-auto">
        <p className="text-center">
          Created by{" "}
          <a
            href="http://www.mohamedtanash.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-deep-orange"
          >
            Mohamed Tanash
          </a>{" "}
          &copy; 2022, All rights reserved.
        </p>
        <div className="flex gap-4 justify-center items-center mt-2">
          <a
            href="https://www.linkedin.com/in/mohamed-tanash/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineLinkedin className="text-white w-7 h-7" />
          </a>
          <a
            href="https://github.com/Mtanash"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillGithub className="text-white w-7 h-7" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
