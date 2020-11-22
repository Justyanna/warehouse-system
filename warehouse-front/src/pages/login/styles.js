import { makeStyles } from "@material-ui/styles";
import background from "../../resources/background1.jpg";

const useStyles = makeStyles(() => ({
  body: {
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },

  loginBox: {
    border: "2px solid white",
    position: "relative",
    borderRadius: "10px",
    width: "45%",
    minWidth: "440px",
    height: "50%",
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
    fontSize: "1.5rem",
    color: "white",
    border: "2px solid white",
    minWidth: "150px",
  },
}));

export default useStyles;
