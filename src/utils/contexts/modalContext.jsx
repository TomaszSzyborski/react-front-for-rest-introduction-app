import React, {createContext, useContext, useState} from "react";

const ModalContext = createContext({
        isOpen: false,
        setIsOpen: () => null,
        message: "",
        setMessage: () => null
    }
)

export const useModal = () => useContext(ModalContext);

export const ModalContextProvider = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");

    return (
        <ModalContext.Provider value={{isOpen, setIsOpen, message, setMessage}}>
            {children}
        </ModalContext.Provider>
    )
}