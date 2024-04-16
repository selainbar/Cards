import React, { useEffect, useState } from "react";
import CardItem from './ChildComponents/cardItem'
import api from './ChildComponents/api';
import { Card } from "../types";
import { useDictionary } from './ChildComponents/codeToName';
import Notification from '../notification';
import { Link,Outlet } from "react-router-dom";


function ListGroup() {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [FilterSelection, setFilterType] = useState<string>('1');
  const [inputText, setInputText] = useState('');
  const [cards, setCards] = useState<Card[]>([]); // State for storing fetched cards
  const { fetchDictionary, getValueForKey } = useDictionary();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const displayNotification = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
      setNotificationMessage('');
    }, 5000);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };
  
  const handleChange = (event) => {
    setFilterType(event.target.value);
  };

  const fetchCards = async (filterType: string, filterSearch: string) => {
    try {
      setIsFetching(true);
      const response = await api.get<Card[]>('/api/Cards', {
        params: {
          FilterType: filterType,
          FilterSearch: filterSearch
        }
      });

      const fetchedcards: Card[] = response.data;
      setCards(fetchedcards);
      console.log(fetchedcards)
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setIsFetching(false);
    }
  };
  
  const handleFetchButtonClick = () => {
    if (!inputText) {
      displayNotification("Please enter a search term before fetching cards.");
    } else {
      fetchCards(FilterSelection, inputText);
    }
  };

  useEffect(() => {
    fetchDictionary();
  }, []); 

  return (
    <>
      <h1 className="title">Cards</h1>
      <select value={FilterSelection} onChange={handleChange} className="myBtn">
         <option value="1">Card Number</option>
         <option value="2">Blocked</option>
         <option value="3">Bank By Code</option>
       </select>
       <input
         type="text"
         value={inputText}
         onChange={handleInputChange}
         placeholder="Type something..."
       />
       <button disabled={isFetching} className="myBtn" onClick={handleFetchButtonClick}>
         {isFetching ? "Fetching..." : "Fetch Cards"}
       </button>
       {showNotification && (
         <Notification message={notificationMessage} onClose={() => setShowNotification(false)} />
       )}
       {cards.length === 0 ? (
         <p>No cards found</p>
       ) : (
         <ul className="list-group">
           {cards.map((card,index) => (
             <li
             key={card.cardNumber}
               className={selectedIndex === index ? "my-li list-group-item active" : "my-li list-group-item"}
               onMouseEnter={() => setSelectedIndex(index)}
               onMouseLeave={() => setSelectedIndex(-1)}
             >
             <Link to={`/IncreaseFrame/${card.cardNumber}`}>
               <CardItem
                 cardNumber={card.cardNumber}
                 bankName={getValueForKey(card.bankCode)}
                 imagePath={card.cardPicture}
               />
             </Link>
             </li>
             
           ))}
         </ul>
         
       )}
      
     </>
   );
 }

export default ListGroup;
