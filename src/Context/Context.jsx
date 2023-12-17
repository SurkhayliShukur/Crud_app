import { createContext } from "react";
import React from "react";

export const Context = createContext();

const Provider = ({ children }) => {



    return (
        <Context.Provider>
            {children}
        </Context.Provider>
    )
}

export default Provider
