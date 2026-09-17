import useFetch from "../hooks/useFetch";

import type {
    RecipesResponse,
} from "../types";

import RecipeList from "../components/RecipeList";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

function RecipesPage() {
    const {
        data,
        loading,
        error,
    } = useFetch<RecipesResponse>(
        "https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken"
    );

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    const recipes = data?.meals ?? [];

    return (
        <main className="p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold">
                    Chicken Recipes
                </h1>

                <p className="mt-2 text-gray-600">
                    Browse delicious chicken recipes.
                </p>
            </div>

            <RecipeList recipes={recipes} />
        </main>
    );
}

export default RecipesPage;