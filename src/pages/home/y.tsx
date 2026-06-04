import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Calendar, ArrowUpDown, ArrowUp, ArrowDown, Search, Loader2, AlertCircle, Phone, Mail, Hash } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { translateDate } from '@/utils/translateDate';
import CustomField from '@/components/ui/CutsomeFiled';
import { translateNumber } from '@/utils/translateNumber';
import useAuthStore from '@/store/useAuthStore';
import { getApartmentUsers } from '@/services/userManagmentService';

const mockUsers = [
    {
        id: 1,
        first_name: "علی",
        last_name: "نقی نژاد",
        username: "AliNaghiNjad",
        unit_number: "12",
        phone: "09938246242",
        email: "naghinjadali@gmail.com",
        created_at: "1402/05/10",
        profile_image_url: ""
    },
    {
        id: 2,
        first_name: "محمد",
        last_name: "رضایی",
        username: "MohammadRezaei",
        unit_number: "15",
        phone: "09123456789",
        email: "mohammad.rezaei@gmail.com",
        created_at: "1401/11/25",
        profile_image_url: ""
    },
    {
        id: 3,
        first_name: "رضا",
        last_name: "احمدی",
        username: "RazaAhmadi",
        unit_number: "11",
        phone: "09123456780",
        email: "reza.ahmadi@gmail.com",
        created_at: "1403/01/15",
        profile_image_url: ""
    }
];

type SortField = 'unitNumber' | 'joinDate' | null;
type SortDirection = 'asc' | 'desc';

