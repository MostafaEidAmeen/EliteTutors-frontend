import { Star, MapPin, Clock, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const FeaturedTutors = () => {
  const tutors = [
    {
      id: 1,
      name: 'Dr. Ahmed Hassan',
      country: 'Egypt',
      flag: '🇪🇬',
      subject: 'Mathematics',
      level: 'High School',
      gender: 'Male',
      rating: 4.9,
      reviews: 127,
      experience: '8 years',
      price: 25,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      specialties: ['Algebra', 'Calculus', 'Statistics'],
      available: true,
      bio: 'Experienced mathematics teacher with PhD in Applied Mathematics.'
    },
    {
      id: 2,
      name: 'Prof. Fatima Al-Zahra',
      country: 'Kuwait',
      flag: '🇰🇼',
      subject: 'Arabic Literature',
      level: 'Middle School',
      gender: 'Female',
      rating: 4.8,
      reviews: 89,
      experience: '12 years',
      price: 30,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      specialties: ['Classical Arabic', 'Poetry', 'Grammar'],
      available: true,
      bio: 'Professor of Arabic Literature with extensive experience in classical texts.'
    },
    {
      id: 3,
      name: 'Dr. Mohammed Al-Rashid',
      country: 'Saudi Arabia',
      flag: '🇸🇦',
      subject: 'Physics',
      level: 'High School',
      gender: 'Male',
      rating: 4.9,
      reviews: 156,
      experience: '10 years',
      price: 35,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      specialties: ['Quantum Physics', 'Mechanics', 'Thermodynamics'],
      available: false,
      bio: 'Physics researcher and educator specializing in advanced physics concepts.'
    },
    {
      id: 4,
      name: 'Ms. Aisha Rahman',
      country: 'UAE',
      flag: '🇦🇪',
      subject: 'English',
      level: 'Elementary',
      gender: 'Female',
      rating: 4.7,
      reviews: 203,
      experience: '6 years',
      price: 28,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      specialties: ['IELTS', 'Business English', 'Literature'],
      available: true,
      bio: 'Certified English teacher with expertise in international examinations.'
    },
    {
      id: 5,
      name: 'Dr. Sarah Al-Mahmoud',
      country: 'Kuwait',
      flag: '🇰🇼',
      subject: 'Chemistry',
      level: 'High School',
      gender: 'Female',
      rating: 4.6,
      reviews: 94,
      experience: '7 years',
      price: 32,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      specialties: ['Organic Chemistry', 'Inorganic Chemistry', 'Lab Work'],
      available: true,
      bio: 'Chemistry PhD with hands-on laboratory experience and research background.'
    },
    {
      id: 6,
      name: 'Prof. Omar Hassan',
      country: 'Egypt',
      flag: '🇪🇬',
      subject: 'Biology',
      level: 'Middle School',
      gender: 'Male',
      rating: 4.8,
      reviews: 112,
      experience: '9 years',
      price: 26,
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
      specialties: ['Cell Biology', 'Genetics', 'Ecology'],
      available: true,
      bio: 'Biology professor with research experience in molecular biology and genetics.'
    }
  ];

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-foreground mb-8">
          Featured Tutors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutors.map((tutor) => (
            <Card key={tutor.id} className="card-hover">
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <img
                    src={tutor.image}
                    alt={tutor.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-primary"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${
                    tutor.available ? 'bg-green-500' : 'bg-gray-400'
                  }`}></div>
                </div>
                <h3 className="font-semibold text-xl text-foreground mb-2">
                  {tutor.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-2">
                  {tutor.subject} - {tutor.level}
                </p>
                <div className="flex items-center justify-center mb-4">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium text-foreground">{tutor.rating}</span>
                  <span className="text-muted-foreground ml-1">({tutor.reviews} reviews)</span>
                </div>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {tutor.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTutors;


