import type { ReactNode } from "react";

import { FavoritesContext } from "./FavoritesContext";
import useLocalStorage from "../hooks/useLocalStorage";

interface FavoritesProviderProps {
    children: ReactNode;
}

export function FavoritesProvider({
    children,
}: FavoritesProviderProps) {
    const [favoriteIds, setFavoriteIds] =
        useLocalStorage<string[]>(
            "favorite-recipes",
            []
        );

    const addFavorite = (id: string) => {
        setFavoriteIds((currentIds) => {
            if (currentIds.includes(id)) {
                return currentIds;
            }

            return [...currentIds, id];
        });
    };

    const removeFavorite = (id: string) => {
        setFavoriteIds((currentIds) =>
            currentIds.filter(
                (favoriteId) => favoriteId !== id
            )
        );
    };

    const isFavorite = (id: string) => {
        return favoriteIds.includes(id);
    };

    return (
        <FavoritesContext.Provider
            value={{
                favoriteIds,
                addFavorite,
                removeFavorite,
                isFavorite,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}