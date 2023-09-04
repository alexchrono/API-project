import React from 'react';
import { useEffect } from 'react'
import { NavLink, useHistory, Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkLoadSingle } from '../../store/spots';
import { ThunkLoad } from '../../store/spots';
import { ThunkLoadReviewsBySpotId } from '../../store/reviews';
import OpenModalButton from '../OpenModalButton';
import './ManageReviews.css'
import SubmitReviewModal from '../SubmitReviewModal';
import DeleteSpotModal from '../DeleteSpotModal';
import { ThunkLoadReviewsByUserId } from '../../store/reviews';





export default function ManageReviews() {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch();
  let thisSpot = useSelector((state) => state.spots.singleSpot)
  let allSpots = useSelector((state)=>state.spots.allSpots)
  let allReviews = useSelector((state) => state.reviews)
  let thisUsersReviews = useSelector((state) => state.reviews.user)
  let thisUser = useSelector((state) => state.session)
  let [noReviews,setNoReviews]=useState(3)
  let actionType = "DELETEAREVIEW"
  let ourUserId = thisUser.user.userId
  const [reloadData, setReloadData] = useState(1);

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
      // await ThunkLoadSingle(dispatch, spotId);
      // reviewReq,spotId,reviewId,objReviews,dispatch
      try{
      await ThunkLoadReviewsByUserId(dispatch, ourUserId);} catch (error) {
        setNoReviews(4)
      }
      await ThunkLoad(dispatch);
      // console.log('aboveTHunkLoadReviews with spotId value of', spotId)

    };


    fetchData();
  }, [dispatch, ourUserId, reloadData]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };


  const handleModalClose = () => {
    setIsModalOpen(false);
  };




  if (noReviews===4) { return (<h1>You haven't posted any reviews yet</h1>) }

else {
  let keysToReviews = Object.keys(thisUsersReviews)

  let keysToReviews2=[...keysToReviews]
  console.log('this users reviews is',thisUsersReviews)
  console.log(`all spots is`,allSpots)
  // console.log('KEYS TO REVIEWS LOOKS LIKE ',keysToReviews)
  //   function checkNoReviewAndCheckNotOwner(){
  //   for(let ele of keysToReviews){
  //     if(thisSpotsReviews[ele]['userId']===thisUser.user.id || thisSpot.ownerId===thisUser.user.id)
  //     {return false}
  //     return true
  //   }
  // }
  // let somethingbig = thisUsersReviews
  let data1 = JSON.stringify(allReviews)
  let data2 = JSON.stringify(thisUsersReviews)
  keysToReviews.forEach((ele)=>{
    console.log(ele)
  })


  return (
    <>
      {/* <h1>{data1}</h1>
    <h3>{data2}</h3> */}





      {thisUsersReviews && keysToReviews.length >= 1 && keysToReviews.map((ele) => (


        <div className="eachReview">

          <div className="nameOfReviewer">
            {thisUsersReviews[ele] && allSpots[thisUsersReviews[ele]['spotId']-1] && (<h2>{allSpots[thisUsersReviews[ele]['spotId']-1]['name']}</h2>)}</div>

            <div>{thisUsersReviews[ele] && allSpots[thisUsersReviews[ele]['spotId']-1] && (<img src={allSpots[thisUsersReviews[ele]['spotId']-1]['previewImage']} className="PreviewImage" alt='preview'/>)}
          </div>
          {/* <div className="prettyPicture"><img src=`${allSpots}`</div> */}
          <div className="spreadOut">
          <div className="monthAndDate">
            <h3>{`${ getMonthFromNum(thisUsersReviews[ele]["createdAt"].slice(5, 7))} ${thisUsersReviews[ele]["createdAt"].slice(0, 4)} `}</h3></div>
            <div className="numberStars">{thisUsersReviews[ele] && allSpots[thisUsersReviews[ele]['spotId']-1] && (<span><span className="material-symbols-outlined">grade</span>{thisUsersReviews[ele]['stars'].toFixed(1)}</span>)}
          </div>
          </div>
          <div className="reviewOfUser">
            <p>
              {thisUsersReviews[ele]["review"]}
            </p>
          </div>
          {thisUser.user && typeof thisUsersReviews === "object" && thisUsersReviews[ele]['User']['id'] === thisUser.user.id && (<>
            {/* !thisSpotsReviews.find((ele) => ele.userId === thisUser.user.id) && thisSpot.ownerId !== thisUser.user.id */}
            <OpenModalButton
              buttonText="Update"
              // onButtonClick={closeMenu}
              // reviewReq,spotId,reviewId,objReviews,dispatch
              //  spotId,userId,objReviews,setReloadData,actionType

              modalComponent={<SubmitReviewModal spotId={ele} userId={ele} objReviews={thisUsersReviews} setReloadData={setReloadData} reloadData={reloadData} actionType={"EDITAREVIEW"} Review={thisUsersReviews[ele]["review"]} Stars={thisUsersReviews[ele]['stars'].toFixed(1)}onClose={handleModalClose}
              />
              }
              onClick={handleModalOpen}
            />

            <OpenModalButton
              buttonText="Delete"
              // onButtonClick={closeMenu}


              modalComponent={<DeleteSpotModal spotsId={ele} ourArray={thisUsersReviews} actionType={actionType} keysToReviews2={keysToReviews2} setReloadData={setReloadData} onClose={handleModalClose}
              />
              }
              onClick={handleModalOpen}
            />
          </>)}
        </div>

      ))}
    </>
  );

}
}
