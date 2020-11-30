import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  content: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#262626",
  },
  box: {
    margin: "25px",
  },
  bar: {
    bottom: "0",
    backgroundColor: "#262626",
  },

  paper: {
    paddingTop: "2vw",
    backgroundColor: "#4f4e4d",
    height: "100px",
    textAlign: "center",
    fontSize: "1.5rem",
    fontFamily: "Lato",
    color: "#fff2e6",
    verticalAlign: "middle",
    width: "100%",
  },
}));

export default useStyles;
