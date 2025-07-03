import { FaChevronRight } from 'react-icons/fa';

export default function Breadcrumb({ items, onNavigate }) {
  return (
    <nav className="flex mb-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={item.id} className="inline-flex items-center">
            {index > 0 && <FaChevronRight className="text-gray-400 mx-2" />}
            <button
              onClick={() => onNavigate(item.id)}
              className={`inline-flex items-center text-sm font-medium ${
                index === items.length - 1 
                  ? 'text-gray-700 dark:text-gray-400' 
                  : 'text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white'
              }`}
              disabled={index === items.length - 1}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}