import React, {createContext, memo, useContext, useState} from "react";
import {useEffect} from "react";

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

//-----------------------------
export const HandleContext = createContext({
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

//---------------
// export const ModalContext = createContext({
//         isOpen: false,
//         setIsOpen: () => null,
//         message: "",
//         setMessage: () => null
//     }
// )
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