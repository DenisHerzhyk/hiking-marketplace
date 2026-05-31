import { Trail } from "../interfaces/TrailInterface";

const difficultyLabel = ["Easy", "Moderate", "Hard", "Alpine"];

const difficultyColor: Record<string, string> = {
  Easy: "text-green-700 bg-green-50",
  Moderate: "text-yellow-700 bg-yellow-50",
  Hard: "text-red-700 bg-red-50",
  Alpine: "text-purple-700 bg-purple-50",
};

const TrailCard = ({
  trail,
  fallbackImg,
}: {
  trail: Trail;
  fallbackImg: string;
}) => {
  const t = trail.tags;
  const name = t.name ?? "Unnamed trail";
  const difficulty =
    difficultyLabel[Math.floor(Math.random() * difficultyLabel.length)];
  const distance = t.distance ? `${parseFloat(t.distance).toFixed(1)} km` : "—";
  const network = t.network?.toUpperCase() ?? "—";
  const colorClass = difficultyColor[difficulty] ?? "text-gray-600 bg-gray-100";

  return (
    <div className="flex flex-col w-[280px] rounded-[10px] shadow-lg overflow-hidden bg-white flex-shrink-0">
      <div className="w-full h-[160px] bg-gray-200 relative flex items-center justify-center">
        <img
          src={`https://source.unsplash.com/400x200/?hiking,trail,${encodeURIComponent(name)}`}
          className="w-full h-full object-cover"
          alt={name}
          onError={(e) => {
            (e.target as HTMLImageElement).src = fallbackImg;
          }}
        />
        <span
          className={`absolute top-2 left-2 text-[11px] font-medium px-2.5 py-1 rounded-full ${colorClass}`}
        >
          {difficulty}
        </span>
      </div>

      <div className="p-3 h-full flex flex-col justify-between">
        <p className="text-sm font-semibold line-clamp-2 leading-tight">
          {name}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>📍 {network}</span>
          <span>📏 {distance}</span>
        </div>
        <a
          href={`https://www.openstreetmap.org/relation/${trail.id}`}
          target="_blank"
          className="text-xs text-blue-500 hover:underline mt-1"
        >
          View route →
        </a>
      </div>
    </div>
  );
};

export default TrailCard;
