import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileDetails from "@/components/profile/ProfileDetails";
import useAuthStore from "@/store/useAuthStore";

export default function ProfileTab() {
    const { user } = useAuthStore();

    if (!user) {
        return (
            <div className="flex h-full items-center justify-center text-neutral-500 font-medium">
                در حال بارگذاری اطلاعات کاربری...
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full max-h-[calc(100vh-100px)] overflow-hidden p-4">
            <ProfileHeader user={user} />

            <div className="mt-6 flex-1 min-h-0 h-full">
                <ProfileDetails user={user} />
            </div>
        </div>
    );
}