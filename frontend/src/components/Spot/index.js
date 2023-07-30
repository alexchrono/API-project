import React from 'react';
import {useEffect} from 'react'
import { NavLink,useHistory,Link,useParams } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { ThunkLoadSingle } from '../../store/spots';




export default function Spot() {
   let {spotId}= useParams()
  let history= useHistory()
    const dispatch = useDispatch();
    let thisSpot=useSelector((state)=>state.spots)
    useEffect(() => {
      const fetchData = async () => {
        await ThunkLoadSingle(dispatch,spotId);
      };

      fetchData();
    }, [dispatch,spotId]);


//     if(!Array.isArray(allTheSpots)){
//       console.log(`allTheSpotsisnotanArrayitLooksLike`,allTheSpots)
//     }
//     else{
//     return (
//       <>
//       {allTheSpots.map((ele)=>
//         (<><Link exact to={`/spots/${ele.id}`}><div><img key={ele.id} src={ele.previewImage} alt={`Spot ${ele.id}`} />
//         <h4>{ele.name}</h4> {!isNaN(ele.avgRating)? (<p>{ele.avgRating}</p>) :  (<p>New</p>)} <p>{`${ele.price} night`}</p></div></Link></>))}


//       </>
//     );

// }


console.log('this is single',thisSpot)
return (
    <div>
      <h1>TESTING</h1>
    </div>
  );

}
