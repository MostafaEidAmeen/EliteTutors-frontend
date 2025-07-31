import { Search, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Hero = () => {
  return (
    <section className="hero-gradient text-white py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Find the Best Tutors for You
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
          Connect with qualified tutors across Kuwait, Egypt, Saudi Arabia, and UAE. 
          Get personalized learning experiences tailored to your educational needs.
        </p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for subjects..."
                className="pl-10 pr-4 py-3 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
              />
            </div>
            <Button className="bg-accent hover:bg-accent/90 text-white px-8 py-3">
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* CTA Button */}
        <Button 
          size="lg" 
          className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4"
        >
          Browse Teachers Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};

export default Hero;

