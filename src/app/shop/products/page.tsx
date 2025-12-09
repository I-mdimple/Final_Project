// Final_Project\src\app\shop\products\page.tsx (UI Only Enhancement)

// NOTE: We keep the imports clean, just using basic HTML tags

export default function ProductsPage() {
  return (
    <div className="p-10 min-h-screen bg-gray-50"> 
      
      {/* Enhanced Header and Subtitle */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Products Catalog</h1>
      <p className="text-lg text-gray-600 mb-10">Browse all available items and find your perfect match.</p>

      {/* Grid Layout: Adjusted for wider screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        
        {/* TEMPORARY SAMPLE PRODUCT */}
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            // Enhanced Card Styling: Added overflow-hidden for the image/card edge
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden cursor-pointer"
          >
            {/* Image Placeholder Area (Visual Enhancement) */}
            <div className="h-40 w-full bg-gray-200 flex items-center justify-center">
                {/* Simulated Image Placeholder */}
                <span className="text-gray-500 text-sm">Image Placeholder</span>
            </div>

            {/* Product Details Area */}
            <div className="p-5">
              
              {/* Product Name (Increased Hierarchy) */}
              <h2 className="text-xl font-bold text-gray-800 truncate">Product Name #{item}</h2>
              
              {/* Description Placeholder */}
              <p className="text-gray-500 text-sm mt-1">Short description or category tag here.</p>
              
              {/* Price (Strong Visual Emphasis) */}
              <p className="text-2xl font-extrabold text-purple-600 mt-3">
                ${(29.99 * item).toFixed(2)}
              </p>

              {/* Button */}
              <button 
                // Button Styling: Added full width and slightly better hover transition
                className="mt-4 w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}