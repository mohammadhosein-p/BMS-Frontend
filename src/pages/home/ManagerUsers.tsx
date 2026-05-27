import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Calendar, ArrowUpDown, ArrowUp, ArrowDown, Search } from 'lucide-react';
import { translateDate } from '@/utils/translateDate';
import CustomField from '@/components/ui/CutsomeFiled';
import { translateNumber } from '@/utils/translateNumber';

const initialUsers = [
    {
        id: 1,
        name: "علی نقی نژاد",
        username: "@AliNaghiNjad",
        unitNumber: "12",
        phoneNumber: "09938246242",
        email: "naghinjadali@gmail.com",
        joinDate: "1402/05/10",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
    },
    {
        id: 2,
        name: "محمد رضایی",
        username: "@MohammadRezaei",
        unitNumber: "15",
        phoneNumber: "09123456789",
        email: "mohammad.rezaei@gmail.com",
        joinDate: "1401/11/25",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
    },
    {
        id: 3,
        name: "رضا احمدی",
        username: "@RazaAhmadi",
        unitNumber: "11",
        phoneNumber: "09123456789",
        email: "mohammad.rezaei@gmail.com",
        joinDate: "1403/01/15",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
    },
    {
        id: 4,
        name: "محمد رضایی",
        username: "@MohammadRezaei",
        unitNumber: "13",
        phoneNumber: "09123456789",
        email: "mohammad.rezaei@gmail.com",
        joinDate: "1401/11/25",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
    },
    {
        id: 5,
        name: "محمد رضایی",
        username: "@MohammadRezaei",
        unitNumber: "13",
        phoneNumber: "09123456789",
        email: "mohammad.rezaei@gmail.com",
        joinDate: "1401/11/25",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
    },
    {
        id: 6,
        name: "محمد رضایی",
        username: "@MohammadRezaei",
        unitNumber: "13",
        phoneNumber: "09123456789",
        email: "mohammad.rezaei@gmail.com",
        joinDate: "1401/11/25",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
    }
];

type SortField = 'unitNumber' | 'joinDate' | null;
type SortDirection = 'asc' | 'desc';

const ManagerUsers: React.FC = () => {
    const [users, setUsers] = useState(initialUsers);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState<SortField>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

    const handleDelete = (id: number) => {
        setUsers(prev => prev.filter(user => user.id !== id));
    };

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    // ۱. ابتدا اعمال فیلتر جستجو روی کل داده‌ها
    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const query = searchQuery.toLowerCase().trim();
            return (
                user.name.toLowerCase().includes(query) ||
                user.username.toLowerCase().includes(query) ||
                user.unitNumber.includes(query) ||
                user.email.toLowerCase().includes(query) || 
                user.phoneNumber.includes(query)
            );
        });
    }, [users, searchQuery]);

    const sortedUsers = useMemo(() => {
        if (!sortField) return filteredUsers;

        return [...filteredUsers].sort((a, b) => {
            let valueA = a[sortField];
            let valueB = b[sortField];

            if (sortField === 'unitNumber') {
                return sortDirection === 'asc'
                    ? parseInt(valueA) - parseInt(valueB)
                    : parseInt(valueB) - parseInt(valueA);
            }

            if (sortDirection === 'asc') {
                return valueA.localeCompare(valueB);
            } else {
                return valueB.localeCompare(valueA);
            }
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

    return (
        <div className="w-full px-6 py-2" dir="rtl">

            {/* بخش جستجو ادمین پنل */}
            <div className="mb-2 max-w-md">
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

            {/* جدول نمایش کاربران */}
            <div dir="rtl" className="bg-[#f3f4f6]/60 rounded-2xl border border-gray-200/80 shadow-md max-h-[500px] overflow-y-auto overflow-x-hidden backdrop-blur-sm
        [&::-webkit-scrollbar]:w-1.5
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:bg-gray-200
        [&::-webkit-scrollbar-thumb]:rounded-full
        hover:[&::-webkit-scrollbar-thumb]:bg-gray-300">
                <table className="w-full text-right border-collapse">
                    <thead>
                        <tr className="bg-[#eaedf1] border-b border-gray-200 select-none">
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
                            <th className="px-6 py-4 font-bold text-gray-700 text-sm text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sortedUsers.length > 0 ? (
                            sortedUsers.map((user) => (
                                <tr key={user.id} className="bg-white hover:bg-gray-50/80 transition-colors border-b border-gray-100 last:border-0">

                                    {/* اعضا */}
                                    <td className="px-6 py-5 whitespace-nowrap text-center">
                                        <div className="flex items-center justify-center gap-4">
                                            <div className="relative">
                                                <img
                                                    src={user.avatar}
                                                    alt={user.name}
                                                    className="w-12 h-12 rounded-full object-cover shadow-md ring-2 ring-teal-400 p-0.5"
                                                />
                                            </div>
                                            <div className="flex flex-col text-right">
                                                <span className="font-bold text-gray-800 text-base">{user.name}</span>
                                                <span className="text-xs text-gray-400 mt-0.5" dir="ltr">{user.username}</span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* شماره واحد */}
                                    <td className="px-6 py-5 text-center">
                                        <span className="px-3 py-0.5 bg-indigo-50/80 text-indigo-700 rounded-md font-extrabold text-sm border border-indigo-100/50">
                                            {user.unitNumber}
                                        </span>
                                    </td>

                                    {/* تاریخ ورود */}
                                    <td className="px-6 py-5 text-center">
                                        <div className="flex items-center justify-center">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50/70 text-amber-700 border border-amber-100/60 rounded-xl font-semibold text-xs tracking-wide shadow-sm backdrop-blur-sm">
                                                <Calendar size={14} className="text-amber-600/80" />
                                                {translateDate(user.joinDate)}
                                            </span>
                                        </div>
                                    </td>

                                    {/* شماره تماس */}
                                    <td className="px-6 py-5 text-center text-gray-700 font-medium text-sm" dir="ltr">
                                        {translateNumber(user.phoneNumber)}
                                    </td>

                                    {/* ایمیل */}
                                    <td className="px-6 py-5 text-center text-gray-600 font-medium text-sm">
                                        {user.email}
                                    </td>

                                    {/* دکمه‌های عملیات */}
                                    <td className="px-6 py-5 text-center">
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
                            /* حالت عدم وجود رکورد مطابقت داده شده */
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-gray-400 font-medium text-sm bg-white rounded-b-2xl">
                                    هیچ کاربری با مشخصات وارد شده پیدا نشد.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManagerUsers;