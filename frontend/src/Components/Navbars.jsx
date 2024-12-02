import { useState, useEffect, useRef } from "react";
import logo from "../assets/logo.png";
import subLogo from "../assets/subLogo.png";
import { MdFilterList } from "react-icons/md";
import { FaGlobe, FaBars, FaUser, FaSearch } from "react-icons/fa";

const Navbars = () => {
  const [menu, setMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [scroll, setScroll] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const destinationInputRef = useRef(null);

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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    // Set initial screen size
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
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
                className={`links flex ml-[50px] lg:pt-0 md:pt-[90px] transition-all duration-100 ease-in-out sm:hidden`}
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
                <div className="hover absolute right-0 top-[48px] bg-white shadow-[0px_5px_5px_rgb(184,182,182)] w-[240px] z-10 p-[15px]">
                  <p className="my-[10px] text-[14px]">Sign Up</p>
                  <p className="my-[10px] text-[14px]">Login</p>
                  <hr className="w-full" />
                  <p className="my-[10px] text-[14px]">Gift Cards</p>
                  <p className="my-[10px] text-[14px]">Airbnb your home</p>
                  <p className="my-[10px] text-[14px]">Host an experience</p>
                  <p className="my-[10px] text-[14px]">Help Center</p>
                </div>
              )}
            </div>
          </nav>

          {scroll && (
            <div>
              <form className="flex justify-between transition-all duration-100 h-14 lg:w-[65%] md:w-[80%] items-center text-center m-auto border rounded-full lg:mt-[0px] md:mt-[30px] mb-10">
                <div className="flex flex-col items-start rounded-full hover:bg-gray-300 w-[30%] ps-8">
                  <label htmlFor="where" className="font-medium">
                    Where
                  </label>
                  <input
                    ref={destinationInputRef}
                    type="text"
                    id="where"
                    placeholder="Search Destination"
                    className="text-[15px] pb-2"
                  />
                </div>
                <div className="flex flex-col items-start rounded-full hover:bg-gray-300 w-[20%] ps-8">
                  <label htmlFor="checkin" className="font-medium">
                    Check In
                  </label>
                  <input
                    type="text"
                    id="checkin"
                    placeholder="Add Dates"
                    className="text-[15px] pb-2"
                  />
                </div>
                <div className="flex flex-col items-start rounded-full hover:bg-gray-300 w-[20%] ps-8">
                  <label htmlFor="checkout" className="font-medium">
                    Check Out
                  </label>
                  <input
                    type="text"
                    id="checkout"
                    placeholder="Add Dates"
                    className="text-[15px] pb-2"
                  />
                </div>
                <div className="flex justify-center items-center rounded-full hover:bg-gray-300 w-[30%] ps-8">
                  <div className="flex flex-col items-start">
                    <label htmlFor="who" className="font-medium">
                      Who
                    </label>
                    <input
                      type="text"
                      id="who"
                      placeholder="Add Guests"
                      className="text-[15px] pb-2"
                    />
                  </div>
                  <button className="bg-searchButton rounded-full p-3 me-4">
                    <FaSearch color="white" size={18} />
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Navbars;
