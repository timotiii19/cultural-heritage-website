import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="bg-white shadow-sm py-12 text-center border-b border-gray-200">
        {/* Changed from Pamana to Cultural Heritage */}
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
          Cultural Heritage
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A digital exhibition preserving our collective identity, shared stories, and vibrant traditions.
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Art Card */}
          <Link to="/arts" className="group block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1">
            <div className="h-48 bg-blue-600 group-hover:bg-blue-700 transition-colors flex items-center justify-center">
              <span className="text-white text-5xl opacity-50">🎨</span>
            </div>
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold mb-2">Visual Arts</h2>
              <p className="text-gray-600 text-sm">Discover the strokes and colors that define our collective identity.</p>
            </div>
          </Link>

          {/* Traditions Card */}
          <Link to="/traditions" className="group block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1">
            <div className="h-48 bg-green-700 group-hover:bg-green-800 transition-colors flex items-center justify-center">
              <span className="text-white text-5xl opacity-50">🏺</span>
            </div>
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold mb-2">Traditions</h2>
              <p className="text-gray-600 text-sm">Explore customs and daily practices passed down through generations.</p>
            </div>
          </Link>

          {/* Festivals Card */}
          <Link to="/festivals" className="group block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1">
            <div className="h-48 bg-red-600 group-hover:bg-red-700 transition-colors flex items-center justify-center">
              <span className="text-white text-5xl opacity-50">🥁</span>
            </div>
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold mb-2">Festivals</h2>
              <p className="text-gray-600 text-sm">Celebrate shared heritage through music, dance, and community gatherings.</p>
            </div>
          </Link>

        </div>
      </main>
    </div>
  );
}