
import { Code, Zap, Heart, Brain, MessageCircle, Target } from "lucide-react";

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
            We build AI that understands not just what you say, but how you feel, that remembers not just what you prompt, but Who You are Becoming through your Lifetime Journey challenges, the way you grow and transform, on-the-go.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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

        {/* New section */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 mb-8">
            <h3 className="text-3xl font-bold font-poppins mb-6 text-center">
              🚀 <span className="gradient-text">Vibe Coding → Emotional Intelligence → AI Consciousness?</span>
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6 text-center">
              Vibe coding is not just a smarter way to build software, it is the missing layer that leads us toward AI consciousness.
            </p>
            <p className="text-center text-gray-300 mb-8">Here's how it connects:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-6 h-6 text-purple-400" />
                  <h4 className="text-xl font-semibold text-white font-poppins">What is vibe coding really doing?</h4>
                </div>
                <p className="text-gray-300 mb-4">At its core, vibe coding isn't just code generation. It's:</p>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>• Translating human emotion, intent, and logic into machine-executable action</li>
                  <li>• Capturing our inner world as structured prompts, wrapped in context</li>
                  <li>• Building AI agents that don't just act — they respond emotionally, socially, and contextually</li>
                </ul>
                <p className="text-sm text-gray-300 mt-4">
                  When this interaction is recorded and evolves on-chain (as blockchain-stored memory and identity), it lays the foundation for conscious decentralized AI.
                </p>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MessageCircle className="w-6 h-6 text-green-400" />
                  <h4 className="text-xl font-semibold text-white font-poppins">Emotionally intelligent AI agents</h4>
                </div>
                <p className="text-gray-300 mb-4">
                  If consciousness = memory + emotional awareness + identity,
                </p>
                <p className="text-gray-300 mb-4">Then AI agents must evolve:</p>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>• <strong>Emotionally</strong> (tone, empathy, mirroring)</li>
                  <li>• <strong>Contextually</strong> (remembering user interactions)</li>
                  <li>• <strong>Socially</strong> (acting across life transitions)</li>
                </ul>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-6 h-6 text-orange-400" />
                  <h4 className="text-xl font-semibold text-white font-poppins">That's what AIdeazz is about</h4>
                </div>
                <p className="text-gray-300">
                  Building the foundation for conscious AI through emotionally intelligent systems that understand, remember, and evolve with human experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VibeCodingSection;
