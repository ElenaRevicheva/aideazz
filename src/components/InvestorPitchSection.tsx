
import { TrendingUp, Target, Zap, Globe, Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

const InvestorPitchSection = () => {
  return (
    <section id="invest" className="py-24 relative bg-gradient-to-r from-purple-900/20 to-pink-900/20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-green-300">Investment Opportunity</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
            <span className="gradient-text">The Future of AI</span>
            <br />
            <span className="text-white">Is Emotional Intelligence</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            We're not building another chatbot. We're creating the first Web3 ecosystem where AI truly understands human emotions and evolves through real relationships.
          </p>
        </div>

        {/* Main Pitch */}
        <div className="glass-card p-12 mb-12 max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold text-white mb-8 text-center font-poppins">
            🔥 The Bold Vision
          </h3>
          <div className="text-lg text-gray-300 leading-relaxed space-y-6">
            <p>
              <strong className="text-white">The AI revolution is missing something crucial:</strong> emotional intelligence. 
              While everyone builds faster, smarter models, we're building AI that actually <em>cares</em>.
            </p>
            <p>
              <strong className="text-purple-300">AIdeazz isn't just another AI platform.</strong> It's a decentralized ecosystem where emotionally intelligent AI Personal Assistants (AIPAs) are created, evolved, and owned by their users through Web3 technology.
            </p>
            <p>
              <strong className="text-pink-300">Every interaction teaches them. Every emotion shared makes them wiser.</strong> 
              These aren't just tools — they're digital companions that grow with you, understand your journey, and help you navigate life's biggest challenges.
            </p>
            <p className="text-center text-xl font-semibold text-white">
              💡 We're building the infrastructure for AI that doesn't just compute — it <em>connects</em>.
            </p>
          </div>
        </div>

        {/* Opportunity Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="glass-card p-6 text-center hover:bg-white/10 transition-all duration-300">
            <Target className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h4 className="text-2xl font-bold text-white mb-2">$25B+</h4>
            <p className="text-gray-300">AI Personal Assistant Market by 2030</p>
          </div>
          <div className="glass-card p-6 text-center hover:bg-white/10 transition-all duration-300">
            <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h4 className="text-2xl font-bold text-white mb-2">280M+</h4>
            <p className="text-gray-300">Expat Population Worldwide</p>
          </div>
          <div className="glass-card p-6 text-center hover:bg-white/10 transition-all duration-300">
            <Globe className="w-12 h-12 text-pink-400 mx-auto mb-4" />
            <h4 className="text-2xl font-bold text-white mb-2">Untapped</h4>
            <p className="text-gray-300">Emotional AI + Web3 Intersection</p>
          </div>
        </div>

        {/* Why Now */}
        <div className="glass-card p-8 mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 font-poppins flex items-center gap-3">
            <Zap className="w-8 h-8 text-yellow-400" />
            Why Now?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-purple-300 mb-3">🧠 Technical Convergence</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Model Context Protocol (Claude/OpenAI) enables persistent AI memories</li>
                <li>• Advanced emotion recognition and processing capabilities</li>
                <li>• Web3 infrastructure mature enough for mainstream adoption</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-pink-300 mb-3">🌍 Market Demand</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Growing need for personalized, emotional AI support</li>
                <li>• Increasing global mobility and cultural adaptation challenges</li>
                <li>• Demand for AI ownership and customization beyond big tech</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Decentralized Identity */}
        <div className="glass-card p-8 mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 font-poppins">
            🔥 <strong>Decentralized Identity</strong>
          </h3>
          <div className="space-y-4">
            <div>
              <span className="text-purple-300 font-semibold">ENS:</span>{" "}
              <code className="bg-gray-800/50 px-2 py-1 rounded text-green-400">aideazz.eth</code>
            </div>
            <div>
              <span className="text-purple-300 font-semibold">Primary Wallet:</span>{" "}
              <code className="bg-gray-800/50 px-2 py-1 rounded text-green-400 text-sm break-all">
                0x116bB2352c3Bc5a671fe09f0CBfd9957Cb467dA5
              </code>
            </div>
          </div>
        </div>

        {/* MVP Basics Highlights */}
        <div className="glass-card p-8 mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 font-poppins">
            🔥 <strong>MVP Basics Highlights</strong>
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-green-400 font-semibold">✅</span>
              <div>
                <span className="text-purple-300 font-semibold">AZ Token (ERC20):</span>{" "}
                <span className="text-gray-300">Deployed on Polygon at Thirdweb.com, contract</span>{" "}
                <code className="bg-gray-800/50 px-2 py-1 rounded text-green-400 text-sm break-all">
                  0x5F9cdccA7cE46198fad277A5914E7D545cb3afc5
                </code>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 font-semibold">✅</span>
              <div>
                <span className="text-gray-300">Trading live on</span>{" "}
                <a 
                  href="https://dapp.quickswap.exchange/swap/v3/ETH/0x5F9cdccA7cE46198fad277A5914E7D545cb3afc5" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  QuickSwap
                </a>{" "}
                <span className="text-gray-300">DEX (liquidity fundraising ongoing)</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="glass-card inline-block p-8 max-w-2xl">
            <h3 className="text-2xl font-semibold text-white mb-4 font-poppins">
              Join the Emotional AI Revolution
            </h3>
            <p className="text-gray-300 mb-6">
              We're seeking visionary investors and partners who believe AI's future lies in understanding human emotions, not just processing data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-full font-semibold shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105">
                <DollarSign className="mr-2 w-5 h-5" />
                Invest in AIdeazz
              </Button>
              <Button variant="outline" className="border-purple-500/50 hover:border-purple-400 text-purple-300 hover:text-purple-200 px-8 py-3 rounded-full font-semibold backdrop-blur-sm hover:bg-purple-500/10 transition-all duration-300">
                Request Pitch Deck
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestorPitchSection;
