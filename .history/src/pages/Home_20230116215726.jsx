import {
  Button,
  ButtonGroup,
  CircularProgress,
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
});

const Home = () => {
  const token = useSelector((state) => state.auth.token);

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
        setBooks(getData);
        console.log(getData);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
                            <Button>One</Button>
                            <Button>Two</Button>
                            <Button>Three</Button>
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
