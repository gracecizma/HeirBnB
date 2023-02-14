import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Header from "./components/Header/Header.js";
import Spots from "./components/SpotsShow"
import SingleSpot from './components/SingleSpotShow'
import CreateNewSpot from './components/CreateNewSpot'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <>
      <Header isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Spots />
          </Route>
          <Route exact path="/spots">
            <CreateNewSpot />
          </Route>
          <Route path='/spots/:spotId'>
            <SingleSpot />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
