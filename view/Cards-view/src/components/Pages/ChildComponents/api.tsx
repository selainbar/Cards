import React from "react";
import axios from 'axios'

const api=axios.create({
    baseURL:'https:localhost:7188'
});
export default api;