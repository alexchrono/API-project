import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch,Route } from "react-router-dom";

import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import spots from "./components/Spots"
import spot from "./components/Spot"
import createSpot from "./components/createSpot";
import SpotsCurrentUser from "./components/spotsCurrentUserManage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch>
        <Route exact path="/spots/manageSpots" component={SpotsCurrentUser} />
        <Route exact path="/spots/new" component={createSpot} />
        <Route exact path="/spots/:spotId" component={spot} />
        <Route exact path="/" component={spots} />

        </Switch>}
    </>
  );
}

export default App;
