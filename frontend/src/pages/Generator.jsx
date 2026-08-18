import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { generatorService, productsService, generateDescription } from '../services/api';
import toast from 'react-hot-toast';

const Generator = () => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [tone, setTone] = useState('professional');
  const [language, setLanguage] = useState('english');
  const [history, setHistory] = useState([]);
  const [tones, setTones] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      loadTones();
      loadHistory();
    }
  }, [isAuthenticated]);

  const loadTones = async () => {
    try {
      const response = await generatorService.getTones();
      setTones(response.data || ['professional', 'casual', 'luxury', 'funny', 'emotional']);
    } catch (error) {
      setTones(['professional', 'casual', 'luxury', 'funny', 'emotional']);
    }
  };

  const loadHistory = async () => {
    try {
      const response = await generatorService.getHistory();
      setHistory(response.data || []);
    } catch (error) {
      setHistory([]);
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!productName.trim()) {
      toast.error('Please enter a product name');
      return;
    }

    setLoading(true);
    try {
      const result = await generateDescription({
        product_name: productName,
        category: category || undefined,
        tone: tone,
        language: language,
      });
      setDescription(result.description || result);
      toast.success('Description generated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to generate description.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success('Copied to clipboard!');
  };

  const handleSave = async () => {
    try {
      await productsService.saveDescription({
        product_name: productName,
        description: description,
        tone: tone,
        language: language,
      });
      toast.success('Description saved successfully!');
      loadHistory();
    } catch (error) {
      toast.error('Failed to save description');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 w-full">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 p-4 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-indigo-600">✨ AI Generator</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {sidebarOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row w-full min-h-[calc(100vh-64px)]">
        
        {/* Sidebar - 25% with white background */}
        <div className={`
          ${sidebarOpen ? 'block' : 'hidden'} 
          lg:block 
          w-full lg:w-1/4 
          bg-white 
          border-r border-gray-200 
          p-4 lg:p-6 
          overflow-y-auto
          lg:min-h-screen
          fixed lg:relative
          top-0 lg:top-auto
          left-0
          z-40
          h-full lg:h-auto
          shadow-lg lg:shadow-none
        `}>
          <div className="lg:sticky lg:top-6">
            <div className="hidden lg:block mb-6">
              <h2 className="text-xl font-bold text-gray-900">🎯 Product Details</h2>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                >
                  <option value="">Select category</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="home">Home & Living</option>
                  <option value="beauty">Beauty</option>
                  <option value="sports">Sports</option>
                  <option value="food">Food</option>
                  <option value="toys">Toys</option>
                  <option value="books">Books</option>
                  <option value="furniture">Furniture</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tone
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                >
                  {tones.map((t) => (
                    <option key={t} value={t}>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                  <option value="hindi">Hindi</option>
                  <option value="chinese">Chinese</option>
                  <option value="japanese">Japanese</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading || !isAuthenticated}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
                  loading || !isAuthenticated
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </span>
                ) : (
                  '✨ Generate Description'
                )}
              </button>

              {!isAuthenticated && (
                <p className="text-sm text-amber-600 text-center">
                  ⚠️ Please login to generate descriptions
                </p>
              )}
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">💡 Quick Tips</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Be specific about product features</li>
                <li>• Include target audience</li>
                <li>• Mention key benefits</li>
                <li>• Keep it concise and engaging</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Content - 75% with gray background */}
        <div className="w-full lg:flex-1 p-4 lg:p-6 bg-gray-100">
          <div className="max-w-4xl mx-auto">
            {/* Generated Description - White card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">📝 Generated Description</h2>
                {description && (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopy}
                      className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
                    >
                      📋 Copy
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 text-sm bg-indigo-100 hover:bg-indigo-200 rounded-lg transition-colors text-indigo-700"
                    >
                      💾 Save
                    </button>
                  </div>
                )}
              </div>

              {description ? (
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                    {description}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => setDescription('')}
                      className="px-4 py-2 text-sm bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      🗑️ Clear
                    </button>
                    <button
                      onClick={handleGenerate}
                      className="px-4 py-2 text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      🔄 Regenerate
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🤖</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No Description Generated Yet
                  </h3>
                  <p className="text-gray-500">
                    Fill in the product details on the left and click generate
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    {isAuthenticated ? 'Ready to create amazing descriptions!' : 'Please login to start generating'}
                  </p>
                </div>
              )}
            </div>

            {/* Recent History - White card */}
            <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Recent Descriptions</h3>
              {isAuthenticated ? (
                history.length > 0 ? (
                  <div className="space-y-3">
                    {history.map((item) => (
                      <div 
                        key={item.id} 
                        className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors cursor-pointer"
                        onClick={() => {
                          setDescription(item.description);
                          setProductName(item.product_name || item.productName);
                          setSidebarOpen(false);
                        }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">{item.product_name || item.productName}</p>
                            <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                          </div>
                          <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                            {new Date(item.created_at || item.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No descriptions generated yet</p>
                )
              ) : (
                <p className="text-sm text-gray-500">Login to see your recent descriptions</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generator;