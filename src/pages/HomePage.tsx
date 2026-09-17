import useFetch from "../hooks/useFetch";
import type { CategoriesResponse } from "../types";

import CategoryList from "../components/CategoryList";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

function HomePage() {
    const { data, loading, error } =
        useFetch<CategoriesResponse>(
            "https://www.themealdb.com/api/json/v1/1/categories.php"
        );

    const categories = data?.categories ?? [];

    return (
        <main>
            <section className="relative overflow-hidden bg-linear-to-br from-orange-50 via-[#fffaf5] to-rose-50">
                <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-pink-200/40 blur-3xl" />

                <div className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:py-24">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-orange-600 shadow-sm">
                        🍅 Powered by TheMealDB
                    </span>

                    <h1 className="mt-6 font-display text-4xl font-bold text-stone-900 sm:text-5xl md:text-6xl">
                        Find your next
                        <span className="text-gradient"> favorite dish</span>
                    </h1>

                    <p className="mx-auto mt-4 max-w-xl text-base text-stone-600 sm:text-lg">
                        Browse hundreds of recipes by category, search for
                        something specific, and save your favorites for later.
                    </p>
                </div>
            </section>

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <h2 className="font-display text-2xl font-semibold text-stone-900 sm:text-3xl">
                            Browse by Category
                        </h2>
                        <p className="mt-1 text-stone-500">
                            Pick a category to see what's cooking.
                        </p>
                    </div>
                </div>

                {loading && <LoadingSpinner />}
                {error && <ErrorMessage message={error} />}
                {!loading && !error && (
                    <CategoryList categories={categories} />
                )}
            </div>
        </main>
    );
}

export default HomePage;
