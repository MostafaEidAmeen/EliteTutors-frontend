import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isArabic, setIsArabic] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert(isArabic ? 'تم تسجيل الدخول بنجاح!' : 'Login successful!');
        // Here you would typically store the token (e.g., in localStorage) and redirect the user
        console.log('Login successful:', data);
      } else {
        const error = await response.json();
        alert(isArabic ? 'خطأ في تسجيل الدخول: ' + error.error : 'Login error: ' + error.error);
      }
    } catch (error) {
      alert(isArabic ? 'خطأ في الاتصال بالخادم' : 'Server connection error');
    }
  };

  const toggleLanguage = () => {
    setIsArabic(!isArabic);
  };

  return (
    <div className={`min-h-screen bg-background py-8 ${isArabic ? 'rtl' : 'ltr'}`}>
      <div className="max-w-md mx-auto px-4">
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
              {isArabic ? 'تسجيل الدخول' : 'Login'}
            </CardTitle>
            <p className="text-center text-muted-foreground">
              {isArabic 
                ? 'أدخل بيانات اعتمادك للوصول إلى حسابك' 
                : 'Enter your credentials to access your account'
              }
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
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

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {isArabic ? 'كلمة المرور' : 'Password'} *
                </label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder={isArabic ? 'أدخل كلمة المرور' : 'Enter your password'}
                  required
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                {isArabic ? 'تسجيل الدخول' : 'Login'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;


