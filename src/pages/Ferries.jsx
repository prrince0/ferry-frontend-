import { useEffect, useState } from 'react';
import { getFerries } from '../services/ferryService';

const Ferries = () => {
    const [ferries, setFerries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadFerries();
    }, []);

    const loadFerries = async () => {
        try {
            const data = await getFerries();
            setFerries(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load ferries');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="p-8 text-center">Loading ferries...</div>;
    }

    if (error) {
        return <div className="p-8 text-center text-red-500">{error}</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Ferries</h1>
            {ferries.length === 0 ? (
                <p>No ferries found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ferries.map((ferry) => (
                        <div key={ferry.id} className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-2">{ferry.name}</h3>
                            <p className="text-gray-600">Passenger capacity: {ferry.passenger_capacity}</p>
                            <p className="text-gray-600">Vehicle capacity: {ferry.vehicle_capacity}</p>
                            {ferry.image_url && (
                                <img
                                    src={ferry.image_url}
                                    alt={ferry.name}
                                    className="mt-4 rounded w-full h-32 object-cover"
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Ferries;