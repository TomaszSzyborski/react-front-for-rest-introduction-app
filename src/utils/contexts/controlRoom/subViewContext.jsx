import React, {createContext, useContext, useEffect, useState} from "react";

const SubViewContext = createContext({
        internalVisibility: false,
        setInternalVisibility: () => null,
        subView: null,
        setSubView: () => null
    }
)

export const useSubView = () => useContext(SubViewContext);

export const SubViewContextProvider = ({children}) => {
    const [internalVisibility, setInternalVisibility] = useState(false);
    const [subView, setSubView] = useState(null);

    return (
        <SubViewContext.Provider value={{internalVisibility,setInternalVisibility, subView, setSubView}}>
            {children}
        </SubViewContext.Provider>
    )
}