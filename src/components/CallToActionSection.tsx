import { Heart, MessageCircle, DollarSign, Users, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const CallToActionSection = () => {
  const handleContactClick = () => {
    window.location.href = "mailto:aipa@aideazz.xyz";
  };

  return (
    <section id="contact" className="py-24 relative bg-gradient-to-r from-purple-900/30 to-pink-900/30">
      <div className="container mx-auto px-6">
        {/* Main CTA */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
            <span className="gradient-text">Join the Revolution</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            Be part of the future where AI truly understands and grows with you. 
            Whether you're a family, investor, developer, or visionary — there's a place for you in the AIdeazz ecosystem.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Try EspaLuz */}
          <div className="glass-card p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3 font-poppins">Experience EspaLuz</h3>
              <p className="text-gray-300 text-sm mb-4">Try our live AIPA and see emotional AI in action</p>
              <Button size="sm" className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat Now
              </Button>
            </div>
          </div>

          {/* Invest */}
          <div className="glass-card p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3 font-poppins">Invest & Partner</h3>
              <p className="text-gray-300 text-sm mb-4">Join us in building the future of emotional AI</p>
              <Button size="sm" className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold">
                <ExternalLink className="w-4 h-4 mr-2" />
                Learn More
              </Button>
            </div>
          </div>

          {/* Community */}
          <div className="glass-card p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3 font-poppins">Join Community</h3>
              <p className="text-gray-300 text-sm mb-4">Connect with early adopters and contributors</p>
              <Button size="sm" className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold">
                <Users className="w-4 h-4 mr-2" />
                Join Us
              </Button>
            </div>
          </div>

          {/* Contact */}
          <div className="glass-card p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3 font-poppins">Get in Touch</h3>
              <p className="text-gray-300 text-sm mb-2">Email: aipa@aideazz.xyz</p>
              <p className="text-gray-300 text-sm mb-4">Chat with the Founder:</p>
              <div className="space-y-2">
                <Button 
                  size="sm" 
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
                  onClick={handleContactClick}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
                <Button 
                  size="sm" 
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold"
                  onClick={() => window.open('https://lit.link/en/aideazz', '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Call/Chat
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center">
          <div className="glass-card inline-block p-8 max-w-3xl">
            <h3 className="text-2xl font-semibold text-white mb-4 font-poppins">
              Built by Humans, for Humans
            </h3>
            <p className="text-gray-300 leading-relaxed">
              AIdeazz is a grassroots platform led by a solo founder with a vision: 
              <span className="text-purple-300 font-semibold"> AI that doesn't just compute, but connects, understands, and helps us all thrive through life's transformations.</span>
            </p>
            <div className="mt-6 text-sm text-gray-400">
              <p>AIdeazz.xyz • Emotional AI • Web3 Native • Human-Centered</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
