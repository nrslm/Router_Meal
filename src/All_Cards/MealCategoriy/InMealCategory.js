import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, Col } from "react-bootstrap";
import {
    Link,
} from 'react-router-dom';
// import componets:
import Basket from '../../Context/Basket';

function InCards_01({ value }) {
    // const t = useContext(Basket);
    const t = useContext(Basket);

    return (

        <Col className={'cardCol '} xs={3}>
            <div className={'card_categorii'}>
                <Card style={{ width: '18rem', textAlign: 'center' }}>

                    <Link to={"/Card/" + value.idMeal}>
                        <Card.Img className={'card_content'} variant="top" src={value.strMealThumb} />
                    </Link>
                    <Card.Body>
                        <Card.Title>{value.strMeal}</Card.Title>
                        <Button variant={t.basketList.find(v => v.idMeal === value.idMeal) ? 'danger' : 'success'} onClick={() => t.toogle(value)}>{!t.basketList.find(s => value.idMeal === s.idMeal) ? 'Добавить в корзину' : 'Убрать с карзины'}</Button>
                    </Card.Body>

                </Card>
            </div>
        </Col >

    )
}
export default InCards_01;