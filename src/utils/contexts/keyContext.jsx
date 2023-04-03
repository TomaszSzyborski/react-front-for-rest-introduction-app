import React, {createContext, useContext, useState} from "react";

export const KeyContext = createContext({
    key: "",
    setKey: () => null
})

export const useKey = () => useContext(KeyContext);

export const KeyContextProvider = ({children}) => {
    const [key, setKey] = useState("");

    return (
        <KeyContext.Provider value={{key, setKey}}>
            {children}
        </KeyContext.Provider>
    )
}