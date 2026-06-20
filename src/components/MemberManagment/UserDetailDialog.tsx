import React, { useState } from 'react';
import { X, Phone, Mail, Calendar, Trash2, Check, Copy } from 'lucide-react';
import { 
    Dialog, 
    DialogContent, 
    DialogClose 
} from '@/components/ui/CustomeDialog';
import CustomButton from '@/components/ui/CustomeButton';
import DefaultProfileImg from "@/assets/profile/defaultProfile.jpg";
import { changeProfileImageUrl } from '@/utils/formatProfileImage';
import { translateDate } from '@/utils/translateDate';
import { translateNumber } from '@/utils/translateNumber';
import type { UserInManagement } from '@/services/userManagmentService';

interface UserDetailDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    user: UserInManagement | null;
    onDelete: (unitId?: string) => void;
}

export const UserDetailDialog: React.FC<UserDetailDialogProps> = ({
    isOpen,
    onOpenChange,
    user,
    onDelete
}) => {
    const [copiedField, setCopiedField] = useState<string | null>(null);

    if (!user) return null;

    const handleCopy = (text: string, fieldName: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(fieldName);
        setTimeout(() => setCopiedField(null), 2000);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent isOpen={isOpen} className="max-w-[350px] w-[92%] rounded-[28px] p-5 bg-white shadow-2xl border border-gray-100/50 relative overflow-visible">
                {/* Absolute Close Button */}
                <DialogClose asChild>
                    <button 
                        type="button" 
                        className="absolute left-4 top-4 text-gray-400 hover:text-gray-900 rounded-full p-1.5 hover:bg-gray-50 transition-all duration-200 cursor-pointer border-none outline-none flex items-center justify-center"
                        title="بستن"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </DialogClose>

                {/* Profile Avatar and Name */}
                <div className="flex flex-col items-center text-center pb-5 mb-5 border-b border-gray-100/60 mt-2">
                    <div className="relative group">
                        <img 
                            src={changeProfileImageUrl(user.profile_image_url) || DefaultProfileImg} 
                            alt={`${user.first_name} ${user.last_name}`}
                            className="w-20 h-20 rounded-full object-cover ring-4 ring-indigo-50/70 p-0.5 shadow-sm transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                    
                    <h3 className="font-extrabold text-lg text-gray-800 mt-3.5">
                        {user.first_name} {user.last_name}
                    </h3>
                    
                    <p className="text-xs text-gray-400 font-medium mt-1 select-all" dir="ltr">
                        {user.username ? `@${user.username}` : 'بدون نام کاربری'}
                    </p>

                    {/* Role and Unit Badges */}
                    <div className="flex justify-center gap-1.5 mt-4 flex-wrap">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                            user.role === 'admin' 
                                ? 'bg-rose-50 text-rose-600 border-rose-100/60' 
                                : user.role === 'manager' 
                                ? 'bg-purple-50 text-purple-600 border-purple-100/60' 
                                : 'bg-indigo-50 text-indigo-700 border-indigo-100/60'
                        }`}>
                            {user.role === 'admin' ? 'مدیر فنی' : user.role === 'manager' ? 'مدیر' : 'ساکن'}
                        </span>
                        
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gray-50 text-gray-500 border border-gray-100/80">
                            {user.gender === 'male' ? 'مرد' : user.gender === 'female' ? 'زن' : 'جنسیت نامشخص'}
                        </span>
                        
                        {user.unit ? (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50/90 text-amber-700 border border-amber-100/70">
                                واحد {translateNumber(user.unit.unit_number)} {(user.unit.floor !== undefined && user.unit.floor !== null) ? `(طبقه ${translateNumber(String(user.unit.floor))})` : ''}
                            </span>
                        ) : (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50/50 text-rose-500 border border-rose-100/40">
                                بدون واحد
                            </span>
                        )}
                    </div>
                </div>

                {/* Interactive Details Cards */}
                <div className="space-y-3 mb-6">
                    {/* Phone Card */}
                    <div className="flex items-center justify-between p-3 bg-gray-50/50 hover:bg-gray-50 rounded-2xl border border-gray-100/40 transition-colors group">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500 group-hover:scale-105 transition-transform duration-200">
                                <Phone className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex flex-col text-right">
                                <span className="text-[10px] text-gray-400 font-bold">شماره تماس</span>
                                <a href={`tel:${user.phone}`} className="font-extrabold text-xs text-gray-700 hover:text-indigo-600 transition-colors select-all" dir="ltr">
                                    {translateNumber(user.phone)}
                                </a>
                            </div>
                        </div>
                        <button 
                            type="button"
                            onClick={() => handleCopy(user.phone, 'phone')}
                            className="text-gray-400 hover:text-indigo-600 transition-all cursor-pointer border-none outline-none flex items-center justify-center p-1.5 hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-gray-100"
                            title="کپی شماره"
                        >
                            {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                    </div>

                    {/* Email Card */}
                    <div className="flex items-center justify-between p-3 bg-gray-50/50 hover:bg-gray-50 rounded-2xl border border-gray-100/40 transition-colors group">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 group-hover:scale-105 transition-transform duration-200 shrink-0">
                                <Mail className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex flex-col text-right min-w-0">
                                <span className="text-[10px] text-gray-400 font-bold">پست الکترونیکی</span>
                                {user.email ? (
                                    <a href={`mailto:${user.email}`} className="font-bold text-xs text-gray-700 hover:text-purple-600 transition-colors truncate max-w-40 select-all" title={user.email} dir="ltr">
                                        {user.email}
                                    </a>
                                ) : (
                                    <span className="text-xs text-gray-400 font-medium">ثبت نشده</span>
                                )}
                            </div>
                        </div>
                        {user.email && (
                            <button 
                                type="button"
                                onClick={() => handleCopy(user.email!, 'email')}
                                className="text-gray-400 hover:text-purple-600 transition-all cursor-pointer border-none outline-none flex items-center justify-center p-1.5 hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-gray-100 shrink-0"
                                title="کپی ایمیل"
                            >
                                {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                        )}
                    </div>

                    {/* Join Date Card */}
                    <div className="flex items-center justify-between p-3 bg-gray-50/50 hover:bg-gray-50 rounded-2xl border border-gray-100/40 transition-colors group">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 group-hover:scale-105 transition-transform duration-200">
                                <Calendar className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex flex-col text-right">
                                <span className="text-[10px] text-gray-400 font-bold">تاریخ عضویت</span>
                                <span className="font-bold text-xs text-gray-700">
                                    {translateDate(user.created_at)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-5 pt-3 border-t border-gray-100/60 flex gap-2">
                    <CustomButton 
                        variant="danger"
                        styleType="soft"
                        icon={Trash2}
                        onClick={() => {
                            onOpenChange(false);
                            onDelete(user.unit?.id);
                        }}
                        className="flex-1 py-1.5 px-3 text-[11px] h-9 rounded-xl font-bold cursor-pointer min-h-9 flex items-center justify-center gap-1.5 w-full active:scale-[0.98]"
                    >
                        حذف از واحد
                    </CustomButton>
                </div>
            </DialogContent>
        </Dialog>
    );
};
