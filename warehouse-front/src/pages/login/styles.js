import { makeStyles } from "@material-ui/styles";
import background from "../../resources/background1.jpg";

const useStyles = makeStyles(() => ({
  body: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${background})`,
  },

  loginBox: {
    border: "2px solid white",
    position: "relative",
    borderRadius: "10px",
    width: "45%",
    minWidth: "440px",
    height: "45%",
    "&:before": {
      content: "''",
      display: "block",
      position: "absolute",
      width: "100%",
      height: "100%",
      background: `rgba( 52, 53, 56, 0.70)`,
      mixBlendMode: "hard-light",
    },
    
  },

  textField: {
    width: "100%",
    backgroundColor: "white",
  },

  fieldBox: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "8px",
    margin: "5%",
    width: "86%",
    position: "relative",
  },

  buttonBox: {
    height: "35%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    background: `rgba( 52, 53, 56, 0.85)`,
    margin: "10%",
    padding: "10px",
    fontSize: "1.5vh",
    color: "white",
    border: "2px solid white",
    minWidth: "100px",
  },
}));

export default useStyles;
