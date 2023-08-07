// frontend/src/components/Navigation/index.js
import React from 'react';
import { useEffect } from 'react'
import { NavLink, useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { getInitialState } from '../../store/spots';
import { ThunkLoad } from '../../store/spots';
import './spots.css'



export default function Spots() {
  let history = useHistory()
  const dispatch = useDispatch();
  let allTheSpots = useSelector((state) => state.spots.allSpots)
  useEffect(() => {
    const fetchData = async () => {
      await ThunkLoad(dispatch);
    };

    fetchData();
  }, [dispatch]);


  if (!Array.isArray(allTheSpots)) {
    console.log(`allTheSpotsisnotanArrayitLooksLike`, allTheSpots)
  }
  else {
    return (

      <div className='pictureBox'>
        {allTheSpots.map((ele) =>
        (
          <div className='daddyOfPics'>
          <Link exact to={`/spots/${ele.id}`} key={ele.id}>
            <div className='imgDiv toolTip'>
              <img src={ele.previewImage} className='image2' alt={`Spot ${ele.id}`} />

            <span className='tooltiptext'>{ele.name}</span>
            </div>
            <div className="cityStateandStars"> <span className='inline'>{`${ele.city}, ${ele.state}`}</span>  {!isNaN(ele.avgRating) ? (<span className='inline'><i class="fa-solid fa-star"></i>{ele.avgRating}</span>) : (<span>New</span>)}
            </div>
            <div className="price"> <p>{`$${ele.price} night`}</p>
            </div>
            </Link>
          </div>
        ))}
      </div>


    );

  }
}


/*onClick={(e)=>{
  history.push(`/spots/${ele.id}`)
}} */
