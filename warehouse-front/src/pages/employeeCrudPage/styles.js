import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({

  content: {
    width: "100vw",
    height:"100vh",
    backgroundColor: "#515151",
  },

  search:{
    backgroundColor: "white",
    margin:"10px",
    padding:"20px",
    borderRadius: "25px",
 
    display:"grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(14rem, 1fr))",
    gridGap:"1rem"
  },
 
  bar: {
    bottom: "0",
    backgroundColor: "#1a1a1a",
  },
  
  root:{
    paddingLeft:"20px",
    paddingRight:"20px",
    display:"grid",
    gridTemplateRows: "auto",
    gridGap:"0.5rem"
  },
  
  main:{
    display:"grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(14rem, 1fr))",
    gridGap:"1rem"
  },

}));

export default useStyles;