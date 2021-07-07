import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button,Card,Col, Row, Spinner } from "react-bootstrap";
import {
    useParams
} from 'react-router-dom';
// import components:
import Basket from './../Context/Basket';
import NavBar from './NavBar'

function Country() {
    const [countryCards, setCountryCards] = useState([]);
    const [showSpiner2, setShowSpiner2] = useState(true);
    const [dataLength, setDataLength] = useState([])
    const params = useParams()

    useEffect(() => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${params.id2}`)
            .then(function (response) {
                setCountryCards(response.data.meals);
                console.log(response);
                setDataLength(response.data.meals)
                setShowSpiner2(false)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }, [params.id2]);
    console.log(params.id2);

    return (
        <div>

            {/* spinner */}
            {showSpiner2 === true ?
                <div className={'spiner_block'}>
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div> :
                <div className = "card">
                    <NavBar/>
                    <h1>{`${params.id2}(${dataLength.length})`}</h1>
                    <Row>
                    {countryCards.map((v, i) => {

                        return (
                            <div>
                                <Col className={'cardCol '} xs={3}>
                                    <Card className={'card_content'} style={{ width: '18rem', textAlign: 'center' }}>
                                        <Card.Img variant="top" src={v.strMealThumb} />
                                        <Card.Body>
                                            <Card.Title>{v.strMeal}</Card.Title>
                                        </Card.Body>
                                        {/* <Button onClick = {() => t.Basket(value.idMeal)} variant={showText === true ? "success" : "danger"}>{showText === true ? 'Добавить корзинку' : 'Удалить из корзинки!!!'}</Button> */}
                                        <Button>Add</Button>
                                    </Card>
                                </Col>

                            </div>
                        )

                    })}
                </Row>
                </div>

            }

        </div>
    )
}
export default Country;