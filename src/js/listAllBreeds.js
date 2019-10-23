import React, {useState, useEffect, Fragment} from 'react';
import axios from "axios/index";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import List from "@material-ui/core/es/List/List";
import Typography from "@material-ui/core/es/Typography/Typography";

export default function ListBreeds() {
    const [dogs, setDogs] = useState([]);

    useEffect(() => {
        axios.get(`https://dog.ceo/api/breeds/list/all`)
            .then(res => {
                setDogs(res.data.message);
            });
    }, []);

    function parseDogs() {
        console.log(dogs);
        return (
            <Fragment>
                <Typography variant={"h4"}>
                    Dog breeds list
                </Typography>
                <List>
                    {Object.keys(dogs).map((dog) => {
                        return (
                            <ListItem button key={dog}>
                                <i className="fas fa-bone"></i>
                                <Typography variant={"h6"} style={{paddingLeft: 10}}>
                                    {dog}
                                </Typography>
                            </ListItem>);
                    })
                    }
                </List>
            </Fragment>
        )
    }

    return (
        <div className={"breeds"}>
            {parseDogs()}
        </div>
    );
}