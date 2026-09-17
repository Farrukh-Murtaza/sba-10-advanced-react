export interface Recipe {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}

export interface RecipesResponse {
    meals: Recipe[] | null;
}

export interface Category {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
}

export interface CategoriesResponse {
    categories: Category[];
}   