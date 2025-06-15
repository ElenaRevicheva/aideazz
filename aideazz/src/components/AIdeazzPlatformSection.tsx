
import { Layers, ShoppingCart, Users, Zap, Coins, GitBranch } from "lucide-react";

const AIdeazzPlatformSection = () => {
  return (
    <section id="platform" className="py-24 relative bg-gradient-to-r from-blue-900/20 to-purple-900/20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-300">Platform Overview</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
            <span className="gradient-text">What is AIdeazz?</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            A modular decentralized platform for crafting, evolving, and monetizing emotionally intelligent AI Personal Assistants (AIPAs).
          </p>
        </div>

        {/* Platform Description */}
        <div className="glass-card p-12 mb-12 max-w-5xl mx-auto">
          <div className="text-lg text-gray-300 leading-relaxed space-y-6">
            <p>
              <strong className="text-white">AIdeazz is more than an AI platform —</strong> it's a complete ecosystem where users can buy, sell, and subscribe to mindful AIPAs tailored to real-life needs.
            </p>
            <p>
              <strong className="text-purple-300">Our Marketplace and SocialFi layer</strong> invites users to not just consume AI — but co-create, rate, upgrade, and evolve AIPAs together.
            </p>
            <p>
              <strong className="text-pink-300">Dedicated spaces for families, developers, scientists, coaches, and real-world experts</strong> power a collaborative ecosystem where knowledge flows freely.
            </p>
            <p>
              <strong className="text-blue-300">Every chat, every feature request, every emotional insight</strong> helps AIPAs grow — making them more relevant, more mindful, and more adaptive over time.
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="glass-card p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white font-poppins">AIPA Marketplace</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Buy, sell, and subscribe to specialized AIPAs. From family tutors to business coaches, find the perfect AI companion for your needs.
            </p>
          </div>

          <div className="glass-card p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white font-poppins">SocialFi Layer</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Co-create and evolve AIPAs with the community. Rate, review, and collaborate to make AI assistants better for everyone.
            </p>
          </div>

          <div className="glass-card p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white font-poppins">Continuous Evolution</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              AIPAs learn from every interaction, growing smarter and more emotionally intelligent with each conversation.
            </p>
          </div>

          <div className="glass-card p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
                <Coins className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white font-poppins">Web3 Native</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              True ownership of your AI companions through NFTs, decentralized governance, and community-driven development.
            </p>
          </div>

          <div className="glass-card p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full">
                <GitBranch className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white font-poppins">Modular Design</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Flexible architecture allows for specialized AIPAs in different domains — education, healthcare, business, and beyond.
            </p>
          </div>

          <div className="glass-card p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-full">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white font-poppins">Expert Communities</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Dedicated spaces for families, developers, scientists, and coaches to collaborate and share knowledge.
            </p>
          </div>
        </div>

        {/* Bottom Statement */}
        <div className="text-center">
          <div className="glass-card inline-block p-8 max-w-3xl">
            <h3 className="text-2xl font-semibold text-white mb-4 font-poppins">
              Built Not to Replace People — But to Help Humans Thrive
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              AIdeazz empowers human potential through AI that truly understands, adapts, and grows with you. 
              <span className="text-purple-300 font-semibold"> This is AI for human flourishing.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIdeazzPlatformSection;
