import { Link } from "react-router-dom";

import { useFavorites } from "../hooks/useFavorites";
import useFetch from "../hooks/useFetch";

import type {
    RecipeDetailResponse,
} from "../types";

function FavoriteRecipe({
    id,
}: {
    id: string;
}) {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

    const { data, loading, error } =
        useFetch<RecipeDetailResponse>(url);

    if (loading) {
        return (
            <div className="flex h-56 items-center justify-center rounded-3xl bg-stone-100">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-100 border-t-orange-500" />
            </div>
        );
    }

    if (error || !data?.meals?.[0]) {
        return null;
    }

    const recipe = data.meals[0];

    return (
        <Link
            to={`/recipe/${recipe.idMeal}`}
            className="group overflow-hidden rounded-3xl bg-white shadow-md shadow-stone-200/70 ring-1 ring-stone-100 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
            <div className="overflow-hidden">
                <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="h-48 w-full object-cover transition duration-500 group-hover:scale-110"
                />
            </div>

            <div className="p-4">
                <h2 className="font-display font-semibold text-stone-900">
                    {recipe.strMeal}
                </h2>

                <p className="mt-1 text-sm text-stone-500">
                    {recipe.strCategory}
                </p>
            </div>
        </Link>
    );
}

function FavoritesPage() {
    const { favoriteIds } = useFavorites();

    if (favoriteIds.length === 0) {
        return (
            <main className="mx-auto flex max-w-2xl flex-col items-center gap-3 px-4 py-24 text-center">
                <span className="text-5xl">💔</span>

                <h1 className="font-display text-3xl font-bold text-stone-900">
                    No Favorites Yet
                </h1>

                <p className="text-stone-500">
                    Browse our recipes and tap the heart to save your
                    favorites here.
                </p>

                <Link
                    to="/"
                    className="mt-4 inline-block rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                    Browse Recipes
                </Link>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
            <h1 className="mb-2 font-display text-3xl font-bold text-stone-900 sm:text-4xl">
                My <span className="text-gradient">Favorites</span>
            </h1>
            <p className="mb-8 text-stone-500">
                {favoriteIds.length} saved recipe
                {favoriteIds.length === 1 ? "" : "s"}
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {favoriteIds.map((id) => (
                    <FavoriteRecipe
                        key={id}
                        id={id}
                    />
                ))}
            </div>
        </main>
    );
}

export default FavoritesPage;
