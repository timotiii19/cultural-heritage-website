import { Link } from 'react-router-dom';

export default function ArtsPage() {
  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <Link to="/" className="text-blue-600 hover:underline mb-8 inline-block">&larr; Back to Home</Link>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md border-t-4 border-blue-600">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Filipino Visual Arts</h1>
        <p className="text-gray-700 text-lg mb-6">
          This page is dedicated to showcasing traditional and contemporary Filipino art. 
          Your designer can edit this specific file to add galleries, artist profiles, and more!
        </p>
        <div className="h-64 bg-blue-100 rounded-lg flex items-center justify-center text-blue-500">
          [Art Gallery Goes Here]
        </div>
      </div>
    </div>
  );
}