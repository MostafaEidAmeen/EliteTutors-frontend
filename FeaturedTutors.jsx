import { Star, MapPin, Clock, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const FeaturedTutors = () => {
  const tutors = [];

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Teachers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet our top-rated tutors who have helped thousands of students achieve their academic goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tutors.map((tutor) => (
            <Card key={tutor.id} className="card-hover">
              <CardContent className="p-6">
                {/* Tutor Image and Status */}
                <div className="relative mb-4">
                  <img
                    src={tutor.image}
                    alt={tutor.name}
                    className="w-20 h-20 rounded-full mx-auto object-cover"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${
                    tutor.available ? 'bg-green-500' : 'bg-gray-400'
                  }`}></div>
                </div>

                {/* Tutor Info */}
                <div className="text-center mb-4">
                  <h3 className="font-semibold text-lg text-foreground mb-1">
                    {tutor.name}
                  </h3>
                  <div className="flex items-center justify-center text-sm text-muted-foreground mb-2">
                    <span className="mr-1">{tutor.flag}</span>
                    <MapPin className="h-3 w-3 mr-1" />
                    {tutor.country}
                  </div>
                  <Badge variant="secondary" className="mb-2">
                    {tutor.subject}
                  </Badge>
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center justify-center mb-3">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium text-sm">{tutor.rating}</span>
                  <span className="text-muted-foreground text-sm ml-1">
                    ({tutor.reviews} reviews)
                  </span>
                </div>

                {/* Experience and Price */}
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {tutor.experience}
                  </div>
                  <span className="font-medium text-foreground">{tutor.price}</span>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {tutor.specialties.slice(0, 2).map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                    {tutor.specialties.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{tutor.specialties.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button className="w-full bg-primary hover:bg-primary/90" size="sm">
                    View Profile
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            View All Featured Tutors
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTutors;

