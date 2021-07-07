import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, Col } from "react-bootstrap";
import {
    Link,
} from 'react-router-dom';
// import componets:
import Navbar from './../../Header/NavBar';
import Basket from '../../Context/Basket';



function Bin() {
    // const [show, setShow] = useState(false)

    const data1 = useContext(Basket)
    // const data = JSON.parse(localStorage.getItem('Eat')) || [];
    // console.log(data);

    return (
        <div>
            {data1.basketList.length === 0 ?
                <div>
                    <Navbar/>
                    <div className={'bin_error_text'}>
                        <div className = {'text_error'}>
                            <h1>Вы еще не выбрали еду</h1>
                        </div>
                    </div>
                </div>
                :
                <div>
                    <Navbar />
                    <div className={'block_bin'}>
                        {data1.basketList.map((v, i) => {
                            return (
                                <div className = {'card_name_bin'}>
                                    <h1>Вы выбрали{data1.basketList[i].strMeal}</h1>
                                    <div className={'card_categorii'}>
                                    <Col className={'cardCol '} xs={3}>
                                        <Card className={'card_content'} style={{ width: '18rem', textAlign: 'center' }}>
                                            <Card.Img variant="top" src={v.strMealThumb} />
                                            <Card.Body>
                                                <Card.Title>{v.strMeal}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Col >
                                </div>
                                </div>
                            )
                        })}

                    </div>
                </div>
            }

        </div>


    )
}
export default Bin;