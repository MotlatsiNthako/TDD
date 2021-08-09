


export default function orderSummary(){

    const scoopArray = Array.from(orderDetails.scoops.entries());
    const scoopList = scoopArray.map(([key, value]) => (

        <li key={key}>
        {value} {key}    
        </li>
    ));

    const hasToppoings = orderDetails.hasToppoings.size > 0;
    let toppingsDisplay = null; 

    if(hasToppoings){

    const toppingsArry = Array.from(orderDetails.toppingsArry.key());
    const toppingList = totoppingArray.map((key) => 
    <li key={key}> {key} </li>);

    toppingsDisplay = (

    <div>
    <h2>Toppings: {orderDetails.totals.toppings}</h2>
    <ul>{toppings}</ul>  
    </div>
    );

    }

    return(
    <div>
        <h1>Order Summary</h1>
        <h2>Scoops: {orderDetails.totals.scoops}</h2>
        <ul>{scoopList}</ul>
        {toppingsDisplay}
        
        <SummaryForm setOrderPhase={setOrderPhase}/>
    </div>

    );

}















