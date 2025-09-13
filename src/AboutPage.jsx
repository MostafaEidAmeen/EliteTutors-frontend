import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const AboutPage = () => {
  const [isArabic, setIsArabic] = useState(false);

  const toggleLanguage = () => {
    setIsArabic(!isArabic);
  };

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
              {isArabic ? 'عن منصة النخبة' : 'About EliteTutors Platform'}
            </CardTitle>
            <p className="text-center text-muted-foreground mt-2">
              {isArabic 
                ? 'نحن نربط الطلاب بأفضل المدرسين في المنطقة.'
                : 'We connect students with the best tutors in the region.'
              }
            </p>
          </CardHeader>
          <CardContent className="space-y-6 text-lg leading-relaxed">
            <p>
              {isArabic
                ? 'منصة النخبة للدروس الخصوصية هي وجهتك الأولى للعثور على مدرسين مؤهلين وذوي خبرة في مختلف المواد الدراسية. نحن نؤمن بأن التعليم الجيد هو مفتاح النجاح، ولهذا نسعى جاهدين لتوفير أفضل تجربة تعليمية لطلابنا.'
                : 'EliteTutors is your premier destination for finding qualified and experienced tutors across various subjects. We believe that quality education is the key to success, and we strive to provide the best learning experience for our students.'
              }
            </p>
            <p>
              {isArabic
                ? 'تأسست منصتنا بهدف سد الفجوة بين الطلاب الذين يبحثون عن دعم أكاديمي والمدرسين المتميزين الذين يمكنهم تقديم هذا الدعم. نحن نركز على توفير بيئة تعليمية آمنة وفعالة، حيث يمكن للطلاب تحقيق أقصى إمكاناتهم.'
                : 'Our platform was founded with the aim of bridging the gap between students seeking academic support and excellent tutors who can provide that support. We focus on providing a safe and effective learning environment where students can achieve their full potential.'
              }
            </p>
            <p>
              {isArabic
                ? 'نحن نفخر بشبكتنا الواسعة من المدرسين المعتمدين الذين يمتلكون شغفاً بالتدريس والتزاماً بنجاح الطلاب. سواء كنت تبحث عن مساعدة في الرياضيات، العلوم، اللغات، أو أي مادة أخرى، فإن EliteTutors هنا لمساعدتك.'
                : 'We pride ourselves on our extensive network of certified tutors who possess a passion for teaching and a commitment to student success. Whether you are looking for help in mathematics, science, languages, or any other subject, EliteTutors is here to help you.'
              }
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;


