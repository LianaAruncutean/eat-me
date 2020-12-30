import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import { lighten, makeStyles } from "@material-ui/core/styles";
import { deleteFood } from "../../api/allFoodsAPI";

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
    fontWeight: 700,
    fontSize: "24px",
  },
}));

function AllFoodsToolbar(props) {
  const classes = useToolbarStyles();
  const { selectedFoods } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: selectedFoods.length > 0,
      })}
    >
      {selectedFoods.lenth > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {selectedFoods.length} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          All Foods
        </Typography>
      )}

      {selectedFoods.length > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            aria-label="delete"
            onClick={(e) => {
              e.preventDefault();
              deleteFood(selectedFoods);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
}

export default AllFoodsToolbar;
