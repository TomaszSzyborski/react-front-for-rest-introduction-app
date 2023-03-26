import React, {createContext, useContext, useEffect, useState} from "react";

const ModalContext = createContext({
        message: "",
        setMessage: () => null
    }
)

export const useModal = () => useContext(ModalContext);

export const ModalContextProvider = ({children}) => {
    const [message, setMessage] = useState("");

    return (
        <ModalContext.Provider value={{message, setMessage}}>
            {children}
        </ModalContext.Provider>
    )
}