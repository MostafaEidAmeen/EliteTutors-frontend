import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Search, Plus, Edit, Trash2, Users, BookOpen, Star, MapPin, Phone, Mail } from 'lucide-react';

const AdminManagersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('tutors');

  // Mock data for tutors
  const tutors = [
    {
      id: 1,
      name: 'Dr. Ahmed Hassan',
      email: 'ahmed.hassan@email.com',
      phone: '+201234567890',
      country: 'Egypt',
      flag: '🇪🇬',
      subject: 'Mathematics',
      level: 'High School',
      rating: 4.9,
      students: 45,
      status: 'active',
      verified: true,
      joinDate: '2023-01-15'
    },
    {
      id: 2,
      name: 'Prof. Fatima Al-Zahra',
      email: 'fatima.alzahra@email.com',
      phone: '+96512345678',
      country: 'Kuwait',
      flag: '🇰🇼',
      subject: 'Arabic Literature',
      level: 'Middle School',
      rating: 4.8,
      students: 32,
      status: 'active',
      verified: true,
      joinDate: '2023-02-20'
    },
    {
      id: 3,
      name: 'Dr. Mohammed Al-Rashid',
      email: 'mohammed.rashid@email.com',
      phone: '+966123456789',
      country: 'Saudi Arabia',
      flag: '🇸🇦',
      subject: 'Physics',
      level: 'High School',
      rating: 4.9,
      students: 38,
      status: 'pending',
      verified: false,
      joinDate: '2024-01-10'
    }
  ];

  // Mock data for students
  const students = [
    {
      id: 1,
      name: 'Sarah Al-Mahmoud',
      email: 'sarah.mahmoud@email.com',
      phone: '+96587654321',
      country: 'Kuwait',
      flag: '🇰🇼',
      level: 'High School',
      subjects: ['Mathematics', 'Physics'],
      tutors: 2,
      status: 'active',
      joinDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Omar Al-Rashid',
      email: 'omar.rashid@email.com',
      phone: '+966987654321',
      country: 'Saudi Arabia',
      flag: '🇸🇦',
      level: 'Middle School',
      subjects: ['Arabic Literature', 'History'],
      tutors: 1,
      status: 'active',
      joinDate: '2024-02-01'
    }
  ];

  const filteredTutors = tutors.filter(tutor =>
    tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tutor.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tutor.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const statusColors = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      inactive: 'bg-red-100 text-red-800'
    };
    return (
      <Badge className={statusColors[status] || 'bg-gray-100 text-gray-800'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Management Dashboard</h1>
          <p className="text-muted-foreground">Manage tutors, students, and platform operations</p>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search tutors, students, subjects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Tutor
            </Button>
            <Button variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Bulk Actions
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Tutors</p>
                  <p className="text-2xl font-bold">{tutors.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold">{students.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Active Sessions</p>
                  <p className="text-2xl font-bold">127</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MapPin className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Countries</p>
                  <p className="text-2xl font-bold">4</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tutors">Tutors Management</TabsTrigger>
            <TabsTrigger value="students">Students Management</TabsTrigger>
          </TabsList>

          {/* Tutors Tab */}
          <TabsContent value="tutors" className="space-y-6">
            <div className="grid gap-6">
              {filteredTutors.map((tutor) => (
                <Card key={tutor.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                      <div className="flex items-center space-x-4 mb-4 md:mb-0">
                        <Avatar className="h-16 w-16">
                          <AvatarFallback>{tutor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-semibold">{tutor.name}</h3>
                          <p className="text-muted-foreground">{tutor.subject} - {tutor.level}</p>
                          <div className="flex items-center mt-1">
                            <span className="mr-2">{tutor.flag}</span>
                            <span className="text-sm text-muted-foreground">{tutor.country}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <div className="text-sm space-y-1">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span>{tutor.rating}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-blue-500 mr-1" />
                            <span>{tutor.students} students</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-xs">{tutor.phone}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2">
                          {getStatusBadge(tutor.status)}
                          {tutor.verified && (
                            <Badge className="bg-blue-100 text-blue-800">Verified</Badge>
                          )}
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <div className="grid gap-6">
              {filteredStudents.map((student) => (
                <Card key={student.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                      <div className="flex items-center space-x-4 mb-4 md:mb-0">
                        <Avatar className="h-16 w-16">
                          <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-semibold">{student.name}</h3>
                          <p className="text-muted-foreground">{student.level}</p>
                          <div className="flex items-center mt-1">
                            <span className="mr-2">{student.flag}</span>
                            <span className="text-sm text-muted-foreground">{student.country}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <div className="text-sm space-y-1">
                          <div className="flex flex-wrap gap-1">
                            {student.subjects.map((subject, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {subject}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-blue-500 mr-1" />
                            <span>{student.tutors} tutors</span>
                          </div>
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-xs">{student.email}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2">
                          {getStatusBadge(student.status)}
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminManagersPage;

