import { useDispatch } from 'react-redux';
import {useParams} from 'react-router-dom'
import {useEffect, useState } from 'react';
import {csrfFetch} from '../store/csrf'

// 1. types -they must be UNIQUE
//CRUD - Create, Read, Update, Delete

const ADD_REVIEW_BY_SPOT_ID = 'session/create_review_by_spotId';
const LOAD_REVIEWS_BY_SPOTID = 'session/load_reviewsBySpotId'; //read. // GET spots/
const DELETE_REVIEW_BY_ID = 'session/delete_review_by_id'
const LOAD_REVIEWS_BY_USERID = 'session/load_reviewsByuserId/user'
const EDIT_REVIEWS_BY_REVIEW_ID='whateverYouWANTmanIjustNeedaWorkOnCss'
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


export const actionDeleteReviewById=(newObject)=>({
  type: DELETE_REVIEW_BY_ID,
  payload: newObject
})

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

export const actionLoadReviewsByUserId = (Reviews) => ({
  type: LOAD_REVIEWS_BY_USERID,
  payload: Reviews
})
export const actionLoadReviewsBySpotId = (Reviews) => ({
  type: LOAD_REVIEWS_BY_SPOTID,
  payload: Reviews
})

export const actionEditReviewByReviewId = (Review,objReviews) => ({
  type: EDIT_REVIEWS_BY_REVIEW_ID,
  payload: {Review,objReviews}
})


//thunks
export const ThunkDeleteAreview=(dispatch,reviewsId,reviewsObj,keysToReviews2)=>async(dispatch)=>{
  console.log('am I even in my thunk')
  const res = await csrfFetch(`/api/reviews/${reviewsId}`,{
    method: 'DELETE'});
  if(res.ok) {

//     let newArray=ourArray.filter((ele)=>ele.id!==spotsId)
console.log('newList is',keysToReviews2)
// return(actionDeleteSpot(newArray))
let newReviewsId=reviewsId.toString()
let newList=keysToReviews2.filter((ele)=>ele!==newReviewsId)
let newObject={}
newList.forEach((ele)=>{
  let nestedUser=reviewsObj[ele]["User"]
  let nestedReviewImages=reviewsObj[ele]["ReviewImages"]
  newObject[ele]=reviewsObj[ele]
  newObject[ele]["User"]={...nestedUser}
  newObject[ele]["ReviewImages"]=[...nestedReviewImages]
})

dispatch(actionDeleteReviewById(newObject))
} else {
  const errors = await res.json();
  console.error('Error fetching data:', errors);
}
}
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

export async function ThunkLoadReviewsByUserId(dispatch,spotId){

  const res = await csrfFetch(`/api/reviews/current`,{
    method: 'GET'})

  if(res.ok) {
    const  {Reviews}  = await res.json();
    console.log('reviews is',Reviews)

dispatch(actionLoadReviewsByUserId(Reviews))

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
export async function ThunkEditReviewByReviewId(reviewReq,spotId,userId,objReviews,dispatch){

  try{
    console.log('8888888888888888888firstReviewIdis',spotId)
    console.log('************IM IN MY EDIT REVIEWS THUNK THUNK')
    console.log('reviewReqis',reviewReq)
    console.log('objReviews is',objReviews)
  // console.log('this is newReview in thunkAddSpot',reviewReq)
  // console.log('this is our spotId',spotId)
  // console.log('this is objReviewsInOurThunk',objReviews)
const res = await csrfFetch(`/api/reviews/${spotId}`,{
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'},
    body: JSON.stringify(reviewReq)
});
if(res.ok) {
  const  Review  = await res.json(); // { Spots: [] }
  // do the thing with this data
  console.log('Review added is',Review)

  dispatch(actionEditReviewByReviewId(Review,objReviews))

}

}
catch (error) {
console.log('WE HIT AN ERROR WHILE TRYING TO EDIT DAWG')

}

}
export const  ThunkAddReviewBySpotId= (reviewReq,spotId,userId,objReviews,dispatch)=>async(dispatch)=>{
  // let realId=parseInt(spotId)
  try{

      console.log('************IM IN MY THUNK')
    // console.log('this is newReview in thunkAddSpot',reviewReq)
    // console.log('this is our spotId',spotId)
    // console.log('this is objReviewsInOurThunk',objReviews)
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




    return actionAddReviewBySpotId(Review,objReviews)












}








  }
 catch (error) {
  console.log(error)
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
    case EDIT_REVIEWS_BY_REVIEW_ID: {


      let {Review,objReviews}=action.payload
      console.log('inside of our reducer')
      console.log('review is just ',Review)
      console.log('objReviews is',objReviews)
      let returnObj={}
      let review=objReviews
      let ourId=Review.id
      let keysToThis=Object.keys(objReviews.spot)
      let UserObject=Review.User
      let ReviewImagesArray=Review["ReviewImages"]
        returnObj={
          userId: Review.userId,
          spotId: Review.spotId,
          review: Review.review,
          stars: Review.stars,
          createdAt: Review.createdAt,
          updatedAt: Review.updatedAt,
          User: UserObject,
          ReviewImages:ReviewImagesArray,


      }
      let newVar=JSON.stringify(objReviews)
      let newVar2=JSON.parse(newVar)
      let newState={...state,user: {...objReviews,ourId:returnObj}}
      console.log('NEWSTATE IN OUR REVIEW THUNK IS',newState)
      return newState
    }
    case LOAD_REVIEWS_BY_USERID: {
      let returnObj={}
      let ourBoy=action.payload

      ourBoy.forEach((ele)=>{


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
      let newState={...state,user:returnObj}


        // let newState={...state,spot:action.payload}
      return newState
    }
    case DELETE_REVIEW_BY_ID: {
      let newState={...state,spot: action.payload}
      return newState
    }
    case ADD_REVIEW_BY_SPOT_ID: {


      let {Review,objReviews}=action.payload
      console.log('inside of our reducer')
      console.log('review is just ',Review)
      console.log('objReviews is',objReviews)
      let returnObj={}
      let review=objReviews
      let ourId=Review.id
      let keysToThis=Object.keys(objReviews)
      let UserObject=Review.User
      let ReviewImagesArray=Review["ReviewImages"]
        returnObj={
          userId: Review.userId,
          spotId: Review.spotId,
          review: Review.review,
          stars: Review.stars,
          createdAt: Review.createdAt,
          updatedAt: Review.updatedAt,
          User: UserObject,
          ReviewImages:ReviewImagesArray,


      }
      let newVar=JSON.stringify(objReviews)
      let newVar2=JSON.parse(newVar)
      let newState={...state,spot: {ourId:returnObj,...objReviews}}
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
