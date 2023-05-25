import AccountTable from "../components/Admin/AccountTable";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect, useState } from "react";

function Account() {
  const [acountList, setAccountList] = useState([]);
  // const getAccountList = async () => {
  //   const access_token = localStorage.getItem("access_token");
  //   const res = await getAllAccount(
  //     access_token
  //   );
  // }
  useEffect(() => {
    // getAccountList();
    setAccountList([]);
  }, [acountList]);
  return (
    <>
      <div className="flex flex-col h-[100vh] justify-between">
        <Header></Header>
        <div className="flex-1 flex flex-row bg-zinc-900 items-center justify-between">
          {/* <AddAcount setAccountList={setAccountList}></AddAcount> */}
          <AccountTable acountList={acountList}></AccountTable>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}

export default Account;
