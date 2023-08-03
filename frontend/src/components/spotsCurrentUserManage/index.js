// frontend/src/components/Navigation/index.js
import React from 'react';
import { useEffect } from 'react'
import { NavLink, useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { getInitialState } from '../../store/spots';
import { ThunkLoadSpotsCurrentUser } from '../../store/spots';
import './currentUser.css'



export default function SpotsCurrentUser() {
  let history = useHistory()
  const dispatch = useDispatch();
  let allTheSpots = useSelector((state) => state.spots.allSpots)
  useEffect(() => {
    const fetchData = async () => {
      await ThunkLoadSpotsCurrentUser(dispatch);
    };

    fetchData();
  }, [dispatch]);


  if (!Array.isArray(allTheSpots)) {
    console.log(`allTheSpotsisnotanArrayitLooksLike`, allTheSpots)
  }
  else if(allTheSpots.length===0){
    return (
      <>
      <Link exact to="/spots/new">Create a New Spot</Link>
      </>
    )
  }
  else {
    return (
      <>
      <h1>Manage Spots</h1>
      <div className='pictureBox'>
        {allTheSpots.map((ele) =>
        (<>
        <Link exact to={`/spots/${ele.id}`} key={ele.id}>
          <div className='daddyOfPics'>
            <div className='imgDiv'>
              <img src={ele.previewImage} className='image2' alt={`Spot ${ele.id}`} />
            </div>
            <div className='nameOfPlace'><h4>{ele.name}</h4>
            </div>
            <div className="cityStateandStars"> <span className='inline'>{`${ele.city}, ${ele.state}`}</span>  {!isNaN(ele.avgRating) ? (<span className='inline'><i class="fa-solid fa-star"></i>{ele.avgRating}</span>) : (<span>New</span>)}
            </div>

            <div className="price"> <p>{`$${ele.price} night`}</p></div></div></Link>
            <div className="buttons"> <Link exact to="/spots/updateAspot"><button type="button" className="updateDelete">Update</button></Link><button type="button" className="updateDelete">Delete</button> </div>
            </>

        ))}
      </div>
      </>


    );

  }
}


/*onClick={(e)=>{
  history.push(`/spots/${ele.id}`)
}} */
