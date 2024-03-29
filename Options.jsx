import axios from 'axios';
import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import AlertBanner from '../common/AlertBanner';
import { pricePerItem } from '../constants';
import { useOrderDetails } from '../../contexts/OrderDetails';
export default function options({optionType}) {

    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);
    const [orderDetails, updateItemCount] = useOrderDetails();

    //optionType is 'scoops' or 'toppings'
    useEffect(() {

        axios
             .get(`https://localhost3030/${optionType}`)
             .then((response) => setItems(response.data))
             .catch((error) => setError(true));
    }, [optionType]);

    if (error) {

        //@ts-ignore
        return <AlertBanner />; 
    }
    



const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOptions;
const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase()

const optionItems = items.map((item) => (

    <ItemComponent
       key={item.name}
       name={item.name}
       imagePath={item.imagePath}

       />
));

return (
    <>
       <h2>{title}</h2>
       <p>{pricePerItem[optionType] each</p>
       <Row>{optionItems}</Row>
    </>
);
}