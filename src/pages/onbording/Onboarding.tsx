
import  { useState } from "react";
import { Link } from "react-router";

const steps = ["Company", "Admin", "Finish"];

const Onboarding = () => {
  const [step, setStep] = useState(0);

  const next = () => setStep((prev) => prev + 1);
  const prev = () => setStep((prev) => prev - 1);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#2E073F] via-[#7A1CAC] to-[#AD49E1]">
      {/* LEFT IMAGE */}
      <div className="hidden md:flex w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
          alt="team"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-10 text-white">
          <h1 className="text-4xl font-bold mb-3">Smart Employee System 🚀</h1>
          <p className="text-sm opacity-80">
            Powerful tools to manage your team, track performance and scale your
            business.
          </p>
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-6">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* STEP INDICATOR */}
          <div className="flex justify-between mb-10">
            {steps.map((s, i) => (
              <div key={i} className="flex-1 text-center">
                <div
                  className={`w-10 h-10 mx-auto flex items-center justify-center rounded-full font-semibold text-white
                  ${i <= step ? "bg-[#AD49E1]" : "bg-gray-400"}`}
                >
                  {i + 1}
                </div>
                <p className="text-xs text-white mt-2">{s}</p>
              </div>
            ))}
          </div>

          {/* STEP 1 - COMPANY OVERVIEW */}
          {step === 0 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">
                Welcome to Your Workspace
              </h2>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/20 text-white">
                  🏢 Create and manage your company structure easily
                </div>

                <div className="p-4 rounded-xl bg-white/20 text-white">
                  📊 Track employee performance & analytics
                </div>

                <div className="p-4 rounded-xl bg-white/20 text-white">
                  ⚡ Automate HR workflows & payroll
                </div>
              </div>

              <button
                onClick={next}
                className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-[#7A1CAC] to-[#AD49E1] text-white font-semibold hover:scale-105 transition"
              >
                Get Started →
              </button>
            </div>
          )}

          {/* STEP 2 - ADMIN ROLE */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">
                Admin Capabilities
              </h2>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/20 text-white">
                  🔐 Full system control & permissions
                </div>

                <div className="p-4 rounded-xl bg-white/20 text-white">
                  👥 Manage teams, roles & departments
                </div>

                <div className="p-4 rounded-xl bg-white/20 text-white">
                  📁 Access reports & insights dashboard
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={prev}
                  className="px-5 py-2 bg-white/20 rounded-lg text-white"
                >
                  Back
                </button>
                <button
                  onClick={next}
                  className="px-5 py-2 bg-gradient-to-r from-[#7A1CAC] to-[#AD49E1] rounded-lg text-white"
                >
                  Next Page
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 - FINISH */}
          {step === 2 && (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-green-400 mb-4">
                 All Set!
              </h2>

              <p className="text-white/80 mb-6">
                You're ready to explore your employee management system.
              </p>

              <div className="space-y-3 text-white/80 mb-6">
                <p>✔ Setup completed</p>
                <p>✔ System ready</p>
                <p>✔ Dashboard unlocked</p>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={prev}
                  className="px-5 py-2 bg-white/20 text-white rounded-lg"
                >
                  Back
                </button>
                <Link to={"/login"}>
                  <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:scale-105 transition">
                    Go Dashboard
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
