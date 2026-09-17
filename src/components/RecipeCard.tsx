import type { Recipe } from "../types";
import { useFavorites } from "../contexts/useFavorites";

interface RecipeCardProps {
    recipe: Recipe;
}

function RecipeCard({
    recipe,
}: RecipeCardProps) {
    const {
        addFavorite,
        removeFavorite,
        isFavorite,
    } = useFavorites();

    const favorite = isFavorite(recipe.idMeal);

    const handleFavorite = () => {
        if (favorite) {
            removeFavorite(recipe.idMeal);
        } else {
            addFavorite(recipe.idMeal);
        }
    };

    return (
        <article className="overflow-hidden rounded-lg bg-white shadow-md">
            <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="h-48 w-full object-cover"
            />

            <div className="p-4">
                <h2 className="text-lg font-semibold">
                    {recipe.strMeal}
                </h2>

                <button
                    type="button"
                    onClick={handleFavorite}
                    className="mt-4 w-full rounded-md bg-gray-100 px-4 py-2 transition hover:bg-gray-200"
                >
                    {favorite
                        ? "♥ Remove Favorite"
                        : "♡ Add to Favorites"}
                </button>
            </div>
        </article>
    );
}

export default RecipeCard;