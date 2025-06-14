
import { Eye, Sparkles, Users, Zap } from "lucide-react";

const VisionSection = () => {
  return (
    <section id="vision" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Eye className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">The Bigger Picture</span>
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
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full">
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
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
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
      </div>
    </section>
  );
};

export default VisionSection;
