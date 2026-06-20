import React from 'react';
import { Calendar } from 'lucide-react';
import { translateDate } from '@/utils/translateDate';
import { translateNumber } from '@/utils/translateNumber';
import type { UserInManagement } from '@/services/userManagmentService';
import DefaultProfileImg from "@/assets/profile/defaultProfile.jpg";
import { changeProfileImageUrl } from '@/utils/formatProfileImage';
import { DeleteButton } from '../ui/TrashButton';
import { DetailsButton } from '../ui/DetailsButton';

interface UserTableRowProps {
    user: UserInManagement;
    onDelete: () => void;
    onViewDetails?: () => void;
}

export const UserTableRow: React.FC<UserTableRowProps> = ({ user, onDelete, onViewDetails }) => {
    return (
        <tr className="bg-white hover:bg-gray-50/80 transition-colors border-b border-gray-100 last:border-0">
            <td className="px-6 py-4 whitespace-nowrap text-center w-1/4 max-w-62.5">
                <div className="flex items-center justify-start gap-3 pr-4">
                    <img
                        src={changeProfileImageUrl(user.profile_image_url) || DefaultProfileImg}
                        alt={`${user.first_name} ${user.last_name}`}
                        className="w-12 h-12 rounded-full object-cover shadow-md ring-2 ring-teal-400 p-0.5 shrink-0"
                    />
                    <div className="flex flex-col text-right overflow-hidden min-w-0">
                        <span className="font-bold text-gray-800 text-base truncate" title={`${user.first_name} ${user.last_name}`}>
                            {`${user.first_name} ${user.last_name}`}
                        </span>
                        <span className="text-xs text-gray-400 mt-0.5 truncate" dir="ltr">
                            {user.username ? (user.username.startsWith('@') ? user.username : `@${user.username}`) : ''}
                        </span>
                    </div>
                </div>
            </td>

            <td className="px-6 py-4 text-center">
                <span className="px-3 py-0.5 bg-indigo-50/80 text-indigo-700 rounded-md font-extrabold text-sm border border-indigo-100/50">
                    {user.unit ? `واحد ${translateNumber(user.unit.unit_number)}` : 'واحد نامشخص'}
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

            <td className="px-6 py-4 text-center text-gray-600 font-medium text-sm max-w-50 truncate">
                {user.email}
            </td>

            <td className="px-6 py-4 text-center">
                <div className="flex items-center justify-center gap-3">
                    {onViewDetails && (
                        <DetailsButton
                            onClick={onViewDetails}
                        />
                    )}
                    <DeleteButton
                        onDelete={onDelete}
                    />
                </div>
            </td>
        </tr>
    );
};