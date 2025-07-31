import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Loader2, Save, Lock, User, Mail, Phone, MapPin, DollarSign, Clock } from 'lucide-react';

const ProfileEditor = () => {
  const { teacher, updateProfile, canEditProfile } = useAuth();
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (teacher) {
      setFormData({
        first_name: teacher.first_name || '',
        last_name: teacher.last_name || '',
        phone: teacher.phone || '',
        whatsapp_number: teacher.whatsapp_number || '',
        city: teacher.city || '',
        title: teacher.title || '',
        bio: teacher.bio || '',
        experience_years: teacher.experience_years || '',
        hourly_rate: teacher.hourly_rate || '',
        response_time: teacher.response_time || '',
        subjects_taught: teacher.subjects_taught ? teacher.subjects_taught.join(', ') : '',
        education_levels: teacher.education_levels ? teacher.education_levels.join(', ') : '',
        languages: teacher.languages ? teacher.languages.join(', ') : '',
        specialties: teacher.specialties ? teacher.specialties.join(', ') : ''
      });
    }
  }, [teacher]);

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

    try {
      const updateData = {
        ...formData,
        experience_years: parseInt(formData.experience_years) || 0,
        hourly_rate: parseFloat(formData.hourly_rate) || 0.0,
        subjects_taught: formData.subjects_taught.split(',').map(s => s.trim()).filter(s => s),
        education_levels: formData.education_levels.split(',').map(s => s.trim()).filter(s => s),
        languages: formData.languages.split(',').map(s => s.trim()).filter(s => s),
        specialties: formData.specialties.split(',').map(s => s.trim()).filter(s => s)
      };

      await updateProfile(updateData);
      setSuccess('Profile updated successfully!');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!canEditProfile) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Profile Editing Disabled
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <Lock className="h-4 w-4" />
            <AlertDescription>
              Profile editing has been disabled by the administrator. Please contact support if you need to make changes to your profile.
            </AlertDescription>
          </Alert>
          
          {/* Read-only profile display */}
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">First Name</label>
                <p className="text-sm text-gray-900">{teacher.first_name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Last Name</label>
                <p className="text-sm text-gray-900">{teacher.last_name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Email</label>
                <p className="text-sm text-gray-900">{teacher.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Phone</label>
                <p className="text-sm text-gray-900">{teacher.phone || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">WhatsApp</label>
                <p className="text-sm text-gray-900">{teacher.whatsapp_number || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Location</label>
                <p className="text-sm text-gray-900">{teacher.city && teacher.country ? `${teacher.city}, ${teacher.country}` : 'Not provided'}</p>
              </div>
            </div>
            
            {teacher.bio && (
              <div>
                <label className="text-sm font-medium text-gray-600">Bio</label>
                <p className="text-sm text-gray-900 mt-1">{teacher.bio}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Edit Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
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
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="first_name" className="text-sm font-medium text-gray-700">
                  First Name
                </label>
                <Input
                  id="first_name"
                  name="first_name"
                  type="text"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="last_name" className="text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <Input
                  id="last_name"
                  name="last_name"
                  type="text"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </div>
            </div>

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
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
            
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
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Professional Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="experience_years" className="text-sm font-medium text-gray-700">
                  Years of Experience
                </label>
                <Input
                  id="experience_years"
                  name="experience_years"
                  type="number"
                  min="0"
                  value={formData.experience_years}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="hourly_rate" className="text-sm font-medium text-gray-700">
                  Hourly Rate (USD)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="hourly_rate"
                    name="hourly_rate"
                    type="number"
                    min="0"
                    step="0.01"
                    className="pl-10"
                    value={formData.hourly_rate}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="response_time" className="text-sm font-medium text-gray-700">
                Response Time
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="response_time"
                  name="response_time"
                  type="text"
                  className="pl-10"
                  placeholder="e.g., 2 hours, Same day"
                  value={formData.response_time}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subjects_taught" className="text-sm font-medium text-gray-700">
                Subjects Taught
              </label>
              <Input
                id="subjects_taught"
                name="subjects_taught"
                type="text"
                placeholder="Mathematics, Physics, Chemistry (comma-separated)"
                value={formData.subjects_taught}
                onChange={handleChange}
              />
              <p className="text-xs text-gray-500">Separate multiple subjects with commas</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="education_levels" className="text-sm font-medium text-gray-700">
                Education Levels
              </label>
              <Input
                id="education_levels"
                name="education_levels"
                type="text"
                placeholder="Elementary, Middle School, High School (comma-separated)"
                value={formData.education_levels}
                onChange={handleChange}
              />
              <p className="text-xs text-gray-500">Separate multiple levels with commas</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="languages" className="text-sm font-medium text-gray-700">
                Languages
              </label>
              <Input
                id="languages"
                name="languages"
                type="text"
                placeholder="English, Arabic, French (comma-separated)"
                value={formData.languages}
                onChange={handleChange}
              />
              <p className="text-xs text-gray-500">Separate multiple languages with commas</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="specialties" className="text-sm font-medium text-gray-700">
                Specialties
              </label>
              <Input
                id="specialties"
                name="specialties"
                type="text"
                placeholder="Algebra, Calculus, IELTS (comma-separated)"
                value={formData.specialties}
                onChange={handleChange}
              />
              <p className="text-xs text-gray-500">Separate multiple specialties with commas</p>
            </div>
          </div>

          {/* Read-only fields */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Account Information (Read-only)</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Username</label>
                <p className="text-sm text-gray-900">{teacher.username}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Email</label>
                <p className="text-sm text-gray-900">{teacher.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Country</label>
                <p className="text-sm text-gray-900">{teacher.country || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Member Since</label>
                <p className="text-sm text-gray-900">
                  {teacher.created_at ? new Date(teacher.created_at).toLocaleDateString() : 'Unknown'}
                </p>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileEditor;

