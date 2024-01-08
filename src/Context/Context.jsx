import { createContext } from "react";
import React, { useState } from "react";

export const Context = createContext();

const Provider = ({ children }) => {

    const [show, setShow] = useState(false)
    const [deleteItem, setDeleteItem] = useState(null)


    const openDelModal = (item) => {
        setShow(true)
        setDeleteItem(item)
    }
    const closeDelModal = () => {
        setShow(false)
        setDeleteItem(null)
    }

    const value = {
        show,
        setShow,
        deleteItem,
        setDeleteItem,
        openDelModal,
        closeDelModal
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default Provider
