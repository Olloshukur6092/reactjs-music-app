import { FC, FormEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/img/icon.png";

import { FaSearch } from "react-icons/fa";

const Navbar: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (inputValue.trim()) {
      setInputValue("");
      navigate(`/search?q=${encodeURIComponent(inputValue.trim())}`);
    }
  };

  useEffect(() => {
    setIsActive(false);
  }, [location.pathname, location.search]);

  return (
    <div
      className={`${
        isActive ? "h-[122px]" : "h-20"
      } sm:!h-20 border-b border-gray-800 flex flex-col sm:flex-row justify-center gap-4 sm:justify-between items-stretch sm:items-center px-[5vw]`}
    >
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img className="w-8 h-8 mr-1" src={Logo} alt="Not Found" />
          <h1 className="text-xl font-bold">SONGS</h1>
        </Link>
        <button
          onClick={() => setIsActive(!isActive)}
          className="sm:hidden block"
        >
          {isActive ? (
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                className="fill-white"
                d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                className="fill-white"
                d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"
              />
            </svg>
          )}
        </button>
      </div>
      <form
        onSubmit={handleFormSubmit}
        className={`relative ${isActive ? "flex" : "hidden"} sm:!flex`}
      >
        <input
          value={inputValue}
          onKeyDown={(e) => e.stopPropagation()}
          onKeyUp={(e) => e.stopPropagation()}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          className="bg-dark border border-gray-600 outline-none rounded-full py-3 px-4 text-xl md:w-60"
          placeholder="Search..."
          style={{ width: "600px" }}
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2">
          <FaSearch className="fill-gray-400 w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default Navbar;
