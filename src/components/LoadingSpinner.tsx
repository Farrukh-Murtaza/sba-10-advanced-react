function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-24">
            <div className="relative h-14 w-14">
                <div className="absolute inset-0 animate-spin rounded-full border-4 border-orange-100 border-t-orange-500" />
                <div className="absolute inset-0 flex items-center justify-center text-lg">
                    🍽️
                </div>
            </div>

            <p className="text-sm font-medium text-stone-500">
                Cooking up your recipes&hellip;
            </p>
        </div>
    );
}

export default LoadingSpinner;
