import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Typography from "@material-ui/core/es/Typography/Typography";

export default function RandomDogs() {

    const [dogs, setDogs] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        axios.get(`https://dog.ceo/api/breed/pug/images/random/20`)
            .then(res => {
                setDogs(res.data.message);
            });
    }, []);

    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        setIsFetching(true);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    function fetchMorePictures() {
        console.log('fetching more');
        axios.get(`https://dog.ceo/api/breed/pug/images/random/20`)
            .then(res => {
                console.log('fetched data= {}', res);
                let temp = [];
                res.data.message.map((dog) => {
                    if (!(dog in dogs)) {
                        temp.push(dog);
                    }
                });
                setDogs([...dogs, ...temp]);
            });
        console.log('dogs: ', dogs);
        setIsFetching(false);
    }

    useEffect(() => {
        if (!isFetching) return;
        fetchMorePictures();
    }, [isFetching]);

    function parseDogs() {
        return dogs.map((dog) => <img key={dog} alt="" src={dog}/>
        )
    }

    return (
        <div className={"pictures"}>
            {parseDogs()}
            {isFetching && <Typography variant={"h6"}>Fetching more list items...</Typography>}
        </div>

    )
};
