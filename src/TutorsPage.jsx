import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin, Star, Clock, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';

const TutorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tutors from API
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        console.log('Fetching tutors from API...');
        const response = await fetch('http://localhost:5001/api/teachers');
        const data = await response.json();
        console.log('API Response:', data);
        
        // Transform API data to match frontend format
        const transformedTutors = data.teachers.map(teacher => ({
          id: teacher.id,
          name: teacher.full_name,
          country: teacher.country,
          flag: getCountryFlag(teacher.country),
          subject: JSON.parse(teacher.subjects || '[]')[0] || 'General',
          level: JSON.parse(teacher.education_levels || '[]')[0] || 'All Levels',
          gender: teacher.gender || 'Not specified',
          rating: teacher.rating || 0,
          reviews: teacher.total_reviews || 0,
          experience: teacher.experience_years ? `${teacher.experience_years} years` : 'Not specified',
          price: teacher.hourly_rate || 0,
          image: teacher.profile_image ? `http://localhost:5001${teacher.profile_image}` : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          specialties: JSON.parse(teacher.subjects || '[]').slice(0, 3),
          available: teacher.status === 'approved',
          bio: teacher.bio || 'Experienced teacher'
        }));
        
        console.log('Transformed tutors:', transformedTutors);
        setTutors(transformedTutors);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tutors:', error);
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  // Helper function to get country flag
  const getCountryFlag = (country) => {
    const flags = {
      'Kuwait': '🇰🇼',
      'Egypt': '🇪🇬',
      'Saudi Arabia': '🇸🇦',
      'UAE': '🇦🇪'
    };
    return flags[country] || '🌍';
  };

  // Mock data for tutors (fallback)
  const mockTutors = [
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

  // Filter tutors based on search and filter criteria
  useEffect(() => {
    let filtered = tutors.filter(tutor => {
      const matchesSearch = tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tutor.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tutor.specialties.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesLevel = !selectedLevel || tutor.level === selectedLevel;
      const matchesCountry = !selectedCountry || tutor.country === selectedCountry;
      const matchesSubject = !selectedSubject || tutor.subject === selectedSubject;
      const matchesGender = !selectedGender || tutor.gender === selectedGender;
      const matchesPrice = tutor.price >= priceRange[0] && tutor.price <= priceRange[1];

      return matchesSearch && matchesLevel && matchesCountry && matchesSubject && matchesGender && matchesPrice;
    });

    setFilteredTutors(filtered);
  }, [tutors, searchTerm, selectedLevel, selectedCountry, selectedSubject, selectedGender, priceRange]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLevel('');
    setSelectedCountry('');
    setSelectedSubject('');
    setSelectedGender('');
    setPriceRange([0, 100]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Tutor</h1>
          <p className="text-lg text-white/90">
            Browse through our qualified tutors and find the perfect match for your learning needs
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Filter className="h-5 w-5 mr-2" />
                    Filters
                  </h3>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search tutors, subjects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Educational Level */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Educational Level</label>
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kindergarten">Kindergarten</SelectItem>
                      <SelectItem value="Elementary">Elementary</SelectItem>
                      <SelectItem value="Middle School">Middle School</SelectItem>
                      <SelectItem value="High School">High School</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Country */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Country</label>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kuwait">🇰🇼 Kuwait</SelectItem>
                      <SelectItem value="Egypt">🇪🇬 Egypt</SelectItem>
                      <SelectItem value="Saudi Arabia">🇸🇦 Saudi Arabia</SelectItem>
                      <SelectItem value="UAE">🇦🇪 UAE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Subject */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                      <SelectItem value="Biology">Biology</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Arabic Literature">Arabic Literature</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Gender */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Gender</label>
                  <Select value={selectedGender} onValueChange={setSelectedGender}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}/hour
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tutors Grid */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {filteredTutors.length} tutors found
              </h2>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rating</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="experience">Most Experienced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-full text-center py-8">
                  <p>Loading tutors...</p>
                </div>
              ) : filteredTutors.length === 0 ? (
                <div className="col-span-full text-center py-8">
                  <p>No tutors found matching your criteria.</p>
                </div>
              ) : (
                filteredTutors.map((tutor) => (
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
                      <Badge variant="outline" className="ml-2">
                        {tutor.level}
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
                      <span className="font-medium text-foreground">${tutor.price}/hour</span>
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-muted-foreground mb-4 text-center">
                      {tutor.bio}
                    </p>

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
                      <Link to={`/tutor/${tutor.id}`}>
                        <Button className="w-full bg-primary hover:bg-primary/90" size="sm">
                          View Profile
                        </Button>
                      </Link>
                      <Button variant="outline" className="w-full" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorsPage;

