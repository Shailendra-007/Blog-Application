// IN whole application we require name and username every where i.e. user ,comment so we use context API 
// that store it globalay and pass it through components; 
import { createContext , useState } from "react";


export const DataContext = createContext(null);
// it is pass as a children so intialize children as a object.
export const DataProvider = ({children}) =>{

    const [account , setAccount] = useState({name:'' , username:''})
    return(
        <DataContext.Provider value= {{
                account,
                setAccount
        }}>
            {children}
            </DataContext.Provider>
    )
}

export default DataProvider;