import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-md p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold">Ferry Operations System</h1>
                    <div className="flex gap-4 items-center">
                        <span>Welcome, {user?.full_name}</span>
                        <button onClick={logout} className="text-red-500">Logout</button>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto p-8">
                <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link to="/ferries" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold mb-2">View Ferries</h3>
                        <p className="text-gray-600">Browse all ferries and their capacities</p>
                    </Link>
                    <Link to="/schedules" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold mb-2">View Schedules</h3>
                        <p className="text-gray-600">Check sailing schedules and book tickets</p>
                    </Link>
                    <Link to="/my-bookings" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold mb-2">My Bookings</h3>
                        <p className="text-gray-600">View and manage your tickets</p>
                    </Link>
                    {user?.role === 'admin' && (
                        <Link to="/admin" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold mb-2">Admin Panel</h3>
                            <p className="text-gray-600">Manage ferries, schedules, and bookings</p>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;