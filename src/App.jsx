import { useState } from "react";
import SearchBar from "./components/SearchBar";
import ResultCard from "./components/ResultCard";
import staticData from './data/staticData.json';

export default function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResults = async (queryKey, searchColumn) => {
    if (!queryKey || !searchColumn) {
      console.warn("❌ Missing query key or column");
      return;
    }

    setLoading(true);
    setResults([]);

    try {
      // Optional delay (for smoother UX)
      await new Promise((resolve) => setTimeout(resolve, 300));

      const filtered = staticData
        .map((tab) => {
          const seen = new Set();
          const rows = tab.rows.filter((row) => {
            const value = row[searchColumn]?.toString().toLowerCase();
            const isMatch = value?.includes(queryKey.toLowerCase());
            if (isMatch && !seen.has(value)) {
              seen.add(value);
              return true;
            }
            return false;
          });

          return { year: tab.year, rows };
        })
        .filter((tab) => tab.rows.length > 0);

      setResults(filtered);
    } catch (err) {
      console.error("❌ Error during local search:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ This reflects the actual current state of results
  const hasResults = results.length > 0;

  return (
    <div className="min-h-screen bg-gray-100">
      <SearchBar onSearch={fetchResults} hasResults={hasResults} />

      <div className="p-4 max-w-6xl mx-auto">
        {loading && (
          <p className="text-center text-blue-600 font-medium text-lg animate-pulse">
            Loading results...
          </p>
        )}

        {!loading && results.length === 0 && (
          <p className="text-center text-gray-400">No results found.</p>
        )}

        <div className="grid gap-6">
          {results.map(({ year, rows }) =>
            rows.map((row, idx) => (
              <div key={`${year}-${idx}`} className="flex justify-center">
                <div className="w-full max-w-5xl">
                  <ResultCard year={year} data={row} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
