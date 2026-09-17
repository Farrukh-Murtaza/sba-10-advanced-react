import { Link } from "react-router-dom";
import type { Category } from "../types";

interface CategoryCardProps {
    category: Category;
}

function CategoryCard({
    category,
}: CategoryCardProps) {
    return (
        <Link
            to={`/category/${encodeURIComponent(
                category.strCategory
            )}`}
            className="group relative block overflow-hidden rounded-3xl bg-stone-900 shadow-md shadow-orange-950/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-900/10"
        >
            <img
                src={category.strCategoryThumb}
                alt={category.strCategory}
                className="h-56 w-full object-cover opacity-90 transition duration-500 group-hover:scale-110 group-hover:opacity-100"
            />

            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-5">
                <h2 className="font-display text-xl font-semibold text-white">
                    {category.strCategory}
                </h2>

                <p className="mt-1 line-clamp-2 text-sm text-white/70">
                    {category.strCategoryDescription}
                </p>

                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-orange-300 opacity-0 transition group-hover:opacity-100">
                    Explore recipes →
                </span>
            </div>
        </Link>
    );
}

export default CategoryCard;
