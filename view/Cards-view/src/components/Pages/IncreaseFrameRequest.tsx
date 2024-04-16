import React from 'react'
import react,{useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import api from './ChildComponents/api';
import {useQuery} from 'react-query'

function IncreaseFrameRequest(){

    const params=useParams()
    const cardNumber=params.cardNumber;
const [newCardFrame,setnewCardFrame]=useState('');
const [occupation,setOccupation]=useState('1');
const [averageIncome,setAverageIncome]=useState('');
const[answer,setAnswer]=useState('');
const[isFetching,setIsFetching]=useState(false);


const handleNewFrame=(event)=>{
setnewCardFrame(event.target.value)
}
const handleoccupation=(event)=>{
    setOccupation(event.target.value)
    }
 const handleAverageIncome=(event)=>{
        setAverageIncome(event.target.value)
        }

        const fetchRequest = async (cardNumber:string,newCardFrame:string,occupation:string,averageIncome:string) => {
            try {
              setIsFetching(true);
              const response = await api.put<string>('/api/Cards', null,{
                params: {
                    cardNumber:cardNumber,
                    newCardFrame:newCardFrame,
                    occupation:occupation,
                    averageIncome:averageIncome
            }});
        
              const fetchedRequest= response.data;
              setAnswer(fetchedRequest);
              console.log(fetchedRequest)
            } catch (error) {
              console.error("Error fetching cards:", error);
            } finally {
              setIsFetching(false);
            }
          };


        const  handleSubmit =async (event)=>{
            event.preventDefault();
            console.log("started the call");
            fetchRequest(cardNumber!,newCardFrame,occupation,averageIncome)
        }

           {
        return(<>
<form className='my-container' onSubmit={handleSubmit}>
<div>
    <label>new card frame</label>
    <input type='text' onChange={handleNewFrame}/> 

</div>
<div>
<select value={occupation} onChange={handleoccupation} className="myBtn">
         <option value="1">emploey</option>
         <option value="2">self-employed</option>
         <option value="3">Other</option>
       </select>
</div>
<div>
    <label>average Income</label>
    <input type='text' onChange={handleAverageIncome}/> 
    
</div>
<button>submit</button>
<Link to='/'><h3> go back to the card's list</h3></Link>
</form>
<h3> you cant submit with an empty field</h3>
<div className='my-li'>{answer}</div>
</>)
}}

export default IncreaseFrameRequest