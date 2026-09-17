import { Link } from "react-router-dom";
import type { Recipe } from "../types";

import { useFavorites } from "../hooks/useFavorites";

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

    const handleFavorite = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
        event.stopPropagation();

        if (favorite) {
            removeFavorite(recipe.idMeal);
        } else {
            addFavorite(recipe.idMeal);
        }
    };

    return (
        <article className="group relative overflow-hidden rounded-3xl bg-white shadow-md shadow-stone-200/70 ring-1 ring-stone-100 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <Link to={`/recipe/${recipe.idMeal}`}>
                <div className="relative overflow-hidden">
                    <img
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                        className="h-52 w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                </div>

                <div className="p-4">
                    <h2 className="line-clamp-2 font-display text-lg font-semibold leading-snug text-stone-900">
                        {recipe.strMeal}
                    </h2>
                </div>
            </Link>

            <button
                type="button"
                onClick={handleFavorite}
                aria-label={
                    favorite ? "Remove from favorites" : "Add to favorites"
                }
                className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-base shadow-sm backdrop-blur transition ${favorite
                    ? "bg-rose-500 text-white"
                    : "bg-white/90 text-stone-700 hover:bg-white"
                    }`}
            >
                {favorite ? "♥" : "♡"}
            </button>
        </article>
    );
}

export default RecipeCard;
