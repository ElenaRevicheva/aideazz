
import { Eye, Sparkles, Users, Zap } from "lucide-react";

const VisionSection = () => {
  return (
    <section id="vision" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Eye className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-300">The Bigger Picture</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
            <span className="gradient-text">Our Vision</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Transform how humans and AI interact by building emotionally intelligent digital companions that evolve with their users.
          </p>
        </div>

        {/* Vision Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Mission */}
          <div className="glass-card p-8 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white font-poppins">Our Mission</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              To democratize access to emotionally intelligent AI that truly understands human needs, emotions, and growth. 
              We believe AI should amplify human potential, not replace human connection.
            </p>
          </div>

          {/* Impact */}
          <div className="glass-card p-8 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white font-poppins">Our Impact</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Starting with expat families like those helped by EspaLuz, we're expanding to serve anyone navigating life's transitions — 
              students, professionals, families, and communities seeking growth and adaptation.
            </p>
          </div>
        </div>

        {/* Core Principles */}
        <div className="glass-card p-12 mb-12">
          <h3 className="text-3xl font-bold text-white mb-8 text-center font-poppins">
            Core Principles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3 font-poppins">Emotional Intelligence</h4>
              <p className="text-gray-300">
                AI that understands not just what you say, but how you feel and what you need to grow.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3 font-poppins">Human-Centered</h4>
              <p className="text-gray-300">
                Built to enhance human relationships and personal growth, not replace them.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3 font-poppins">Continuously Evolving</h4>
              <p className="text-gray-300">
                AIPAs that learn and adapt through every interaction, becoming more helpful over time.
              </p>
            </div>
          </div>
        </div>

        {/* Transformation Statement */}
        <div className="text-center">
          <div className="glass-card inline-block p-8 max-w-3xl">
            <h3 className="text-2xl font-semibold text-white mb-4 font-poppins">
              Built for Transformation
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              In a world of rapid change, we need AI that doesn't just process information — 
              we need AI that helps us navigate the emotional journey of growth, adaptation, and transformation. 
              <span className="text-purple-300 font-semibold"> That's what AIdeazz delivers.</span>
            </p>
          </div>
        </div>

        {/* Founder Section */}
        <div className="mt-16">
          <div className="glass-card p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold font-poppins mb-6 text-center gradient-text">
              🧠 Solo Founder, AI Entrepreneur & Vibe Coder
            </h3>
            <div className="text-center mb-6">
              <a 
                href="https://lit.link/en/aideazz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xl font-semibold text-purple-300 hover:text-purple-200 transition-colors underline"
              >
                Elena Revicheva, about me
              </a>
            </div>
            
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                🇷🇺 Former Russian top IT project manager and CLO at E-government, residing in Panama since 2022 
                (relocated in a single-mother status because of war in Ukraine and started all my Life from scratch).
              </p>
              
              <p>
                ✍️ Well known Russian decadent writer, transformed to NFT creator in Panama{" "}
                <a 
                  href="https://opensea.io/kira_velerevich" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple-300 hover:text-purple-200 transition-colors underline"
                >
                  https://opensea.io/kira_velerevich
                </a>
                .
              </p>
              
              <p>
                💡 Strategic visioner in blockchain law, behavioral systems, and AI ethics.
              </p>

              <div className="flex items-start gap-3 mt-4">
                <span className="text-green-400 font-semibold">✅</span>
                <div>
                  <span className="text-purple-300 font-semibold">DAIAA Membership:</span>{" "}
                  <span className="text-gray-300">Founder individually accepted into the Decentralized AI Agent Alliance</span>{" "}
                  <a 
                    href="https://www.daiaa.org/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    https://www.daiaa.org/
                  </a>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="mb-2 font-semibold">Long story - video short:</p>
                <a 
                  href="https://www.capcut.com/s/CU4u6UjQIC9QydoB/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple-300 hover:text-purple-200 transition-colors underline"
                >
                  https://www.capcut.com/s/CU4u6UjQIC9QydoB/
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
