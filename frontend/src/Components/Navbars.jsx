import { useState, useEffect, useRef } from "react";
import logo from "../assets/logo.png";
import subLogo from "../assets/subLogo.png";
import { MdFilterList } from "react-icons/md";
import { FaGlobe, FaBars, FaUser, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbars = () => {
  const [menu, setMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [scroll, setScroll] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const destinationInputRef = useRef(null);
  const menuRef = useRef(null); // Reference for the dropdown menu
  const menuButtonRef = useRef(null); // Reference for the menu button

  // Toggles the menu
  const toggleMenu = () => {
    setMenu((prevState) => !prevState);
  };

  // Handles scroll effects
  const handleScroll = () => {
    if (window.scrollY > 15) {
      setShowSearch(true);
    }

    if (window.scrollY > 10) {
      setScroll(false);
    } else {
      setScroll(true);
      setShowSearch(false);
    }
  };

  // Detects screen size changes
  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 768);
  };

  // Close menu on outside click
  const handleClickOutside = (e) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      !menuButtonRef.current.contains(e.target)
    ) {
      setMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    // Set initial screen size
    handleResize();

    // Add event listener for outside click
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="sticky top-0 bg-white z-50">
      {isSmallScreen ? (
        <div className="flex h-14 mx-5  my-5">
          <div className="flex justify-start items-center mx-3 w-[85%] h-[100%] rounded-full border">
            <div className="ps-3">
              <FaSearch color="black" />
            </div>
            <div className="ms-4 flex flex-col">
              <label
                htmlFor="whereto"
                className="text-black font-medium text-sm"
              >
                Where To?
              </label>
              <input
                className="text-gray-400 text-xs w-[100%] h-[100%] pb-2"
                type="text"
                name=""
                id="whereto"
                placeholder="Anywhere . Any Week . Add guest"
              />
            </div>
          </div>
          <div className=" border rounded-full flex justify-center items-center p-5">
            <MdFilterList />
          </div>
        </div>
      ) : (
        <>
          <nav className="flex justify-between items-center h-[70px] px-[30px]">
            <div className="w-[150px] lg:block md:hidden sm:hidden">
              <img src={logo} alt="logo" className="w-full" />
            </div>
            <div className="subLogo lg:hidden md:block">
              <img src={subLogo} alt="" className="w-[40px] mt-[20px]" />
            </div>

            {showSearch && (
              <div
                onClick={scrollToTop}
                className={`flex justify-between w-80 h-10 ml-[30px] items-center border rounded-full px-4 transition-all duration-500 ease-in-out`}
              >
                <span className="border-r pe-4">Anywhere</span>
                <span className="border-r pe-4">Any week</span>
                <span className="flex justify-center items-center">
                  <p className="font-light text-gray-400 text-sm">Add guests</p>
                  <p className="bg-searchButton p-2 rounded-full ms-2">
                    <FaSearch size={13} color="white" />
                  </p>
                </span>
              </div>
            )}

            {scroll && (
              <div
                className={`links flex ml-[50px] lg:pt-0 md:pt-[90px] transition-all duration-100 ease-in-out lg:block md:block sm:hidden`}
              >
                <ul className="flex ml-0">
                  <li className="list-none px-[20px] py-[10px] text-[18px]">
                    <a href="#">Stays</a>
                  </li>
                  <li className="list-none px-[20px] py-[10px] text-[18px]">
                    <a href="#">Experience</a>
                  </li>
                </ul>
              </div>
            )}

            <div className="user flex justify-between items-center relative">
              <p className="para px-[18px] py-[10px] hover:bg-[#e3e3e3] rounded-full">
                Airbnb your home
              </p>
              <span className="glob px-[12px] py-[10px] hover:bg-[#e3e3e3] rounded-full">
                <FaGlobe size={16} />
              </span>
              <div
                ref={menuButtonRef}
                className="menu flex ml-[8px] px-[13px] py-[7px] justify-between items-center w-[85px] border border-[#e3e3e3] rounded-full cursor-pointer"
                onClick={toggleMenu}
              >
                <FaBars />
                <FaUser
                  className="user-icon bg-[#717171] rounded-full p-[4px]"
                  size={30}
                  color="white"
                />
              </div>

              {menu && (
                <div
                  ref={menuRef}
                  className="hover absolute right-0 top-[48px] bg-white shadow-[0px_5px_5px_rgb(184,182,182)] w-[240px] z-10 p-[15px]"
                >
                  <Link to="/login">
                    <p className="my-[10px] text-[14px]">Login</p>
                  </Link>
                  <hr className="w-full" />
                  <p className="my-[10px] text-[14px]">Gift Cards</p>
                  <p className="my-[10px] text-[14px]">Airbnb your home</p>
                  <p className="my-[10px] text-[14px]">Host an experience</p>
                  <p className="my-[10px] text-[14px]">Help Center</p>
                </div>
              )}
            </div>
          </nav>
        </>
      )}
    </div>
  );
};

export default Navbars;
