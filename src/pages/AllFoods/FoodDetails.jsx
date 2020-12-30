import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./FoodDetails.css";
import Link from "@material-ui/core/Link";
import { addUserFood } from "../../api/userFoodAPI";
import { useHistory } from "react-router-dom";
import { isNullOrUndefined } from "../../utils/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  modal: {
    position: "absolute",
    top: "12rem",
    left: "25rem",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function FoodDetails(props) {
  const classes = useStyles();
  const [quantity, setQuantity] = React.useState(0);
  const userId = localStorage.getItem("userId");
  const history = useHistory();

  if (isNullOrUndefined(userId)) {
    history.push("/login");
    return null;
  }

  return (
    <div className={classes.modal}>
      <div className="modalHeader">
        <h1 id="simple-modal-title">{props.foodDetails.name}</h1>
        <h5 id="simple-modal-description">
          {props.foodDetails.calories} calories/100g
        </h5>
      </div>
      <div className="modalBody">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="quantity"
              label="Quantity (g)"
              name="quantity"
              autoComplete="quantity"
              onChange={(e) => {
                e.preventDefault();
                const quantityAsNumber = Number(e.target.value);
                setQuantity(quantityAsNumber);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              id="standard-read-only-input"
              label="Total Calories"
              value={(quantity * props.foodDetails.calories) / 100}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>
      </div>
      <div className="modalFooter">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => props.closeModal()}
            >
              Close
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Link href="/" variant="body2">
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={async (e) => {
                  await addUserFood(userId, props.foodDetails.id, quantity);
                  props.closeModal();
                }}
              >
                Save
              </Button>
            </Link>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default FoodDetails;
