import { useDispatch } from 'react-redux';
import {useParams} from 'react-router-dom'
import {useEffect, useState } from 'react';
import {csrfFetch} from '../store/csrf'

// 1. types -they must be UNIQUE
//CRUD - Create, Read, Update, Delete

const ADD_REVIEW_BY_SPOT_ID = 'session/create_review_by_spotId';
const LOAD_REVIEWS_BY_SPOTID = 'session/load_reviewsBySpotId'; //read. // GET spots/
// const ADD_SPOT = 'session/add_spot'; //create
// const UPDATE_SPOT = 'session/update_spot';
// const DELETE_SPOT = 'session/delete_spot';
// const LOAD_SPOT = 'session/load_spot'; // GET spots/:spotId

// export const getInitialState = async () => {
//   try {
//     const response = await fetch('https://api-project-auth-me.onrender.com/backend/routes/api/spots');
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const data = await response.json(); // Extract the data from the JSON response
//     return data.Spots; // Extract the 'Spots' data from the response and return it
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return []; // Return an empty array or any default value in case of an error
//   }
// };
// export const YourComponent = () => {
//   const dispatch = useDispatch();
//   const [isLoading, setIsLoading] = useState(true); // State to track whether data is being fetched

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const spotsFromDB = await ThunkLoad();
//         dispatch(actionLoadSpots(spotsFromDB));
//         setIsLoading(false); // Data fetched, set isLoading to false
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setIsLoading(false); // Handle error state by setting isLoading to false
//       }
//     };

//     fetchData();
//   }, [dispatch]);

//   return (
//     <>
//       {isLoading ? (
//         <p>Loading...</p> // Show loading state while data is being fetched
//       ) : (
//         <div>
//           {}
//         </div>
//       )}
//     </>
//   );
// };




// 2. action creator
// export const createSpot = () => ({
//   type: CREATE_SPOT,
// });
// export const loadSpots = (spots) => ({
//   type: LOAD_SPOTS,
//   payload:spots
// });
export const actionAddReviewBySpotId = (Review,objReviews) => ({
  type: ADD_REVIEW_BY_SPOT_ID,
  payload: {Review,objReviews}
});
// export const updateSpot = () => ({
//   type: UPDATE_SPOT,
// });
// export const deleteSpot = () => ({
//   type: DELETE_SPOT,
// });
// export const actionLoadSpot = (spot) => ({
//   type: LOAD_SPOT,
//   payload: spot
// });
export const actionLoadReviewsBySpotId = (Reviews) => ({
  type: LOAD_REVIEWS_BY_SPOTID,
  payload: Reviews
})
//thunks

export async function ThunkLoadReviewsBySpotId(dispatch,spotId){
  console.log('hit my thunk with spotId value of',spotId)
  const res = await fetch(`/api/spots/${spotId}/reviews`);

  if(res.ok) {
    const  {Reviews}  = await res.json();
    console.log('reviews is',Reviews)

dispatch(actionLoadReviewsBySpotId(Reviews))

  } else {
    const errors = await res.json();
    console.error('Error fetching data:', errors);
  }
}

// export async function ThunkLoadSingle(dispatch,spotId){
//   // let realId=parseInt(spotId)

//   console.log(spotId)
//   const res = await fetch(`/api/spots/${spotId}`);
//   if(res.ok) {
//     const  Spot  = await res.json(); // { Spots: [] }
//     // do the thing with this data
//     console.log('single Spot loaded is',Spot)
//  dispatch(actionLoadSpot(Spot))

// }
// else {
//   dispatch(actionLoadSpot(`ffuuckk`))
// }
// }

export const  ThunkAddReviewBySpotId= (reviewReq,spotId,userId,objReviews)=>async(dispatch)=>{
  // let realId=parseInt(spotId)
  try{


    console.log('this is newReview in thunkAddSpot',reviewReq)
    console.log('this is our spotId',spotId)
    console.log('this is objReviewsInOurThunk',objReviews)
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'},
      body: JSON.stringify(reviewReq)
  });
  if(res.ok) {
    const  Review  = await res.json(); // { Spots: [] }
    // do the thing with this data
    console.log('Review added is',Review)




    dispatch(actionAddReviewBySpotId(Review,objReviews))








    return Review






}








  }
 catch (error) {
  throw error;
 }




}

// export const ThunkAddNewSpot=(dispatch,body)=>async dispatch =>{

//   const res = await fetch("/api/spots",{
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(body)
//   });

//   if(res.ok) {
//     const  {Spots}  = await res.json();
//     console.log('spots is',Spots)
// dispatch(actionLoadSpots(Spots))

//   } else {
//     const errors = await res.json();
//     console.error('Error fetching data:', errors);
//   }

// 3. reducer - always return an object
let initialState={spot:{},user:{}}
export default function reviewsReducer(state=initialState, action) {
  switch (action.type) {
    case LOAD_REVIEWS_BY_SPOTID: {
      let returnObj={}
      action.payload.forEach((ele)=>{


        returnObj[ele.id]={
          userId:ele.userId,
          spotId:ele.spotId,
          review:ele.review,
          stars:ele.stars,
          createdAt:ele.createdAt,
          updatedAt:ele.updatedAt,
          User: ele.User,
          ReviewImages:ele.ReviewImages,
        }
      })
      let newState={...state,spot:returnObj}


        // let newState={...state,spot:action.payload}
      return newState
    }
    case ADD_REVIEW_BY_SPOT_ID: {


      let {Review,objReviews}=action.payload
      console.log('inside of our reducer')
      console.log('review is just ',Review)
      console.log('objReviews is',objReviews)
      let returnObj={}
      let review=objReviews
      let keysToThis=Object.keys(objReviews)
      let UserObject={...returnObj[review.id]["User"]}
      let ReviewImagesArray=[...returnObj[review.id]["ReviewImages"]]
        returnObj[review.id]={
          userId:review.userId,
          spotId:review.spotId,
          review:review.review,
          stars:review.stars,
          createdAt:review.createdAt,
          updatedAt:review.updatedAt,
          User: UserObject,
          ReviewImages:ReviewImagesArray,


      }
      let newVar=JSON.stringify(objReviews)
      let newVar2=JSON.parse(newVar)
      let newState={...state,spot: {...newVar2,returnObj}}
      console.log('NEWSTATE IN OUR REVIEW THUNK IS',newState)
      return newState
    }
    // case LOAD_SPOTS: {
    //   let newState={...state,
    //     allSpots: action.payload,}
    //   return newState
    // }
    // case LOAD_SPOT: {
    //   let newState={...state,
    //     singleSpot: action.payload}
    //   return newState
    //   }
    //   case ADD_SPOT: {
    //     let allPrevSpots=state.allSpots
    //     let ourId=action.payload.id
    //     let newState={...state,
    //     allSpots: {...allPrevSpots,[ourId]:action.payload}}
    //     return newState
    //   }


    //   // {...state,singleSpot: {...action.payload,Owner:{...action.payload.Owner}}}


    // // case ADD_USER: {
    // //   return state
    // // }
    // case UPDATE_SPOT: {
    //   return state
    // }
    // // case DELETE_SPOT: {
    // //   const newState = { ...state, allSpots:{ ...state.allSpots } }; // -> {allSpots: { 1: {}}, singleSpot: {} }
    // //   delete newState.allSpots[action.id] // deleting id 1
    // //   return newState
    // // }


    default: {
      return state;
    }


  }

}
