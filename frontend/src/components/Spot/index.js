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
  const { SpotImages } = thisSpot;
  const firstMainImage = SpotImages?.find(img => img.preview===true) || {}
  const [mainImage,setMainImage]= useState(firstMainImage?.url)
  const keysToReviews = Object.keys(thisSpotsReviews);
  const keysToReviews2 = [...keysToReviews];
  const [isLoading,setIsLoading]=useState(true)
  const [pic2switch,setPic2Switch]=useState('')
  const [startCarousel,setStartCarousel]=useState(0)

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
       let findPicz= await ThunkLoadSingle(dispatch, spotId);
      await ThunkLoadReviewsBySpotId(dispatch, spotId);
      await setMainImage(findPicz?.SpotImages.find((img => img.preview)))
      setIsLoading(false)
    };

    fetchData();
  }, [dispatch, spotId]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  //so i can reseed

  const handleModalClose = () => {
    setIsModalOpen(false);
  };


  // const handleClickSmallPics=(sidePic)=>{
  //   const ourIndex=SpotImages.findIndex(img => img.id===sidePic.id)
  // }
  function doubleCheck(){
    for (let ele of keysToReviews) {
      if (thisSpotsReviews[ele]['userId'] === thisUser.user.id || thisSpot.ownerId === thisUser.user.id) {
        return false;
      }
      return true;
    }
  }
  function initialCheck() {
    for (let ele of keysToReviews){

    if(thisSpotsReviews[ele]['User']['id'] === thisUser.user.id){return false}
  }
  return true
}
  function checkNoReviewAndCheckNotOwner() {
    if (initialCheck()===false) {return false}
    for (let ele of keysToReviews) {
      if (thisSpot.ownerId === thisUser.user.id) {
        return false;
      }
      return true;
    }
  }
  if (isLoading){
    return null
  }
  else return (
    <>
      <div className='daddyOfSingleDetail'>
        <h2 className="titleOfSingle">{thisSpot.name}</h2>
        <div className='cityAndStarsContainer'><span className='cityAndStars'>{`${thisSpot.city}, ${thisSpot.state}, ${thisSpot.country}`}</span>  </div>
      </div>

      <div className="mainPicAndDaddyBelowWrapper">
        <div className='detailsPictureBox'>
          <div className="mainPic">
             {SpotImages &&  (
              <img src={mainImage?.url} className="respond" alt={`picture of image ${mainImage?.id}`}></img>

             )}
          </div>
          <div className="sidePicsContainer">
            <div className="sidePicsAndDaddyBelowWrapper">
              {SpotImages && SpotImages?.length > 1 && SpotImages.slice(startCarousel,startCarousel+4).map((ele,index) => {
                if (ele.preview === false) {
                  return <div className="sidePieceHolder"><img key={ele.id} id={`sidePic${index}`}src={ele?.url} className="respond" alt={`${ele.id}`} onClick={(e)=>{

                    setMainImage(ele);
                    // SpotImages.push(mainImage)
                    // SpotImages.splice(index,1)

                  }} /> </div>;
                }
                return null;
              })}
            </div>
          </div>
        </div>
        <div>
        <button onClick={(e)=>{
          setStartCarousel(prevStart => SpotImages[prevStart-4]?(prevStart-4):0)
        }} disabled={startCarousel === 0}>Left</button>
        <button onClick={(e)=>{
          setStartCarousel(prevStart => SpotImages[prevStart+4]?(prevStart+4):prevStart)}} disabled={startCarousel + 4 >= SpotImages.length}>Right</button>
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

      {thisUser.user && typeof thisSpotsReviews === "object" && checkNoReviewAndCheckNotOwner()  && (
        <>
          <OpenModalButton
            buttonText="Post Your Review"
            modalComponent={
              <SubmitReviewModal spotId={spotId} userId={thisUser.user.userId} objReviews={thisSpotsReviews} setReloadData={setReloadData} reloadData={reloadData} onClose={handleModalClose} />
            }
            onClick={handleModalOpen}
          />

            {!keysToReviews.length &&(<p>be the first to post a review!</p>)}
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
                modalComponent={<DeleteSpotModal spotsId={ele} ourArray={thisSpotsReviews} actionType={'DELETEAREVIEW'} keysToReviews2={keysToReviews2} setReloadData={setReloadData} onClose={handleModalClose} />}
                onClick={handleModalOpen}
              />
            </>
          )}
        </div>
      ))}
    </>
  );
}
