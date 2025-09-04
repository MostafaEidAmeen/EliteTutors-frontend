import { useState } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Loader2, User, Mail, Lock, Phone, MapPin } from 'lucide-react';
import logo from '../assets/logo.png';

const RegisterForm = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    phone: '',
    whatsapp_number: '',
    country: '',
    city: '',
    title: '',
    bio: '',
    experience_years: '',
    hourly_rate: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const registrationData = {
        ...formData,
        experience_years: parseInt(formData.experience_years) || 0,
        hourly_rate: parseFloat(formData.hourly_rate) || 0.0
      };
      delete registrationData.confirmPassword;

      await register(registrationData);
      setSuccess('Registration successful! Your account is pending admin approval. You will be notified once approved.');
      
      // Clear form
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        first_name: '',
        last_name: '',
        phone: '',
        whatsapp_number: '',
        country: '',
        city: '',
        title: '',
        bio: '',
        experience_years: '',
        hourly_rate: ''
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="EliteTutors" className="h-16 w-auto" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Teacher Registration
          </CardTitle>
          <p className="text-gray-600">
            Join EliteTutors as a teacher
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {success && (
              <Alert>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium text-gray-700">
                  Username *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="pl-10"
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="pl-10"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="pl-10"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="pl-10"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="first_name" className="text-sm font-medium text-gray-700">
                  First Name *
                </label>
                <Input
                  id="first_name"
                  name="first_name"
                  type="text"
                  required
                  placeholder="Your first name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="last_name" className="text-sm font-medium text-gray-700">
                  Last Name *
                </label>
                <Input
                  id="last_name"
                  name="last_name"
                  type="text"
                  required
                  placeholder="Your last name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="pl-10"
                    placeholder="+1234567890"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="whatsapp_number" className="text-sm font-medium text-gray-700">
                  WhatsApp Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="whatsapp_number"
                    name="whatsapp_number"
                    type="tel"
                    className="pl-10"
                    placeholder="+1234567890"
                    value={formData.whatsapp_number}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="country" className="text-sm font-medium text-gray-700">
                  Country
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="country"
                    name="country"
                    type="text"
                    className="pl-10"
                    placeholder="Your country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="city" className="text-sm font-medium text-gray-700">
                  City
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    className="pl-10"
                    placeholder="Your city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium text-gray-700">
                  Title
                </label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Dr., Prof., Mr., Ms., etc."
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="experience_years" className="text-sm font-medium text-gray-700">
                  Years of Experience
                </label>
                <Input
                  id="experience_years"
                  name="experience_years"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.experience_years}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="hourly_rate" className="text-sm font-medium text-gray-700">
                Hourly Rate (USD)
              </label>
              <Input
                id="hourly_rate"
                name="hourly_rate"
                type="number"
                min="0"
                step="0.01"
                placeholder="25.00"
                value={formData.hourly_rate}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="bio" className="text-sm font-medium text-gray-700">
                Bio
              </label>
              <Textarea
                id="bio"
                name="bio"
                placeholder="Tell us about yourself, your teaching experience, and methodology..."
                value={formData.bio}
                onChange={handleChange}
                rows={4}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registering...
                </>
              ) : (
                'Register'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in here
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;

