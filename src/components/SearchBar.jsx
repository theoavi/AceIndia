import { useState } from "react";

const columns = [
  { label: "Constituency Number", value: "CNo" },
  { label: "Constituency Name", value: "CName" },
  { label: "Winner Candidate", value: "WCandiatename" },
  { label: "Winning Party", value: "WPartyName" },
  { label: "Winning Votes Number", value: "WVotesNumber" },
  { label: "Winning Votes Percent", value: "WVotePercent" },
  { label: "Runner Up Candidate", value: "RCandidateName" },
  { label: "Runner Up Party", value: "RPartyName" },
  { label: "Runner Up Vote Number", value: "RVoteNumber" },
  { label: "Runner Up Vote Percent", value: "RVotePercent" },
];

export default function SearchBar({ onSearch, hasResults, staticData }) {
  const [query, setQuery] = useState("");
  const [column, setColumn] = useState("CName");
  const numericColumns = ["WVotePercent", "RVotePercent", "Margin"];
  const isNumeric = numericColumns.includes(column);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const handleSearch = () => {
    if (isNumeric) {
      onSearch({ min, max }, column);
    } else if (query.trim()) {
      onSearch(query, column);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setMin("");
    setMax("");
    onSearch("", column);
  };

  return (
    <div
      className={`w-full ${
        hasResults
          ? "pt-6 pb-4 px-4 bg-gray-50 sticky top-0 z-10 shadow"
          : "min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6"
      }`}
    >
      <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-6 rounded-xl shadow-md w-full max-w-2xl mx-auto">
        {/* Column Selector */}
        <select
          value={column}
          onChange={(e) => {
            setColumn(e.target.value);
            setQuery("");
            setMin("");
            setMax("");
          }}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
        >
          {columns.map((col) => (
            <option key={col.value} value={col.value}>
              {col.label}
            </option>
          ))}
        </select>

        {/* Input Based on Column Type */}
        {isNumeric ? (
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-24"
            />
            <input
              type="number"
              placeholder="Max"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-24"
            />
          </div>
        ) : column === "WPartyName" || column === "RPartyName" ? (
          <select
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
          >
            <option value="">Select Party</option>
            <option value="BJP">BJP</option>
            <option value="SP">SP</option>
            <option value="INC">INC</option>
          </select>
        ) : (
          <>
            <input
              list="suggestions"
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-80"
            />
            <datalist id="suggestions">
              {Array.from(
                new Set(
                  staticData.flatMap((tab) =>
                    tab.rows.map((row) => row[column]?.toString()).filter(Boolean)
                  )
                )
              )
                .sort()
                .map((item, i) => (
                  <option key={i} value={item} />
                ))}
            </datalist>
          </>
        )}

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition w-full sm:w-auto"
        >
          Search
        </button>

        {/* Clear Search Button */}
        {(query || min || max) && (
          <button
            onClick={clearSearch}
            className="text-gray-500 hover:text-red-600 px-3 py-2"
            title="Clear search"
          >
            ✖
          </button>
        )}
      </div>
    </div>
  );
}
