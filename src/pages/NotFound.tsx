import { Link } from "react-router-dom";

function NotFound() {
    return (
        <main className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-28 text-center">
            <span className="text-5xl">🍳</span>

            <h1 className="font-display text-gradient text-6xl font-bold">
                404
            </h1>

            <p className="text-lg font-medium text-stone-700">
                This recipe seems to have gone missing.
            </p>

            <p className="text-stone-500">
                The page you're looking for doesn't exist, but there's plenty
                more to cook up.
            </p>

            <Link
                to="/"
                className="mt-4 rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
                Back to Home
            </Link>
        </main>
    );
}

export default NotFound;
