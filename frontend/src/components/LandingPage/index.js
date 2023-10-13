import React, { useEffect, useState } from 'react';
import './LandingPage.css';


export default function LandingPage() {

    const [selectedImage, setSelectedImage] = useState(0)

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
                    <img src={process.env.PUBLIC_URL + '/frontendImages/boraboraflag.jpg'} ></img>
                    <img src={process.env.PUBLIC_URL + '/frontendImages/MaldivesFlag.jpg'}></img>
                    <img src={process.env.PUBLIC_URL + '/frontendImages/seychellesflag.jpg'}></img>
                    <img src={process.env.PUBLIC_URL + '/frontendImages/chooseAll.jpg'}></img>

                </div>




        </>
    )


}
