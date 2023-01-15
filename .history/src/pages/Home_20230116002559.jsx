import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Url from "../utils/Config";

const Home = () => {
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    getBooks();
  }, []);

  async function getBooks() {
    await axios
      .get(`${Url}/books?page=1&limit=10`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const getData = res.data.data;
        console.log(getData);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <h2 className="font-bold mt-1">Daftar Buku</h2>
      <div className="flex bg-gray-100 rounded-[5px] mt-5">
        Isi Tabel
      </div>
    </>
  );
};

export default Home;
