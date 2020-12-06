import React from "react";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import {Button} from "@material-ui/core"
import useStyles from "./styles";


const Employee = ( {id, firstName, lastName, email, phoneNumber, salary, position}) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    }
    return(
    <Card className={classes.root}>
    <CardHeader
      title={firstName + " "+ lastName}
      subheader={email}
    />
    
    <CardContent>
      <div>
        Numer telefonu: {phoneNumber}<br></br>
        Płaca: {salary}<br></br>
        Stanowisko: {position}
      </div>
    </CardContent>
    <CardActions disableSpacing>
    <Button color="secondary">Popraw</Button>
    <Button color="secondary">Usuń</Button>
    </CardActions>
   
  </Card>
);
}

export default Employee;