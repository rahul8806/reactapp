import Carousel from './Carousel';
import Cake from './Cake';
import {useEffect, useState} from "react"
import axios from "axios"
import React from 'react';
import cakes from './data';


export const DiscountContext = React.createContext()

function Home(){
    // let [cakes, setCakes] = useState([])
    // useEffect(()=>{ 
    //     let apiurl="https://apibyashu.herokuapp.com/api/allcakes"
    //     axios({
    //              url: apiurl,
    //              method:"get"
    //          }).then((response)=>{
    //             console.log("home response ", response)

    //              setCakes(response.data.data)
    //          }, (error)=>{
    //              console.log("error ", error)
    //          })
    // },[]) //We want to prevent the call of componentdidupdate()

    return(
        <div>
            <div className="row">
                <div className="col" style={{padding:"0px"}}>
                    <Carousel></Carousel>
                </div>
            </div>

            <div className="row">
                {cakes?.length>0 && cakes.map((each, index)=>{
                    return (<DiscountContext.Provider value="5">
                    <Cake cakedata={each} key={"cake" + index} />
                    </DiscountContext.Provider>
                    ) 
                })}
            </div>
        </div>
    )
}


export default Home