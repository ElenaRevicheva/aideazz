
import { Code, Zap, Heart } from "lucide-react";

const VibeCodingSection = () => {
  return (
    <section id="vibe-coding" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Code className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Our Philosophy</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
            <span className="gradient-text">Vibe Coding</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            We build AI that understands not just what you say, but how you feel. 
            Technology infused with emotional intelligence and human empathy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 text-center">
            <Heart className="w-12 h-12 text-pink-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-4 font-poppins">Emotional Intelligence</h3>
            <p className="text-gray-300">AI that recognizes and responds to human emotions with genuine care and understanding.</p>
          </div>
          
          <div className="glass-card p-8 text-center">
            <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-4 font-poppins">Adaptive Learning</h3>
            <p className="text-gray-300">Systems that evolve with your needs, learning your preferences and growing alongside you.</p>
          </div>
          
          <div className="glass-card p-8 text-center">
            <Code className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-4 font-poppins">Human-Centered Design</h3>
            <p className="text-gray-300">Technology built around human needs, not the other way around. Simple, intuitive, and empowering.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VibeCodingSection;
