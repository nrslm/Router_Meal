import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Col, Row, } from "react-bootstrap";
import {
  BrowserRouter as Router,
  useParams
} from 'react-router-dom';
// components
import NavBar from './NavBar'

function Search() {
  const [searchText, setSearchText] = useState([]);
  const [showSpiner2, setShowSpiner2] = useState(true)
  const params = useParams()

  useEffect(() => {
    ApiSearch();
  }, [params.text]);
  // console.log(cards);

  // Api Search:
  const ApiSearch = () => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${params.text}`)
      .then(function (response) {
        setSearchText(response.data.meals);
        console.log(response);  
        setShowSpiner2(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }


  return (
    <div>
      {searchText === null ?
        <div>
          <NavBar />
          <img className = {'imgError'} src="https://www.plctr.com/wp-content/uploads/plc-errors.jpg" />
        </div>
        :
        <div className = {'block_Search'}>
          <NavBar/>
          <Row>
            {searchText.map((v, i) => {
              return (
                <div>
                  <Col className={'cardCol '} xs={3}>
                    <Card className={'card_content'} style={{ width: '18rem', textAlign: 'center' }}>
                      <Card.Img variant="top" src={v.strMealThumb} />
                      <Card.Body>
                        <Card.Title>{v.strIngredient4}</Card.Title>
                        {searchText[i].strYoutube ? <a href={searchText[i].strYoutube}>Youtube</a> : null}
                      </Card.Body>
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
export default Search;