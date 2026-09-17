import { createContext } from "react";

export interface FavoritesContextType {
    favoriteIds: string[];
    addFavorite: (id: string) => void;
    removeFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean;
}

export const FavoritesContext =
    createContext<FavoritesContextType | undefined>(
        undefined
    );