
import { ArrowRight, Heart, Brain, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-purple-500/10 via-pink-500/5 to-blue-500/10 rounded-full blur-3xl animate-spin" style={{ animationDuration: '30s' }}></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card animate-fade-in">
            <Heart className="w-4 h-4 text-pink-400" />
            <span className="text-sm font-medium text-purple-300">Emotionally Intelligent AI • Web3 Native</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-poppins tracking-tight animate-fade-in delay-200">
            <span className="gradient-text">AI Personal Assistants</span>
            <br />
            <span className="text-white text-shadow">That Actually</span>
            <br />
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Understand You</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-400">
            Meet <span className="text-pink-400 font-semibold">AIdeazz</span> — where emotionally intelligent AI Personal Assistants evolve with you. 
            <br />
            <span className="text-purple-400 font-semibold">Built not to replace humans, but to help them thrive through transformation.</span>
          </p>

          {/* Live Proof Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 animate-fade-in delay-500">
            <Zap className="w-5 h-5 text-green-400" />
            <span className="text-green-300 font-semibold">EspaLuz is LIVE on Telegram & WhatsApp</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in delay-600">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <Heart className="mr-2 w-5 h-5" />
              Meet EspaLuz
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-purple-500/50 hover:border-purple-400 text-purple-300 hover:text-purple-200 px-8 py-4 rounded-full font-semibold text-lg backdrop-blur-sm hover:bg-purple-500/10 transition-all duration-300"
            >
              <Brain className="mr-2 w-5 h-5" />
              Explore the Vision
            </Button>
          </div>

          {/* Founder Badge */}
          <div className="pt-8 animate-fade-in delay-800">
            <p className="text-gray-400 text-sm">
              Built by a solo founder • Former IT leader in e-government • Grassroots transformation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
