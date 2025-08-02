export default function ResultCard({ year, data }) {
  const winnerPercent = data.WVotePercent || 0;
  const runnerPercent = data.RVotePercent || 0;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
      <div className="bg-blue-600 text-white px-4 py-2 text-lg font-semibold">
        Year: {year}
      </div>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
        <div>
          <strong>Constituency:</strong> {data.CName}
        </div>
        <div>
          <strong>Constituency No:</strong> {data.CNo}
        </div>

        <div>
          <strong>Winner:</strong> {data.WCandiatename}
        </div>
        <div>
          <strong>Party:</strong>{" "}
          <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 rounded">
            {data.WPartyName}
          </span>
        </div>

        <div>
          <strong>Votes:</strong> {data.WVotesNumber}
          <div className="w-full bg-gray-200 rounded h-2 mt-1">
            <div
              className="bg-green-500 h-2 rounded"
              style={{ width: `${winnerPercent}%` }}
            />
          </div>
        </div>
        <div>
          <strong>Vote %:</strong> {winnerPercent}%
        </div>

        <div>
          <strong>Runner Up:</strong> {data.RCandidateName}
        </div>
        <div>
          <strong>Party:</strong>{" "}
          <span className="inline-block px-2 py-0.5 bg-red-100 text-red-700 rounded">
            {data.RPartyName}
          </span>
        </div>

        <div>
          <strong>Votes:</strong> {data.RVoteNumber}
          <div className="w-full bg-gray-200 rounded h-2 mt-1">
            <div
              className="bg-red-500 h-2 rounded"
              style={{ width: `${runnerPercent}%` }}
            />
          </div>
        </div>
        <div>
          <strong>Vote %:</strong> {runnerPercent}%
        </div>

        <div>
          <strong>Margin:</strong>{" "}
          <span
            className={`font-semibold ${
              data.Margin > 20000
                ? "text-green-600"
                : data.Margin < 5000
                ? "text-red-500"
                : "text-yellow-600"
            }`}
          >
            {data.Margin}
          </span>
        </div>
      </div>
    </div>
  );
}
