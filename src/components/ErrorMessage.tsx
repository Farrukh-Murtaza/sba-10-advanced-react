interface ErrorMessageProps {
    message: string;
}

function ErrorMessage({
    message,
}: ErrorMessageProps) {
    return (
        <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl border border-red-100 bg-red-50/70 px-6 py-10 text-center">
            <span className="text-3xl">⚠️</span>

            <h2 className="font-display text-lg font-semibold text-red-700">
                Unable to load recipes
            </h2>

            <p className="text-sm text-red-600/80">
                {message}
            </p>
        </div>
    );
}

export default ErrorMessage;
