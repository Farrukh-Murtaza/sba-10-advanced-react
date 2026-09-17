import { useSearchParams } from "react-router-dom";

import useFetch from "../hooks/useFetch";

import type { RecipesResponse } from "../types";

import RecipeList from "../components/RecipeList";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

function SearchPage() {
    const [searchParams] = useSearchParams();

    const query = searchParams.get("query")?.trim() ?? "";

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
        query
    )}`;

    const {
        data,
        loading,
        error,
    } = useFetch<RecipesResponse>(
        query
            ? url
            : "https://www.themealdb.com/api/json/v1/1/search.php?s="
    );

    if (!query) {
        return (
            <main className="mx-auto flex max-w-2xl flex-col items-center gap-3 px-4 py-24 text-center">
                <span className="text-5xl">🔍</span>

                <h1 className="font-display text-3xl font-bold text-stone-900">
                    Search Recipes
                </h1>

                <p className="text-stone-500">
                    Use the search bar above to find a recipe by name.
                </p>
            </main>
        );
    }

    const recipes = data?.meals ?? [];

    return (
        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
            <h1 className="mb-8 font-display text-3xl font-bold text-stone-900 sm:text-4xl">
                Results for{" "}
                <span className="text-gradient">&ldquo;{query}&rdquo;</span>
            </h1>

            {loading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {!loading && !error && <RecipeList recipes={recipes} />}
        </main>
    );
}

export default SearchPage;
