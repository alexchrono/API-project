import React from 'react';
import { useEffect } from 'react'
import { NavLink, useHistory, Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkLoadSingle } from '../../store/spots';
import './spot.css'



export default function Spot() {
  let { spotId } = useParams()
  const dispatch = useDispatch();
  let thisSpot = useSelector((state) => state.spots.singleSpot)
  useEffect(() => {
    const fetchData = async () => {
      await ThunkLoadSingle(dispatch, spotId);
    };

    fetchData();
  }, [dispatch, spotId]);


  let { SpotImages } = thisSpot


  // return (
  //   <div className='daddyOfSingleDetail'>
  //     <h2>{thisSpot.name}</h2>
  //     <div className='cityAndStarsContainer'>
  //       <span className='cityAndStars'>{`${thisSpot.city}, ${thisSpot.state}, ${thisSpot.country}`}</span>
  //     </div>
  //     <div className="fromScatch">
  //       <div className="mainPic">
  //       <img className="respond" src={SpotImages && (SpotImages[0].url)}/></div>

  //       {SpotImages && SpotImages.length > 1 && SpotImages.map((ele) => {
  //           if (ele.id !== SpotImages[0].id) {

  //             return <div className="individSidePiece"><img key={ele.id} src={ele.url} className="sidePiece" alt={`Image ${ele.id}`} /></div>;
  //           }
  //           return null; // Return null for elements that don't meet the condition
  //         })}

  //       {/* <div className="b">b</div>
  //       <div className="c">c</div>
  //       <div className="d">d</div>
  //       <div className="e">e</div> */}
  //     </div>
  //     {/* <div className='detailsPictureBox'>

  //         <img className="respond" src={SpotImages && (SpotImages[0].url)}></img>

  //       <div className="sidePicsContainer">



  //       </div>



  //     </div> */}
  //     <div className="daddyBelow">
  //       <div className='below'>Hosted by, <p>{thisSpot.Owner && (thisSpot.Owner.firstName)} {thisSpot.Owner && (thisSpot.Owner.lastName)}</p></div>
  //       <div className="borderBox"><h2>{`$${thisSpot.price} night`}</h2>
  //         <p>STAR  {thisSpot.avgStarRating}</p>
  //         <p>{thisSpot.numReviews} Reviews </p>
  //         <button type="button">Register</button></div>
  //     </div>



  //   </div>
  // );




  return (
    <div className='daddyOfSingleDetail'>
      <h2>{thisSpot.name}</h2>
      <div className='cityAndStarsContainer'><span className='cityAndStars'>{`${thisSpot.city}, ${thisSpot.state}, ${thisSpot.country}`}</span>  </div>
      <div className='detailsPictureBox'>
      <div className="mainPic">
         <img className="respond" src={SpotImages &&(SpotImages[0].url)}></img>
      </div>
     <div className="sidePicsContainer">


     {SpotImages && SpotImages.length > 1 && SpotImages.map((ele) => {
   if (ele.id !==SpotImages[0].id) {

    return <div className="sidePieceHolder"><img key={ele.id} src={ele.url} className="respond" alt={`Image ${ele.id}`} /> </div>;
  }
  return null; // Return null for elements that don't meet the condition
  })}
      </div>



      </div>
      <div className="daddyBelow">
      <div className='below'>Hosted by, <p>{thisSpot.Owner &&(thisSpot.Owner.firstName)} {thisSpot.Owner &&(thisSpot.Owner.lastName)}</p></div>
      <div className="borderBox"><h2>{`$${thisSpot.price} night`}</h2>
      <p>STAR  {thisSpot.avgStarRating}</p>
      <p>{thisSpot.numReviews} Reviews </p>
      <button type="button">Register</button></div>
      </div>



    </div>
  );

}
