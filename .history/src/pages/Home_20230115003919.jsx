import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Url from "../utils/Config";

const Home = () => {
    const token = useSelector(state => state.auth.token);

    useEffect(() => {
        getBooks()
    }, [])

    async function getBooks() {
        await axios.get(`${Url}/books?page=1&limit=10`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err);
        });
    }
  return (
    <>
      {/* <Sidebar /> */}
    </>
  );
};

export default Home;
