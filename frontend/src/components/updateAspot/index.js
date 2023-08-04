import React from 'react';
import {useEffect} from 'react'
import { NavLink,useHistory,Link,useParams } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {useState} from 'react'
import './updateASpot.css'
import { ThunkAddSpot } from '../../store/spots';
import { ThunkLoadSingle } from '../../store/spots';
import { ThunkEditASpot } from '../../store/spots';



export default function UpdateASpot() {
let {spotId}=useParams()
const [country,setCountry]=useState("")
const [streetAddress,setStreetAddress]=useState("")
const [city,setCity]=useState("")
const [state,setState]=useState("")
const [latitude,setLatitude]=useState("")
const [longitude,setLongitude]=useState("")
const [description,setDescription]=useState("")
const [name,setName]=useState("")
const [price,setPrice]=useState("")
const [pic1,setPic1]=useState("")
const [pic2,setPic2]=useState("")
const [pic3,setPic3]=useState("")
const [pic4,setPic4]=useState("")
const [pic5,setPic5]=useState("")
const [errors, setErrors] = useState({});
const dispatch = useDispatch();
const history=useHistory()
let thisSpot = useSelector((state) => state.spots.singleSpot)
let arrayImages=[]
const fetchData2= async() =>{
    let spot=await dispatch(ThunkEditASpot(newSpot,firstImage));
}
useEffect(()=>{
    const fetchData = async () => {
        await ThunkLoadSingle(dispatch, spotId);
        // await ThunkLoadReviewsBySpotId(dispatch,spotId)
      };
      fetchData()
},[dispatch,spotId])

//   const fetchData = async (newSpot) => {



//     let spot=await dispatch(ThunkLoadSingle(newSpot,arrayImages));




//     history.push(`/spots/${spot.id}`)
//     return spot
//   };





// let { SpotImages } = thisSpot

const handleSubmit = async(e) => {
    e.preventDefault();

      setErrors({});
      let newData={
        address:streetAddress,
        city,
        state,
        country,
        lat: latitude,
        lng: longitude,
        name,
        description,
        price
      }
      let firstImage=[]
      if(pic1!==""){
        firstImage.push({url:pic1,
        preview: true,})
      }
      if(pic2!==""){
        firstImage.push({url:pic2,
        preview: false,})
      }
      if(pic3!==""){
        firstImage.push({url:pic3,
        preview: false,})
      }
      if(pic4!==""){
        firstImage.push({url:pic4,
        preview: false,})
      }
      if(pic5!==""){
        firstImage.push({url:pic5,
        preview: false,})
      }
      console.log('this is firstImage',firstImage)



      try {let spot=await fetchData2(newData, firstImage);
        history.push(`/spots/${spot.id}`);
      } catch (error) {
        let realErrors=await error.json()
        if(pic1 !==""){
        await setErrors(realErrors.errors)}
        else if(pic1===""){
          await setErrors({...realErrors.errors,prevImage:"A preview Image is required."})
        }
        console.log('errors state is now',errors)
      }


          // const data = await res.json();
          // if (data && data.errors) {
          //   setErrors(data.errors);
          // }




          //this code from loginformModal
          // return dispatch(sessionActions.login({ credential, password }))
      //     .then(closeModal)
      // .catch(async (res) => {
      //   const data = await res.json();
      //   if (data && data.errors) {
      //     setErrors(data.errors);
      //     return setErrors({
      //       Email: 'Email is invalid'
      //     });



  };
  console.log('thisSpotIs',thisSpot)

  return (
    <>
    <div className='inputBox'>

      <h1 className="title">Update your Spot</h1>
      <form onSubmit={handleSubmit}>
      <div>
        <h4>Where's your place located?</h4>
        <p>Guests will only get your exact address once they booked a reservation.</p>
        <label htmlFor="Country">Country</label>
        <input
        id="Country"
          type='text'
          onChange={(e) => setCountry(e.target.value)}
          value={thisSpot.country}
          placeholder='Country'
        //   name='title'
        />
        {errors.country &&(<p class="error">{errors.country}</p>)}
        </div>
        <div>
        <label htmlFor="streetAddy">Address</label>
        <input
         id="streetAddy"
          type='text'
          onChange={(e) => setStreetAddress(e.target.value)}
          value={thisSpot.address}
          placeholder='Address'
        //   name='imageUrl'
        />
        {errors.address && <p class="error">{errors.address}</p>}
        </div>
        <div>
        <label htmlFor="city">City</label>
        <input
         id="city"
          type='text'
          onChange={(e) => setCity(e.target.value)}
          value={thisSpot.city}
          placeholder='City'
        //   name='imageUrl'
        />
        {errors.city &&(<p class="error">{errors.city}</p>)}
        <label htmlFor="state">State</label>
           <input
            id="state"
          type='text'
          onChange={(e) => setState(e.target.value)}
          value={thisSpot.state}
          placeholder='STATE'
        //   name='imageUrl'
        />
        {errors.state &&(<p class="error">{errors.state}</p>)}
</div>




        <div>
        <label htmlFor="lat"> Latitude</label>
          <input
           id="lat"
          type='text'
          onChange={(e) => setLatitude(e.target.value)}
          value={thisSpot.lat}
          placeholder='LATITUDE'
        //   name='imageUrl'
        />
        {errors.lat &&(<p class="error">{errors.lat}</p>)}
        <label htmlFor="long">Longitude</label>
          <input
           id="long"
          type='text'
          onChange={(e) => setLongitude(e.target.value)}
          value={thisSpot.lng}
          placeholder='LONGITUDE'
        //   name='imageUrl'
        />
        {errors.lng &&(<p class="error">{errors.lng}</p>)}

        </div>
        <div>
        <h4>Describe your place to guests</h4>
        <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood		</p></div>
        <div>
        <textarea
          value={thisSpot.description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Please write at least 30 characters"
          rows='10'
        ></textarea>
        {errors.description &&(<p class="error">{errors.description}</p>)}
        </div>
        <div>
        <h4>Create a title for your spot</h4>
        <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
          <input
          type='text'
          onChange={(e) => setName(e.target.value)}
          value={thisSpot.name}
          placeholder='Name of your spot'
        //   name='imageUrl'
        />
        {errors.name &&(<p class="error">{errors.name}</p>)}
        </div>
        <div>
            <h4>Set a base price for your spot</h4>
            <p>Competitive pricing can help your listing stand out and rank higher in search results</p>
          <input
          type='number'
          step="0.01"
          min="0"
          onChange={(e) => setPrice(e.target.value)}
          value={thisSpot.price}
          placeholder='Price per night (USD)'
        //   name='imageUrl'
        />
        {errors.price && <p class="error">{errors.price}</p>}
        </div>
        <div>
          <h4>Liven up your spot with photos</h4>
          <p>Submit a link to at least one photo to publish your spot</p>
          <input
          type='text'
          onChange={(e) => setPic1(e.target.value)}
          value={thisSpot.SpotImages && thisSpot.SpotImages[thisSpot.SpotImages.length-1] && thisSpot.SpotImages[thisSpot.SpotImages.length-1].preview===true && (thisSpot.SpotImages[0].url)}
          placeholder='Preview Image URL'

        />
        {errors.prevImage && <p class="error">{errors.prevImage}</p>}
</div>
<div>
         <input
          type='text'
          onChange={(e) => setPic2(e.target.value)}
          value={thisSpot.SpotImages && thisSpot.SpotImages[thisSpot.SpotImages.length-2]  && (thisSpot.SpotImages[thisSpot.SpotImages.length-2].url)}
          placeholder='Image URL'
        //   name='imageUrl'
        />
</div>
<div>
         <input
          type='text'
          onChange={(e) => setPic3(e.target.value)}
          value={thisSpot.SpotImages && thisSpot.SpotImages[thisSpot.SpotImages.length-3]  && (thisSpot.SpotImages[thisSpot.SpotImages.length-3].url)}
          placeholder='Image URL'
        //   name='imageUrl'
        />
</div>
<div>
         <input
          type='text'
          onChange={(e) => setPic4(e.target.value)}
          value={thisSpot.SpotImages && thisSpot.SpotImages[thisSpot.SpotImages.length-4]  && (thisSpot.SpotImages[thisSpot.SpotImages.length-4].url)}
          placeholder='Image URL'
        //   name='imageUrl'
        />
</div>
<div>
         <input
          type='text'
          onChange={thisSpot.SpotImages && thisSpot.SpotImages[thisSpot.SpotImages.length-5]  && (thisSpot.SpotImages[thisSpot.SpotImages.length-5].url)}
          value={thisSpot.pic5}
          placeholder='Image URL'
        //   name='imageUrl'
        />
        </div>
        <div>
        <button type='submit'>Update your Spot</button>
        </div>

      </form>

    </div>
<hr></hr>

<Link exact to='/spots/new'><button type="button">Create A Spot</button></Link>
    </>

  );

}
