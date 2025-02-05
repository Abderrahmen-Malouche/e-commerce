
import {products} from '../assets/assets';
import { createContext } from 'react';
export const ShopContext = createContext();

const ShopContextProvider = ({children})=>{
 
        const currency="$";
        const deliveryCost=10;

        const value={
            currency,
            deliveryCost,
            products
        }
        return(
            <ShopContext.Provider value={value}>
                {children}
            </ShopContext.Provider>
        )

}

export default ShopContextProvider;