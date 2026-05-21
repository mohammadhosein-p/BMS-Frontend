import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileDetails from "@/components/profile/ProfileDetails";
import type { User } from "@/types/authTypes";

export default function ProfileTab() {
    const mockUser: User = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        apartment_id: "987e6543-e21b-34d3-b456-426614174111",
        first_name: "علی",
        last_name: "نقی نژاد",
        username: "AliNaghiNjad",
        email: "ali@example.com",
        phone: "09123456789",
        role: "user",
        gender: "male",
        profile_image_url: null,
    };

    return (
        <>
           
            <ProfileHeader user={mockUser} />
            
            <div className="mt-8">
                <ProfileDetails user={mockUser} />
            </div> 
        </>
    );
}