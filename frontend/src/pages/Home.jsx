import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ArrowRight,
  CalendarDays,
  Wallet,
  Link2,
  Moon,
  Search,
  Smartphone,
  PlaneTakeoff,
  Share2,
  Calendar,
} from "lucide-react";

const Home = () => {
  const { user } = useSelector((state) => state.auth ?? {});

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0F1E]">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center max-w-7xl mx-auto px-6 py-20 bg-gray-50 dark:bg-[#0A0F1E]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          <div>
            <span className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-sm rounded-full px-4 py-1.5 mb-6">
              Made for Indian Travelers
            </span>
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-4">
              <span className="text-gray-900 dark:text-white block">Plan Your Trip.</span>
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent block">
                Not Your Stress.
              </span>
            </h1>
            <p className="text-xl mb-8 max-w-md leading-relaxed text-gray-500 dark:text-gray-400">
              Itinerary, budget, activities — all in one place.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <Link
                to={user ? "/dashboard" : "/register"}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 flex items-center gap-2 text-sm"
              >
                {user ? "Go to Dashboard" : "Start Planning"}
                <ArrowRight size={16} />
              </Link>
              <button
                type="button"
                onClick={scrollToFeatures}
                className="border text-sm font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 border-gray-300 text-gray-700 hover:border-indigo-500 hover:text-indigo-600 dark:border-[#374151] dark:text-gray-300 dark:hover:border-indigo-500 dark:hover:text-white"
              >
                See Features
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute top-20 left-0 w-72 h-72 bg-indigo-100 dark:bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 right-0 w-72 h-72 bg-violet-100 dark:bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-6 shadow-xl rotate-1 hover:rotate-0 transition-all duration-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Goa Beach Trip</h3>
                <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">
                  Ongoing
                </span>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Calendar size={14} />
                  <span>Dec 20 - Dec 27</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Wallet size={14} />
                  <span>Rs 18,000 / Rs 25,000</span>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 mb-4">
                <div className="h-1.5 rounded-full bg-amber-500 w-[72%]" />
              </div>
              <div className="flex gap-2">
                <span className="text-xs px-3 py-1 rounded-full bg-indigo-600 text-white">
                  Day 1
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-[#1F2937] text-gray-500 dark:text-gray-400">
                  Day 2
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-[#1F2937] text-gray-500 dark:text-gray-400">
                  Day 3
                </span>
              </div>
              <div className="absolute -top-4 -right-4 bg-indigo-600 rounded-full px-4 py-2 shadow-lg">
                <span className="text-white text-sm font-semibold">
                  2,400+ Trips Planned
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-gray-200 dark:border-[#1F2937] bg-white dark:bg-[#111827]/50 py-10">
        <div className="max-w-7xl mx-auto px-6 flex justify-center gap-16 flex-wrap">
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">2,400+</p>
            <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">Trips Planned</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">150+</p>
            <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">Destinations</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">98%</p>
            <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">Happy Travelers</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-3">
            Everything You Need
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg">One app. Zero stress.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-6 hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white mb-4">
              <CalendarDays className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Day Planner</h3>
            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              Plan every hour of every day, perfectly organized
            </p>
          </div>
          <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-6 hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white mb-4">
              <Wallet className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Budget Tracker</h3>
            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              Track expenses in real time, never overspend again
            </p>
          </div>
          <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-6 hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white mb-4">
              <Link2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Share Link</h3>
            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              Share your itinerary with anyone, no login needed
            </p>
          </div>
          <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-6 hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white mb-4">
              <Moon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Dark Mode</h3>
            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              Easy on the eyes, day and night
            </p>
          </div>
          <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-6 hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Smart Search</h3>
            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              Find any trip or destination instantly
            </p>
          </div>
          <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-6 hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white mb-4">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Mobile Ready</h3>
            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              Plan on the go from any device
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-gray-100 dark:bg-[#111827]/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-3">
              How It Works
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Get started in 3 simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <PlaneTakeoff className="w-8 h-8 mx-auto mb-3 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                Create Trip
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Add your destination, dates and budget
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <CalendarDays className="w-8 h-8 mx-auto mb-3 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                Plan Days
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Add activities day by day
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <Share2 className="w-8 h-8 mx-auto mb-3 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                Share & Go
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Share your plan with travel companions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-indigo-600 rounded-3xl p-16 text-center">
          <h2 className="text-4xl font-black text-white mb-4">
            Ready for your next Safar?
          </h2>
          <p className="text-indigo-100 text-lg mb-8">
            Join thousands of travelers planning smarter with SafarSathi
          </p>
          <Link
            to={user ? "/dashboard" : "/register"}
            className="bg-white text-indigo-600 hover:bg-gray-50 font-bold px-10 py-4 rounded-xl text-base transition-all duration-200 inline-flex items-center gap-2 shadow-lg"
          >
            Get Started Free
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-[#1F2937] py-10 text-center bg-white dark:bg-[#0A0F1E]">
        <p className="text-xl font-black">
          <span className="text-gray-900 dark:text-white">Safar</span>
          <span className="text-indigo-600 dark:text-indigo-500">Sathi</span>
        </p>
        <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">
          Plan better. Travel smarter.
        </p>
        <p className="text-xs mt-2 text-gray-400 dark:text-gray-600">
          Built with love for Full Stack Hackathon
        </p>
      </footer>
    </div>
  );
};

export default Home;
