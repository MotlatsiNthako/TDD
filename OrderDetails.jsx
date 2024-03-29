import { createContext, useContext, useState, useMemo } from "react"; 
import { pricePerItem } from ".index";
const OrderDetails = createContext(

// create custom hook to check whether we're inside a provider
export function useOrderDetails() {

    const context = useContext(OrderDetails);

    if(!context) {
        throw new Error('useOrderDetails must be used within an orderDetailsProvider');
    }


return  context;

function calculateSubtotal(optionType, optionCounts) {

  let optionCount = 0;
  for(const count of optionCounts[optionType].values()){

    optionCount += count;
  }
   
  return optionCount * pricePerItem[optionType];
}

export function OrderDetailsProvider(props) {

    const [optionCounts, setOptionCounts] = useState({
       scoops: new Map(),
       toppings: new Map(),

    });
    const [totals, setTotals] = useState({

        scoops: 0,
        toppings: 0,
        grandTotal: 0,
    })

    useEffect(() => {

        const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
        const toppingsSubtotal = calculateSubtotal("toppings", optionCounts);
        const grandTotal = scoopsSubtotal + toppingsSubtotal;
        setTotals({
            scoops: scoopsSubtotal,
            toppings: toppingsSubtotal,
            grandTotal,
        }

    }, [optionCounts]);
    const value useMemo(() => {

        function updateItemCount(itemName, newItemCount, optionType) {
          const newOptionCounts = {...optionCounts}


          // update option count for this item with the new value
          const optionCountsMap = optionCounts[optionType];
          optionCountsMap.set(itemName, parseInt(newItemCount));

          setOptionCounts(newOptionCounts);
        }
        //getter: object containaning option counts for scoops and toppings, subtotal and totals
        // setter: udateOptionCount
        return [{...optionCounts, totals }, updateItemCount];
    }, [optionCounts, totals]);

    return<OrderDetails.Provider value={value} {...props} />


}