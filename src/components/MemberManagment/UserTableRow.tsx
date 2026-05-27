// src/components/ManagerUsers/UserTableRow.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Calendar } from 'lucide-react';
import { translateDate } from '@/utils/translateDate';
import { translateNumber } from '@/utils/translateNumber';
import type { UserInManagement } from '@/services/userManagmentService';

interface UserTableRowProps {
    user: UserInManagement;
    onDelete: (id: number) => void;
}

export const UserTableRow: React.FC<UserTableRowProps> = ({ user, onDelete }) => {
    return (
        <tr className="bg-white hover:bg-gray-50/80 transition-colors border-b border-gray-100 last:border-0">
            <td className="px-6 py-4 whitespace-nowrap text-center w-1/4">
                <div className="flex items-center justify-start gap-4 pr-4">
                    <img
                        src={user.profile_image_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"}
                        alt={`${user.first_name} ${user.last_name}`}
                        className="w-12 h-12 rounded-full object-cover shadow-md ring-2 ring-teal-400 p-0.5"
                    />
                    <div className="flex flex-col text-right">
                        <span className="font-bold text-gray-800 text-base">
                            {`${user.first_name} ${user.last_name}`}
                        </span>
                        <span className="text-xs text-gray-400 mt-0.5" dir="ltr">
                            {user.username ? (user.username.startsWith('@') ? user.username : `@${user.username}`) : ''}
                        </span>
                    </div>
                </div>
            </td>

            <td className="px-6 py-4 text-center">
                <span className="px-3 py-0.5 bg-indigo-50/80 text-indigo-700 rounded-md font-extrabold text-sm border border-indigo-100/50">
                    {user.unit_number}
                </span>
            </td>

            <td className="px-6 py-4 text-center">
                <div className="flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50/70 text-amber-700 border border-amber-100/60 rounded-xl font-semibold text-xs tracking-wide shadow-sm backdrop-blur-sm">
                        <Calendar size={14} className="text-amber-600/80" />
                        {translateDate(user.created_at)}
                    </span>
                </div>
            </td>

            <td className="px-6 py-4 text-center text-gray-700 font-medium text-sm" dir="ltr">
                {translateNumber(user.phone)}
            </td>

            <td className="px-6 py-4 text-center text-gray-600 font-medium text-sm max-w-[200px] truncate">
                {user.email}
            </td>

            <td className="px-6 py-4 text-center">
                <div className="flex items-center justify-center gap-3">
                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onDelete(user.id)}
                        className="bg-white border border-red-200/60 p-2.5 rounded-lg text-red-500 flex items-center justify-center transition-colors hover:bg-red-100/70 cursor-pointer shadow-sm"
                        title="حذف کاربر"
                    >
                        <Trash2 size={18} />
                    </motion.button>
                </div>
            </td>
        </tr>
    );
};