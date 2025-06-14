
import { Zap, Shield, Palette, Smartphone, Globe, Rocket } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance ensures your website loads instantly, providing an exceptional user experience.",
    color: "text-yellow-400"
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Built with industry-leading security practices and robust architecture for peace of mind.",
    color: "text-green-400"
  },
  {
    icon: Palette,
    title: "Beautiful Design",
    description: "Stunning visual design that captures attention and reflects your brand's unique personality.",
    color: "text-purple-400"
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Responsive design that looks perfect on every device, from mobile phones to desktop computers.",
    color: "text-blue-400"
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Optimized for international audiences with multi-language support and global CDN delivery.",
    color: "text-cyan-400"
  },
  {
    icon: Rocket,
    title: "Easy to Scale",
    description: "Built to grow with your business, easily expandable architecture for future enhancements.",
    color: "text-pink-400"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
            <span className="gradient-text">Powerful Features</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Everything you need to create an exceptional web presence that stands out from the competition
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 group"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className={`${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon size={48} />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4 font-poppins">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="glass-card inline-block p-8 max-w-2xl">
            <h3 className="text-2xl font-semibold text-white mb-4 font-poppins">
              Ready to transform your digital presence?
            </h3>
            <p className="text-gray-300 mb-6">
              Join thousands of satisfied clients who have elevated their business with our modern web solutions.
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-full font-semibold shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
              Start Your Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
