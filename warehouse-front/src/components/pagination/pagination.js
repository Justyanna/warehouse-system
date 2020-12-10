import React from "react";
import useStyles from "./styles";
import {Button, ButtonGroup} from "@material-ui/core";

const Paginnation = ({employeesPerPage, total, paginate }) => {
    const classes = useStyles();
    const pageNumbers = [];

    for(let i = 1; i<= Math.ceil(total / employeesPerPage); i++){
        pageNumbers.push(i);
    }

    return (
        <div className ={classes.pagination}>
            <ButtonGroup  color="primary" aria-label="text primary button group" >
            {
                pageNumbers.map(number =>{
                    return(
                        <Button key={number} onClick={() => paginate(number)}  className={classes.pageLink}>
                            {number}
                        </Button>)
                        })
            }
            </ButtonGroup>
        </div>
      
    )
}

export default Paginnation;