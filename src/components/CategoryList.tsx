import type { Category } from "../types";
import CategoryCard from "./CategoryCard";

interface CategoryListProps {
    categories: Category[];
}

function CategoryList({
    categories,
}: CategoryListProps) {
    if (categories.length === 0) {
        return (
            <p className="py-10 text-center text-stone-500">
                No categories found.
            </p>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category, index) => (
                <div
                    key={category.idCategory}
                    className="animate-fade-up"
                    style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
                >
                    <CategoryCard category={category} />
                </div>
            ))}
        </div>
    );
}

export default CategoryList;
