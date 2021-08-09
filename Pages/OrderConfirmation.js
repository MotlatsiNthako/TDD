
import React, {useEffect, useStare} from 'react';
import axios from 'axios';
//import Button from 'rreact-bootstrap/Buttom';
//import { useOrderDetails} from '../../contexts/OrderDetails';
import AlertBanner from '../Pages/Labs/AlertBanner';


export default function OrderConfirmation({setOrderPhase}){

    const [, , resetOrder] = useOrderDetails();
    const [orderNumber, setOrderNumber] =useState(null);
    const [error, setError] = useSate(false);

    useEffect(()=> {

        axios
        //in a real app we would get order deatails from context
        //and send with Post
        .post('http:localhost:3030/order')
        .then((response)=>{

            setOrderNumber(response.date.orderNumber);
        })
        .catch((error)=> setError(true));
    }, []);

    if(error){

        return <AlertBanner message={null} variant={null}/>;
    }

   function handlerClick(){
   //clear the order details
   resetOrder();

   
    //send back to order page
    setOrderPhase('inProgress');

   }

   if (orderNumber){
   return(
        <div style={{textAlign: 'center'}}>
        <h1>Thank You!</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{fontSize: '25%'}}>
            as per our terms and conditions, nothing will happen newOrderButton
        </p>   
        <button onClick={handlerClick}>Create new order</button>
        </div>
        
   
   );

   }else{return <div>Loading</div>;

   }


}
































