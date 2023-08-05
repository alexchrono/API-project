// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./submitReview.css";
import { ThunkAddReviewBySpotId } from "../../store/reviews";

function SubmitReviewModal({spotId,userId,objReviews},) {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();


  const handleSubmit = async(e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(ThunkAddReviewBySpotId({ review, stars },spotId,userId,objReviews))
      closeModal()
      // .catch(async (res) => {
      //   const data = await res.json();
      //   if (data && data.errors) {
      //     console.log('we hit the error in submitreviewmodal line 24')
      //     // setErrors(data.errors);
      //     // return setErrors({
      //     //   Email: 'Email is invalid'
      //     // });
      //   }
      // });

  };

  return (
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
