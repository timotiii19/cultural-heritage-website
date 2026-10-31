import { Link } from 'react-router-dom';

export default function FestivalsPage() {
  return (
    <div className="min-h-screen bg-red-50 p-8">
      <Link to="/" className="text-red-600 hover:underline mb-8 inline-block">&larr; Back to Home</Link>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md border-t-4 border-red-600">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Vibrant Festivals</h1>
        <p className="text-gray-700 text-lg mb-6">
          Celebrating our shared heritage through music, dance, and community gatherings (Sinulog, Ati-Atihan, etc.).
        </p>
        <div className="h-64 bg-red-100 rounded-lg flex items-center justify-center text-red-500">
          [Festivals Content Goes Here]
        </div>
      </div>
    </div>
  );
}