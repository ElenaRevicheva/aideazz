
import { Brain, Shield, Zap, Heart, Sparkles, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const AIpaExplainerSection = () => {
  return (
    <section id="agents" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Brain className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">AI Personal Assistants</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
            <span className="gradient-text">What is an AIPA?</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-4">
            An AI Personal Assistant — created using the latest Model Context Protocol (Claude/OpenAI) — emotionally aware, upgradeable, and web3-native.
          </p>
          <div className="text-center">
            <p className="mb-2 font-semibold text-purple-300">Long story - video short:</p>
            <a 
              href="https://www.capcut.com/s/CXgM3XiNSKkniT0N/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-300 hover:text-purple-200 transition-colors underline"
            >
              https://www.capcut.com/s/CXgM3XiNSKkniT0N/
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: Core Features */}
          <div className="space-y-8">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-semibold text-white mb-6 font-poppins flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-purple-400" />
                Core AIPA Features
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Heart className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Emotionally Aware</h4>
                    <p className="text-gray-300">
                      Understands and responds to emotional cues, providing empathetic support tailored to your emotional state.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Zap className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Continuously Upgradeable</h4>
                    <p className="text-gray-300">
                      Evolves through real-world use, learning from interactions to become more helpful over time.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Shield className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Web3 Native</h4>
                    <p className="text-gray-300">
                      Built on blockchain technology for true ownership, privacy, and decentralized governance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: NFT & Bonding */}
          <div className="space-y-8">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-semibold text-white mb-6 font-poppins flex items-center gap-3">
                <Shield className="w-8 h-8 text-green-400" />
                NFT-Wrapped & Bonded
              </h3>
              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  Each AIPA is wrapped in an <strong className="text-green-300">ERC-721 NFT</strong> and emotionally "bonded" to its user, creating a unique digital relationship that grows stronger over time.
                </p>
                <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-green-300 mb-2">What This Means:</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• <strong>True Ownership:</strong> Your AIPA is truly yours</li>
                    <li>• <strong>Emotional Bonding:</strong> Deeper connections over time</li>
                    <li>• <strong>Transferable:</strong> Trade, sell, or gift your AIPA</li>
                    <li>• <strong>Unique Evolution:</strong> Each AIPA develops differently</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold text-white mb-4 font-poppins">
                High-Value Contexts
              </h3>
              <p className="text-gray-300 mb-4">
                AIPAs evolve through real use in meaningful situations:
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 text-center">
                  <span className="text-purple-300 font-semibold">Learning</span>
                </div>
                <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-3 text-center">
                  <span className="text-pink-300 font-semibold">Coaching</span>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-center">
                  <span className="text-blue-300 font-semibold">Transitions</span>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
                  <span className="text-green-300 font-semibold">Communication</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marketplace Preview */}
        <div className="glass-card p-12 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4 font-poppins">
              AIPA Marketplace
            </h3>
            <p className="text-xl text-gray-300">
              The NFT collection and marketplace are in progress — coming soon to aideazz.xyz/agents
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Browse AIPAs</h4>
              <p className="text-gray-300 text-sm">Discover specialized AI assistants for every need</p>
            </div>
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Preview Features</h4>
              <p className="text-gray-300 text-sm">Test capabilities before committing</p>
            </div>
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-6 text-center opacity-60">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Coming Soon</h4>
              <p className="text-gray-300 text-sm">Minting and sales launching soon</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
            disabled
          >
            Explore AIPA Marketplace
            <span className="ml-2 text-sm opacity-75">(Coming Soon)</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AIpaExplainerSection;
