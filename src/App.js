import React, { useState, useEffect } from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Card, Col, Spinner, } from "react-bootstrap";
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
import NavBar from './Header/NavBar';
import InCards from './All_Cards/MealCategoriy/MealCategory';
import Cards from './All_Cards/MealCategoriy/DeatailsCard/CardDetailsCompont';
import Country from './Header/Country';
import Search from './Header/Search';
import RandomMeal from './Header/RandomMeal';
import Bin from "./All_Cards/MealCategoriy/Bin";
import Basket from './Context/Basket';


function App() {
  let history = useHistory();
  const [data, setData] = useState([]);
  const [showSpiner, setShowSpiner] = useState(true);
  const [showText, setShowText] = useState(true);

  const [basketList, setBasketList] = useState(JSON.parse(localStorage.getItem('Eat') || '[]'));

  // Btn Add
  const add = (v) => {
    setBasketList([...basketList, v]);
  }
  // Btn Del
  const del = (s) => {
    setBasketList(basketList.filter(id => id.idMeal !== s.idMeal));
  }
  // All btn '()':
  const toogle = (v) => {
    basketList.find(g => v.idMeal === g.idMeal) ? del(v) : add(v);
  }
  // Добавить корзинку:
  useEffect(() => {
    localStorage.setItem('Eat', JSON.stringify(basketList));
  }, [basketList]);

  useEffect(() => {
    axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then((response) => {
        setData(response.data.categories);
        setShowSpiner(false);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    // console.log(togle);
  }, []);
  console.log(basketList);

  return (
    <Basket.Provider value={{
      basketList,
      setBasketList,
      toogle,
    }}>

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
            <Route path="/RandomMeal/">
              <RandomMeal />
            </Route>
            <Route path="/bin/">
              <Bin />
            </Route>

            <Route path="/">
              <NavBar />

              <div className={'card_main'}>
                  {data.map((value, i) => {
                    return (
                      <div className={'card_categorii'}>
                        <Link to={"/incard/" + value.strCategory}>
                          <div className = {'pg'}>
                            <Card calssName={'card_main'} style={{ width: '18rem', textAlign: 'center', }} >
                              <Card.Img className={'card_content'} variant="top" src={value.strCategoryThumb} />
                              <Card.Body className ={'tex'}>
                                <Card.Title className={'title_main_card'}>{data[i].strCategory}</Card.Title>
                              </Card.Body>
                            </Card>
                          </div>
                        </Link>
                      </div>
                    )
                  })}
              </div>
            </Route>

          </Switch>
        </Router>
      </div>
    </Basket.Provider>

  );
}

export default App;