import AccountTable from "../components/Admin/AccountTable";
import AddAcount from "../components/Admin/AddAcount";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { faker } from "@faker-js/faker";
import { useState } from "react";

function Account() {
  const [acountList, setAccountList] = useState([
    {
      username: "DE170145",
      password: "huih732r",
      avatarUrl: faker.image.avatar(),
    },
    {
      username: "DS678291",
      password: "fwe31er",
      avatarUrl: faker.image.avatar(),
    },
    {
      username: "DA643298",
      password: "h7y87e3ek",
      avatarUrl: faker.image.avatar(),
    },
    {
      username: "SA789732",
      password: "yrelkle3",
      avatarUrl: faker.image.avatar(),
    },
    {
      username: "DS678291",
      password: "fwe31er",
      avatarUrl: faker.image.avatar(),
    },
    {
      username: "DA643298",
      password: "h7y87e3ek",
      avatarUrl: faker.image.avatar(),
    },
    {
      username: "SA789732",
      password: "yrelkle3",
      avatarUrl: faker.image.avatar(),
    },
    {
      username: "DS678291",
      password: "fwe31er",
      avatarUrl: faker.image.avatar(),
    },
    {
      username: "DA643298",
      password: "h7y87e3ek",
      avatarUrl: faker.image.avatar(),
    },
    {
      username: "SA789732",
      password: "yrelkle3",
      avatarUrl: faker.image.avatar(),
    },
    {
      username: "DS678291",
      password: "fwe31er",
      avatarUrl: faker.image.avatar(),
    },
    {
      username: "DA643298",
      password: "h7y87e3ek",
      avatarUrl: faker.image.avatar(),
    },
    {
      username: "SA789732",
      password: "yrelkle3",
      avatarUrl: faker.image.avatar(),
    },
    {
      username: "DS678291",
      password: "fwe31er",
      avatarUrl: faker.image.avatar(),
    },
    {
      username: "DA643298",
      password: "h7y87e3ek",
      avatarUrl: faker.image.avatar(),
    },
    {
      username: "SA789732",
      password: "yrelkle3",
      avatarUrl: faker.image.avatar(),
    },
    {
      username: "DS678291",
      password: "fwe31er",
      avatarUrl: faker.image.avatar(),
    },
    {
      username: "DA643298",
      password: "h7y87e3ek",
      avatarUrl: faker.image.avatar(),
    },
    {
      username: "SA789732",
      password: "yrelkle3",
      avatarUrl: faker.image.avatar(),
    },
    {
      username: "DS678291",
      password: "fwe31er",
      avatarUrl: faker.image.avatar(),
    },
    {
      username: "DA643298",
      password: "h7y87e3ek",
      avatarUrl: faker.image.avatar(),
    },
    {
      username: "SA789732",
      password: "yrelkle3",
      avatarUrl: faker.image.avatar(),
    },
    {
      username: "DS678291",
      password: "fwe31er",
      avatarUrl: faker.image.avatar(),
    },
    {
      username: "DA643298",
      password: "h7y87e3ek",
      avatarUrl: faker.image.avatar(),
    },
    {
      username: "SA789732",
      password: "yrelkle3",
      avatarUrl: faker.image.avatar(),
    },
  ]);
  return (
    <>
      <div className="flex flex-col h-[100vh] justify-between">
        <Header></Header>
        <div className="flex-1 flex flex-row bg-zinc-900 items-center justify-between">
          <AddAcount setAccountList={setAccountList}></AddAcount>
          <AccountTable acountList={acountList}></AccountTable>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}

export default Account;
