import React, { useEffect, useState } from 'react';
import { NavLink, useHistory, Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkLoadSingle } from '../../store/spots';
import { ThunkLoadReviewsBySpotId } from '../../store/reviews';
import OpenModalButton from '../OpenModalButton';
import './spot.css';
import SubmitReviewModal from '../SubmitReviewModal';
import DeleteSpotModal from '../DeleteSpotModal';
import { useModal, setTest, test } from '../../context/Modal';

export default function Spot() {
  const { spotId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const thisSpot = useSelector((state) => state.spots.singleSpot);
  const thisSpotsReviews = useSelector((state) => state.reviews.spot);
  const thisUser = useSelector((state) => state.session);
  const [reloadData, setReloadData] = useState(1);
  const actionType = "DELETEAREVIEW";
  function getMonthFromNum(number) {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const monthIndex = parseInt(number, 10) - 1;
    return months[monthIndex] || "Invalid Month";
  }

  useEffect(() => {
    const fetchData = async () => {
      await ThunkLoadSingle(dispatch, spotId);
      await ThunkLoadReviewsBySpotId(dispatch, spotId);
    };

    fetchData();
  }, [dispatch, spotId, reloadData]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const { SpotImages } = thisSpot;
  const keysToReviews = Object.keys(thisSpotsReviews);
  const keysToReviews2 = [...keysToReviews];

  function checkNoReviewAndCheckNotOwner() {
    for (let ele of keysToReviews) {
      if (thisSpotsReviews[ele]['userId'] === thisUser.user.id || thisSpot.ownerId === thisUser.user.id) {
        return false;
      }
      return true;
    }
  }

  return (
    <>
      <div className='daddyOfSingleDetail'>
        <h2 className="titleOfSingle">{thisSpot.name}</h2>
        <div className='cityAndStarsContainer'><span className='cityAndStars'>{`${thisSpot.city}, ${thisSpot.state}, ${thisSpot.country}`}</span>  </div>
      </div>

      <div className="mainPicAndDaddyBelowWrapper">
        <div className='detailsPictureBox'>
          <div className="mainPic">
            {SpotImages && SpotImages.map((ele) => {
              if (ele.preview === true) {
                return (<img key={ele.id} src={ele.url} className="respond" alt={`Image ${ele.id}`} />);
              }
            })}
          </div>
          <div className="sidePicsContainer">
            <div className="sidePicsAndDaddyBelowWrapper">
              {SpotImages && SpotImages.length > 1 && SpotImages.map((ele) => {
                if (ele.preview === false) {
                  return <div className="sidePieceHolder"><img key={ele.id} src={ele.url} className="respond" alt={`Image ${ele.id}`} /> </div>;
                }
                return null;
              })}
            </div>
          </div>
        </div>
        <div className="below70percent">
          <div className="below">
            <h2>Hosted by {thisSpot.Owner && thisSpot.Owner.firstName} {thisSpot.Owner && thisSpot.Owner.lastName}</h2>
          </div>
          <div className="descriptionz">{thisSpot.description}</div>
        </div>
        <div className="borderBoxRight">
          <div className="priceStarReview">
            <span className="inline-left">{`$${thisSpot.price} night`}</span>
            <div className="starsandReviews"></div>
            {thisSpot.numReviews === 0 ? (
              <span className="starz">
                <span className="material-symbols-outlined">grade</span>New
              </span>
            ) : thisSpot.avgStarRating ? (
              <span className="starz">
              <span className="material-symbols-outlined">grade</span>
              {thisSpot.avgStarRating !== undefined
                ? thisSpot.avgStarRating.toFixed(1)
                : "N/A"}
            </span>
            ) : null}
            <p className="inlineRev">{thisSpot.numReviews === 1 ? `${thisSpot.numReviews.toFixed(1)} Review` : thisSpot.numReviews > 1 ? `${thisSpot.numReviews.toFixed(1)} Reviews`
  : null}





</p>
            </div>
          <div className="center">
            <button type="button" className="bigRed" onClick={(e)=>{
              alert("Feature coming soon")
            }}>
              Reserve
            </button>
          </div>
        </div>
      </div>
      <hr className="hrLine" />
      <div className="starAndReviewsForReviews">
      {thisSpot.numReviews === 0 ? (
  <span>
    <span className="material-symbols-outlined">grade</span>
    <span className="fancy">New</span>
  </span>
) : (


  Number.isInteger(thisSpot.avgStarRating) ? (
    <span>
      <span className="material-symbols-outlined">grade</span>
      {thisSpot.avgStarRating.toFixed(1)}
    </span>
  ) : null
)}
    {thisSpot.numReviews === 1 ? (<><span className="bigger"> ·</span> <span className="fancy">{`${thisSpot.numReviews} Review`}</span></>) : thisSpot.numReviews > 1 ? (
      <span>
    <span className="bigger">  ·     </span>
      <span className="fancy">{`${thisSpot.numReviews} Reviews`}</span>
    </span>
    ) : null}
      </div>

      {thisUser.user && typeof thisSpotsReviews === "object" && checkNoReviewAndCheckNotOwner() && (
        <>
          <OpenModalButton
            buttonText="Post Your Review"
            modalComponent={
              <SubmitReviewModal spotId={spotId} userId={thisUser.user.userId} objReviews={thisSpotsReviews} setReloadData={setReloadData} reloadData={reloadData} onClose={handleModalClose} />
            }
            onClick={handleModalOpen}
          />
        </>
      )}

      {thisSpotsReviews && keysToReviews.length >= 1 && keysToReviews.reverse().map((ele) => (
        <div className="eachReview" key={ele}>
          <div className="nameOfReviewer">
            {thisSpotsReviews[ele] && <h2 className="names">{thisSpotsReviews[ele]['User']["firstName"]}</h2>}
          </div>
          <div className="monthAndDate">
            <h3 className="datez">{`${ getMonthFromNum(thisSpotsReviews[ele]["createdAt"].slice(5, 7))} ${thisSpotsReviews[ele]["createdAt"].slice(0, 4)} `}</h3>
          </div>
          <div className="reviewOfUser">
            <p>{thisSpotsReviews[ele]["review"]}</p>
          </div>
          {thisUser.user && typeof thisSpotsReviews === "object" && thisSpotsReviews[ele]['User']['id'] === thisUser.user.id && (
            <>
              <OpenModalButton
                buttonText="Delete"
                modalComponent={<DeleteSpotModal spotsId={ele} ourArray={thisSpotsReviews} actionType={'deleteAspot'} keysToReviews2={keysToReviews2} setReloadData={setReloadData} onClose={handleModalClose} />}
                onClick={handleModalOpen}
              />
            </>
          )}
        </div>
      ))}
    </>
  );
}
