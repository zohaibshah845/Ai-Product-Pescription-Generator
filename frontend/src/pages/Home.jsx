import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            AI-Powered
            <span className="block text-indigo-600">Generate Product Descriptions in Seconds</span>
          </h1>
          <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
            AI-powered product description generator for e-commerce stores. 
            Save hours of writing and boost your sales with professional, SEO-optimized descriptions.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/generator"
              className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl text-lg"
            >
              Start Generating Free
            </Link>
            <Link
              to="/pricing"
              className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-300 hover:border-indigo-600 hover:text-indigo-600 transition-all text-lg"
            >
              View Pricing
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="text-4xl font-bold text-indigo-600">10K+</div>
            <div className="text-gray-600 mt-2">Products Generated</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="text-4xl font-bold text-indigo-600">500+</div>
            <div className="text-gray-600 mt-2">Happy Customers</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="text-4xl font-bold text-indigo-600">4.9/5</div>
            <div className="text-gray-600 mt-2">Average Rating</div>
          </div>
        </div>
      </section>

      {/* Sample Description Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Sample Generated Description
          </h2>
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900">Premium Wireless Headphones</h3>
            <p className="text-gray-600 mt-3 text-lg">
              Experience crystal-clear sound with our premium wireless headphones. 
              Featuring advanced noise cancellation, 30-hour battery life, and 
              ultra-comfortable design. Perfect for music lovers and professionals.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <span className="inline-flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
                ✅ Active Noise Cancellation
              </span>
              <span className="inline-flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
                ✅ 30-Hour Battery Life
              </span>
              <span className="inline-flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
                ✅ Bluetooth 5.0 Connectivity
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Powerful Features
            <span className="block text-lg font-normal text-gray-600 mt-2">
              Everything you need to create compelling product descriptions
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-gray-900">AI-Powered Generation</h3>
              <p className="text-gray-600 mt-2">Generate high-converting product descriptions using advanced AI technology</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900">Lightning Fast</h3>
              <p className="text-gray-600 mt-2">Get professional descriptions in seconds, not hours</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold text-gray-900">Multi-Language Support</h3>
              <p className="text-gray-600 mt-2">Generate descriptions in 20+ languages for global markets</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold text-gray-900">SEO Optimized</h3>
              <p className="text-gray-600 mt-2">Built-in SEO optimization to boost your search rankings</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-gray-900">Team Collaboration</h3>
              <p className="text-gray-600 mt-2">Work together with your team in real-time</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🛍️</div>
              <h3 className="text-xl font-semibold text-gray-900">Shopify Integration</h3>
              <p className="text-gray-600 mt-2">Seamless integration with your Shopify store</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Our Customers Say
            <span className="block text-lg font-normal text-gray-600 mt-2">
              Trusted by e-commerce professionals worldwide
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-yellow-400 text-xl mb-3">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 italic">"This tool saved me countless hours! The descriptions are professional and convert well."</p>
              <div className="mt-4">
                <p className="font-semibold text-gray-900">John Smith</p>
                <p className="text-gray-600 text-sm">E-commerce Owner</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-yellow-400 text-xl mb-3">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 italic">"The AI-generated descriptions are incredibly accurate and save our team so much time."</p>
              <div className="mt-4">
                <p className="font-semibold text-gray-900">Sarah Johnson</p>
                <p className="text-gray-600 text-sm">Marketing Manager</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-yellow-400 text-xl mb-3">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 italic">"Integration with Shopify is seamless. I can update all my products in minutes."</p>
              <div className="mt-4">
                <p className="font-semibold text-gray-900">Mike Brown</p>
                <p className="text-gray-600 text-sm">Shopify Store Owner</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Boost Your Sales?
          </h2>
          <p className="text-indigo-100 text-xl mb-8">
            Start generating professional product descriptions today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/generator"
              className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl text-lg"
            >
              ✨ Start Free Trial
            </Link>
            <Link
              to="/pricing"
              className="px-8 py-4 bg-indigo-700 text-white font-semibold rounded-lg hover:bg-indigo-800 transition-all text-lg"
            >
              ⚡ View Plans
            </Link>
          </div>
          <p className="text-indigo-200 mt-6 text-sm">No credit card required • 14-day free trial</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">© 2024 AI Product Generator. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/" className="text-gray-600 hover:text-indigo-600 text-sm">Home</Link>
            <Link to="/generator" className="text-gray-600 hover:text-indigo-600 text-sm">Generator</Link>
            <Link to="/pricing" className="text-gray-600 hover:text-indigo-600 text-sm">Pricing</Link>
            <Link to="/login" className="text-gray-600 hover:text-indigo-600 text-sm">Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;