import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Admin() {
  return (
    <>
      <div className="flex flex-col h-[100vh] justify-between">
        <Header></Header>
        <div className="flex-1 flex flex-row bg-zinc-900 items-center justify-center">
          <div className="flex flex-col gap-4 w-[400px]">
            <Link to="/account">
              <button className="text-lg text-slate-800 py-2 bg-primary w-full rounded-md border-2 border-zinc-600 hover:bg-yellow-300 transition-all">
                Account Management
              </button>
            </Link>
            <Link to="/account">
              <button className="text-lg text-slate-800 py-2 bg-primary w-full rounded-md border-2 border-zinc-600 hover:bg-yellow-300 transition-all">
                Question Management
              </button>
            </Link>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}

export default Admin;