const ManagerUsers: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState<SortField>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

    const apartmentId = useAuthStore((state) => state.user?.apartment_id);

    const { data: apiData, isLoading, isError } = useQuery({
        queryKey: ['apartmentUsers', apartmentId],
        queryFn: () => getApartmentUsers(apartmentId!),
        enabled: !!apartmentId,
    });

    const users = useMemo(() => {
        if (Array.isArray(apiData)) return apiData;
        return mockUsers;
    }, [apiData]);

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const filteredUsers = useMemo(() => {
        if (!Array.isArray(users)) return [];
        return users.filter(user => {
            const query = searchQuery.toLowerCase().trim();
            const fullName = `${user.first_name || ''} ${user.last_name || ''}`.toLowerCase();

            return (
                fullName.includes(query) ||
                (user.username && user.username.toLowerCase().includes(query)) ||
                (user.unit_number && user.unit_number.includes(query)) ||
                (user.email && user.email.toLowerCase().includes(query)) ||
                (user.phone && user.phone.includes(query))
            );
        });
    }, [users, searchQuery]);

    const sortedUsers = useMemo(() => {
        if (!sortField) return filteredUsers;

        return [...filteredUsers].sort((a, b) => {
            const valueA = sortField === 'unitNumber' ? a.unit_number : a.created_at;
            const valueB = sortField === 'unitNumber' ? b.unit_number : b.created_at;

            if (sortField === 'unitNumber') {
                return sortDirection === 'asc'
                    ? parseInt(valueA || '0') - parseInt(valueB || '0')
                    : parseInt(valueB || '0') - parseInt(valueA || '0');
            }

            return sortDirection === 'asc'
                ? (valueA || '').localeCompare(valueB || '')
                : (valueB || '').localeCompare(valueA || '');
        });
    }, [filteredUsers, sortField, sortDirection]);

    const renderSortIcon = (field: SortField) => {
        if (sortField !== field) {
            return <ArrowUpDown size={14} className="text-gray-400 opacity-50 group-hover:opacity-100 transition-opacity" />;
        }
        return sortDirection === 'asc'
            ? <ArrowUp size={14} className="text-indigo-600" />
            : <ArrowDown size={14} className="text-indigo-600" />;
    };

    const handleDelete = (id: number) => {
        console.log(`Delete user with id: ${id}`);
    };

    if (!apartmentId && !isLoading) {
        return (
            <div className="w-full px-4 sm:px-6 py-12 flex flex-col items-center justify-center gap-3 text-amber-600 bg-amber-50/50 rounded-2xl border border-amber-200" dir="rtl">
                <AlertCircle size={32} />
                <span className="font-bold">شناسه آپارتمان یافت نشد!</span>
                <p className="text-sm text-gray-500 text-center">حساب کاربری شما به هیچ آپارتمانی متصل نیست.</p>
            </div>
        );
    }

    return (
        <div className="w-full px-4 sm:px-6 py-4" dir="rtl">

            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="max-w-md w-full">
                    <CustomField
                        type="text"
                        placeholder="جستجوی اعضا (نام، واحد، ایمیل...)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        icon={<Search size={18} />}
                        direction="rtl"
                        variant="default"
                    />
                </div>

                <div className="flex items-center gap-2 md:hidden overflow-x-auto pb-1 select-none scrollbar-none">
                    <span className="text-xs text-gray-500 whitespace-nowrap">مرتب‌سازی:</span>
                    <button
                        onClick={() => handleSort('unitNumber')}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1 whitespace-nowrap ${sortField === 'unitNumber' ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-bold' : 'bg-white border-gray-200 text-gray-600'}`}
                    >
                        شماره واحد {sortField === 'unitNumber' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </button>
                    <button
                        onClick={() => handleSort('joinDate')}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1 whitespace-nowrap ${sortField === 'joinDate' ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-bold' : 'bg-white border-gray-200 text-gray-600'}`}
                    >
                        تاریخ ورود {sortField === 'joinDate' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </button>
                </div>
            </div>

            {isError && (
                <div className="mb-3 p-3 rounded-xl text-xs text-rose-600 bg-rose-50 border border-rose-100 flex items-center gap-2">
                    <AlertCircle size={16} />
                    <span>⚠️ اتصال به سرور ناموفق بود؛ در حال نمایش داده‌های لوکال مخزن موقت.</span>
                </div>
            )}

            {isLoading && (
                <div className="w-full bg-white/80 rounded-2xl border border-gray-200/80 p-12 shadow-sm flex flex-col items-center justify-center gap-3">
                    <Loader2 className="animate-spin text-indigo-600" size={28} />
                    <span className="text-sm text-gray-500 font-medium">در حال دریافت اطلاعات کاربران...</span>
                </div>
            )}

            {!isLoading && (
                <div className="block md:hidden space-y-3">
                    <AnimatePresence>
                        {sortedUsers.length > 0 ? (
                            sortedUsers.map((user) => (
                                <motion.div
                                    key={user.id}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white rounded-xl border border-gray-200/80 p-4 shadow-sm"
                                >
                                    <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={user.profile_image_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"}
                                                alt={`${user.first_name} ${user.last_name}`}
                                                className="w-11 h-11 rounded-full object-cover shadow-sm ring-2 ring-teal-400/70 p-0.5"
                                            />
                                            <div className="flex flex-col">
                                                <span className="font-bold text-gray-800 text-sm">{`${user.first_name} ${user.last_name}`}</span>
                                                <span className="text-xs text-gray-400" dir="ltr">{user.username ? `@${user.username}` : ''}</span>
                                            </div>
                                        </div>
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-indigo-50 text-indigo-700 rounded-md font-extrabold text-xs border border-indigo-100/50">
                                            <Hash size={12} />
                                            واحد {translateNumber(user.unit_number)}
                                        </span>
                                    </div>

                                    <div className="space-y-2 text-xs text-gray-600">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-400 flex items-center gap-1"><Phone size={13} /> شماره تماس:</span>
                                            <span className="font-medium" dir="ltr">{translateNumber(user.phone)}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-400 flex items-center gap-1"><Mail size={13} /> ایمیل:</span>
                                            <span className="font-medium max-w-[180px] truncate">{user.email}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-400 flex items-center gap-1"><Calendar size={13} /> تاریخ ورود:</span>
                                            <span className="font-semibold px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-100/60 rounded-md">
                                                {translateDate(user.created_at)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex justify-end mt-3 pt-3 border-t border-gray-100">
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(user.id)}
                                            className="w-full sm:w-auto bg-rose-50 border border-rose-100 text-rose-500 py-2 px-4 rounded-lg flex items-center justify-center gap-1.5 text-xs font-semibold hover:bg-rose-100 transition-colors cursor-pointer"
                                        >
                                            <Trash2 size={14} />
                                            <span>حذف این عضو</span>
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-sm text-gray-400 bg-white border border-gray-200 rounded-xl">
                                هیچ کاربری با مشخصات وارد شده پیدا نشد.
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            {!isLoading && (
                <div className="hidden md:block bg-[#f3f4f6]/60 rounded-2xl border border-gray-200/80 shadow-md max-h-125 overflow-y-auto overflow-x-hidden backdrop-blur-sm
            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-gray-200
            [&::-webkit-scrollbar-thumb]:rounded-full
            hover:[&::-webkit-scrollbar-thumb]:bg-gray-300">
                    <table className="w-full text-right border-collapse">
                        <thead>
                            <tr className="sticky top-0 z-10 bg-[#eaedf1] border-b border-gray-200 select-none">
                                <th className="px-6 py-4 font-bold text-gray-700 text-sm text-center">اعضا</th>
                                <th
                                    onClick={() => handleSort('unitNumber')}
                                    className="px-6 py-4 font-bold text-gray-700 text-sm text-center cursor-pointer hover:bg-gray-200/50 transition-colors group"
                                >
                                    <div className="flex items-center justify-center gap-1.5">
                                        <span>شماره واحد</span>
                                        {renderSortIcon('unitNumber')}
                                    </div>
                                </th>
                                <th
                                    onClick={() => handleSort('joinDate')}
                                    className="px-6 py-4 font-bold text-gray-700 text-sm text-center cursor-pointer hover:bg-gray-200/50 transition-colors group"
                                >
                                    <div className="flex items-center justify-center gap-1.5">
                                        <span>تاریخ ورود</span>
                                        {renderSortIcon('joinDate')}
                                    </div>
                                </th>
                                <th className="px-6 py-4 font-bold text-gray-700 text-sm text-center">شماره تماس</th>
                                <th className="px-6 py-4 font-bold text-gray-700 text-sm text-center">ایمیل</th>
                                <th className="px-6 py-4 font-bold text-gray-700 text-sm text-center">عملیات</th>
                            </tr>
                        </thead>
                    </table>

                    <table className="w-full text-right border-collapse">
                        <tbody>
                            {sortedUsers.length > 0 ? (
                                sortedUsers.map((user) => (
                                    <tr key={user.id} className="bg-white hover:bg-gray-50/80 transition-colors border-b border-gray-100 last:border-0">
                                        {/* اعضا */}
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

                                        {/* شماره واحد */}
                                        <td className="px-6 py-4 text-center">
                                            <span className="px-3 py-0.5 bg-indigo-50/80 text-indigo-700 rounded-md font-extrabold text-sm border border-indigo-100/50">
                                                {user.unit_number}
                                            </span>
                                        </td>

                                        {/* تاریخ ورود */}
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50/70 text-amber-700 border border-amber-100/60 rounded-xl font-semibold text-xs tracking-wide shadow-sm backdrop-blur-sm">
                                                    <Calendar size={14} className="text-amber-600/80" />
                                                    {translateDate(user.created_at)}
                                                </span>
                                            </div>
                                        </td>

                                        {/* شماره تماس */}
                                        <td className="px-6 py-4 text-center text-gray-700 font-medium text-sm" dir="ltr">
                                            {translateNumber(user.phone)}
                                        </td>

                                        {/* ایمیل */}
                                        <td className="px-6 py-4 text-center text-gray-600 font-medium text-sm max-w-[200px] truncate">
                                            {user.email}
                                        </td>

                                        {/* دکمه‌های عملیات */}
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center gap-3">
                                                <motion.button
                                                    type="button"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => handleDelete(user.id)}
                                                    className="bg-white border border-red-200/60 p-2.5 rounded-lg text-red-500 flex items-center justify-center transition-colors hover:bg-red-100/70 cursor-pointer shadow-sm"
                                                    title="حذف کاربر"
                                                >
                                                    <Trash2 size={18} />
                                                </motion.button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400 font-medium text-sm bg-white rounded-b-2xl">
                                        هیچ کاربری با مشخصات وارد شده پیدا نشد.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManagerUsers;