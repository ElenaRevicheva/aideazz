
import { MessageCircle, Heart, Globe, Users, ExternalLink, Sparkles, TestTube, Mic, Image, Video, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

const EspaLuzSection = () => {
  const openTelegramChat = () => {
    window.open('https://t.me/EspaLuzFamily_bot', '_blank');
  };

  const openWhatsAppSandbox = () => {
    window.open('https://api.whatsapp.com/send/?phone=14155238886&text=join+pride-liquid', '_blank');
  };

  const openLiveWhatsApp = () => {
    window.open('https://bit.ly/EspaLuz', '_blank');
  };

  return (
    <section id="espaluz" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span className="text-sm font-medium text-pink-300">Living Proof of Concept</span>
          </div>
          
          {/* EspaLuz Photo and Title */}
          <div className="flex flex-col items-center gap-6 mb-6">
            <div className="relative">
              <img 
                src="/lovable-uploads/a9ca2d17-65b0-43f6-8da1-665c7f725d79.png"
                alt="EspaLuz - AI Family Tutor"
                className="w-32 h-32 rounded-full object-cover shadow-2xl border-4 border-purple-400/30"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                <span className="text-xs">🤖</span>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-poppins">
              Meet <span className="gradient-text">EspaLuz</span>
            </h2>
          </div>
          
          <p className="text-xl text-gray-300 leading-relaxed">
            Your bilingual AI family tutor — emotionally intelligent, culturally aware, and ready to help expat families thrive in Spanish-speaking countries.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Description & Features */}
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
                <div className="flex items-center gap-2 text-amber-300">
                  <Heart className="w-5 h-5" />
                  <span>Emotionally Aware</span>
                </div>
                <div className="flex items-center gap-2 text-green-300">
                  <MessageCircle className="w-5 h-5" />
                  <span>Real-time Chat</span>
                </div>
              </div>
            </div>

            {/* Current Functionalities */}
            <div className="glass-card p-8">
              <h3 className="text-2xl font-semibold text-white mb-6 font-poppins">
                Current Functionalities
              </h3>
              <div className="grid gap-4">
                <div className="flex items-start gap-3">
                  <Mic className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">Accepts voice and text messages in English, Spanish, and Russian, as well as photos from users</span>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">Instantly translates any message into both Spanish and English</span>
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">Generates bilingual replies with rich, emotionally aware context</span>
                </div>
                <div className="flex items-start gap-3">
                  <Video className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">Creates short avatar videos in Spanish and English — designed to engage children</span>
                </div>
                <div className="flex items-start gap-3">
                  <Mic className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">Sends voice messages with full bilingual content using AI voice synthesis</span>
                </div>
                <div className="flex items-start gap-3">
                  <Image className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">Translates text inside images (OCR) using GPT-4o vision capabilities</span>
                </div>
                <div className="flex items-start gap-3">
                  <Brain className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">Maintains emotional memory and context throughout the conversation</span>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-rose-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">Adapts tone based on detected emotions and the user's personal profile</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Action Cards */}
          <div className="space-y-6">
            {/* Telegram Card */}
            <div className="glass-card p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full">
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
              <Button 
                onClick={openTelegramChat}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-full transition-all duration-300"
              >
                Open Telegram Chat
                <ExternalLink className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* WhatsApp Live Card - PRIORITY */}
            <div className="glass-card p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 border-2 border-green-400/50 relative overflow-hidden">
              {/* Premium Badge */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-green-400 to-emerald-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                🔥 LIVE NOW
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white font-poppins flex items-center gap-2">
                    WhatsApp Live 
                    <span className="text-green-400">⚡</span>
                  </h3>
                  <p className="text-green-300 font-medium">Full-featured • Real-time • Ready now!</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                🚀 <strong className="text-green-400">The complete EspaLuz experience</strong> — chat directly with our fully operational WhatsApp bot! Voice messages, image translation, emotional intelligence, and all premium features are live and ready for your family.
              </p>
              <Button 
                onClick={openLiveWhatsApp}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                🚀 Start Chatting Now
                <ExternalLink className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* WhatsApp Sandbox Card */}
            <div className="glass-card p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full">
                  <TestTube className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white font-poppins">WhatsApp Sandbox</h3>
                  <p className="text-gray-300">Testing via Twilio Sandbox</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6">
                Alternative testing environment using Twilio's WhatsApp Sandbox. While our live WhatsApp bot is fully operational, this sandbox provides additional testing capabilities for development purposes.
              </p>
              <Button
                onClick={openWhatsAppLive}
                className="w-full bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 hover:from-emerald-500 hover:via-green-600 hover:to-teal-600 text-white font-semibold py-4 rounded-full transition-all duration-300 shadow-xl ring-2 ring-emerald-300/50"
              >
                Open WhatsApp Live
                <ExternalLink className="ml-2 w-5 h-5" />
              </Button>
              <div className="mt-4" />
              <Button 
                onClick={openWhatsAppSandbox}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold py-3 rounded-full transition-all duration-300"
              >
                Test WhatsApp Sandbox
                <TestTube className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* Stats */}
            <div className="glass-card p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-400 mb-1">Live</div>
                  <div className="text-gray-300 text-sm">On Telegram</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400 mb-1">Live</div>
                  <div className="text-gray-300 text-sm">WhatsApp Bot</div>
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
