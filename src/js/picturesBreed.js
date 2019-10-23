import React, {useState, useEffect} from 'react';
import axios from "axios/index";
import Typography from "@material-ui/core/es/Typography/Typography";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";
import Select from "@material-ui/core/es/Select/Select";

export default function PicturesBreed() {
    const [breeds, setBreeds] = useState([]);
    const [breed, setBreed] = useState([]);
    const [pictures, setPictures] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const handleChange = name => event => {
        setBreed(event.target.value);
    };


    useEffect(() => {
        axios.get(`https://dog.ceo/api/breeds/list/all`)
            .then(res => setBreeds(res.data.message));
    }, []);

    useEffect(() => {
        if (Object.keys(breed).length === 0) return;
        axios.get(`https://dog.ceo/api/breed/${breed}/images/random/20`)
            .then(res => {
                setPictures(res.data.message);
            });
        console.log('pictures ', pictures);
    }, [breed]);

    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        setIsFetching(true);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    function fetchMorePictures() {
        axios.get(`https://dog.ceo/api/breed/${breed}/images/random/20`)
            .then(res => {
                let temp = [];
                res.data.message.map((dog) => {
                    if (!(dog in pictures)) {
                        temp.push(dog);
                    }
                });
                setPictures([...pictures, ...temp]);
            });
        setIsFetching(false);
    }

    useEffect(() => {
        if (!isFetching) return;
        fetchMorePictures();
    }, [isFetching]);

    function parseDogs() {
        return pictures.map((dog) => <img key={dog} alt="" src={dog}/>
        )
    }

    return (
        Object.keys(breed).length === 0 ? (
            <div>
                <FormControl>
                    <InputLabel htmlFor="age-native-simple">Breed</InputLabel>
                    <Select
                        native
                        value={""}
                        onChange={handleChange('age')}
                        inputProps={{
                            name: 'Breed',
                            id: 'age-native-simple',
                        }}
                    >
                        <option value=""/>
                        {Object.keys(breeds).map((breed) => {
                            return (<option value={breed}>{breed}</option>)
                        })
                        }
                    </Select>
                </FormControl>
                <Typography variant={"h6"}>Please select a breed</Typography>
            </div>
        ) : (
            <div>
                <Typography variant={"h6"}>Select a breed to update</Typography>
                <FormControl>
                    <InputLabel htmlFor="age-native-simple">Breed</InputLabel>
                    <Select
                        native
                        value={breed}
                        onChange={handleChange('age')}
                        inputProps={{
                            name: 'age',
                            id: 'age-native-simple',
                        }}
                    >
                        <option value=""/>
                        {Object.keys(breeds).map((breed) => {
                            return (<option value={breed}>{breed}</option>)
                        })
                        }
                    </Select>
                </FormControl>
                <div className={"pictures"}>
                    {parseDogs()}
                </div>
            </div>
        )

    );
}