import React from 'react';
import { useEffect } from 'react'
import { NavLink, useHistory, Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkLoadSingle } from '../../store/spots';
import { ThunkLoadReviewsBySpotId } from '../../store/reviews';
import OpenModalButton from '../OpenModalButton';
import './spot.css'
import SubmitReviewModal from '../SubmitReviewModal';






export default function Spot() {
  let { spotId } = useParams()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch();
  let thisSpot = useSelector((state) => state.spots.singleSpot)
  let allReviews = useSelector((state) => state.reviews)
  let thisSpotsReviews = useSelector((state) => state.reviews.spot)
  let thisUser = useSelector((state) => state.session)
  useEffect(() => {
    const fetchData = async () => {
      await ThunkLoadSingle(dispatch, spotId);
      // console.log('aboveTHunkLoadReviews with spotId value of', spotId)
      await ThunkLoadReviewsBySpotId(dispatch, spotId)
    };


    fetchData();
  }, [dispatch, spotId]);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };


  const handleModalClose = () => {
    setIsModalOpen(false);
  };


  let { SpotImages } = thisSpot


  // console.log('STATE.REVIEWS aka allReviews LOOKS LIKE',allReviews)
  // console.log('STATE.REVIEWS.SPOT aka thisSpotsReviews LOOKS LIKE',thisSpotsReviews)
  let keysToReviews=Object.keys(thisSpotsReviews)
  // console.log('KEYS TO REVIEWS LOOKS LIKE ',keysToReviews)
  function checkNoReviewAndCheckNotOwner(){
  for(let ele of keysToReviews){
    if(thisSpotsReviews[ele]['userId']===thisUser.user.id || thisSpot.ownerId===thisUser.user.id)
    {return false}
    return true
  }
}




  // return (
  //   <div className='daddyOfSingleDetail'>
  //     <h2>{thisSpot.name}</h2>
  //     <div className='cityAndStarsContainer'>
  //       <span className='cityAndStars'>{`${thisSpot.city}, ${thisSpot.state}, ${thisSpot.country}`}</span>
  //     </div>
  //     <div className="fromScatch">
  //       <div className="mainPic">
  //       <img className="respond" src={SpotImages && (SpotImages[0].url)}/></div>


  //       {SpotImages && SpotImages.length > 1 && SpotImages.map((ele) => {
  //           if (ele.id !== SpotImages[0].id) {


  //             return <div className="individSidePiece"><img key={ele.id} src={ele.url} className="sidePiece" alt={`Image ${ele.id}`} /></div>;
  //           }
  //           return null; // Return null for elements that don't meet the condition
  //         })}


  //       {/* <div className="b">b</div>
  //       <div className="c">c</div>
  //       <div className="d">d</div>
  //       <div className="e">e</div> */}
  //     </div>
  //     {/* <div className='detailsPictureBox'>


  //         <img className="respond" src={SpotImages && (SpotImages[0].url)}></img>


  //       <div className="sidePicsContainer">






  //       </div>






  //     </div> */}
  //     <div className="daddyBelow">
  //       <div className='below'>Hosted by, <p>{thisSpot.Owner && (thisSpot.Owner.firstName)} {thisSpot.Owner && (thisSpot.Owner.lastName)}</p></div>
  //       <div className="borderBox"><h2>{`$${thisSpot.price} night`}</h2>
  //         <p>STAR  {thisSpot.avgStarRating}</p>
  //         <p>{thisSpot.numReviews} Reviews </p>
  //         <button type="button">Register</button></div>
  //     </div>






  //   </div>
  // );


  // console.log(console.log('this is all of reviews State', allReviews))
  // console.log('THESE ARE ALL THE REVIEWS', thisSpotsReviews)
  // console.log('THIS IS THE STATEUSER DATA', thisUser)
  // console.log('THIS IS THIS SPOT', thisSpot)
  //thisUser.id will give me id


  // console.log('************** THIS ALL OF REVIEWS NOW',allReviews)
  // console.log('********************* THIS SPOTS REVIEWSNOW',thisSpotsReviews)
  // console.log('*******************this spot reviews index 0 user now',thisSpotsReviews.User)
  return (
    <>
      <div className='daddyOfSingleDetail'>
        <h2>{thisSpot.name}</h2>
        <div className='cityAndStarsContainer'><span className='cityAndStars'>{`${thisSpot.city}, ${thisSpot.state}, ${thisSpot.country}`}</span>  </div></div>


      <div className="mainPicAndDaddyBelowWrapper">
        <div className='detailsPictureBox'>
          <div className="mainPic">
            {SpotImages && SpotImages.map((ele) => {
              if (ele.preview === true) {
                return (<img key={ele.id} src={ele.url} className="respond" alt={`Image ${ele.id}`} />)
              }
            })}
          </div><div className="sidePicsContainer">


            <div className="sidePicsAndDaddyBelowWrapper">
              {SpotImages && SpotImages.length > 1 && SpotImages.map((ele) => {
                if (ele.preview === false) {


                  return <div className="sidePieceHolder"><img key={ele.id} src={ele.url} className="respond" alt={`Image ${ele.id}`} /> </div>;
                }
                return null; // Return null for elements that don't meet the condition
              })}


            </div></div></div>
        <div className="below70percent">
          <div className='below'><h2>Hosted by,{thisSpot.Owner && (thisSpot.Owner.firstName)} {thisSpot.Owner && (thisSpot.Owner.lastName)}</h2></div><div className="descriptionz">
            {thisSpot.description}</div> </div>
        <div className="borderBoxRight">
          <div class="priceStarReview"> <h2 class="inline">{`$${thisSpot.price} night`}</h2> <p class="inline">  {
            thisSpot.numReviews === 0 ? (
              <span>{`STAR  NEW`}</span>
            ) : thisSpot.avgStarRating && Number.isInteger(thisSpot.avgStarRating) ? (
              <span>{`STAR  ${thisSpot.avgStarRating}.0`}</span>
            ) : (
              <span>{`STAR  ${thisSpot.avgStarRating}`}</span>
            )
          }</p>
            <p class="inline">{thisSpot.numReviews} Reviews </p></div>
          <button type="button" class="bigRed">Register</button></div>
      </div>
      <hr class="hrLine"></hr>
      <div className="starAndReviewsForReviews">


        {
          thisSpot.numReviews === 0 ? (
            <span>{`STAR  NEW`}</span>
          ) : thisSpot.avgStarRating && Number.isInteger(thisSpot.avgStarRating) ? (
            <span>{`STAR  ${thisSpot.avgStarRating}.0`}</span>
          ) : (
            <span>{`STAR  ${thisSpot.avgStarRating}`}</span>
          )
        }
        <span>   CNTR DOT</span>  <span>{`${thisSpot.numReviews} reviews`}</span></div>


      {thisUser.user && typeof thisSpotsReviews==="object" &&  checkNoReviewAndCheckNotOwner() && (<h1>
        {/* !thisSpotsReviews.find((ele) => ele.userId === thisUser.user.id) && thisSpot.ownerId !== thisUser.user.id */}
        <OpenModalButton
          buttonText="Post Your Review"
          // onButtonClick={closeMenu}


          modalComponent={<SubmitReviewModal onClose={handleModalClose} spotId={spotId} userId={thisUser.user.userId} objReviews={thisSpotsReviews}
          />
        }
        onClick={handleModalOpen}
        />
      </h1>)}




      {thisSpotsReviews && keysToReviews.length >= 1 && keysToReviews.map((ele) => (


        <div className="eachReview">
          <div className="nameOfReviewer">
            {thisSpotsReviews[ele] && (<h2>{thisSpotsReviews[ele]['User']["firstName"]}</h2>)}
          </div>
          <div className="monthAndDate">
            <h3>{`${thisSpotsReviews[ele]["createdAt"].slice(5, 7)} ${thisSpotsReviews[ele]["createdAt"].slice(0, 4)} `}</h3>
            <p>
              {thisSpotsReviews[ele]["review"]}
            </p>
          </div>
        </div>
      ))}




    </>








  );


}
