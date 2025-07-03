import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
                <Outlet />
            </main>
            <footer className="bg-gray-800 text-white p-4 text-center">
                <p>© 2025 Location Management System</p>
            </footer>
        </div>
    );
}