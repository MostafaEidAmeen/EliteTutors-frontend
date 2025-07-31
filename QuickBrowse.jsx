import { GraduationCap, Users, BookOpen, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const QuickBrowse = () => {
  const educationLevels = [
    { name: 'Kindergarten', icon: BookOpen, color: 'bg-secondary' },
    { name: 'Elementary', icon: GraduationCap, color: 'bg-primary' },
    { name: 'Middle School', icon: Users, color: 'bg-accent' },
    { name: 'High School', icon: Award, color: 'bg-purple-500' },
  ];

  const countries = [
    { name: 'Kuwait', flag: '🇰🇼', color: 'bg-blue-500' },
    { name: 'Egypt', flag: '🇪🇬', color: 'bg-red-500' },
    { name: 'Saudi Arabia', flag: '🇸🇦', color: 'bg-green-600' },
    { name: 'UAE', flag: '🇦🇪', color: 'bg-red-600' },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Quick Browse
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find tutors by educational level or browse by country to discover local expertise
          </p>
        </div>

        {/* Education Levels */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
            Browse by Educational Level
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {educationLevels.map((level, index) => {
              const IconComponent = level.icon;
              return (
                <Card key={index} className="card-hover cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className={`${level.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-foreground">{level.name}</h4>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Countries */}
        <div>
          <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
            Browse by Country
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {countries.map((country, index) => (
              <Card key={index} className="card-hover cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{country.flag}</div>
                  <h4 className="font-semibold text-foreground">{country.name}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            View All Tutors
          </Button>
        </div>
      </div>
    </section>
  );
};

export default QuickBrowse;

