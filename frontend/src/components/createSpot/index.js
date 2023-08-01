import React from 'react';
import {useEffect} from 'react'
import { NavLink,useHistory,Link,useParams } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {useState} from 'react'
import './createSpot.css'
import { ThunkAddSpot } from '../../store/spots';



export default function CreateSpot() {

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
let thisSpot = useSelector((state) => state.spots)
useEffect(()=>{

},[thisSpot])

  const fetchData = async (newSpot) => {


    let spot=await dispatch(ThunkAddSpot(newSpot));




    history.push(`/spots/${spot.id}`)
    return spot
  };





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
      console.log('newData',newData)
      await fetchData(newData,dispatch)
        .catch(async (res) => {
          console.log('ourCatchKickedInCreateSpotIndexLine60')
          // const data = await res.json();
          // if (data && data.errors) {
          //   setErrors(data.errors);
          // }
        });


    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <div className='inputBox'>

      <h1 className="title">Create a new Spot</h1>
      <form onSubmit={handleSubmit}>
      <div>
        <h4>Where's your place located?</h4>
        <p>Guests will only get your exact address once they booked a reservation.</p>
        <input
          type='text'
          onChange={(e) => setCountry(e.target.value)}
          value={country}
          placeholder='Country'
        //   name='title'
        />
        </div>
        <div>
        <input
          type='text'
          onChange={(e) => setStreetAddress(e.target.value)}
          value={streetAddress}
          placeholder='Address'
        //   name='imageUrl'
        />
        </div>
        <div>
        <input
          type='text'
          onChange={(e) => setCity(e.target.value)}
          value={city}
          placeholder='City'
        //   name='imageUrl'
        />
           <input
          type='text'
          onChange={(e) => setState(e.target.value)}
          value={state}
          placeholder='STATE'
        //   name='imageUrl'
        />
</div>




        <div>
          <input
          type='text'
          onChange={(e) => setLatitude(e.target.value)}
          value={latitude}
          placeholder='LATITUDE'
        //   name='imageUrl'
        />
          <input
          type='text'
          onChange={(e) => setLongitude(e.target.value)}
          value={longitude}
          placeholder='LONGITUDE'
        //   name='imageUrl'
        />
        </div>
        <div>
        <h4>Describe your place to guests</h4>
        <p>Please highlight the best features of your place.  This is your chance to show others what they are missing</p></div>
        <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Please write atleast 30 characters'
          rows='10'
        ></textarea>
        </div>
        <div>
        <h4>Create a Name for your spot</h4>
        <p>Be creative!  Good names get the best attention.</p>
          <input
          type='text'
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder='Name of your spot'
        //   name='imageUrl'
        />
        </div>
        <div>
            <h4>Set a base price for your spot</h4>
            <p>How much do you think your place is worth per night?</p>
          <input
          type='number'
          step="0.01"
          min="0"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          placeholder='Price per night $USD'
        //   name='imageUrl'
        />
        </div>
        <div>
          <input
          type='text'
          onChange={(e) => setPic1(e.target.value)}
          value={pic1}
          placeholder='Preview Image Url'

        />
</div>
<div>
         <input
          type='text'
          onChange={(e) => setPic2(e.target.value)}
          value={pic2}
          placeholder='Image URL'
        //   name='imageUrl'
        />
</div>
<div>
         <input
          type='text'
          onChange={(e) => setPic3(e.target.value)}
          value={pic3}
          placeholder='Image URL'
        //   name='imageUrl'
        />
</div>
<div>
         <input
          type='text'
          onChange={(e) => setPic4(e.target.value)}
          value={pic4}
          placeholder='Image URL'
        //   name='imageUrl'
        />
</div>
<div>
         <input
          type='text'
          onChange={(e) => setPic5(e.target.value)}
          value={pic5}
          placeholder='Image URL'
        //   name='imageUrl'
        />
        </div>
        <div>
        <button type='submit'>Submit</button>
        </div>

      </form>

    </div>
  );

}
