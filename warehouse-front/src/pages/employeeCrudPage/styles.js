import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  body:{
    backgroundColor: "#262626",
  },

  content: {
    width: "100vw",
    height:"100vh",
    backgroundColor: "#262626",
  },

  search:{
    backgroundColor: "white",
    margin:"20px",
    padding:"20px",
    borderRadius: "25px",
  },
 
  bar: {
    bottom: "0",
    backgroundColor: "#262626",
  },

  root:{
    padding:"3%"
  },
  
  main:{
    display:"grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(14rem, 1fr))",
    gridGap:"1rem"
  }


}));

export default useStyles;