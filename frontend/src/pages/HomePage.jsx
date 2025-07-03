import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import LocationBrowser from '../components/locations/LocationBrowser';
import api from '../services/api';
import CounterCard from '../components/ui/CounterCard';

// Helper function
const pluralize = (count, singular, plural) => (count === 1 ? singular : plural);

export default function HomePage() {
    const [darkMode, setDarkMode] = useState(true);
    const [stats, setStats] = useState({ countries: 0, states: 0, cities: 0, districts: 0 });

    useEffect(() => {
    const fetchStats = async () => {
        const data = await api.locations.getStats();
        setStats(data);
    };
        fetchStats();
    }, []);
  
    return (
        <div className={`${darkMode ? 'dark' : ''}`}>
            <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white max-w-6xl mx-auto p-6">
                <Toaster position="top-right" />
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold">Administrative Locations</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Manage hierarchical administrative locations system
                        </p>
                    </div>
                </div>

                <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <CounterCard
                        label={pluralize(stats.countries, 'Country', 'Countries')}
                        value={stats.countries}
                    />
                    <CounterCard
                        label={pluralize(stats.states, 'State/Province', 'States/Provinces')}
                        value={stats.states}
                    />
                    <CounterCard
                        label={pluralize(stats.cities, 'City', 'Cities')}
                        value={stats.cities}
                    />
                    <CounterCard
                        label={pluralize(stats.districts, 'District', 'Districts')}
                        value={stats.districts}
                    />
                </section>

                <LocationBrowser darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>
        </div>
    );
}