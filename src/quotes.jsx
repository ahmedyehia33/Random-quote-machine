import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSquareXTwitter } from "react-icons/fa6";
import { TiSocialTumbler } from "react-icons/ti";

const Quotes = () => {
    const [quote , setQuote] = useState(null);
    const [loading , setLoading] = useState(true);
    const [number, setNumber] = useState(null);


    const handleClick = ()=>{
        let generatedNumber = Math.floor(Math.random() * 16);
        if (generatedNumber === number){
            if(generatedNumber ===15){
                generatedNumber--
            }
            else{
                generatedNumber++
            }
        }
        setNumber(generatedNumber); 
        
       }

    useEffect(()=>{const fetchData = async () => {
                  if(number != null) { try {
                        const response = await axios.get('https://type.fit/api/quotes');
                        
                        setQuote(response.data[number]);
                        setLoading(false);
                        // Handle the response data as needed
                    } catch (error) {
                        console.error('Error fetching data:', error);}};}
                    
                    fetchData();}, [number]);
  const shareOnTwitter = () => {
                        const text = `"${quote.text}" - ${quote.author}`; 
                        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
                        window.open(twitterUrl, '_blank');
                    };
                    const shareOnTumbler= ()=>{
                        const text = `"${quote.text} - ${quote.author}`; 
                      const tumblrUrl = `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&caption=${encodeURIComponent(text)}`;
                      window.open(tumblrUrl, '_blank');
}
                
  

    return ( <>
    <div className='container'>
    <p className='quote'>{loading ? 'Loading...' : (quote && quote.text)}</p>
    <p className='author'>{loading ? 'Loading...' : (quote && quote.author)}</p>
   <div className='last-line'>
     <div className="icon" onClick={shareOnTwitter} >
         <FaSquareXTwitter style={{ color: 'white', fontSize: '2rem',borderRadius:"10px"}}/>
     </div> 

     <div className="icon" onClick={shareOnTumbler}>
     <TiSocialTumbler style={{ color: 'white', fontSize: '2rem'}}/>
     </div>
     <button onClick={handleClick}>Generate</button> 
     </div>
    </div>
    </> );
}
 
export default Quotes;