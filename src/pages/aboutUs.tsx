import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  HeadphonesIcon, 
  Mail, 
  Phone, 
  ArrowRight, 
  MapPin,
  Sparkles
} from 'lucide-react';

import logo from '@/assets/landing/section-logo.svg';

const AboutUs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div 
      dir="rtl" 
      className="min-h-screen bg-slate-50 relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#717cff] opacity-20 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#4db6ac] opacity-20 blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl w-full z-10 relative">
        <div className="rounded-[2rem] shadow-2xl overflow-hidden bg-white/90 backdrop-blur-sm">
          
          <div className="relative pt-12 pb-24 px-8 md:px-12 bg-gradient-to-br from-[#858eff] via-[#717cff] to-[#5965f7] overflow-hidden flex flex-col items-center">

            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="absolute bottom-10 left-0 w-48 h-48 bg-[#4db6ac] opacity-20 rounded-full blur-2xl -ml-10"></div>
            <Sparkles className="absolute top-12 right-12 text-white opacity-10 w-16 h-16 rotate-12" />

            {/* Logo with Hover Effect */}
            <img 
              src={logo} 
              alt="لوگو آپارمو" 
              className="h-32 md:h-40 object-contain relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-500 mb-6"
            />

            <div className="text-center space-y-5 relative z-10 max-w-2xl">
              <p className="text-xl md:text-2xl font-extrabold text-white leading-relaxed">
                به پلتفرم مدیریت هوشمند ساختمان خوش آمدید. هدف ما <span className="text-[#a6fff6] bg-black/10 px-2 py-0.5 rounded-lg inline-block transform -rotate-1">هوشمندسازی</span> و تسهیل ارتباطات است.
              </p>
              <p className="text-white/90 leading-8 text-justify md:text-center font-medium text-sm md:text-base">
                ما تلاش می‌کنیم با دیجیتالی کردن فرآیندهای سنتی آپارتمان‌نشینی (مانند ثبت شکایات، درخواست‌های تعمیرات، تابلو اعلانات و نظرسنجی‌ها) نظم و آسایش را به مجتمع‌های شما بیاوریم. همه چیز در یک پلتفرم یکپارچه.
              </p>
            </div>

            {/* SVG Wave Divider (Bottom) */}
            <div className="absolute bottom-0 left-0 right-0 translate-y-1">
              <svg 
                viewBox="0 0 1440 120" 
                className="w-full h-12 md:h-20 fill-white" 
                preserveAspectRatio="none"
              >
                <path d="M0,60 C320,120 420,0 740,60 C1060,120 1120,0 1440,60 L1440,120 L0,120 Z"></path>
              </svg>
            </div>
          </div>

          {/* Cards & Button Section */}
          <div className="px-8 pb-10 pt-4 md:px-12 space-y-10 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Support Card */}
              <div className="bg-white border-2 border-[#4db6ac]/10 hover:border-[#4db6ac]/30 shadow-sm rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-md duration-300 group">
                <div className="w-12 h-12 bg-[#4db6ac]/10 text-[#4db6ac] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <HeadphonesIcon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">ارتباط با پشتیبانی</h3>
                <p className="text-slate-600 text-sm mb-6 min-h-[40px]">
                  برای دریافت راهنمایی، پیگیری مشکلات حساب کاربری یا ثبت نظرات، در کنار شما هستیم.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-slate-700 text-sm">
                    <Mail size={18} className="text-[#4db6ac] ml-2" />
                    <span>support@example-bms.com</span>
                  </div>
                  <div className="flex items-center text-slate-700 text-sm">
                    <Phone size={18} className="text-[#4db6ac] ml-2" />
                    <span>۰۹۰۰۰۰۰۰۰۰۰ (پیام‌رسان‌ها)</span>
                  </div>
                </div>
              </div>

              {/* Management Card */}
              <div className="bg-white border-2 border-[#717cff]/10 hover:border-[#717cff]/30 shadow-sm rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-md duration-300 group">
                <div className="w-12 h-12 bg-[#717cff]/10 text-[#717cff] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Building2 size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">ویژه مدیران ساختمان</h3>
                <p className="text-slate-600 text-sm mb-6 min-h-[40px]">
                  جهت تهیه «اکانت مدیریت» و یکپارچه‌سازی فرآیندهای مجتمع خود، با بخش فروش تماس بگیرید.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-slate-700 text-sm">
                    <Phone size={18} className="text-[#717cff] ml-2" />
                    <span>۱۲۳۴۵۶۷۸ - ۰۲۱</span>
                  </div>
                  <div className="flex items-start text-slate-700 text-sm">
                    <MapPin size={18} className="text-[#717cff] ml-2 mt-0.5 shrink-0" />
                    <span className="leading-snug">تهران، خیابان خیالی، کوچه هیچ، پلاک صفر، واحد بی‌نهایت</span>
                  </div>
                </div>
              </div>

            </div>

            <div className="pt-2 flex justify-center">
              <Button 
                onClick={() => navigate('/')} 
                className="bg-[#717cff] hover:bg-[#5965f7] text-white rounded-xl px-8 py-6 h-auto text-base font-bold flex items-center gap-2 shadow-lg shadow-[#717cff]/30 transition-all hover:shadow-[#717cff]/50 hover:-translate-y-0.5"
              >
                <ArrowRight size={20} />
                بازگشت به صفحه اصلی
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
