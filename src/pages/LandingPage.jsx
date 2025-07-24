import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  MapPin,
  Home,
  Users,
  Mail,
  User,
  X,
  CheckCircle,
  AlertTriangle,
  Zap,
  Brain,
  MessageSquare,
  Database,
  Target,
  Shield,
  Clock,
  Star,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import {
  trackEvent,
  initGoogleAnalytics,
  initHotjar,
} from "../utils/analytics";

const LandingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [userType, setUserType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    preference: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Initialize analytics
    initGoogleAnalytics();
    initHotjar();
  }, []);

  const handleCTAClick = (type) => {
    setUserType(type);
    setShowModal(true);
    trackEvent("cta_click", { user_type: type });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Add user to Firestore
      const userRef = await addDoc(collection(db, "users"), {
        name: formData.name,
        email: formData.email,
        userType: userType,
        timestamp: new Date(),
      });

      // Add preference if provided
      if (formData.preference.trim()) {
        await addDoc(collection(db, "preferences"), {
          userId: userRef.id,
          preference: formData.preference,
          userType: userType,
          timestamp: new Date(),
        });
      }

      trackEvent("form_submit", {
        user_type: userType,
        has_preference: !!formData.preference.trim(),
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setIsSubmitted(false);
    setFormData({ name: "", email: "", preference: "" });
    setUserType("");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-pink-500/5 rounded-full blur-2xl animate-pulse delay-500 -translate-x-1/2 -translate-y-1/2"></div>
        {/* Floating geometric shapes */}
        <div className="absolute top-20 right-4 sm:right-20 w-4 h-4 bg-cyan-400/30 rotate-45 animate-bounce delay-300"></div>
        <div className="absolute bottom-32 left-4 sm:left-16 w-6 h-6 bg-purple-400/20 rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-40 left-1/3 w-3 h-3 bg-pink-400/40 rotate-45 animate-bounce delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8 min-h-screen lg:h-screen flex flex-col">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold text-white">TerraNova</span>
              <div className="text-xs text-purple-300 font-medium">
                AI-Powered Real Estate
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2"
          >
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-200 font-medium">
              Dhaka, Bangladesh
            </span>
          </motion.div>
        </nav>

        {/* Main Content Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Problem & Solution */}
          <div className="space-y-8 order-2 lg:order-1">
            {/* Problem Statement */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 backdrop-blur-sm"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-lg font-bold text-red-300">The Problem</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Finding the perfect home in Dhaka is like searching for a needle
                in a haystack. Traditional property searches are time-consuming,
                overwhelming, and often miss your exact preferences.
              </p>
            </motion.div>

            {/* Solution Statement */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 backdrop-blur-sm"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-lg font-bold text-green-300">
                  Our Solution
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                TerraNova uses{" "}
                <strong className="text-white">
                  advanced AI and machine learning
                </strong>{" "}
                to understand exactly what you want. Just describe your dream
                home in plain English, and our K-Nearest Neighbor algorithm
                instantly matches you with the most relevant properties.
              </p>
              <div className="flex items-center space-x-2 text-sm text-green-400">
                <Brain className="w-4 h-4" />
                <span>Powered by Gemini AI + Custom ML Models</span>
              </div>
            </motion.div>

            {/* Tech Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <Database className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <div className="text-sm font-semibold text-white">
                  Smart Dataset
                </div>
                <div className="text-xs text-gray-400">
                  Self-improving algorithm
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <Target className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-sm font-semibold text-white">
                  99% Accuracy
                </div>
                <div className="text-xs text-gray-400">Precision matching</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Hero Content */}
          <div className="text-center lg:text-left order-1 lg:order-2">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Find Your Perfect Home with{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                AI Magic
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-gray-300 mb-8 leading-relaxed"
            >
              Stop endless scrolling through irrelevant listings. Just tell
              TerraNova what you want in natural language, and watch AI find
              your dream home instantly.
            </motion.p>

            {/* Example Query */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white/10 border border-white/20 rounded-xl p-4 mb-8 backdrop-blur-sm"
            >
              <div className="flex items-center space-x-2 mb-2">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-cyan-300">
                  Try saying:
                </span>
              </div>
              <p className="text-white font-medium italic">
                "I need a 3-bedroom apartment in Dhanmondi under 25,000 taka
                with parking and a gym nearby"
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCTAClick("buyer")}
                className="group bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <Search className="w-5 h-5" />
                <span>Find My Home</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCTAClick("seller")}
                className="group bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <Plus className="w-5 h-5" />
                <span>List Property</span>
                <TrendingUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="flex flex-wrap justify-center lg:justify-start gap-6 mt-8 text-sm text-gray-400"
            >
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Instant Results</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>AI-Powered</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {!isSubmitted ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {userType === "buyer"
                        ? "Find Your Dream Home"
                        : "List Your Property"}
                    </h2>
                    <button
                      onClick={closeModal}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Home className="w-4 h-4 inline mr-2" />
                        {userType === "buyer"
                          ? "Describe Your Ideal Home (Optional)"
                          : "Property Description (Optional)"}
                      </label>
                      <textarea
                        value={formData.preference}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            preference: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all h-24 resize-none"
                        placeholder={
                          userType === "buyer"
                            ? "e.g., 3-bedroom flat in Dhanmondi with parking"
                            : "e.g., 2-bedroom apartment in Gulshan, ready for sale"
                        }
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Submitting..." : "Get Started"}
                    </motion.button>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Thank You!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We've received your information. Our AI is already working
                    to find the perfect match for you!
                  </p>
                  <button
                    onClick={closeModal}
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-500 hover:to-cyan-500 transition-all"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;
