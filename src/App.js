import React, { useState, useEffect } from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Nav, NavDropdown, Card, Form, FormControl, Col, Row, Container, Spinner } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParmams
} from 'react-router-dom';
import { useHistory } from "react-router-dom";
// import conponents:
import './App.css';
import NavBar from './comonents/NavBar'
import InCards from './comonents/InCards';
import Cards from './comonents/Cards';
import Country from './comonents/Country';
import Search from './comonents/Search';
import RandomMeal from './comonents/RandomMeal'


function App() {
  let history = useHistory();
  const [data, setData] = useState([]);
  const [input, setInput] = useState();
  const [categoris, setCategoris] = useState([]);
  const [showSpiner, setShowSpiner] = useState(true);

  useEffect(() => {
    axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(function (response) {
        setData(response.data.categories);
        setShowSpiner(false)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);


  return (
    <div className="App">

      {/* spiner */}
      {showSpiner === true ?
        <div className={'spiner_block'}>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div> : null}
      {/* card */}
      <Router>
        <Switch>
          <Route path="/incard/:name">
            <InCards />
          </Route>
          <Route path="/Card/:id">
            <Cards />
          </Route>
          <Route path="/Search/:text">
            <Search />
          </Route>
          <Route path="/Country/:id2">
            <Country />
          </Route>
          <Route path ="/RandomMeal/">
            <RandomMeal/>
          </Route>

          <Route path="/">
            <NavBar />

            <div className={'card'}>
              <Row>
                {data.map((value, i) => {
                  return (
                    <div>
                      <Link to={"/incard/" + value.strCategory}>
                        <Col className={'cardCol '} xs={3}>
                          <Card className={'card_content'} style={{ width: '18rem', textAlign: 'center' }}>
                            <Card.Img variant="top" src={value.strCategoryThumb} />
                            <Card.Body>
                              <Card.Title>{data[i].strCategory}</Card.Title>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Link>

                    </div>
                  )
                })}
              </Row>
            </div>
          </Route>

        </Switch>
      </Router>


    </div>
  );
}

export default App;