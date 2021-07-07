// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Spinner } from "react-bootstrap";
// import {
//     useParams
// } from 'react-router-dom';
// import NavBar from '../Header/NavBar'

// function Cards() {
//     const [cards, setCards] = useState([]);
//     const [showSpiner2, setShowSpiner2] = useState(true)
//     const params = useParams()

//     useEffect(() => {
//         axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`)
//             .then(function (response) {
//                 setCards(response.data.meals[0]);
//                 console.log(response);
//                 setShowSpiner2(false)
//             })
//             .catch(function (error) {
//                 // handle error
//                 console.log(error);
//             })
//             .then(function () {
//                 // always executed
//             });
//     }, []);
//     console.log(cards);
//     return (
//         <div>

//             {/* spinner */}
//             {showSpiner2 ?
//                 <div className={'spiner_block'}>
//                     <Spinner animation="border" role="status">
//                     </Spinner>
//                 </div>
//                 :
//                 <div>
//                     <NavBar />
//                     <h1>{cards.strMeal}</h1>
//                     <div className={'All_cards'}>
//                         <div className = {'block_card'}>
//                             <div className={'blocks'}>
//                                 <div className={'imgCards'}>
//                                     <img src={cards.strMealThumb} />
//                                 </div>
//                             </div>
//                             <div className={'blocks'} v>
//                                 <h4>{cards.strInstructions}</h4>
//                                 {cards.strYoutube ? <a href={cards.strYoutube}>Youtube</a> : null}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             }
//         </div>
//     )
// }
// export default Cards;