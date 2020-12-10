import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  pagination: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop:"16vh",
    marginBottom:"30px"
  },
  pageLink:{
    width:"30px",
    backgroundColor:"white"
  },

}));

export default useStyles;