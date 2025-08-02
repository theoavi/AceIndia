export default function ResultCard({ year, data }) {
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
          <strong>Party:</strong> {data.WPartyName}
        </div>
        <div>
          <strong>Votes:</strong> {data.WVotesNumber}
        </div>
        <div>
          <strong>Vote %:</strong> {data.WVotePercent || "—"}
        </div>
        <div>
          <strong>Runner Up:</strong> {data.RCandidateName}
        </div>
        <div>
          <strong>Party:</strong> {data.RPartyName}
        </div>
        <div>
          <strong>Votes:</strong> {data.RVoteNumber}
        </div>
        <div>
          <strong>Vote %:</strong> {data.RVotePercent || "—"}
        </div>
        <div>
          <strong>Margin:</strong> {data.Margin}
        </div>
      </div>
    </div>
  );
}
