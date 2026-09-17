import { Link, useParams } from "react-router-dom";

import useFetch from "../hooks/useFetch";
import { useFavorites } from "../hooks/useFavorites";

import type {
    RecipeDetailResponse,
} from "../types";

import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

function RecipeDetailPage() {
    const { recipeId } = useParams<{
        recipeId: string;
    }>();

    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;

    const { data, loading, error } =
        useFetch<RecipeDetailResponse>(url);

    const {
        addFavorite,
        removeFavorite,
        isFavorite,
    } = useFavorites();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="px-4 py-10">
                <ErrorMessage message={error} />
            </div>
        );
    }

    const recipe = data?.meals?.[0];

    if (!recipe) {
        return (
            <div className="py-24 text-center">
                <h1 className="font-display text-2xl font-semibold text-stone-800">
                    Recipe not found
                </h1>
                <Link
                    to="/"
                    className="mt-4 inline-block text-orange-600 hover:underline"
                >
                    ← Back to home
                </Link>
            </div>
        );
    }

    const favorite = isFavorite(recipe.idMeal);

    const ingredients = Array.from(
        { length: 20 },
        (_, index) => {
            const ingredient =
                recipe[
                `strIngredient${index + 1}` as keyof typeof recipe
                ];

            const measure =
                recipe[
                `strMeasure${index + 1}` as keyof typeof recipe
                ];

            if (
                typeof ingredient !== "string" ||
                ingredient.trim() === ""
            ) {
                return null;
            }

            return {
                ingredient,
                measure:
                    typeof measure === "string"
                        ? measure.trim()
                        : "",
            };
        }
    ).filter(
        (
            item
        ): item is {
            ingredient: string;
            measure: string;
        } => item !== null
    );

    const handleFavorite = () => {
        if (favorite) {
            removeFavorite(recipe.idMeal);
        } else {
            addFavorite(recipe.idMeal);
        }
    };

    return (
        <main className="pb-16">
            <div className="relative h-72 w-full overflow-hidden sm:h-96 mb-16">
                <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/10" />

                <div className="absolute inset-x-0 bottom-0 mx-auto max-w-5xl px-4 pb-6 sm:px-6">
                    <Link
                        to="/"
                        className="mb-3 inline-flex items-center gap-1 text-sm font-medium text-white/80 hover:text-white"
                    >
                        ← Back
                    </Link>

                    <h1 className="font-display text-3xl font-bold text-white drop-shadow-sm sm:text-4xl">
                        {recipe.strMeal}
                    </h1>

                    <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                            {recipe.strCategory}
                        </span>
                        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                            {recipe.strArea}
                        </span>
                    </div>
                </div>
            </div>

            <div className="mx-auto -mt-8 max-w-5xl px-4 sm:px-6">
                <div className="rounded-3xl bg-white p-6 shadow-lg shadow-stone-200/60 ring-1 ring-stone-100 sm:p-8">
                    <button
                        type="button"
                        onClick={handleFavorite}
                        className={`w-full rounded-full px-6 py-3 text-sm font-semibold transition sm:w-auto ${favorite
                            ? "bg-rose-500 text-white hover:bg-rose-600"
                            : "bg-stone-900 text-white hover:bg-orange-600"
                            }`}
                    >
                        {favorite
                            ? "♥ Remove from Favorites"
                            : "♡ Add to Favorites"}
                    </button>

                    <section className="mt-8">
                        <h2 className="mb-4 font-display text-2xl font-semibold text-stone-900">
                            Ingredients
                        </h2>

                        <ul className="grid gap-2 sm:grid-cols-2">
                            {ingredients.map(
                                ({ ingredient, measure }) => (
                                    <li
                                        key={`${ingredient}-${measure}`}
                                        className="flex items-center gap-3 rounded-xl bg-orange-50/70 px-4 py-3"
                                    >
                                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-200 text-xs">
                                            🥕
                                        </span>
                                        <span>
                                            <span className="font-medium text-stone-800">
                                                {ingredient}
                                            </span>
                                            {measure && (
                                                <span className="ml-2 text-sm text-stone-500">
                                                    {measure}
                                                </span>
                                            )}
                                        </span>
                                    </li>
                                )
                            )}
                        </ul>
                    </section>

                    <section className="mt-8">
                        <h2 className="mb-4 font-display text-2xl font-semibold text-stone-900">
                            Instructions
                        </h2>

                        <p className="whitespace-pre-line leading-7 text-stone-700">
                            {recipe.strInstructions}
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}

export default RecipeDetailPage;
