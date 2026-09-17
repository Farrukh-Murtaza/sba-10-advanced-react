import { Link, useParams } from "react-router-dom";

import useFetch from "../hooks/useFetch";
import type { RecipesResponse } from "../types";

import RecipeList from "../components/RecipeList";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

function CategoryPage() {
    const { categoryName } = useParams<{
        categoryName: string;
    }>();

    const category = decodeURIComponent(
        categoryName ?? ""
    );

    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
        category
    )}`;

    const { data, loading, error } =
        useFetch<RecipesResponse>(url);

    const recipes = data?.meals ?? [];

    return (
        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
            <Link
                to="/"
                className="inline-flex items-center gap-1 text-sm font-medium text-stone-500 transition hover:text-orange-600"
            >
                ← All categories
            </Link>

            <div className="mb-8 mt-4">
                <h1 className="font-display text-3xl font-bold text-stone-900 sm:text-4xl">
                    {category} <span className="text-gradient">Recipes</span>
                </h1>

                <p className="mt-2 text-stone-500">
                    Browse recipes in the {category} category.
                </p>
            </div>

            {loading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {!loading && !error && <RecipeList recipes={recipes} />}
        </main>
    );
}

export default CategoryPage;
