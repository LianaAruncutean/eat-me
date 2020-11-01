import React from "react";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MultipleSelect from "../../components/AllFoods/MultipleSelect";
import { ImagePicker } from "react-file-picker";
import "./FoodForm.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function FoodForm() {
  const [image, setImage] = React.useState(null);
  const classes = useStyles();

  console.log(image);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FastfoodIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Food
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="foodName"
                variant="outlined"
                required
                fullWidth
                id="foodName"
                label="Food Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <MultipleSelect />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="foodCalories"
                label="Food Calories per 100g"
                name="foodCalories"
                autoComplete="fcalories"
              />
            </Grid>
            <Grid item xs={12} className="fileGrid">
              <img className="foodImage" src={image} alt="" />
              <div className="foodFilePicker">
                <ImagePicker
                  extensions={["jpg", "jpeg", "png"]}
                  dims={{
                    minWidth: 0,
                    maxWidth: 500000,
                    minHeight: 0,
                    maxHeight: 500000,
                  }}
                  onChange={(base64Image) => setImage(base64Image)}
                  onError={(errMsg) => console.log(errMsg)}
                >
                  <button>Click to upload image</button>
                </ImagePicker>
              </div>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default FoodForm;