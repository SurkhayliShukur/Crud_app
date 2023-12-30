import { createContext } from "react";
import React from "react";

export const Context = createContext();

const Provider = ({ children }) => {

const value = {

}

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default Provider
