import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Phone, Mail, Hash, Trash2 } from 'lucide-react';
import { translateDate } from '@/utils/translateDate';
import { translateNumber } from '@/utils/translateNumber';
import type { UserInManagement } from '@/services/userManagmentService';
import CustomButton from '../ui/CustomeButton';
import { changeProfileImageUrl } from '@/utils/formatProfileImage';
import DefaultProfileImg from "@/assets/profile/defaultProfile.jpg";


interface UserCardProps {
    user: UserInManagement;
    onDelete: (id: string) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onDelete }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl border border-gray-200/80 p-4 shadow-sm"
        >
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
                <div className="flex items-center gap-3">
                    <img
                        src={changeProfileImageUrl(user.profile_image_url) || DefaultProfileImg}
                        alt={`${user.first_name} ${user.last_name}`}
                        className="w-11 h-11 rounded-full object-cover shadow-md ring-2 ring-teal-400/70 p-0.5 shrink-0"
                    />
                    <div className="flex flex-col items-start text-right min-w-0">
                        <span className="font-bold text-gray-800 text-sm truncate w-full">
                            {`${user.first_name} ${user.last_name}`}
                        </span>
                        <span className="text-xs text-gray-400 text-right w-full mt-0.5" dir="ltr">
                            {user.username ? `@${user.username}` : ''}
                        </span>
                    </div>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-indigo-50 text-indigo-700 rounded-md font-extrabold text-xs border border-indigo-100/50">
                    <Hash size={12} />
                    {user.unit ? `واحد ${translateNumber(user.unit.unit_number)}` : 'واحد نامشخص'}
                </span>
            </div>

            <div className="space-y-2 text-xs text-gray-600">
                <div className="flex items-center justify-between">
                    <span className="text-gray-400 flex items-center gap-1"><Phone size={13} /> شماره تماس:</span>
                    <span className="font-medium" dir="ltr">{translateNumber(user.phone)}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-gray-400 flex items-center gap-1"><Mail size={13} /> ایمیل:</span>
                    <span className="font-medium max-w-45 truncate">{user.email}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-gray-400 flex items-center gap-1"><Calendar size={13} /> تاریخ ورود:</span>
                    <span className="font-semibold px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-100/60 rounded-md">
                        {translateDate(user.created_at)}
                    </span>
                </div>
            </div>

            <div className="flex justify-end mt-3 pt-3 border-t border-gray-100">
                <CustomButton
                    type="button"
                    variant="danger"
                    styleType="soft"
                    icon={Trash2}
                    onClick={() => onDelete(user.user_id)}
                    className="w-full sm:w-auto text-xs font-semibold cursor-pointer"
                    title="حذف این عضو"
                >
                    حذف این عضو
                </CustomButton>
            </div>
        </motion.div>
    );
};