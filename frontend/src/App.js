import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch,Route,useLocation } from "react-router-dom";

import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import spots from "./components/Spots"
import spot from "./components/Spot"
import createSpot from "./components/createSpot";
import SpotsCurrentUser from "./components/spotsCurrentUserManage";
import UpdateASpot from "./components/updateAspot";
import ManageReviews from "./components/ManageReviews";
import LandingPage from "./components/LandingPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const location = useLocation(); // get the current location
  const showNavigation = location.pathname !== "/";
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {showNavigation && <Navigation isLoaded={isLoaded} />}
      {isLoaded && <Switch>
        <Route exact path="/spots/updateAspot/:spotId" component={UpdateASpot} />
        <Route exact path="/spots/manageSpots" component={SpotsCurrentUser} />
        <Route exact path='/reviews/current' component={ManageReviews} />
        <Route exact path="/spots/new" component={createSpot} />
        <Route exact path="/spots/:spotId" component={spot} />
        <Route exact path="/destination/:country" component={spots} />
        

        <Route exact path="/" component={LandingPage} />

        </Switch>}
    </>
  );
}

export default App;
