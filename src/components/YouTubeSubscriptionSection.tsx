
import { Youtube, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const YouTubeSubscriptionSection = () => {
  const openYouTubeChannel = () => {
    window.open('https://www.youtube.com/@AIdeazz', '_blank');
  };

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="glass-card p-8 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full">
                <Youtube className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white font-poppins">
                Subscribe to Our YouTube Channel
              </h3>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Stay updated with the latest AIdeazz developments, tutorials, and insights into the future of emotional AI.
            </p>
            
            <Button 
              onClick={openYouTubeChannel}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-red-500/25"
            >
              <Youtube className="w-5 h-5 mr-2" />
              Subscribe Now
              <Bell className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouTubeSubscriptionSection;
