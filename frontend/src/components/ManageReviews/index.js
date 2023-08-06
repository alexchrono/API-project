import React from 'react';
import { useEffect } from 'react'
import { NavLink, useHistory, Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkLoadSingle } from '../../store/spots';
import { ThunkLoadReviewsBySpotId } from '../../store/reviews';
import OpenModalButton from '../OpenModalButton';
import './spot.css'
import SubmitReviewModal from '../SubmitReviewModal';
import DeleteSpotModal from '../DeleteSpotModal';






export default function Spot() {
  let { spotId } = useParams()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch();
  let thisSpot = useSelector((state) => state.spots.singleSpot)
  let allReviews = useSelector((state) => state.reviews)
  let thisSpotsReviews = useSelector((state) => state.reviews.spot)
  let thisUser = useSelector((state) => state.session)
  let actionType="DELETEAREVIEW"

  useEffect(() => {
    const fetchData = async () => {
      await ThunkLoadSingle(dispatch, spotId);
      // console.log('aboveTHunkLoadReviews with spotId value of', spotId)
      await ThunkLoadReviewsBySpotId(dispatch, spotId)
    };


    fetchData();
  }, [dispatch, spotId]);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };


  const handleModalClose = () => {
    setIsModalOpen(false);
  };


  let { SpotImages } = thisSpot



}
