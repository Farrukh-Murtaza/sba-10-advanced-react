import { useEffect, useState } from "react";

function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [value, setValue] = useState<T>(() => {
        try {
            const storedValue = localStorage.getItem(key);

            return storedValue !== null
                ? JSON.parse(storedValue)
                : initialValue;
        } catch (error) {
            console.error("Error reading localStorage:", error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Error saving to localStorage:", error);
        }
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;