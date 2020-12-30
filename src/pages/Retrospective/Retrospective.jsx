import React from "react";
import "./Retrospective.css";
import { useHistory } from "react-router-dom";
import { groupBy, isNullOrUndefined } from "../../utils/utils";
import { Link } from "react-router-dom";
import { getRetrospective } from "../../api/retrospectiveAPI";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  root: {
    flexGrow: 1,
    overflow: "hidden",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function Retrospective() {
  const [retrospective, setRetrospective] = React.useState([]);
  const userId = localStorage.getItem("userId");
  const history = useHistory();
  const classes = useStyles();

  React.useEffect(() => {
    const getAllRetrospective = async () => {
      let allRetrospective = await getRetrospective(userId);
      const groupedByRetrospective = groupBy(allRetrospective, "day");
      const retrospectiveList = Object.keys(groupedByRetrospective).map(
        (key) => groupedByRetrospective[key]
      );

      setRetrospective(retrospectiveList);
    };
    getAllRetrospective();
  }, []);

  if (isNullOrUndefined(userId)) {
    history.push("/login");
    return null;
  }

  let tables = retrospective.map((retro, indexH) => (
    <div className="retrospectiveContent" key={`retro ${indexH}`}>
      <TableContainer className="myList" component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableHeadersStyle">Your Food</TableCell>
              <TableCell
                className="tableHeadersStyle"
                align="center"
                className="retroDay"
              >{`${retro[0].dayOfWeek}, ${retro[0].day.substring(
                0,
                10
              )}`}</TableCell>
              <TableCell className="tableHeadersStyle" align="right">
                Calories
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {retro.map((userFood, index) => (
              <TableRow key={`${indexH} ${index}`}>
                <TableCell component="th" scope="row">
                  {userFood.name}
                </TableCell>
                <TableCell />
                <TableCell align="right">{userFood.calories}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  ));

  if (tables.length === 0) {
    tables = (
      <div className="retrospectiveContent">
        <TableContainer className="myList" component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableHeadersStyle">There is no data to be displayed.</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </div>
    );
  }

  return (
    <div className="retrospective">
      <div className="retrospectiveHeader">Retrospective</div>
      <div className="retrospectiveButtons">
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <div className="dashboardButton">Dashboard</div>
        </Link>
        <Link to="/blogs" style={{ textDecoration: "none", color: "black" }}>
          <div className="blogButton">Advice</div>
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
      {tables}
    </div>
  );
}

export default Retrospective;
