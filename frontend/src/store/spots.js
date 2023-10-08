import { useDispatch } from "react-redux";
import {useParams} from 'react-router-dom'
import {useEffect, useState } from 'react';
import {csrfFetch} from '../store/csrf'

// 1. types -they must be UNIQUE
//CRUD - Create, Read, Update, Delete

const CREATE_SPOT = 'session/create_spot';
const LOAD_SPOTS = 'session/load_spots'; //read. // GET spots/
const ADD_SPOT = 'session/add_spot'; //create
const UPDATE_SPOT = 'session/update_spot';
const DELETE_SPOT = 'session/delete_spot';
const LOAD_SPOT = 'session/load_spot'; // GET spots/:spotId
const LOAD_SPOTS_CURRENT_USER = 'session/load_spots/current_user';


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
export const createSpot = () => ({
  type: CREATE_SPOT,
});
export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  payload:spots
});
export const actionAddSpot = (newSpot) => ({
  type: ADD_SPOT,
  payload: newSpot
});
export const actionUpdateSpot = (editedSpot,arrayImages) => ({
  type: UPDATE_SPOT,
  payload: {editedSpot,arrayImages}
});
export const actionDeleteSpot = (ourArray) => ({
  type: DELETE_SPOT,
  payload: ourArray
});
export const actionLoadSpot = (spot) => ({
  type: LOAD_SPOT,
  payload: spot
});


export const actionLoadSpots = (spotsFromDB) => ({
  type: LOAD_SPOTS,
  payload: spotsFromDB
})

export const actionLoadSpotsCurrentUser = (spotsOfCurrentUser) => ({
  type: LOAD_SPOTS_CURRENT_USER,
  payload: spotsOfCurrentUser
})




//thunks

export async function ThunkLoadSpotsCurrentUser(dispatch){

  const res = await csrfFetch("/api/spots/current");
  console.log('this is current res',res)
  if(res.ok) {
    const  ourJam  = await res.json();
    console.log('ourJamis',ourJam)
    dispatch(actionLoadSpotsCurrentUser(ourJam))

  } else {
    const errors = await res.json();
    console.error('Error fetching data:', errors);
  }
}

export async function ThunkLoadSingle(dispatch,spotId){
  // let realId=parseInt(spotId)

  console.log(spotId)
  const res = await fetch(`/api/spots/${spotId}`);
  if(res.ok) {
    const  Spot  = await res.json(); // { Spots: [] }
    // do the thing with this data
    console.log('single Spot loaded is',Spot)
 await dispatch(actionLoadSpot(Spot))
 return Spot

}
else {
  dispatch(actionLoadSpot(`ffuuckk`))
}
}


export async function ThunkLoad(dispatch){

  const res = await fetch("/api/spots");

  if(res.ok) {
    const  {Spots}  = await res.json();
    console.log('spots is',Spots)
dispatch(actionLoadSpots(Spots))

  } else {
    const errors = await res.json();
    console.error('Error fetching data:', errors);
  }
}

//i JUST COMMENTED BELOW ONE OUT LEMME KNOW IF PROBLEM
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


export const  ThunkEditASpot= (newSpot,arrayImages,spotId)=>async(dispatch)=>{
  // let realId=parseInt(spotId)
  try{
  const res = await csrfFetch(`/api/spots/${spotId}`,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'},
      body: JSON.stringify(newSpot)
  });
  if(res.ok) {
    const  Spot  = await res.json(); // { Spots: [] }
    // do the thing with this data
    console.log('Spot added is',Spot)
    console.log('this is arrayImages',arrayImages)
    let newArray=[]

    // for (let i=0;i<arrayImages.length;i++){
    //   let newObj={}

    // }
    for (let ele of arrayImages){
      console.log('this is ele of arrayImages',ele)
    let res2 = await csrfFetch(`/api/spots/${Spot.id}/images`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'},
        body: JSON.stringify(ele)
    });
    if(!res2.ok){
      console.log('problem adding pics dawg line 150 spots.js')
    }



  }



    return actionUpdateSpot(Spot,arrayImages)



}




  }
 catch (error) {
  throw error;
 }


}






export const ThunkDeleteAspot= (dispatch,spotsId,ourArray)=>async(dispatch)=>{
  console.log('am I even in my thunk')
  const res = await csrfFetch(`/api/spots/${spotsId}`,{
    method: 'DELETE'});
  if(res.ok) {
    let newArray=ourArray.filter((ele)=>ele.id!==spotsId)

dispatch(actionDeleteSpot(newArray))


} else {
  const errors = await res.json();
  console.error('Error fetching data:', errors);
}
}

export const  ThunkAddSpot= (newSpot,arrayImages)=>async(dispatch)=>{
  // let realId=parseInt(spotId)
  try{
    console.log('this is newSpot in thunkAddSpot',newSpot)
  const res = await csrfFetch(`/api/spots`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'},
      body: JSON.stringify(newSpot)
  });
  if(res.ok) {
    const  Spot  = await res.json(); // { Spots: [] }
    // do the thing with this data
    console.log('Spot added is',Spot)
    console.log('this is arrayImages',arrayImages)
    let newArray=[]

    // for (let i=0;i<arrayImages.length;i++){
    //   let newObj={}

    // }
    for (let ele of arrayImages){
      console.log('this is ele of arrayImages',ele)
    let res2 = await csrfFetch(`/api/spots/${Spot.id}/images`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'},
        body: JSON.stringify(ele)
    });
    if(!res2.ok){
      console.log('problem adding pics dawg line 150 spots.js')
    }



  }



    return Spot



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
let initialState={allSpots:{},singleSpot:{}}
export default function spotReducer(state=initialState, action) {
  switch (action.type) {
    case CREATE_SPOT: {
      return state
    }
    case LOAD_SPOTS_CURRENT_USER: {
      let newState={...state,
        allSpots: action.payload.spots,}
      return newState
    }
    case LOAD_SPOTS: {
      let newState={...state,
        allSpots: action.payload,}
      return newState
    }
    case LOAD_SPOT: {
      let newState={...state,
        singleSpot: action.payload}
      return newState
      }
      case ADD_SPOT: {
        let allPrevSpots=state.allSpots
        let ourId=action.payload.id
        let {newSpot,arrayImages}=action.payload
        newSpot.SpotImages=arrayImages

        let newState={...state,
        singleSpot: newSpot}
        return newState
      }

      // {...state,singleSpot: {...action.payload,Owner:{...action.payload.Owner}}}

    // case ADD_USER: {
    //   return state
    // }
    case UPDATE_SPOT: {
      let {editedSpot,arrayImages}=action.payload
      editedSpot.SpotImages=arrayImages
      let newState={...state,
        singleSpot: editedSpot}
        return newState

    }
    case DELETE_SPOT: {
      let newState={...state,
        allSpots: action.payload,}
      return newState

    }

    default: {
      return state;
    }

  }
}
