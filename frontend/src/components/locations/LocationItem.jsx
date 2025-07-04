import { FaEdit, FaTrash, FaChevronRight } from 'react-icons/fa';

export default function LocationItem({ 
  location, 
  onSelect, 
  onEdit, 
  onDelete,
  currentLevel
}) {
  const levelNames = {
    0: 'Country',
    1: 'State/Province',
    2: 'City',
    3: 'District'
  };

  const nextLevelName = levelNames[currentLevel + 1] || 'Child';

  return (
    <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-4 rounded shadow mb-2">
      <div className="flex items-center w-full">
        <button 
          onClick={() => onSelect(location)}
          className={`flex items-center w-full text-left ${
            location.childCount > 0 ? 'hover:text-blue-500' : ''
          }`}
          aria-label={`View ${nextLevelName}s of ${location.name}`}
        >
          <div className="flex-grow">
            <span className="font-bold">{location.name}</span>
            {location.code && (
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                ({location.code})
              </span>
            )}
          </div>
          
          {location.childCount > 0 && (
            <div className="flex items-center">
              <span 
                className="ml-2 text-xs bg-gray-200 dark:bg-gray-700 rounded-full px-2 py-1"
                title={`${location.childCount} ${nextLevelName}s`}
              >
                {location.childCount}
              </span>
              <FaChevronRight className="ml-2 text-sm" />
            </div>
          )}
        </button>
      </div>
      <div className="flex space-x-2">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onEdit(location);
          }}
          className="text-yellow-500 hover:text-yellow-700"
          aria-label={`Edit ${location.name}`}
        >
          <FaEdit />
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onDelete(location);
          }}
          className="text-red-500 hover:text-red-700"
          aria-label={`Delete ${location.name}`}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}