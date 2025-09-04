import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    educational_level: '',
    subjects_of_interest: [],
    preferred_language: 'English'
  });

  const [isArabic, setIsArabic] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubjectChange = (subject, checked) => {
    setFormData(prev => ({
      ...prev,
      subjects_of_interest: checked 
        ? [...prev.subjects_of_interest, subject]
        : prev.subjects_of_interest.filter(s => s !== subject)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(isArabic ? 'تم التسجيل بنجاح!' : 'Registration successful!');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          country: '',
          educational_level: '',
          subjects_of_interest: [],
          preferred_language: 'English'
        });
      } else {
        const error = await response.json();
        alert(isArabic ? 'خطأ في التسجيل: ' + error.error : 'Registration error: ' + error.error);
      }
    } catch (error) {
      alert(isArabic ? 'خطأ في الاتصال بالخادم' : 'Server connection error');
    }
  };

  const toggleLanguage = () => {
    setIsArabic(!isArabic);
    setFormData(prev => ({
      ...prev,
      preferred_language: !isArabic ? 'Arabic' : 'English'
    }));
  };

  const subjects = [
    { en: 'Mathematics', ar: 'الرياضيات' },
    { en: 'Physics', ar: 'الفيزياء' },
    { en: 'Chemistry', ar: 'الكيمياء' },
    { en: 'Biology', ar: 'الأحياء' },
    { en: 'English', ar: 'الإنجليزية' },
    { en: 'Arabic Literature', ar: 'الأدب العربي' },
    { en: 'History', ar: 'التاريخ' },
    { en: 'Geography', ar: 'الجغرافيا' }
  ];

  const countries = [
    { en: 'Kuwait', ar: 'الكويت' },
    { en: 'Egypt', ar: 'مصر' },
    { en: 'Saudi Arabia', ar: 'السعودية' },
    { en: 'UAE', ar: 'الإمارات' }
  ];

  const educationalLevels = [
    { en: 'Kindergarten', ar: 'رياض الأطفال' },
    { en: 'Elementary', ar: 'الابتدائي' },
    { en: 'Middle School', ar: 'المتوسط' },
    { en: 'High School', ar: 'الثانوي' }
  ];

  return (
    <div className={`min-h-screen bg-background py-8 ${isArabic ? 'rtl' : 'ltr'}`}>
      <div className="max-w-2xl mx-auto px-4">
        {/* Language Toggle */}
        <div className="flex justify-end mb-6">
          <Button 
            onClick={toggleLanguage}
            variant="outline"
            className="mb-4"
          >
            {isArabic ? 'English' : 'العربية'}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              {isArabic ? 'تسجيل طالب جديد' : 'Student Registration'}
            </CardTitle>
            <p className="text-center text-muted-foreground">
              {isArabic 
                ? 'انضم إلى منصة النخبة للدروس الخصوصية واعثر على أفضل المدرسين'
                : 'Join EliteTutors platform and find the best teachers for your learning journey'
              }
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {isArabic ? 'الاسم الكامل' : 'Full Name'} *
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder={isArabic ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {isArabic ? 'البريد الإلكتروني' : 'Email Address'} *
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder={isArabic ? 'أدخل بريدك الإلكتروني' : 'Enter your email address'}
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {isArabic ? 'رقم الهاتف' : 'Phone Number'}
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder={isArabic ? 'أدخل رقم هاتفك' : 'Enter your phone number'}
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {isArabic ? 'الدولة' : 'Country'} *
                </label>
                <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={isArabic ? 'اختر دولتك' : 'Select your country'} />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.en} value={country.en}>
                        {isArabic ? country.ar : country.en}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Educational Level */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {isArabic ? 'المستوى التعليمي' : 'Educational Level'} *
                </label>
                <Select value={formData.educational_level} onValueChange={(value) => handleInputChange('educational_level', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={isArabic ? 'اختر مستواك التعليمي' : 'Select your educational level'} />
                  </SelectTrigger>
                  <SelectContent>
                    {educationalLevels.map((level) => (
                      <SelectItem key={level.en} value={level.en}>
                        {isArabic ? level.ar : level.en}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Subjects of Interest */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  {isArabic ? 'المواد المهتم بها' : 'Subjects of Interest'}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {subjects.map((subject) => (
                    <Checkbox
                      key={subject.en}
                      id={subject.en}
                      label={isArabic ? subject.ar : subject.en}
                      checked={formData.subjects_of_interest.includes(subject.en)}
                      onChange={(e) => handleSubjectChange(subject.en, e.target.checked)}
                    />
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                {isArabic ? 'تسجيل' : 'Register'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationPage;

