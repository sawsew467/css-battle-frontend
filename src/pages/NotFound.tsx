import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

function NotFound() {
  return (
    <>
      <div className="flex flex-col h-[100vh] justify-between">
        <Header
        ></Header>
        <div className="flex-1 flex flex-row bg-zinc-900 items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-primary text-[160px] font-bold">Oops!</h1>
            <div className="w-full flex flex-col justify-center items-center">
              <p className="text-white text-2xl font-medium mt-[-20px]  bg-zinc-900">
                404 - PAGE NOT FOUND
              </p>
              <p className="text-slate-300 text-xl p-2 max-w-[520px] bg-zinc-900 text-center">
                The page you are looking for might have been removed had its
                name changed or temporarily unavailable.
              </p>
              <Link to={"/"}>
                <button className="mt-5 text-lg text-slate-800 py-2 bg-primary w-[320px] rounded-md border-2 border-zinc-600 hover:bg-blue-400 transition-all">
                  BACK TO HOME PAGE
                </button>
              </Link>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}

export default NotFound;

