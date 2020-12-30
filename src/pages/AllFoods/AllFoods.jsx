import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import AllFoodsTableHeader from "../../components/AllFoods/AllFoodsTableHeader";
import AllFoodsToolbar from "../../components/AllFoods/AllFoodsToolbar";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import "./AllFoods.css";
import { Link } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import FoodDetails from "./FoodDetails";
import { getAllFoods } from "../../api/allFoodsAPI";
import { isNullOrUndefined } from "../../utils/utils";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "85%",
    paddingTop: "4rem",
    marginLeft: "7rem",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openedFood, setOpenedFood] = React.useState(null);
  const [foods, setFoods] = React.useState([]);
  const userId = localStorage.getItem("userId");
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const history = useHistory();

  React.useEffect(() => {
    const getFoods = async () => {
      const foods = await getAllFoods();
      if (!isNullOrUndefined(foods)) setFoods(foods);
    };

    getFoods();
  }, []);

  if (isNullOrUndefined(userId)) {
    history.push("/login");
    return null;
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = foods.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, foods.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <div
        className="allFoodsButtons"
        style={{ display: isAdmin ? "none" : "block" }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <div className="dashboardButton">Dashboard</div>
        </Link>
        <Link to="/blogs" style={{ textDecoration: "none", color: "black" }}>
          <div className="blogsButton">Advice</div>
        </Link>
        <Link
          to="/retrospective"
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="menusButton">Retrospective</div>
        </Link>
      </div>
      <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
        <div
          className="logoutButton"
          onClick={() => {
            localStorage.clear();
          }}
        >
          Logout
        </div>
      </Link>
      <Paper className={classes.paper}>
        <AllFoodsToolbar selectedFoods={selected} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <AllFoodsTableHeader
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={foods.length}
            />
            <TableBody>
              {stableSort(foods, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                          style={{
                            display: isAdmin ? "block" : "none",
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isAdmin) setOpenedFood(row);
                        }}
                        style={{ cursor: isAdmin ? "default" : "pointer" }}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                        align="right"
                        onClick={(e) => {
                           e.stopPropagation();
                        }}
                      >
                        {row.calories}
                      </TableCell>
                      <TableCell
                        padding="none"
                        style={{ display: isAdmin ? "block" : "none" }}
                      >
                        <Link to="/addfood">
                          <Button variant="contained" color="secondary">
                            EDIT
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={foods.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
        className="densePaddingButton"
      />
      <Link
        to="/addfood"
        style={{
          display: isAdmin ? "block" : "none",
        }}
      >
        <Fab
          color="secondary"
          variant="extended"
          size="small"
          className="addFoodButton"
        >
          <AddIcon className={classes.extendedIcon} />
          Add Food
        </Fab>
      </Link>
      <Modal
        open={openedFood !== null}
        onClose={() => setOpenedFood(null)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <FoodDetails
          foodDetails={openedFood}
          closeModal={() => setOpenedFood(null)}
        />
      </Modal>
    </div>
  );
}
