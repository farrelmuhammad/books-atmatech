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
  }
});

const Home = () => {
  const token = useSelector((state) => state.auth.token);

  const classes = useStyles();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(true);
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

  async function updateBooksById(data) {
    // console.log(data)
    await axios
      .put(`${Url}/books/${data}`, {
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
    </>
  );
};

export default Home;
