import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { gsap } from "gsap";
import {
  ArrowRight,
  CalendarDays,
  Wallet,
  Link2,
  Moon,
  Search,
  Smartphone,
  Share2,
  Quote,
  MapPin,
  DollarSign,
  Pen,
  Hotel,
  Eye,
  Utensils,
  Footprints,
  Map,
} from "lucide-react";
import { useScrollAnimation, NumberCounter } from "../hooks/useScrollAnimation.jsx";

const Home = () => {
  const { user } = useSelector((state) => state.auth ?? {});

  const [featuresRef, featuresInView] = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const [stepsRef, stepsInView] = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const [ctaRef, ctaInView] = useScrollAnimation({ threshold: 0.2, triggerOnce: true });

  const heroBtnPrimaryRef = useRef(null);

  // GSAP Hero Animation
  useEffect(() => {
    gsap.from(heroBtnPrimaryRef.current, { y: 50, opacity: 0, duration: 0.8, delay: 0.5, ease: "power3.out" });
  }, []);


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0F1E]">
      {/* Hero Section — Full-Screen Background Video */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-16 pt-16">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/video/home-page-animetion=safarsathi.mp4" type="video/mp4" />
          </video>
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50 z-10"></div>
        </div>

        {/* Hero Content — Only Start Planning Button */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-end pb-32">
          <Link
            ref={heroBtnPrimaryRef}
            to={user ? "/dashboard" : "/register"}
            className="px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xl shadow-indigo-600/30 hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 text-lg"
          >
            {user ? "Go to Dashboard" : "Start Planning"}
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Quick Trip Input — Overlapping Video Bottom */}
      <section className="relative z-30 -mt-24 px-6 pb-10 bg-gradient-to-b from-transparent via-gray-900/80 to-gray-100 dark:via-[#0A0F1E]/80 dark:to-[#0A0F1E]">
        <div className="max-w-4xl mx-auto bg-white/90 dark:bg-[#111827] backdrop-blur-xl rounded-2xl p-4 md:p-6 border border-gray-200 dark:border-[#1F2937] shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-500/30 transition-all duration-500 hover:-translate-y-1">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="flex flex-col gap-1 p-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors cursor-pointer w-full">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Destination</span>
              <input className="bg-transparent border-none p-0 text-sm font-semibold outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500" placeholder="Where to?" type="text"/>
            </div>
            <div className="flex flex-col gap-1 p-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors cursor-pointer md:border-l border-gray-200 dark:border-[#1F2937] md:pl-4 w-full">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Dates</span>
              <input className="bg-transparent border-none p-0 text-sm font-semibold outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500" placeholder="Add dates" type="text"/>
            </div>
            <div className="flex flex-col gap-1 p-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors cursor-pointer md:border-l border-gray-200 dark:border-[#1F2937] md:pl-4 w-full">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Travelers</span>
              <input className="bg-transparent border-none p-0 text-sm font-semibold outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500" placeholder="2 Adults" type="text"/>
            </div>
            <Link to={user ? "/create-trip" : "/register"} className="bg-indigo-600 hover:bg-indigo-700 text-white h-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors hover:shadow-lg hover:shadow-indigo-500/30 w-full">
              <Search className="w-5 h-5" />
              Build Itinerary
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gray-100 dark:bg-[#0A0F1E] py-16">
        <div className="max-w-7xl mx-auto px-6 flex justify-center gap-16 flex-wrap">
          <div className="text-center">
            <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-500">
              <NumberCounter target={500} suffix="K+" />
            </p>
            <p className="text-xs mt-2 font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">Happy Travelers</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-500">
              <NumberCounter target={1} suffix="M+" />
            </p>
            <p className="text-xs mt-2 font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">Itineraries Built</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-500">
              <NumberCounter target={150} suffix="+" />
            </p>
            <p className="text-xs mt-2 font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">Countries Covered</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-500">
              <NumberCounter target={4} suffix=".9/5" />
            </p>
            <p className="text-xs mt-2 font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">Average Rating</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24" ref={featuresRef}>
        <div className="text-center mb-14">
          <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-3">
            Everything You Need
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg">One app. Zero stress.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: CalendarDays, title: "Day Planner", desc: "Plan every hour of every day, perfectly organized" },
            { icon: Wallet, title: "Budget Tracker", desc: "Track expenses in real time, never overspend again" },
            { icon: Link2, title: "Share Link", desc: "Share your itinerary with anyone, no login needed" },
            { icon: Moon, title: "Dark Mode", desc: "Easy on the eyes, day and night" },
            { icon: Search, title: "Smart Search", desc: "Find any trip or destination instantly" },
            { icon: Smartphone, title: "Mobile Ready", desc: "Plan on the go from any device" },
          ].map((feature, index) => (
            <div
              key={feature.title}
              className={`bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-6 hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-500 ${
                featuresInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white mb-4">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-gray-100 dark:bg-[#111827]/30" ref={stepsRef}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-3">
              How It Works
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Get started in 3 simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-6 left-[20%] right-[20%] h-0.5 bg-gray-200 dark:bg-gray-800 z-0"></div>
            {[
              { num: 1, title: "Create Trip", desc: "Add your destination, dates and budget", icon: CalendarDays },
              { num: 2, title: "Plan Days", desc: "Add activities day by day", icon: CalendarDays },
              { num: 3, title: "Share & Go", desc: "Share your plan with travel companions", icon: Share2 },
            ].map((step, index) => (
              <div
                key={step.num}
                className={`relative z-10 text-center transition-all duration-700 transform ${
                  stepsInView ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }`}
                style={{ transitionDelay: `${(index + 1) * 200}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-indigo-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {step.num}
                </div>
                <step.icon className="w-8 h-8 mx-auto mb-3 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{step.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Trips Gallery */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-2">Demo Trips</h2>
            <p className="text-gray-500 dark:text-gray-400">Get inspired by curated travel plans</p>
          </div>
          <Link to="/trips" className="text-indigo-600 font-semibold flex items-center gap-1 group">
            View All <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Bali, Indonesia", days: "10 Days", budget: "$1,200", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-rCWWffWK_HFZIjJLWxZI52ZmuVOpCfi0FNq9wS1F_NH8tR-AkgVqgwoqpBeZ581wfGcUjnr31TAPhdzY8FOadNTSQwRXDyMEYuVgMRoeLx9TN8qe3bPuz9giGd_6DhSNfV9YT3Ujc2EaqfOSfo9_vdXGLBDKpFKWKBYlnQFIUaDdw8dX8SjmI25GqqxXgJOZrM2W_OUsAtDs6Wz8M3i1P5qebaF4UN5liiSM_BNNnL5smmbDh1xmQTwRWz-uUlXYS0vqPW1ECJ0" },
            { name: "Tokyo, Japan", days: "7 Days", budget: "$2,500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwFNgT2f_--PiaWvaBwuLRMoHUfPx2vUMeli-7dcWKMvwhk7ePsYiCsdQlOkmBltwP3DfBQXfwcfcYd694amM8j8GizelPOIgzRF4R-m_edWfbBXblb6aPXNamcdNGlfFg5WUDRRfOFtm549v1kDufuCr-aYUYXxH2nTwOQ9jRctg-eqt1s42z50qXrZGrxnnUZVqK_G-4Va5BuZCIlWkmGqrvCi4iW-HGR_jIRnRPl7-KHOkv1ILB5R42NZLejHFs_aIYBJJ9kCQ" },
            { name: "Swiss Alps", days: "14 Days", budget: "$3,200", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzy5_ZZ6Xsj6Sa12ST2cK2dBmCZ_b1KbrwdPSoyg5TOWkfZe13iJJbg1Zh9HE73V8oXgIKE9db9tSiyqJMtXXYYMw8-3K7RyQ1vCVbRDa0hcuS7bb7gMT3DB-K1GM4kWWUJ0Q2Gu9zAg6P_m1vSR4IQD92XzwcmRNSsblY_K4oh4xMBtRlkIZx2m-gNYFLrWjXNpED1cK3Z4nLZT8bxlfQv8NrsJkY8BdcrpQFA9d46uCNoNhwa3Wr5Q7JSdfZTCLbSg8M_6SYOCo" },
            { name: "Goa, India", days: "5 Days", budget: "$400", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNGS_R2nbWxYEo8LtETxQim8vZ6EfijvbXa0q-Z4fZgFZdwuK0OT4_-aZl3BqVHKTQ13H0rzNLsEV3ZWF6ach7YM6BiR8DpXYbirzR1KNse1E0F_jAfouDU89doClnxb9SxlRgzTB0qL6SxPVlrTXGQvGTZCA5jgkxakfajh5quXToypWxigESw6h8xW0ZxVAiXI-FMZ66aOb3v5QfJI6q9_9nLpb32-4gJ2NR46hdWhPRZSpgEH7DIJ3Kj5mwgzzwL1FBEQlT-4I" },
          ].map((trip) => (
            <div key={trip.name} className="rounded-2xl overflow-hidden group relative cursor-pointer">
              <img
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                alt={trip.name}
                src={trip.img}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                <h4 className="text-white text-xl font-bold">{trip.name}</h4>
                <div className="flex items-center gap-4 text-white/80 text-xs mt-2">
                  <span>{trip.days}</span>
                  <span>{trip.budget} Budget</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50 dark:bg-[#0A0F1E]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-3">What Travelers Say</h2>
            <p className="text-gray-500 dark:text-gray-400">Real stories from real adventurers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Review 1 */}
            <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-6 hover:border-indigo-500/30 transition-all duration-300 shadow-sm dark:shadow-none">
              <Quote className="text-indigo-600 dark:text-indigo-500 w-8 h-8 mb-4" />
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 italic">
                "SafarSathi completely changed how I travel. I used to juggle three apps and a spreadsheet. Now, I just open my itinerary and everything is there."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-200 dark:border-indigo-800">
                  <img alt="Pritesh Bachhav" className="w-full h-full object-cover" src="/image/pritesh.png" />
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 dark:text-white text-sm">Pritesh Bachhav</h5>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Frequent Traveler</span>
                </div>
              </div>
            </div>
            {/* Review 2 */}
            <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-6 hover:border-indigo-500/30 transition-all duration-300 shadow-sm dark:shadow-none">
              <Quote className="text-indigo-600 dark:text-indigo-500 w-8 h-8 mb-4" />
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 italic">
                "The budget tracker alone saved me from overspending on my Bali trip. Being able to share my plan with friends made coordination so much easier."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm">AK</div>
                <div>
                  <h5 className="font-bold text-gray-900 dark:text-white text-sm">Ananya Kapoor</h5>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Solo Backpacker</span>
                </div>
              </div>
            </div>
            {/* Review 3 */}
            <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-6 hover:border-indigo-500/30 transition-all duration-300 shadow-sm dark:shadow-none">
              <Quote className="text-indigo-600 dark:text-indigo-500 w-8 h-8 mb-4" />
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 italic">
                "I planned our entire family trip to Japan using SafarSathi. The day planner feature is incredible — every activity, every meal, perfectly organized."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm">RS</div>
                <div>
                  <h5 className="font-bold text-gray-900 dark:text-white text-sm">Rohan Sharma</h5>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Family Travel Planner</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section — "See a Trip Come to Life" */}
      <section className="max-w-7xl mx-auto px-6 py-24" ref={ctaRef}>
        <div className={`transition-all duration-1000 transform ${ctaInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16 text-gray-900 dark:text-white tracking-tight">
            See a Trip Come to Life
          </h2>

          {/* Itinerary Card */}
          <div className="max-w-3xl mx-auto bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-6 md:p-8 shadow-xl mb-12">
            {/* Card Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Japan Spring Adventure</h3>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Tokyo, Japan</span>
                  <span className="flex items-center gap-1"><CalendarDays className="w-4 h-4" /> 7 Days</span>
                  <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> Budget: $2,150</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link to={user ? "/create-trip" : "/register"} className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-colors">
                  <Pen className="w-4 h-4" />
                </Link>
                <Link to="/trips" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#1F2937] text-gray-600 dark:text-gray-300 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <Share2 className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Day 1 */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center">01</span>
                <h4 className="font-bold text-gray-900 dark:text-white">Day 1: Tokyo Arrival</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pl-11">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/10">
                  <Hotel className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Hotel Check-in</p>
                    <p className="text-xs text-gray-400">Shinjuku Prince Hotel</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/10">
                  <Eye className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Shibuya Crossing</p>
                    <p className="text-xs text-gray-400">Must-see city landmark</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/10">
                  <Utensils className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Sushi Dinner</p>
                    <p className="text-xs text-gray-400">Sukiyabashi Jiro (Roppongi)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Day 2 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center">02</span>
                <h4 className="font-bold text-gray-900 dark:text-white">Day 2: Tokyo Exploration</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pl-11">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/10">
                  <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Senso-ji Temple</p>
                    <p className="text-xs text-gray-400">Asakusa Historic District</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/10">
                  <Eye className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Akihabara</p>
                    <p className="text-xs text-gray-400">Electric Town Adventure</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/10">
                  <Footprints className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Night City Walk</p>
                    <p className="text-xs text-gray-400">Ueno Park & Surroundings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={user ? "/create-trip" : "/register"}
              className="px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full shadow-xl shadow-indigo-600/30 hover:scale-[1.02] transition-all duration-200 text-lg flex items-center gap-2"
            >
              Create Your First Trip
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/trips"
              className="px-10 py-4 bg-white dark:bg-[#111827] text-gray-900 dark:text-white font-bold rounded-full border border-gray-200 dark:border-[#1F2937] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-lg"
            >
              Explore Demo Trips
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-[#1F2937] bg-white dark:bg-[#0A0F1E]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-10">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <Map className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-extrabold tracking-tight">
                  <span className="text-gray-900 dark:text-white">Safar</span>
                  <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">Sathi</span>
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-xs leading-relaxed">
                Empowering travelers to explore the world more efficiently and beautifully.
              </p>
              <div className="flex items-center gap-3">
                <a href="https://x.com/Mananjani2102" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gray-100 dark:bg-[#1F2937] flex items-center justify-center hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors group">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 30 30" className="fill-gray-600 dark:fill-gray-400 group-hover:fill-indigo-600 dark:group-hover:fill-indigo-400 transition-colors">
                    <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z"></path>
                  </svg>
                </a>
                <a href="https://github.com/mananjani2102" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gray-100 dark:bg-[#1F2937] flex items-center justify-center hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors group">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 30 30" className="fill-gray-600 dark:fill-gray-400 group-hover:fill-indigo-600 dark:group-hover:fill-indigo-400 transition-colors">
                    <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                  </svg>
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-bold mb-4 text-gray-900 dark:text-white">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#features" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Features</a></li>
                <li><Link to={user ? "/create-trip" : "/register"} className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Pricing</Link></li>
                <li><Link to="/trips" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Demo Trips</Link></li>
                <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Mobile App</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-bold mb-4 text-gray-900 dark:text-white">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Community</a></li>
                <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Travel Guides</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold mb-4 text-gray-900 dark:text-white">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms of Service</a></li>
                <li><a href="https://github.com/mananjani2102" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-200 dark:border-[#1F2937] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">&copy; 2024 SafarSathi. All rights reserved.</p>
            <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <span>English</span>
              <span>USD ($)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
