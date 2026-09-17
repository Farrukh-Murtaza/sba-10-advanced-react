import { useState } from "react";

import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
    const [query, setQuery] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const trimmedQuery = query.trim();

        if (!trimmedQuery) {
            return;
        }

        navigate(
            `/search?query=${encodeURIComponent(
                trimmedQuery
            )}`
        );
    };

    const navLinkClasses = (path: string) =>
        `relative text-sm font-semibold transition-colors ${location.pathname === path
            ? "text-orange-600"
            : "text-stone-600 hover:text-stone-900"
        }`;

    return (
        <nav className="sticky top-0 z-50 border-b border-orange-100/80 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 md:flex-row md:items-center md:justify-between md:gap-6 md:py-4">
                <Link
                    to="/"
                    className="flex shrink-0 items-center gap-2 text-xl font-extrabold tracking-tight text-stone-900"
                >
                    <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-linear-to-br from-orange-500 to-pink-500 text-lg shadow-sm shadow-orange-200">
                        🍳
                    </span>
                    <span className="font-display">
                        Kitchen<span className="text-gradient">ly</span>
                    </span>
                </Link>

                <div className="flex items-center gap-5 md:order-3">
                    <Link to="/" className={navLinkClasses("/")}>
                        Home
                    </Link>

                    <Link to="/favorites" className={navLinkClasses("/favorites")}>
                        ♥ Favorites
                    </Link>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-1 items-center gap-2 md:order-2 md:max-w-md"
                >
                    <div className="relative w-full">
                        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-stone-400">
                            🔍
                        </span>

                        <input
                            type="search"
                            value={query}
                            onChange={(event) =>
                                setQuery(event.target.value)
                            }
                            placeholder="Search recipes..."
                            className="w-full rounded-full border border-stone-200 bg-stone-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100"
                        />
                    </div>

                    <button
                        type="submit"
                        className="shrink-0 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
                    >
                        Search
                    </button>
                </form>
            </div>
        </nav>
    );
}

export default Navbar;
