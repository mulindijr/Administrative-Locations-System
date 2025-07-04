import LocationItem from './LocationItem';
import LevelBadge from './LevelBadge';

export default function LocationList({ 
  locations, 
  onSelect, 
  onEdit, 
  onDelete,
  onAdd,
  currentLevel
}) {
  const levelNames = {
    0: 'Countries',
    1: 'States/Provinces',
    2: 'Cities',
    3: 'Districts'
  };

  const safeLevel = typeof currentLevel === 'number' ? currentLevel : locations[0]?.level ?? 0;

  if (locations.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-400">
          No {levelNames[safeLevel]?.toLowerCase() || 'locations'} found
        </p>
        <button 
          onClick={onAdd}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2 justify-center"
        >
          Add {levelNames[safeLevel]?.split('/')[0]?.trim() || 'Location'}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <LevelBadge level={Number.isInteger(currentLevel) ? currentLevel : locations[0]?.level ?? 0} />
      {locations.map(location => (
        <LocationItem
          key={location.id}
          location={location}
          onSelect={onSelect}
          onEdit={onEdit}
          onDelete={onDelete}
          currentLevel={safeLevel}
        />
      ))}
    </div>
  );
}