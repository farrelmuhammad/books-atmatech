import {
  Button,
  ButtonGroup,
  CircularProgress,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Url from "../utils/Config";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  button: {
    marginTop: "10px",
  },
});

const Home = () => {
  const token = useSelector((state) => state.auth.token);

  const classes = useStyles();

  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    getBooks();
    // getBooksById();
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
        setLoading(false);
        setBooks(getData);
        console.log(getData);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getBooksById(data) {
    // console.log(data)
    await axios
      .get(`${Url}/books/${data}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const getData = res.data;
        console.log(getData);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function addBooks() {
    // console.log(formData)
    await axios
      .post(`${Url}/books`, {
        data: formData,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const getData = res.data;
        console.log(getData);
        // setShowModal(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <h2 className="font-bold mt-1">Daftar Buku</h2>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={() => setShowModal(true)}
      >
        Tambah
      </Button>

      <div className="flex shadow-md rounded-[5px] mt-5">
        <Paper className={classes.root}>
          {loading ? (
            <CircularProgress />
          ) : (
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>Nama Buku</TableCell>
                    <TableCell>Deskripsi</TableCell>
                    <TableCell>Author</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {books
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((data) => (
                      <TableRow
                        key={data._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {data.name}
                        </TableCell>
                        <TableCell>{data.description}</TableCell>
                        <TableCell>{data.created_by_id}</TableCell>
                        <TableCell align="center">
                          <ButtonGroup
                            variant="text"
                            color="primary"
                            aria-label="text primary button group"
                            size="small"
                          >
                            <IconButton
                              aria-label="edit"
                              onClick={() => getBooksById(data._id)}
                            >
                              <EditIcon />
                            </IconButton>
                            {/* <IconButton aria-label="delete" color="secondary" onClick={() => getBooksById(data._id)}>
                              <DeleteIcon />
                            </IconButton> */}
                          </ButtonGroup>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={books.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Tambah Buku</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="flex flex-col gap-4">
                    <h5 className="font-medium">Nama Buku</h5>
                    <input
                      className="p-2 rounded-xl border"
                      type="text"
                      name="text"
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                    <h1>Deskripsi</h1>
                    <input
                      className="p-2 rounded-xl border"
                      type="text"
                      name="text"
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => addBooks()}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Home;
