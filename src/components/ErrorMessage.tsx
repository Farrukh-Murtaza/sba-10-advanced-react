interface ErrorMessageProps {
    message: string;
}

function ErrorMessage({
    message,
}: ErrorMessageProps) {
    return (
        <div className="rounded-lg bg-red-50 p-4 text-center text-red-600">
            <h2 className="font-semibold">
                Unable to load recipes
            </h2>

            <p className="mt-1 text-sm">
                {message}
            </p>
        </div>
    );
}

export default ErrorMessage;