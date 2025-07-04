import { useState, useEffect } from 'react';
import { FaPlus, FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import api from '../../services/api';

import Breadcrumb from './Breadcrumb';
import LocationList from './LocationList';
import LocationForm from './LocationForm';
import SearchBar from '../ui/SearchBar';
import DarkModeToggle from '../ui/DarkModeToggle';

export default function LocationBrowser({ darkMode, setDarkMode }) {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState([
    { id: null, name: 'All Locations', level: -1 }
  ]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editLocation, setEditLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const data = currentLocation
        ? await api.locations.getChildren(currentLocation.id)
        : await api.locations.getByLevel(0);

      const locationsWithCounts = await Promise.all(
        data.map(async loc => {
          const children = await api.locations.getChildren(loc._id);
          return {
            ...loc,
            id: loc._id,
            childCount: children.length,
          };
        })
      );

      setLocations(locationsWithCounts);
    } catch (err) {
      toast.error('Failed to load locations');
    } finally {
      setLoading(false);
    }
  };

  const updateBreadcrumbs = async () => {
    if (!currentLocation) {
      setBreadcrumbs([{ id: null, name: 'All Locations', level: -1 }]);
      return;
    }

    try {
      const path = await api.locations.getPath(currentLocation.id);
      setBreadcrumbs([
        { id: null, name: 'All Locations', level: -1 },
        ...path.map(item => ({
          id: item.id,
          name: item.name,
          level: item.level,
        })),
      ]);
    } catch (err) {
      toast.error('Failed to load breadcrumbs');
    }
  };

  useEffect(() => {
    fetchLocations();
    updateBreadcrumbs();
  }, [currentLocation]);

  const handleLocationSelect = async location => {
    try {
      const loc = await api.locations.getSingle(location.id);
      setCurrentLocation({
        id: loc._id,
        name: loc.name,
        level: loc.level,
      });
    } catch (err) {
      toast.error('Failed to load location details');
    }
  };

  const handleBreadcrumbNavigate = locationId => {
    setCurrentLocation(locationId ? { id: locationId } : null);
  };

  const handleAdd = () => {
    setEditLocation(null);
    setShowForm(true);
  };

  const handleEdit = location => {
    setEditLocation(location);
    setShowForm(true);
  };

  const handleDelete = async location => {
    if (window.confirm(`Delete ${location.name} and all its children?`)) {
      try {
        await api.locations.delete(location.id);
        fetchLocations();
      } catch (err) {
        toast.error('Failed to delete location');
      }
    }
  };

  const handleSaveLocation = async formData => {
    try {
      if (editLocation) {
        await api.locations.update(editLocation.id, formData);
      } else {
        await api.locations.create({
          ...formData,
          parent: currentLocation?.id || null,
          level: currentLocation ? currentLocation.level + 1 : 0,
        });
      }
      setShowForm(false);
      fetchLocations();
    } catch (err) {
      toast.error('Failed to save location');
    }
  };

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (location.code && location.code.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const currentLevel = currentLocation ? currentLocation.level + 1 : 0;

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-green-500" />
          <h2 className="text-xl font-semibold">Locations</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleAdd}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FaPlus /> Add Location
          </button>
          <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
      </div>

      <Breadcrumb
        items={breadcrumbs}
        onNavigate={handleBreadcrumbNavigate}
      />

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {loading ? (
        <div className="text-center py-10">
          <p>Loading locations...</p>
        </div>
      ) : (
        <LocationList
          locations={filteredLocations}
          onSelect={handleLocationSelect}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={handleAdd}
          currentLevel={currentLevel}
        />
      )}

      {showForm && (
        <LocationForm
          initialData={editLocation}
          parentLocation={currentLocation}
          onSave={handleSaveLocation}
          onCancel={() => setShowForm(false)}
        />
      )}
    </section>
  );
}