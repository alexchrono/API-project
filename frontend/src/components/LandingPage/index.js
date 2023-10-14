import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './LandingPage.css';


export default function LandingPage() {

    const [selectedImage, setSelectedImage] = useState(0)
    const history=useHistory()

    return (
        <>
        <div id='logo'>
            <div id='centered'>
                <img src={process.env.PUBLIC_URL + '/frontendImages/starfishnobg.png'} id='starfish'></img>
                <h1 id='mainText'>Island Luxury</h1>

                <h6 id='subtext'>Your gateway to paradise</h6>
                </div>
                </div>

                <div>
                    <h2 id="select">Select your destination</h2>
                </div>

                <div id='allFlags'>

                    <div class='flag' onClick={(e)=>{
                        history.push('/destination/bora-bora')
                    }}><p class='country'>Bora Bora</p><img src={process.env.PUBLIC_URL + '/frontendImages/boraboraflag.jpg'} ></img></div>
                    <div class='flag' onClick={(e)=>{
                        history.push('/destination/maldives')
                    }}><p class='country'>Maldives</p><img src={process.env.PUBLIC_URL + '/frontendImages/MaldivesFlag.jpg'}></img></div>
                    <div class='flag' onClick={(e)=>{
                        history.push('/destination/seychelles')
                    }}><p class='country'>Seychelles</p><img src={process.env.PUBLIC_URL + '/frontendImages/seychellesflag.jpg'}></img></div>
                    <div class='flag' onClick={(e)=>{
                        history.push('/destination/all')
                    }}><p class='country'>All</p><img src={process.env.PUBLIC_URL + '/frontendImages/chooseAll.jpg'}></img></div>

                </div>




        </>
    )


}
