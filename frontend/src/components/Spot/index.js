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
    <div>
      <h1>TESTING</h1>
    </div>
  );

}
