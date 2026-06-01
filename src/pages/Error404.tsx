import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import CustomButton from '@/components/ui/CustomeButton';
import errorIllustration from '@/assets/Error-404.png';

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 text-center">
      {/* 404 Illustration */}
      <img
        src={errorIllustration}
        alt="Page not found"
        className="w-full max-w-lg object-contain mb-8"
      />

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">
        .اوه نه! این صفحه فرو ریخته است
      </h1>
      
      {/* Description */}
      <p className="text-gray-600 text-sm md:text-base mb-8 font-medium">
        .به نظر می‌رسد این آدرس را باد برده و یا از اول هم اینجا نبوده
      </p>

      {/* Back to Home Button */}
      <CustomButton 
        icon={Home}
        onClick={() => navigate('/home')}
        className="bg-[#6b73ff] hover:bg-[#5a62e0] text-white px-6 py-4 rounded-xl text-base flex-row-reverse cursor-pointer transition"
      >
        بازگشت به خانه
      </CustomButton>
    </div>
  );
};

export default Error404;
