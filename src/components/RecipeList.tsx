import type { Recipe } from "../types";
import RecipeCard from "./RecipeCard";

interface RecipeListProps {
    recipes: Recipe[];
}

function RecipeList({
    recipes,
}: RecipeListProps) {
    if (recipes.length === 0) {
        return (
            <div className="flex flex-col items-center gap-2 py-16 text-center text-stone-500">
                <span className="text-3xl">🥄</span>
                <p>No recipes found.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recipes.map((recipe, index) => (
                <div
                    key={recipe.idMeal}
                    className="animate-fade-up"
                    style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
                >
                    <RecipeCard recipe={recipe} />
                </div>
            ))}
        </div>
    );
}

export default RecipeList;
