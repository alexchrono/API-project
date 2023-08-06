import React from 'react';
import { useEffect } from 'react'
import { NavLink, useHistory, Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkLoadSingle } from '../../store/spots';
import { ThunkLoadReviewsBySpotId } from '../../store/reviews';
import OpenModalButton from '../OpenModalButton';
import './ManageReviews.css'
import SubmitReviewModal from '../SubmitReviewModal';
import DeleteSpotModal from '../DeleteSpotModal';
import { ThunkLoadReviewsByUserId } from '../../store/reviews';





export default function ManageReviews() {
  let { spotId } = useParams()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch();
  let thisSpot = useSelector((state) => state.spots.singleSpot)
  let allReviews = useSelector((state) => state.reviews)
  let thisUsersReviews = useSelector((state) => state.reviews.user)
  let thisUser = useSelector((state) => state.session)
  let actionType="DELETEAREVIEW"
  let ourUserId=thisUser.user.userId
  useEffect(() => {
    const fetchData = async () => {
      // await ThunkLoadSingle(dispatch, spotId);
      await ThunkLoadReviewsByUserId(dispatch,spotId)
      // console.log('aboveTHunkLoadReviews with spotId value of', spotId)

    };


    fetchData();
  }, [dispatch,ourUserId]);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };


  const handleModalClose = () => {
    setIsModalOpen(false);
  };



  let keysToReviews=Object.keys(thisUsersReviews)
  let keysToReviews2=[...keysToReviews]
  // console.log('KEYS TO REVIEWS LOOKS LIKE ',keysToReviews)
//   function checkNoReviewAndCheckNotOwner(){
//   for(let ele of keysToReviews){
//     if(thisSpotsReviews[ele]['userId']===thisUser.user.id || thisSpot.ownerId===thisUser.user.id)
//     {return false}
//     return true
//   }
// }

let data1=JSON.stringify(allReviews)
let data2=JSON.stringify(thisUsersReviews)
  return (
    <>
    <h1>{data1}</h1>
    <h3>{data2}</h3>





      {thisUsersReviews && keysToReviews.length >= 1 && keysToReviews.map((ele) => (


        <div className="eachReview">
          <div className="nameOfReviewer">
            <h1>{JSON.stringify(thisUsersReviews)}</h1>
            {thisUsersReviews[ele] && (<h2>{thisUsersReviews[ele]['User']["firstName"]}</h2>)}
          </div>
          <div className="monthAndDate">
            <h3>{`${thisUsersReviews[ele]["createdAt"].slice(5, 7)} ${thisUsersReviews[ele]["createdAt"].slice(0, 4)} `}</h3></div>
            <div className="reviewOfUser">
            <p>
              {thisUsersReviews[ele]["review"]}
            </p>
            </div>
            {thisUser.user && typeof thisUsersReviews==="object" &&  thisUsersReviews[ele]['User']['id']===thisUser.user.id && (<><h1>
              {JSON.stringify(thisUsersReviews)}</h1>
        {/* !thisSpotsReviews.find((ele) => ele.userId === thisUser.user.id) && thisSpot.ownerId !== thisUser.user.id */}


        <OpenModalButton
          buttonText="Delete"
          // onButtonClick={closeMenu}


          modalComponent={<DeleteSpotModal  spotsId={ele} ourArray={thisUsersReviews} actionType={actionType} keysToReviews2={keysToReviews2} onClose={handleModalClose}
          />
        }
        onClick={handleModalOpen}
        />
     </> )}
          </div>

))}
    </>
  );

}
