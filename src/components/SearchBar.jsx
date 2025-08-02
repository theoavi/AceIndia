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
  { label: "Runner Up Voet Nubmer", value: "RVoteNumber" },
  { label: "Runner Up Vote Percent", value: "RVotePercent" },
];

export default function SearchBar({ onSearch, hasResults }) {
  const [query, setQuery] = useState("");
  const [column, setColumn] = useState("CName");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query, column);
    }
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
        <select
          value={column}
          onChange={(e) => setColumn(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
        >
          {columns.map((col) => (
            <option key={col.value} value={col.value}>
              {col.label}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-80"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition w-full sm:w-auto"
        >
          Search
        </button>
      </div>
    </div>
  );
}
