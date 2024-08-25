import img from "../assets/images/cleanup.png";
import AvailableOffers from "./AvailableOffers";
import Footer from "./Footer";
import HomeText from "./HomeText";
import Nav from "./Nav";

const Home = () => {
  return (
    <div
      className=" bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${img})` }}
    >
      <HomeText />
      <AvailableOffers />

      <Footer />
    </div>
  );
};

export default Home;
