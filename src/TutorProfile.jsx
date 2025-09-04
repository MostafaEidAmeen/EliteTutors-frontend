import { useState } from 'react';
import { Star, MapPin, Clock, MessageCircle, Calendar, Award, BookOpen, Phone, Mail, Video } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const TutorProfile = ({ tutorId = 1 }) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  // Mock tutor data
  const tutor = {
    id: 1,
    name: 'Dr. Ahmed Hassan',
    title: 'Mathematics Professor',
    country: 'Egypt',
    flag: '🇪🇬',
    city: 'Cairo',
    subject: 'Mathematics',
    level: 'High School',
    rating: 4.9,
    reviewCount: 127,
    experience: '8 years',
    price: 25,
    responseTime: '2 hours',
    whatsapp: '+201234567890',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    specialties: ['Algebra', 'Calculus', 'Statistics', 'Geometry', 'Trigonometry'],
    languages: ['Arabic', 'English'],
    education: [
      'PhD in Applied Mathematics - Cairo University',
      'MSc in Pure Mathematics - Alexandria University',
      'BSc in Mathematics - Cairo University'
    ],
    certifications: [
      'Certified Mathematics Teacher',
      'Advanced Calculus Specialist',
      'Statistics and Probability Expert'
    ],
    adminDescription: `Dr. Ahmed Hassan has been verified by our administrative team as a highly qualified mathematics educator. He holds a PhD in Applied Mathematics from Cairo University and has undergone our comprehensive background check and teaching assessment. 

    Administrative Notes:
    - Verified academic credentials and teaching certifications
    - Completed EliteTutors teaching methodology training
    - Maintains excellent punctuality and professional conduct
    - Specializes in advanced mathematics for high school and university preparation
    - Fluent in both Arabic and English instruction
    - Available for both online and in-person sessions in Cairo area`,
    bio: `Dr. Ahmed Hassan is an experienced mathematics professor with over 8 years of teaching experience. He specializes in advanced mathematics topics including calculus, algebra, and statistics. Dr. Hassan has helped hundreds of students achieve their academic goals and improve their mathematical understanding.

    His teaching methodology focuses on building strong foundational concepts while making complex topics accessible and engaging. He believes in personalized learning approaches that cater to each student's unique learning style and pace.`,
    
    availability: {
      'Monday': ['09:00', '10:00', '14:00', '15:00', '16:00'],
      'Tuesday': ['09:00', '10:00', '11:00', '14:00', '15:00'],
      'Wednesday': ['10:00', '11:00', '14:00', '15:00', '16:00'],
      'Thursday': ['09:00', '10:00', '14:00', '15:00'],
      'Friday': ['09:00', '10:00', '11:00'],
      'Saturday': ['14:00', '15:00', '16:00'],
      'Sunday': []
    },
    
    reviews: [
      {
        id: 1,
        student: 'Sarah Al-Mahmoud',
        country: 'Kuwait',
        flag: '🇰🇼',
        rating: 5,
        date: '2024-01-15',
        comment: 'Dr. Ahmed is an excellent teacher! He helped my daughter improve her calculus grades significantly. His explanations are clear and he is very patient.',
        subject: 'Calculus'
      },
      {
        id: 2,
        student: 'Omar Al-Rashid',
        country: 'Saudi Arabia',
        flag: '🇸🇦',
        rating: 5,
        date: '2024-01-10',
        comment: 'Outstanding tutor! Made algebra concepts so much easier to understand. Highly recommend for anyone struggling with mathematics.',
        subject: 'Algebra'
      },
      {
        id: 3,
        student: 'Fatima Hassan',
        country: 'UAE',
        flag: '🇦🇪',
        rating: 4,
        date: '2024-01-05',
        comment: 'Very knowledgeable and professional. Helped me prepare for my statistics exam. Great teaching style.',
        subject: 'Statistics'
      }
    ],
    
    stats: {
      totalStudents: 156,
      completedSessions: 1240,
      successRate: 96,
      repeatStudents: 78
    }
  };

  const handleBookSession = (day, time) => {
    setSelectedTimeSlot({ day, time });
    // Here you would typically open a booking modal or navigate to booking page
    alert(`Booking session for ${day} at ${time}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <img
                src={tutor.image}
                alt={tutor.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{tutor.name}</h1>
              <p className="text-xl text-white/90 mb-2">{tutor.title}</p>
              <div className="flex items-center text-white/80 mb-4">
                <span className="mr-2">{tutor.flag}</span>
                <MapPin className="h-4 w-4 mr-1" />
                {tutor.city}, {tutor.country}
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium">{tutor.rating}</span>
                  <span className="text-white/70 ml-1">({tutor.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {tutor.experience} experience
                </div>
                <div className="flex items-center">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Responds in {tutor.responseTime}
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold mb-2">${tutor.price}/hour</div>
              <div className="space-y-2">
                <Button className="bg-accent hover:bg-accent/90 text-white w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Trial Session
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button 
                  onClick={() => window.open(`https://wa.me/${tutor.whatsapp.replace('+', '')}?text=Hello, I'm interested in your tutoring services`, '_blank')}
                  className="bg-green-500 hover:bg-green-600 text-white w-full"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="admin">Admin Info</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="certificates">Certificates</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About Dr. Ahmed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      {tutor.bio.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                          {paragraph.trim()}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Specialties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {tutor.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Education</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {tutor.education.map((edu, index) => (
                        <div key={index} className="flex items-start">
                          <Award className="h-5 w-5 text-primary mr-3 mt-0.5" />
                          <span className="text-muted-foreground">{edu}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="admin" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="h-5 w-5 mr-2 text-primary" />
                      Administrative Verification
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      {tutor.adminDescription.split('\n\n').map((paragraph, index) => (
                        <div key={index} className="mb-4">
                          {paragraph.trim().includes('Administrative Notes:') ? (
                            <div>
                              <h4 className="font-semibold text-foreground mb-2">Administrative Notes:</h4>
                              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                {paragraph.split('\n').slice(1).map((note, noteIndex) => (
                                  note.trim().startsWith('-') && (
                                    <li key={noteIndex} className="ml-4">
                                      {note.trim().substring(1).trim()}
                                    </li>
                                  )
                                ))}
                              </ul>
                            </div>
                          ) : (
                            <p className="text-muted-foreground leading-relaxed">
                              {paragraph.trim()}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-green-800 font-medium">Verified Tutor</span>
                      </div>
                      <p className="text-green-700 text-sm mt-2">
                        This tutor has been thoroughly vetted by our administrative team and meets all EliteTutors quality standards.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="schedule" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Time Slots</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(tutor.availability).map(([day, times]) => (
                        <div key={day} className="border-b border-border pb-4 last:border-b-0">
                          <h4 className="font-medium mb-3">{day}</h4>
                          {times.length > 0 ? (
                            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                              {times.map((time, index) => (
                                <Button
                                  key={index}
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleBookSession(day, time)}
                                  className="hover:bg-primary hover:text-white"
                                >
                                  {time}
                                </Button>
                              ))}
                            </div>
                          ) : (
                            <p className="text-muted-foreground text-sm">Not available</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="space-y-6">
                <div className="space-y-4">
                  {tutor.reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarFallback>{review.student.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium">{review.student}</h4>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <span className="mr-1">{review.flag}</span>
                                {review.country} • {review.subject}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center mb-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <div className="text-sm text-muted-foreground">{review.date}</div>
                          </div>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="certificates" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Certifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {tutor.certifications.map((cert, index) => (
                        <div key={index} className="flex items-start">
                          <Award className="h-5 w-5 text-accent mr-3 mt-0.5" />
                          <span className="text-muted-foreground">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Students</span>
                    <span className="font-medium">{tutor.stats.totalStudents}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sessions Completed</span>
                    <span className="font-medium">{tutor.stats.completedSessions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Success Rate</span>
                    <span className="font-medium">{tutor.stats.successRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Repeat Students</span>
                    <span className="font-medium">{tutor.stats.repeatStudents}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Options */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Video className="h-4 w-4 mr-2" />
                  Video Call
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  Voice Call
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card>
              <CardHeader>
                <CardTitle>Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tutor.languages.map((language, index) => (
                    <Badge key={index} variant="outline">
                      {language}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Subject & Level */}
            <Card>
              <CardHeader>
                <CardTitle>Teaching Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-muted-foreground">Subject</span>
                    <div className="font-medium">{tutor.subject}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Level</span>
                    <div className="font-medium">{tutor.level}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;

