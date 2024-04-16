import { useState } from 'react';
import api from './api';


export const useDictionary = () => {
  const [dictionary, setDictionary] = useState(null);

  const fetchDictionary = async () => {
    try {
      const response = await api.get('/api/banks/GetNames');
      setDictionary(response.data.value);
    } catch (error) {
      console.error("Error fetching dictionary data:", error);
      setDictionary(null); 
    }
  };
  const getValueForKey = (key) => {
    if (dictionary && key in dictionary) {
      return dictionary[key];
    } else {
      return null;
    }
  };
  return { fetchDictionary, getValueForKey };
};
