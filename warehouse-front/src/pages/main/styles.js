import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  content: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#515151",
  },
  box: {
    margin: "10vw",
    width:"80vw"
  },

  bar: {
    bottom: "0",
    backgroundColor: "#1a1a1a",
  },

  paper: {
    padding: "3vw",
    backgroundColor: "#262626",
    height: "100px",
    textAlign: "center",
   
    fontFamily: "Lato",
    color: "#fff2e6",
    verticalAlign: "middle",
    width: "100%",
    fontSize: "2.2vh",
  },

  lodaer:{
    margin:"auto"
  },
}));

export default useStyles;
