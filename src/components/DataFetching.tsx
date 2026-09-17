import { useState, useEffect } from 'react';
import type { Category } from '../types';


function DataFetching() {
    // 1. Declare state variables
    const [data, setData] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Instantiate an AbortController to clean up the request if the component unmounts
        const abortController = new AbortController();


        const fetchData = async () => {
            try {
                // Reset states when a new fetch starts
                setLoading(true);
                setError(null);

                const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php', {
                    signal: abortController.signal
                });


                // Fetch only throws on network failure, so we must check HTTP status codes manually
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const json = await response.json();

                // Save successful data to state
                setData(json.categories);
                // console.log(data)
            } catch (err) {
                // Ignore errors caused by explicitly aborting the request
                if (!(err instanceof Error && err.name === 'AbortError')) {
                    setError(err instanceof Error ? err.message : 'Something went wrong.');
                }
            } finally {
                // Always turn off the loading spinner regardless of success or failure
                setLoading(false);
            }
        };

        fetchData();

        // Cleanup function: runs if the component unmounts before the API returns
        return () => {
            abortController.abort();
        };
    }, []); // Empty dependency array ensures this only runs once on mount

    // 2. Conditional Rendering UI Indicators
    if (loading) {
        return (
            <div className="spinner-container">
                <div className="loading-spinner"></div>
                <p>Loading records...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-banner">
                <p>⚠️ Error: {error}</p>
            </div>
        );
    }

    // 3. Success UI
    return (
        <div className="data-container">
            <h2>Fetched Posts</h2>
            <ul >
                {
                    data.map((category) => (
                        <li className='border border-b' key={category.strCategory}>
                            <strong>{category.strCategoryDescription}</strong>
                            <p>{category.strCategoryDescription}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default DataFetching;