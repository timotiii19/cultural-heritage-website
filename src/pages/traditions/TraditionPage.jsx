import { Link } from 'react-router-dom';

export default function TraditionsPage() {
  return (
    <div className="min-h-screen bg-green-50 p-8">
      <Link to="/" className="text-green-700 hover:underline mb-8 inline-block">&larr; Back to Home</Link>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md border-t-4 border-green-700">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Enduring Traditions</h1>
        <p className="text-gray-700 text-lg mb-6">
          Explore the customs, beliefs, and daily practices passed down through generations.
        </p>
        <div className="h-64 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
          [Traditions Content Goes Here]
        </div>
      </div>
    </div>
  );
}