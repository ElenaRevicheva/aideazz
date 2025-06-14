
import { MessageCircle, Heart, Globe, Users, ExternalLink, Sparkles, TestTube } from "lucide-react";
import { Button } from "@/components/ui/button";

const EspaLuzSection = () => {
  return (
    <section id="espaluz" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span className="text-sm font-medium text-pink-300">Living Proof of Concept</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
            Meet <span className="gradient-text">EspaLuz</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Your bilingual AI family tutor — emotionally intelligent, culturally aware, and ready to help expat families thrive in Spanish-speaking countries.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Description */}
          <div className="space-y-8">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-semibold text-white mb-6 font-poppins flex items-center gap-3">
                <Heart className="w-8 h-8 text-pink-400" />
                Emotionally Intelligent Support
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                EspaLuz isn't just another chatbot. She understands the emotional challenges of cultural adaptation, 
                language barriers, and family transitions. She provides personalized support for both children and adults 
                navigating new environments.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-purple-300">
                  <Globe className="w-5 h-5" />
                  <span>Bilingual Support</span>
                </div>
                <div className="flex items-center gap-2 text-pink-300">
                  <Users className="w-5 h-5" />
                  <span>Family-Focused</span>
                </div>
                <div className="flex items-center gap-2 text-blue-300">
                  <Heart className="w-5 h-5" />
                  <span>Emotionally Aware</span>
                </div>
                <div className="flex items-center gap-2 text-green-300">
                  <MessageCircle className="w-5 h-5" />
                  <span>Real-time Chat</span>
                </div>
              </div>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold text-white mb-4 font-poppins">
                What EspaLuz Does:
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Helps families adapt emotionally to new Spanish-speaking environments</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Provides bilingual language learning support for all family members</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Understands cultural nuances and emotional challenges of transition</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Offers personalized coaching for both children and adults</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Action Cards */}
          <div className="space-y-6">
            {/* Telegram Card */}
            <div className="glass-card p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white font-poppins">Try on Telegram</h3>
                  <p className="text-gray-300">Chat with EspaLuz instantly</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6">
                Start your conversation with EspaLuz on Telegram. Experience how she understands your family's unique situation and provides personalized guidance.
              </p>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 rounded-full transition-all duration-300">
                Open Telegram Chat
                <ExternalLink className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* WhatsApp Card */}
            <div className="glass-card p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                  <TestTube className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white font-poppins">WhatsApp Sandbox</h3>
                  <p className="text-gray-300">Testing via Twilio Sandbox</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6">
                Currently testing EspaLuz through Twilio's WhatsApp Sandbox. This is a development environment as we prepare for WhatsApp Business API integration.
              </p>
              <Button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold py-3 rounded-full transition-all duration-300">
                Test WhatsApp Sandbox
                <TestTube className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* Stats */}
            <div className="glass-card p-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-400 mb-1">Live</div>
                  <div className="text-gray-300 text-sm">On Telegram</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-400 mb-1">Testing</div>
                  <div className="text-gray-300 text-sm">WhatsApp Sandbox</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EspaLuzSection;
