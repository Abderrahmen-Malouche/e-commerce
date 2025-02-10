
import {products} from '../assets/assets';
import { createContext } from 'react';
import { useState } from 'react';
export const ShopContext = createContext();

const ShopContextProvider = ({children})=>{
 
        const currency="$";
        const deliveryCost=10;
        const [search , setSearch]=useState('');
        const [showSearch,setShowSearch]=useState(true);

        const value={
            currency,
            deliveryCost,
            products,
            search,
            setSearch,
            showSearch,
            setShowSearch
        }
        return(
            <ShopContext.Provider value={value}>
                {children}
            </ShopContext.Provider>
        )

}

export default ShopContextProvider;