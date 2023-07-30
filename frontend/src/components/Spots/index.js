// frontend/src/components/Navigation/index.js
import React from 'react';
import {useEffect} from 'react'
import { NavLink,useHistory,Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
// import { getInitialState } from '../../store/spots';
import { ThunkLoad } from '../../store/spots';




export default function Spots() {
  let history= useHistory()
    const dispatch = useDispatch();
    let allTheSpots=useSelector((state)=>state.spots.allSpots)
    useEffect(() => {
      const fetchData = async () => {
        await ThunkLoad(dispatch);
      };

      fetchData();
    }, [dispatch]);


    if(!Array.isArray(allTheSpots)){
      console.log(`allTheSpotsisnotanArrayitLooksLike`,allTheSpots)
    }
    else{
    return (
      <>
      {allTheSpots.map((ele)=>
        (<><Link exact to={`/spots/${ele.id}`}><div><img key={ele.id} src={ele.previewImage} alt={`Spot ${ele.id}`} />
        <h4>{ele.name}</h4> {!isNaN(ele.avgRating)? (<p>{ele.avgRating}</p>) :  (<p>New</p>)} <p>{`${ele.price} night`}</p></div></Link></>))}


      </>
    );

}
}


/*onClick={(e)=>{
  history.push(`/spots/${ele.id}`)
}} */
