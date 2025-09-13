import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const ResourcesPage = () => {
  const [isArabic, setIsArabic] = useState(false);

  const toggleLanguage = () => {
    setIsArabic(!isArabic);
  };

  const resources = [
    {
      title: { en: 'Study Guides', ar: 'أدلة الدراسة' },
      description: { en: 'Comprehensive guides for various subjects.', ar: 'أدلة شاملة لمختلف المواد الدراسية.' },
      link: '#'
    },
    {
      title: { en: 'Practice Exams', ar: 'اختبارات تدريبية' },
      description: { en: 'Prepare for your exams with our practice tests.', ar: 'استعد لاختباراتك من خلال اختباراتنا التدريبية.' },
      link: '#'
    },
    {
      title: { en: 'Video Tutorials', ar: 'دروس فيديو' },
      description: { en: 'Learn at your own pace with our video tutorials.', ar: 'تعلم بالسرعة التي تناسبك من خلال دروس الفيديو.' },
      link: '#'
    },
    {
      title: { en: 'Expert Articles', ar: 'مقالات الخبراء' },
      description: { en: 'Read articles written by our experienced tutors.', ar: 'اقرأ مقالات كتبها مدرسونا ذوو الخبرة.' },
      link: '#'
    },
  ];

  return (
    <div className={`min-h-screen bg-background py-8 ${isArabic ? 'rtl' : 'ltr'}`}>
      <div className="max-w-4xl mx-auto px-4">
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
            <CardTitle className="text-center text-3xl">
              {isArabic ? 'المصادر التعليمية' : 'Educational Resources'}
            </CardTitle>
            <p className="text-center text-muted-foreground mt-2">
              {isArabic 
                ? 'اكتشف مجموعة واسعة من المصادر لمساعدتك في رحلتك التعليمية.'
                : 'Explore a wide range of resources to aid your learning journey.'
              }
            </p>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <div key={index} className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2">
                  {isArabic ? resource.title.ar : resource.title.en}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {isArabic ? resource.description.ar : resource.description.en}
                </p>
                <a href={resource.link} className="text-primary hover:underline">
                  {isArabic ? 'عرض المزيد' : 'View More'}
                </a>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResourcesPage;


