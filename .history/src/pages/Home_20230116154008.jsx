import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
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
      <div className="flex shadow-md rounded-[5px] mt-5">
        Ini Tabel
      </div>
    </>
  );
};

export default Home;
