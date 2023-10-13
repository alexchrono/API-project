
import React from 'react';
import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkLoad } from '../../store/spots';
import './spots.css'



export default function Spots() {
  const dispatch = useDispatch();
  let allTheSpots = useSelector((state) => state.spots.allSpots)
  useEffect(() => {
    const fetchData = async () => {
      await ThunkLoad(dispatch);
    };

    fetchData();
  }, [dispatch]);


  if (!Array.isArray(allTheSpots)) {
    return null
  }
  else {
    return (

      <div className='pictureBox'>
        {allTheSpots.map((ele) =>
        (

          <div className='daddyOfPics'>

            <Link exact to={`/spots/${ele.id}`} className="link" key={ele.id}>
              <div className='imgDiv toolTip'>
                <img src={`${process.env.PUBLIC_URL}${ele.previewImage}`} className='image2' alt={`Spot ${ele.id}`} />
                <span className='tooltiptext'>{ele.name}</span>
              </div>
              <div className="cityStateandStars fancyText"> <span className='inlineCity'>{`${ele.city}, ${ele.state}`}</span>  {!isNaN(ele.avgRating) ? (<span className='inline'><span className="material-symbols-outlined">
                grade</span>{ele.avgRating.toFixed(1)}</span>) : (<span className="fancyText">New</span>)}
              </div>
              <div className="price fancyText"> <p className="left">{`$${ele.price} night`}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>


    );

  }
}
