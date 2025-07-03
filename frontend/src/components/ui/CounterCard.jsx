import CountUp from 'react-countup';

export default function CounterCard({ label, value }) {
    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 text-center">
            <p className="text-2xl font-bold">
                <CountUp end={value} duration={1.5} separator="," />
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
        </div>
    );
}