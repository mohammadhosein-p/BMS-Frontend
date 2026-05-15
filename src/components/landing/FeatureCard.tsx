import { motion } from "framer-motion";

interface Prop {
    image: string;
    alt: string;
    title: string;
    description: string;
    varients?: any;
}

function FeatureCard({ varients, alt, description, image, title }: Prop) {
    return (
        <motion.div
            variants={varients || {}}
            className="w-[410px] min-h-[300px] bg-white border-2 border-[#717cff] rounded-[24px] px-6 py-8 flex flex-col items-center text-center z-50">
            {/* Icon */}

            <img src={image} alt={alt} className="w-[120px] h-[120px]" />

            {/* Title */}

            <h3 className="mt-6 text-[22px] text-[#717cff] font-medium">
                {title}
            </h3>

            {/* Description */}

            <p className="mt-6 text-[19px] text-[#555] font-light">
                {description}
            </p>
        </motion.div>
    );
}

export default FeatureCard;
