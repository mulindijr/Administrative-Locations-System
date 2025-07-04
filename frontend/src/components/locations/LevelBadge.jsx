export default function LevelBadge({ level }) {
  const levelNames = {
    0: 'Country',
    1: 'State/Province',
    2: 'City',
    3: 'District'
  };

  return (
    <div className="mb-2">
      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
        {levelNames[level] || `Level ${level}`}
      </span>
    </div>
  );
}