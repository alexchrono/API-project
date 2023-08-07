// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

import "./deleteSpot.css";
import { ThunkDeleteAspot } from "../../store/spots";
import { ThunkDeleteAreview } from "../../store/reviews";
import './deleteSpot.css'
function DeleteSpotModal({spotsId,ourArray,actionType,keysToReviews2,setReloadData}) {
    const { closeModal } = useModal();
  const dispatch = useDispatch();
  console.log('INSIDE OF OUR MODAL keysToReview2 is',keysToReviews2)
  console.log('array is',ourArray)
  console.log('spotId is',spotsId)
//   const [credential, setCredential] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const { closeModal } = useModal();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setErrors({});
//     return dispatch(sessionActions.login({ credential, password }))
//       .then(closeModal)
//       .catch(async (res) => {
//         const data = await res.json();
//         if (data && data.errors) {
//           setErrors(data.errors);
//           return setErrors({
//             Email: 'Email is invalid'
//           });
//         }
//       });

//   };

  return (
    <>
      <h1>Confirm Delete</h1>
      {actionType==='DELETEASPOT' && (<p>Are you sure you want to remove this spot?</p>)}
      {actionType==='DELETEAREVIEW' && (<p>Are you sure you want to delete this review?</p>)}
      {/* <form onSubmit={handleSubmit}> */}
        {/* <label>
          Username or Email */}
          {/* <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        {errors.credential && <p>{errors.credential}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label> */}
        {/* {errors.credential && (
          <p>{errors.credential}</p>
        )} */}

        {actionType==='DELETEASPOT' &&(<div><button type="button" onClick={async (e)=>{
   await dispatch(ThunkDeleteAspot(dispatch,spotsId,ourArray))
   closeModal()
}}


        >Yes</button>     <button type="button" onClick={async (e)=>{

          closeModal()

// return await ThunkDeleteAspot();
// return dispatch(sessionActions.login({ credential, password }))
// .then(closeModal)

}}>No</button> </div>)}
{actionType==='DELETEAREVIEW' &&(<div><button type="button" onClick={async (e)=>{
   await dispatch(ThunkDeleteAreview(dispatch,spotsId,ourArray,keysToReviews2))
   function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  let randomNum = getRandomInt(1, 99)
   setReloadData(randomNum)
   closeModal()
}}


        >Yes (Delete Review)</button>

        <button type="button" onClick={async (e)=>{

          closeModal()

// return await ThunkDeleteAspot();
// return dispatch(sessionActions.login({ credential, password }))
// .then(closeModal)

}}>No (Keep Review)</button> </div>)}

      {/* </form> */}
    </>
  );
}

export default DeleteSpotModal;
