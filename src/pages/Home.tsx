import Footer from "../components/Footer";
import Header from "../components/Header";

function Home() {
  return (
    <>
      <div className="flex flex-col h-[100vh] justify-between">
        <Header></Header>
        <div className="flex-1 flex flex-row"></div>
        <Footer></Footer>
      </div>
    </>
  );
}

export default Home;
