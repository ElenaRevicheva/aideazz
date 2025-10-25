import { Youtube, Bell, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const YouTubeSubscriptionSection = () => {
  const { t } = useTranslation();
  
  const openYouTubeChannel = () => {
    window.open('https://www.youtube.com/@AIdeazz', '_blank');
  };

  const openMirrorProfile = () => {
    window.open('https://mirror.xyz/0x116bB2352c3Bc5a671fe09f0CBfd9957Cb467dA5', '_blank');
  };

  return (
    <section className="py-16 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <div className="glass-card p-8 hover:bg-white/10 transition-all duration-300 relative z-20">
            <h3 className="text-2xl font-semibold text-white font-poppins mb-6">
              {t("youtube.title")}
            </h3>
            
            <p className="text-gray-300 mb-8 leading-relaxed">
              {t("youtube.description")}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-30">
              <Button 
                onClick={openYouTubeChannel}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-red-500/25 cursor-pointer relative z-40"
                style={{ pointerEvents: 'auto' }}
              >
                <Youtube className="w-5 h-5 mr-2" />
                {t("youtube.youtubeButton")}
                <Bell className="w-4 h-4 ml-2" />
              </Button>
              
              <Button 
                onClick={openMirrorProfile}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-purple-500/25 cursor-pointer relative z-40"
                style={{ pointerEvents: 'auto' }}
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                {t("youtube.mirrorButton")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouTubeSubscriptionSection;