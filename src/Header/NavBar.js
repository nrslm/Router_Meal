import React, { useState, useEffect } from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Nav, NavDropdown, Form, FormControl, } from "react-bootstrap";
import { useHistory } from "react-router-dom";
// import components:


function NavBar() {
    let history = useHistory();
    const [contry, setContry] = useState([]);
    const [input, setInput] = useState('');


    useEffect(() => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
            .then(function (response) {
                setContry(response.data.meals);
                console.log(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }, []);

    // input
    const changInput = (v) => {
        setInput(v)
    }
    // button
    const searchBut = () => {
        history.push(`/Search/${input}`);
    }
    // btnDropDown:
    const btnDropDown = (v) => {
        history.push(`/Country/${v}`);
    }
    // Random Meal:
    const random = () => {
        history.push(`/RandomMeal/`)
    }
    // bin:
    const Bin = () => {
        history.push(`/bin/`)
    }


    return (
        <div className="App">
            <Navbar  bg="dark" expand="lg">
                <Navbar.Brand className ={'nav_text'} href="/">Тез татым</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link className ={'nav_text'} onClick={() => random()}>Random Meal</Nav.Link>
                        <NavDropdown title = "Area" id="basic-nav-dropdown">
                            {contry.map((v, i) => {
                                return (
                                    <div>
                                        <NavDropdown.Item value={v.strArea} onClick={() => btnDropDown(v.strArea)}>{v.strArea}</NavDropdown.Item>
                                    </div>
                                )
                            })}


                        </NavDropdown >
                        <div onClick = {() => Bin()}>
                            <img className={'img_bin'} src={'https://img2.freepng.ru/20180311/jue/kisspng-basket-wicker-bamboe-bamboo-woven-basket-child-5aa4ce92b9b6b3.0971494815207502267607.jpg'} />
                        </div>
                    </Nav>
                    <Form inline>
                        <FormControl onChange={(e) => changInput(e.target.value)} type="text" placeholder="Search" className="mr-sm-2" />
                        <Button onClick={() => searchBut()} variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </div >
    );
}

export default NavBar;