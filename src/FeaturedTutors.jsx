import React, { useState, useEffect } from 'react';
import { Star, MapPin, Clock, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

const FeaturedTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/teachers`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Featured Tutors API Response:", data);
        // Assuming the API returns a 'teachers' array directly
        const transformedTutors = data.teachers.map(tutor => ({
          id: tutor.id,
          name: tutor.full_name,
          country: tutor.country,
          flag: '🇰🇼', // Placeholder, API doesn't provide flags
          subject: tutor.subjects ? JSON.parse(tutor.subjects)[0] : 'N/A',
          level: tutor.education_levels ? JSON.parse(tutor.education_levels)[0] : 'N/A',
          gender: tutor.gender || 'N/A',
          rating: tutor.rating,
          reviews: tutor.total_reviews,
          experience: `${tutor.experience_years} years`,
          price: tutor.hourly_rate,
          image: `${API_BASE_URL}${tutor.profile_image}`,
          specialties: tutor.subjects ? JSON.parse(tutor.subjects) : [],
          available: true, // Assuming all featured tutors are available
          bio: tutor.bio
        }));
        setTutors(transformedTutors);
      } catch (e) {
        console.error("Error fetching featured tutors:", e);
        setError("Failed to load featured tutors.");
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  if (loading) {
    return <section className="py-12 px-4 text-center">Loading featured tutors...</section>;
  }

  if (error) {
    return <section className="py-12 px-4 text-center text-red-500">Error: {error}</section>;
  }

  if (tutors.length === 0) {
    return <section className="py-12 px-4 text-center">No featured tutors found.</section>;
  }

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


