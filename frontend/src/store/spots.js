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
export const actionAddSpot = () => ({
  type: ADD_SPOT,
});
export const updateSpot = () => ({
  type: UPDATE_SPOT,
});
export const deleteSpot = () => ({
  type: DELETE_SPOT,
});
export const actionLoadSpot = (spot) => ({
  type: LOAD_SPOT,
  payload: spot
});
export const actionLoadSpots = (spotsFromDB) => ({
  type: LOAD_SPOTS,
  payload: spotsFromDB
})
//thunks

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

export async function ThunkLoadSingle(dispatch,spotId){
  // let realId=parseInt(spotId)
  console.log(spotId)
  const res = await fetch(`/api/spots/${spotId}`);
  if(res.ok) {
    const  Spot  = await res.json(); // { Spots: [] }
    // do the thing with this data
    console.log('Spot is',Spot)
 dispatch(actionLoadSpot(Spot))

}
else {
  dispatch(actionLoadSpot(`ffuuckk`))
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
        let newState={}
        return newState
      }

      // {...state,singleSpot: {...action.payload,Owner:{...action.payload.Owner}}}

    // case ADD_USER: {
    //   return state
    // }
    case UPDATE_SPOT: {
      return state
    }
    // case DELETE_SPOT: {
    //   const newState = { ...state, allSpots:{ ...state.allSpots } }; // -> {allSpots: { 1: {}}, singleSpot: {} }
    //   delete newState.allSpots[action.id] // deleting id 1
    //   return newState
    // }

    default: {
      return state;
    }

  }
}
