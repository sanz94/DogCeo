import React, {useState, useEffect} from 'react';
import axios from "axios/index";
import Typography from "@material-ui/core/es/Typography/Typography";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";
import Select from "@material-ui/core/es/Select/Select";

export default function PicturesBreed() {
    const [breeds, setBreeds] = useState([]);
    const [subBreeds, setSubBreeds] = useState([]);
    const [subBreed, setSubBreed] = useState([]);
    const [breed, setBreed] = useState([]);
    const [pictures, setPictures] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const handleChange = name => event => {
        setBreed(event.target.value);
    };

    const handleChangeSub = name => event => {
        setSubBreed(event.target.value);
    };


    useEffect(() => {
        axios.get(`https://dog.ceo/api/breeds/list/all`)
            .then(res => setBreeds(res.data.message));
    }, []);

    useEffect(() => {
        if (Object.keys(breeds).length === 0) return;

        axios.get(`https://dog.ceo/api/breed/${breed}/list`)
            .then(res => {

                setSubBreeds(res.data.message);
            });

    }, [breed]);

    useEffect(() => {
        if ((subBreeds.length) === 0) setPictures([])
    }, [subBreeds]);

    useEffect(() => {

        if (Object.keys(breed).length === 0) return;

        axios.get(`https://dog.ceo/api/breed/${breed}/${subBreed}/images/random/20`)
            .then(res => {
                setPictures(res.data.message);
            });
        console.log('sub breeds');
    }, [subBreed]);

    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        setIsFetching(true);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    function fetchMorePictures() {
        axios.get(`https://dog.ceo/api/breed/${breed}/${subBreed}/images/random/20`)
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
        Object.keys(breed).length === 0 || Object.keys(subBreeds).length === 0 ? (
            <div>
                <Typography variant={"h6"}>Please select a breed and sub-breed</Typography>
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
                <FormControl style={{minWidth: 120, marginLeft: 20}}>
                    <InputLabel htmlFor="age-native-simple">Sub Breed</InputLabel>
                    <Select
                        native
                        value={subBreed}
                        onChange={handleChangeSub('age')}
                        inputProps={{
                            name: 'age',
                            id: 'age-native-simple',
                        }}
                    >
                        <option value=""/>
                        {(subBreeds).map((breed) => {
                            return (<option value={breed}>{breed}</option>)
                        })
                        }
                    </Select>
                </FormControl>
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
                <FormControl style={{minWidth: 120, marginLeft: 20}}>
                    <InputLabel htmlFor="age-native-simple">Sub Breed</InputLabel>
                    <Select
                        native
                        labelWidth={50}
                        value={subBreed}
                        onChange={handleChangeSub('age')}
                        inputProps={{
                            name: 'age',
                            id: 'age-native-simple',
                        }}
                    >
                        <option value=""/>
                        {(subBreeds).map((breed) => {
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