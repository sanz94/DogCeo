import React from 'react';
import SideBarDrawer from './js/sideBarDrawer';
import PicturesSubBreed from "./js/picturesSubBreed";
import RandomDogs from "./js/randomDogs";
import ListBreeds from "./js/listAllBreeds";
import PicturesBreed from "./js/picturesBreed";
import {Route, Switch} from "react-router-dom/umd/react-router-dom";

const App = () => (
    <div className="App">
        <SideBarDrawer>
            <Switch>
                <Route exact path='/' component={RandomDogs}/>
                <Route path='/pictures-by-breed' component={PicturesBreed}/>
                <Route path='/pictures-by-sub-breed' component={PicturesSubBreed}/>
                <Route path='/list-all-breeds' component={ListBreeds}/>
            </Switch>
        </SideBarDrawer>
    </div>
);

export default App;