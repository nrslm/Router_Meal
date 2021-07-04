import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from './Cards'
import { Row, Spinner } from "react-bootstrap";
import {
    BrowserRouter as Router,
    useParams
} from 'react-router-dom';
// import components:
import InCards_01 from './Incards_01';
import NavBar from './NavBar'

function InCards() {
    const [dataLength, setDataLength] = useState([])
    const [inCards, setInCards] = useState([]);
    const [showSpiner1, setShowSpiner1] = useState(true);
    
    const params = useParams()

    useEffect(() => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${params.name}`)
            .then(function (response) {
                setInCards(response.data.meals);
                console.log(response.data.meals);
                setDataLength(response.data.meals.length);
                setShowSpiner1(false);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }, []);
    console.log(inCards);
    
   

    return (
        <div className={'card'}>
            {/* spiner */}
            {showSpiner1 === true ?
                <div className={'spiner_block'}>
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div> :
                <div>
                    <NavBar />
                    <h1>{`${params.name}(${dataLength})`}</h1>
                    <Row>
                        {inCards.map((value, i) => {
                            return (
                                <InCards_01 value={value}/>
                            )
                        })}
                    </Row>
                </div>}
            {/*  */}

        </div>
    )
}
export default InCards;