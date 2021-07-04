import React, { useState, useEffect } from 'react';
import { Button, Card,Col} from "react-bootstrap";
import {
    Link,
} from 'react-router-dom';

function InCards_01({ value }) {
    const [showText, setShowText] = useState(true);

    // Добавить корзинку:
    const btnAdd = (v) => {
        const i = JSON.parse(localStorage.getItem('Eat')) || [];
        if(i === value.idMeal){
            setShowText(false);
        }
        if (showText === true) {
            localStorage.setItem('Eat', JSON.stringify([...i, value.idMeal]));
        } else {
            localStorage.setItem('Eat', JSON.stringify(i.filter(id => id !== v)));
        }
        setShowText(n => !n);
    }

    return (

        <Col className={'cardCol '} xs={3}>
            <Card className={'card_content'} style={{ width: '18rem', textAlign: 'center' }}>
                <Link to={"/Card/" + value.idMeal}>
                    <Card.Img variant="top" src={value.strMealThumb} />
                </Link>
                <Card.Body>
                    <Card.Title>{value.strMeal}</Card.Title>
                    <Button onClick={() => btnAdd(value.idMeal)} variant={showText === true ? "success" : "danger"}>{showText === true ? 'Добавить корзинку' : 'Удалить из корзинки!!!'}</Button>
                </Card.Body>
            </Card> 
        </Col>

    )
}
export default InCards_01;