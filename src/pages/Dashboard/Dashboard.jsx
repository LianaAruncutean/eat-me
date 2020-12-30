import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import "./Dashboard.css";
import { getUserFoods } from "../../api/userFoodAPI";
import { isNullOrUndefined } from "../../utils/utils";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  root: {
    flexGrow: 1,
    overflow: "hidden"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function Dashboard() {
  const classes = useStyles();
  const [userFoods, setUserFoods] = React.useState([]);
  const userId = localStorage.getItem("userId");
  const calories = localStorage.getItem("calories");
  const history = useHistory();
  const caloriesConsumed = userFoods.reduce((a, b) => a + b["calories"], 0);

  React.useEffect(() => {
    const getMyFoods = async () => {
      const myFoods = await getUserFoods(userId);
      if (!isNullOrUndefined(myFoods)) setUserFoods(myFoods);
    };

    getMyFoods();
  }, []);

  if (isNullOrUndefined(userId)) {
    history.push("/login");
    return null;
  }
  return (
    <div className={classes.root}>
      <Grid className="dashboard" container spacing={3}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h5" className="dashboardHeader">
            Calories Remaining
          </Typography>
          <Typography component="h1" variant="h5" className="dashboardHeader">
            {calories} - {caloriesConsumed.toFixed(2)} = {(calories - caloriesConsumed).toFixed(2)}
          </Typography>
          <div className="dashboardButtons">
            <Link
              to="/blogs"
              style={{ textDecoration: "none", color: "black" }}
            >
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
        </Grid>
        <TableContainer className="myList" component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableHeadersStyle">Your Food</TableCell>
                <TableCell className="tableHeadersStyle" align="right">Calories</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userFoods.map((userFood, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {userFood.name}
                  </TableCell>
                  <TableCell align="right">{userFood.calories}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Link to="/allfoods">
        <Fab
          color="secondary"
          variant="extended"
          size="small"
          className="addHungryButton"
        >
          <AddIcon className={classes.extendedIcon} />
          I'm hungry
        </Fab>
      </Link>
    </div>
  );
}

export default Dashboard;
