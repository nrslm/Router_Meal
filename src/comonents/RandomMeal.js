import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import {
    BrowserRouter as Router,
    useParams
} from 'react-router-dom';
import NavBar from './NavBar'

function RandomMeal() {
    const [randomData, setRandomData] = useState([]);
    const [showSpiner2, setShowSpiner2] = useState(true);
    const [btnFurther, setBtnFurther] = useState('');
    const params = useParams();


    useEffect(() => {
        Api()
    }, [btnFurther]);

    // Api:
    const Api = () =>{
        axios.get(`https://www.themealdb.com/api/json/v1/1/random.php`)
            .then((response) => {
                setRandomData(response.data.meals);
                console.log(response);
                setShowSpiner2(false)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    // btn send:
    const send = () => {
        setBtnFurther(btnFurther => btnFurther + 'a');
    }

    return (
        <div>

            {/* spinner */}
            {showSpiner2 === true ?
                <div className={'spiner_block'}>
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div> :
                <div className="card">
                    <NavBar />

                    {randomData.map((v, i) => {

                        return (
                            <Row className ={'rowRan'}>
                                <Col className={'cardCol '} xs={5}>
                                    <Card className={'card_content'} style={{ width: '22rem', textAlign: 'center' }}>
                                        <Card.Img variant="top" src={v.strMealThumb} />
                                        <Card.Body>
                                            <Card.Title>{v.strMeal}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xs={6}>
                                    <div>
                                        <h5>{v.strInstructions}</h5>
                                    </div>
                                </Col>

                            </Row>
                        )

                    })}
                    <Button onClick = {() => send()} variant = "warning">Дальше...</Button>
                </div>

            }

        </div>
    )
}
export default RandomMeal;