import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkLoadSpotsCurrentUser } from '../../store/spots';
import OpenModalButton from '../OpenModalButton';
import DeleteSpotModal from '../DeleteSpotModal';
import './currentUser.css';

export default function SpotsCurrentUserManage() {
  const dispatch = useDispatch();
  const allTheSpots = useSelector((state) => state.spots.allSpots);
  const actionType = 'DELETEASPOT';

  useEffect(() => {
    const fetchData = async () => {
      await ThunkLoadSpotsCurrentUser(dispatch);
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="pictureBox">
      {Array.isArray(allTheSpots) ? (
        allTheSpots.map((ele) => (
          <div className="daddyOfPics" key={ele.id}>
            <Link to={`/spots/${ele.id}`} className="link">
              <div className="imgDiv toolTip">
                <img src={ele.previewImage} className="image2" alt={`Spot ${ele.id}`} />
                <span className="tooltiptext">{ele.name}</span>
              </div>
            </Link>
            <div className="nameAndButtons">
              <div className="nameOfPlace">
                <h4>{ele.name}</h4>
              </div>
              <div className="buttons">
                <Link to={`/spots/updateAspot/${ele.id}`}>
                  <button type="button" className="updateDelete">
                    Update
                  </button>
                </Link>
                <OpenModalButton
                  buttonText="Delete"
                  modalComponent={
                    <DeleteSpotModal spotsId={ele.id} ourArray={allTheSpots} actionType={actionType} keysToReviews={7} />
                  }
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading spots...</p>
      )}
    </div>
  );
}
