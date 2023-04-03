import React, {createContext, useContext, useState} from "react";

const HandleContext = createContext({
        handleDisabled: true,
        setHandleDisabled: () => null
    }
)

export const useHandle = () => useContext(HandleContext);

export const HandleContextProvider = ({children}) => {
    const [handleDisabled, setHandleDisabled] = useState(true);

    return (
        <HandleContext.Provider value={{handleDisabled, setHandleDisabled}}>
            {children}
        </HandleContext.Provider>
    )
}