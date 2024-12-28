"use client";
import { createContext , useContext , useEffect, useState} from "react";

interface GlobalContextType {
    favorites : string[];
    addFavorites : (id : string ) => void;
    deleteFavorite : (id : string ) => void;
    clearFavorites : () => void;
}

const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalContextProvider = ({children} : {children : React.ReactNode}) => {
    const [favorites , setFavorites] = useState<string[]>([]);
    const addFavorites = ( id : string) =>{
        if(!favorites.includes(id)){
            setFavorites([...favorites , id]);
        }
    }
    const deleteFavorite = (id : string ) =>{
        setFavorites(favorites.filter(favorite => favorite !== id));
    }
    const clearFavorites = () =>{
        setFavorites([]);
    }

    useEffect(()=>{
        const storedFavorites = localStorage.getItem("favorites");
        if(storedFavorites){
            setFavorites( JSON.parse(storedFavorites));
        }
    },[])

    useEffect(()=>{
        localStorage.setItem("favorites" , JSON.stringify(favorites));
    },[favorites])
    return (
        <GlobalContext.Provider value={{favorites, addFavorites , deleteFavorite , clearFavorites} } >
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (context === null) {
        throw new Error("useGlobalContext must be used within a GlobalContextProvider");
    }
    return context;
}