import React, { useState, useMemo } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, Search, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

import CustomField from '@/components/ui/CutsomeFiled'; 
import useAuthStore from '@/store/useAuthStore';
import { getApartmentUsers, removeUserFromUnitService } from '@/services/userManagmentService';
import { UserCard } from '@/components/MemberManagment/UserCard';
import { UserTableRow } from '@/components/MemberManagment/UserTableRow';
import CustomToast from '@/components/Custom/CustomToast';

type SortField = 'unitNumber' | 'joinDate' | null;
type SortDirection = 'asc' | 'desc';

const ManagerUsers: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState<SortField>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

    const queryClient = useQueryClient();
    const apartmentId = useAuthStore((state) => state.user?.apartment_id);

    const { data: apiData, isLoading, isError } = useQuery({
        queryKey: ['apartmentUsers', apartmentId],
        queryFn: () => getApartmentUsers(apartmentId!),
        enabled: !!apartmentId,
    });

    const deleteUserMutation = useMutation({
        mutationFn: removeUserFromUnitService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['apartmentUsers', apartmentId] });
            
            toast.custom(() => (
                <CustomToast
                    title="عملیات موفق"
                    message="کاربر مورد نظر با موفقیت از واحد مربوطه خارج شد"
                    variant="success"
                    icon={<CheckCircle2 size={20} />}
                />
            ));
        },
        onError: (error: any) => {
            toast.custom(() => (
                <CustomToast
                    title="خطا در عملیات"
                    message={error?.response?.data?.message || "مشکلی در حذف کاربر رخ داده است"}
                    variant="error"
                    icon={<AlertCircle size={20} />}
                />
            ));
        }
    });

    const users = useMemo(() => {
        if (apiData?.success && apiData?.data?.users && Array.isArray(apiData.data.users)) {
            return apiData.data.users;
        }
        return []; 
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
            const unitNumber = user.unit?.unit_number || '';
            
            return (
                fullName.includes(query) ||
                (user.username && user.username.toLowerCase().includes(query)) ||
                unitNumber.includes(query) ||
                (user.email && user.email.toLowerCase().includes(query)) ||
                (user.phone && user.phone.includes(query))
            );
        });
    }, [users, searchQuery]);

    const sortedUsers = useMemo(() => {
        if (!sortField) return filteredUsers;

        return [...filteredUsers].sort((a, b) => {
            const valueA = sortField === 'unitNumber' ? (a.unit?.unit_number || '') : a.created_at;
            const valueB = sortField === 'unitNumber' ? (b.unit?.unit_number || '') : b.created_at;

            if (sortField === 'unitNumber') {
                const intA = parseInt(valueA, 10) || 0;
                const intB = parseInt(valueB, 10) || 0;
                return sortDirection === 'asc' ? intA - intB : intB - intA;
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

    const handleDelete = (unitId?: string) => {
        if (!apartmentId) return;
        
        if (!unitId) {
            toast.custom(() => (
                <CustomToast
                    title="خطا در عملیات"
                    message="این کاربر در حال حاضر به هیچ واحدی متصل نیست."
                    variant="error"
                    icon={<AlertCircle size={20} />}
                />
            ));
            return;
        }

        deleteUserMutation.mutate({
            apartment_id: apartmentId,
            unit_id: unitId
        });
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
        <div className="w-full px-4 sm:px-6 py-2.5" dir="rtl">
            {/* Search and Filters Section */}
            <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1 ${sortField === 'unitNumber' ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-bold' : 'bg-white border-gray-200 text-gray-600'}`}
                    >
                        شماره واحد {sortField === 'unitNumber' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </button>
                    <button 
                        onClick={() => handleSort('joinDate')}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1 ${sortField === 'joinDate' ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-bold' : 'bg-white border-gray-200 text-gray-600'}`}
                    >
                        تاریخ ورود {sortField === 'joinDate' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </button>
                </div>
            </div>

            {isError && (
                <div className="mb-3 p-3 rounded-xl text-xs text-rose-600 bg-rose-50 border border-rose-100 flex items-center gap-2">
                    <AlertCircle size={16} />
                    <span>⚠️ اتصال به سرور ناموفق بود؛ لطفا اتصال خود را بررسی کنید.</span>
                </div>
            )}

            {(isLoading || deleteUserMutation.isPending) && (
                <div className="w-full bg-white/80 rounded-2xl border border-gray-200/80 p-12 shadow-sm flex flex-col items-center justify-center gap-3">
                    <Loader2 className="animate-spin text-indigo-600" size={28} />
                    <span className="text-sm text-gray-500 font-medium">
                        {deleteUserMutation.isPending ? "در حال حذف و بروزرسانی اطلاعات..." : "در حال دریافت اطلاعات کاربران..."}
                    </span>
                </div>
            )}

            {/* Mobile View */}
            {!isLoading && !deleteUserMutation.isPending && (
                <div className="block md:hidden space-y-3">
                    <AnimatePresence>
                        {sortedUsers.length > 0 ? (
                            sortedUsers.map((user) => (
                                <UserCard 
                                    key={user.user_id} 
                                    user={user} 
                                    onDelete={() => handleDelete(user.unit?.id)} 
                                />
                            ))
                        ) : (
                            <div className="text-center py-8 text-sm text-gray-400 bg-white border border-gray-200 rounded-xl">
                                هیچ کاربری با مشخصات وارد شده پیدا نشد.
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            {/* Desktop Table View */}
            {!isLoading && !deleteUserMutation.isPending && (
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
                                <th onClick={() => handleSort('unitNumber')} className="px-6 py-4 font-bold text-gray-700 text-sm text-center cursor-pointer hover:bg-gray-200/50 transition-colors group">
                                    <div className="flex items-center justify-center gap-1.5">
                                        <span>شماره واحد</span>
                                        {renderSortIcon('unitNumber')}
                                    </div>
                                </th>
                                <th onClick={() => handleSort('joinDate')} className="px-6 py-4 font-bold text-gray-700 text-sm text-center cursor-pointer hover:bg-gray-200/50 transition-colors group">
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
                        <tbody>
                            {sortedUsers.length > 0 ? (
                                sortedUsers.map((user) => (
                                    <UserTableRow 
                                        key={user.user_id} 
                                        user={user} 
                                        onDelete={() => handleDelete(user.unit?.id)} 
                                    />
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