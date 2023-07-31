import React from 'react';
import {useEffect} from 'react'
import { NavLink,useHistory,Link,useParams } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { ThunkLoadSingle } from '../../store/spots';




export default function Spot() {
   let {spotId}= useParams()
    const dispatch = useDispatch();
    let thisSpot=useSelector((state)=>state.spots.singleSpot)
    useEffect(() => {
      const fetchData = async () => {
         await ThunkLoadSingle(dispatch,spotId);
      };

      fetchData();
    }, [dispatch,spotId]);





console.log('this is single',thisSpot)
return (
    <div className='daddyOfSingleDetail'>
      <h2>{thisSpot.name}</h2>
      <div className='cityAndStarsContainer'><span className='cityAndStars'>{`${thisSpot.city}, ${thisSpot.state}, ${thisSpot.country}`}</span>  </div>
      <div className='detailsPictureBox'>
      <div className="mainPic">
        <img src={thisSpot.SpotImages[0].url}></img>
      </div>
      <div className="sidePics">
        
      </div>



      </div>


    </div>
  );

}
