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
      .get(`${Url}/books`, {
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
      <h2>Daftar Buku</h2>
    </>
  );
};

export default Home;
