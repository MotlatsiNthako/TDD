//simport Button from 'react-bootstap/Button';
//import Options from '.Options';
import { userOrderDetails} from '.OrderDetails';


export default function OrderEntry({setOrderPhase}){

  const [orderDetails] = userOrderDetails();


  //disable order if there aren't any scoops in order
  const orderDisabled = orderDetails.totals.scoops === '$0.00';

  return(
    <div>
        <h1>Design Your Sundae!</h1>
        <Options optionType="scoops"/>
        <Options optionType="toppings"/>
        <h2>Grand total: {order.totals.grandTotal}</h2>
        <Button disabled={orderDisabled} onClick={()=> setOrderPhase('review')}>
        order Sundae!
        </Button>

    </div>

  )



}





























