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
            <div className="py-10 text-center text-gray-500">
                No recipes found.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recipes.map((recipe) => (
                <RecipeCard
                    key={recipe.idMeal}
                    recipe={recipe}
                />
            ))}
        </div>
    );
}

export default RecipeList;