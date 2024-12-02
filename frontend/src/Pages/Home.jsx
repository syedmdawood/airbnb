import Cards from "../Components/Cards";
import Categories from "../Components/Categories";
// import Footer from "../Components/Footer";
// import LowerNavbar from "../Components/LowerNavbar";
// import Navbar from "../Components/Navbar";
import SearchBar from "../Components/SearchBar";
// import SingleSearchBar from "../Components/SingleSearchBar";

const Home = () => {
  return (
    <div>
      {/* <Navbar />
      <SingleSearchBar /> */}
      <SearchBar />
      <Categories />
      <Cards />
      {/* <Footer />
      <LowerNavbar /> */}
    </div>
  );
};

export default Home;
