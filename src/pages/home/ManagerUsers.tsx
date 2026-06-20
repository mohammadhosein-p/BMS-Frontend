import React, { useState, useMemo } from 'react';
import { 
    ArrowUpDown, 
    ArrowUp, 
    ArrowDown, 
    Search, 
    Loader2, 
    AlertCircle, 
    CheckCircle2,
    Download,
    SlidersHorizontal,
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';

import CustomField from '@/components/ui/CutsomeFiled';
import useAuthStore from '@/store/useAuthStore';
import { getApartmentUsers, removeUserFromUnitService } from '@/services/userManagmentService';
import type { UserInManagement } from '@/services/userManagmentService';
import { UserCard } from '@/components/MemberManagment/UserCard';
import { UserTableRow } from '@/components/MemberManagment/UserTableRow';
import { UserDetailDialog } from '@/components/MemberManagment/UserDetailDialog';
import CustomToast from '@/components/Custom/CustomToast';
import SelectOptions from '@/components/ui/SelectOptions/SelectOptions';
import { translateNumber } from '@/utils/translateNumber';
import CustomButton from '@/components/ui/CustomeButton';

type SortField = 'unitNumber' | 'joinDate' | null;
type SortDirection = 'asc' | 'desc';

const ManagerUsers: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState<SortField>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

    // Advanced filters states
    const [filterRole, setFilterRole] = useState<string>('all');
    const [filterFloor, setFilterFloor] = useState<string>('all');
    const [filterGender, setFilterGender] = useState<string>('all');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [showFilters, setShowFilters] = useState<boolean>(false);

    // Selected user details modal state
    const [selectedUser, setSelectedUser] = useState<UserInManagement | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);

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

    // Floor extraction
    const floors = useMemo(() => {
        const floorSet = new Set<number>();
        users.forEach(u => {
            if (u.unit?.floor !== undefined && u.unit?.floor !== null) {
                floorSet.add(u.unit.floor);
            }
        });
        return Array.from(floorSet).sort((a, b) => a - b);
    }, [users]);

    const roleOptions = useMemo(() => [
        { value: 'all', label: 'همه نقش‌ها', color: 'gray' as const },
        { value: 'resident', label: 'ساکن', color: 'indigo' as const },
        { value: 'manager', label: 'مدیر', color: 'purple' as const },
        { value: 'admin', label: 'مدیر فنی', color: 'rose' as const }
    ], []);

    const floorOptions = useMemo(() => {
        const list = [
            { value: 'all', label: 'همه طبقه‌ها', color: 'gray' as const }
        ];
        floors.forEach(floor => {
            list.push({
                value: String(floor),
                label: `طبقه ${translateNumber(String(floor))}`,
                color: "blue" as any
            });
        });
        return list;
    }, [floors]);

    const genderOptions = useMemo(() => [
        { value: 'all', label: 'همه', color: 'gray' as const },
        { value: 'male', label: 'مرد', color: 'teal' as const },
        { value: 'female', label: 'زن', color: 'pink' as const }
    ], []);

    const statusOptions = useMemo(() => [
        { value: 'all', label: 'همه اعضا', color: 'gray' as const },
        { value: 'no_unit', label: 'بدون واحد', color: 'red' as const }
    ], []);

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
            // Search query search
            const query = searchQuery.toLowerCase().trim();
            const fullName = `${user.first_name || ''} ${user.last_name || ''}`.toLowerCase();
            const unitNumber = user.unit?.unit_number || '';
            const matchesSearch = (
                fullName.includes(query) ||
                (user.username && user.username.toLowerCase().includes(query)) ||
                unitNumber.includes(query) ||
                (user.email && user.email.toLowerCase().includes(query)) ||
                (user.phone && user.phone.includes(query))
            );

            // Role filter
            const matchesRole = filterRole === 'all' || user.role === filterRole;

            // Floor filter
            const matchesFloor = filterFloor === 'all' || String(user.unit?.floor) === filterFloor;

            // Gender filter
            const matchesGender = filterGender === 'all' || user.gender === filterGender;

            // Status filter
            let matchesStatus = true;
            if (filterStatus === 'has_email') {
                matchesStatus = !!user.email;
            } else if (filterStatus === 'has_username') {
                matchesStatus = !!user.username;
            } else if (filterStatus === 'no_unit') {
                matchesStatus = !user.unit;
            }

            return matchesSearch && matchesRole && matchesFloor && matchesGender && matchesStatus;
        });
    }, [users, searchQuery, filterRole, filterFloor, filterGender, filterStatus]);

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
            unit_id: unitId
        });
    };

    const handleClearFilters = () => {
        setSearchQuery('');
        setFilterRole('all');
        setFilterFloor('all');
        setFilterGender('all');
        setFilterStatus('all');
    };

    const handleOpenDetails = (user: UserInManagement) => {
        setSelectedUser(user);
        setIsDetailsOpen(true);
    };

    const handleExportCSV = (usersToExport: any[]) => {
        if (!usersToExport || usersToExport.length === 0) {
            toast.custom(() => (
                <CustomToast
                    title="خطا در خروجی"
                    message="هیچ کاربری برای دریافت خروجی وجود ندارد."
                    variant="error"
                    icon={<AlertCircle size={20} />}
                />
            ));
            return;
        }

        const headers = [
            "نام و نام خانوادگی",
            "نام کاربری",
            "شماره واحد",
            "طبقه",
            "شماره تماس",
            "ایمیل",
            "نقش",
            "جنسیت",
            "تاریخ ورود"
        ];

        const rows = usersToExport.map(user => [
            `${user.first_name || ''} ${user.last_name || ''}`,
            user.username || '',
            user.unit?.unit_number || '',
            user.unit?.floor !== undefined ? user.unit.floor : '',
            user.phone || '',
            user.email || '',
            user.role === 'admin' ? 'مدیر فنی' : user.role === 'manager' ? 'مدیر' : 'ساکن',
            user.gender === 'male' ? 'مرد' : user.gender === 'female' ? 'زن' : 'نامشخص',
            user.created_at ? new Date(user.created_at).toLocaleDateString('fa-IR') : ''
        ]);

        // UTF-8 BOM representation for Excel Farsi characters
        const csvContent = "\ufeff" + [headers.join(","), ...rows.map(e => e.map(val => `"${val.toString().replace(/"/g, '""')}"`).join(","))].join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `لیست_اعضا_${new Date().toLocaleDateString('fa-IR').replace(/\//g, '-')}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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

            {/* Control Bar (Search & Actions) */}
            <div className="mb-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
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

                <div className="flex flex-wrap items-center gap-2 select-none">
                    <button
                        type="button"
                        onClick={() => setShowFilters(!showFilters)}
                        className={`text-xs px-3.5 py-2.5 rounded-xl border font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                            showFilters 
                                ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm' 
                                : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-700'
                        }`}
                    >
                        <SlidersHorizontal size={14} />
                        فیلترهای پیشرفته
                        {(filterRole !== 'all' || filterFloor !== 'all' || filterGender !== 'all' || filterStatus !== 'all') && (
                            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={() => handleExportCSV(sortedUsers)}
                        className="text-xs px-3.5 py-2.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 font-extrabold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                        title="دریافت فایل اکسل/CSV"
                    >
                        <Download size={14} />
                        خروجی اکسل
                    </button>
                </div>
            </div>

            {/* Collapsible Advanced Filters Panel */}
            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-4 overflow-visible"
                    >
                        <div className="p-4 bg-white border border-gray-200 rounded-2xl shadow-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-right">
                            {/* Filter 1: Role */}
                            <div className="flex flex-col gap-1.5 z-40">
                                <label className="text-xs font-bold text-gray-500 mr-1">نقش کاربر</label>
                                <SelectOptions
                                    value={filterRole}
                                    onChange={setFilterRole}
                                    options={roleOptions}
                                />
                            </div>

                            {/* Filter 2: Floor */}
                            <div className="flex flex-col gap-1.5 z-40">
                                <label className="text-xs font-bold text-gray-500 mr-1">طبقه</label>
                                <SelectOptions
                                    value={filterFloor}
                                    onChange={setFilterFloor}
                                    options={floorOptions}
                                />
                            </div>

                            {/* Filter 3: Gender */}
                            <div className="flex flex-col gap-1.5 z-40">
                                <label className="text-xs font-bold text-gray-500 mr-1">جنسیت</label>
                                <SelectOptions
                                    value={filterGender}
                                    onChange={setFilterGender}
                                    options={genderOptions}
                                />
                            </div>

                            {/* Filter 4: Status */}
                            <div className="flex flex-col gap-1.5 z-40">
                                <label className="text-xs font-bold text-gray-500 mr-1">وضعیت حساب</label>
                                <SelectOptions
                                    value={filterStatus}
                                    onChange={setFilterStatus}
                                    options={statusOptions}
                                />
                            </div>

                            {/* Clear Filters row */}
                            <div className="sm:col-span-2 md:col-span-4 flex justify-end pt-1">
                                <CustomButton
                                    onClick={handleClearFilters}
                                    variant="danger"
                                    styleType="soft"
                                    >
                                 حذف فیلترها و ریست
                            </CustomButton>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile sorting bar */}
            <div className="flex items-center gap-2 md:hidden overflow-x-auto pb-1 select-none scrollbar-none mb-3">
                <span className="text-xs text-gray-500 whitespace-nowrap">مرتب‌سازی:</span>
                <button
                    onClick={() => handleSort('unitNumber')}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1 cursor-pointer ${sortField === 'unitNumber' ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-bold' : 'bg-white border-gray-200 text-gray-600'}`}
                >
                    شماره واحد {sortField === 'unitNumber' && (sortDirection === 'asc' ? '↑' : '↓')}
                </button>
                <button
                    onClick={() => handleSort('joinDate')}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1 cursor-pointer ${sortField === 'joinDate' ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-bold' : 'bg-white border-gray-200 text-gray-600'}`}
                >
                    تاریخ ورود {sortField === 'joinDate' && (sortDirection === 'asc' ? '↑' : '↓')}
                </button>
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
                                    onViewDetails={() => handleOpenDetails(user)}
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
                <div className="hidden md:block bg-[#f3f4f6]/60 rounded-2xl border border-gray-200/80 shadow-md max-h-122 overflow-y-auto overflow-x-hidden backdrop-blur-sm custom-scrollbar">
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
                                        onViewDetails={() => handleOpenDetails(user)}
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

            {/* Member Details Modal */}
            <UserDetailDialog
                isOpen={isDetailsOpen}
                onOpenChange={setIsDetailsOpen}
                user={selectedUser}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default ManagerUsers;