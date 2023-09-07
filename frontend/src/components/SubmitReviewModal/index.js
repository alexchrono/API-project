// // frontend/src/components/LoginFormModal/index.js
// import React, { useState } from "react";
// import * as sessionActions from "../../store/session";
// import { useDispatch } from "react-redux";
// import { useModal,setTest } from "../../context/Modal";
// import "./submitReview.css";
// import { ThunkAddReviewBySpotId } from "../../store/reviews";
// import { ThunkEditReviewByReviewId } from "../../store/reviews";
// import {useHistory} from 'react-router-dom'
// function SubmitReviewModal({ spotId, userId, objReviews, setReloadData, reloadData, actionType }) {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const [review, setReview] = useState(actionType === 'EDITAREVIEW' ? 'ALEX YOU ARE A GENIUS' : '');
//   const [stars, setStars] = useState(actionType === 'EDITAREVIEW' ? 3 : '');
//   const [errors, setErrors] = useState({});
//   const { closeModal } = useModal();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});

//     try {
//       const realStars = parseInt(stars);
//       console.log('spotIDis',spotId)
//         const newReview = { review:review, stars: realStars };
//         await ThunkAddReviewBySpotId(newReview, spotId, userId, objReviews, dispatch).then(setReloadData((prevReloadData) => prevReloadData + 1)).then(closeModal())


//     } catch (error) {
//       console.error('Error submitting review:', error);
//       // Handle error and setErrors if needed
//     }
//   };

//   return (
//     <>
//       <h1>How was your stay?</h1>
//       <form onSubmit={handleSubmit}>
//         <textarea
//           value={review}
//           placeholder="Leave your review here..."
//           onChange={(e) => setReview(e.target.value)}
//           required
//         />

//         <input
//           type="number"
//           id="starRate"
//           value={stars}
//           placeholder="Out of 1-5 stars, how many?"
//           onChange={(e) => setStars(e.target.value)}
//           required
//         />
//         <label htmlFor="starRate">Stars</label>

//         <button type="submit" disabled={Object.keys(errors).length > 0}>
//           Submit Your Review
//         </button>
//       </form>
//     </>
//   );
// }

// export default SubmitReviewModal;


// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal,setTest } from "../../context/Modal";
import "./submitReview.css";

import { ThunkAddReviewBySpotId } from "../../store/reviews";
import { ThunkEditReviewByReviewId } from "../../store/reviews";
import {useHistory} from 'react-router-dom'

function SubmitReviewModal({spotId,userId,objReviews,setReloadData,reloadData,actionType,Review,Stars},) {
  const dispatch = useDispatch();
  const history=useHistory()

  const [review, setReview] = useState(actionType === 'EDITAREVIEW' ? Review : '');
  const [stars, setStars] = useState(actionType === 'EDITAREVIEW' ? Stars : '');
  const [errors, setErrors] = useState({});
  const { closeModal,setOnModalClose } = useModal();
  let reviewId=userId

  const handleSubmit = async(e) => {
    e.preventDefault();
    setErrors({});
    let realStars=parseInt(stars)
if(actionType==='EDITAREVIEW'){

console.log(`spotId is`,spotId)
console.log('reviewId is',reviewId)
  // reviewReq,spotId,reviewId,objReviews,dispatch
  return await dispatch(ThunkEditReviewByReviewId({ review, stars: realStars }, spotId, reviewId, objReviews, dispatch)).then(setReloadData(reloadData+1)).then(history.push(`/spots/${spotId}`)).then(closeModal())
}

    else{
return dispatch(ThunkAddReviewBySpotId({ review, stars:realStars },spotId,userId,objReviews,dispatch)).then(setReloadData(reloadData+1)).then(closeModal())}


      // .catch(async (res) => {
      //   const data = await res.json();
      //   if (data && data.errors) {
      //     console.log('we hit the error in submitreviewmodal line 24')
      //     // setErrors(data.errors);
          // return setErrors({
      //     //   Email: 'Email is invalid'
      //     // });
      //   }
      // });

  };

  return (//
    <>
      <h1>How was your stay?</h1>
      <form onSubmit={handleSubmit}>

          <input
            type="text-area"
            value={review}
            placeholder="Leave your review here..."
            onChange={(e) => setReview(e.target.value)}
            required
          />

        {errors.credential && <p>{errors.credential}</p>}

          <input
            type="text"
            id="starRate"
            value={stars}
            placeholder="Out of 1-5 stars, how many?"
            onChange={(e) => setStars(e.target.value)}
            required
          />
          <label htmlFor="starRate">Stars</label>

        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <button type="submit"
        disabled={Object.keys(errors).length>0}>Submit Your Review</button>

      </form>
    </>
  );
}

export default SubmitReviewModal;
