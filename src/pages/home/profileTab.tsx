import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileDetails from "@/components/profile/ProfileDetails";
import type { User } from "@/types/authTypes";

export default function ProfileTab() {
    const mockUser: User = {
        ID: "123e4567-e89b-12d3-a456-426614174000",
        ApartmentID: "987e6543-e21b-34d3-b456-426614174111",
        FirstName: "علی",
        LastName: "نقی نژاد",
        Username: "AliNaghiNjad",
        Email: "ali@example.com",
        Phone: "09123456789",
        Role: "user",
        Gender: "male",
        ProfileImageURL: null,
        CreatedAt: "",
        Password: "1234",
        UnitID:""
    };

    return (
        <div className="flex flex-col h-full max-h-[calc(100vh-100px)] overflow-hidden">
            
            <ProfileHeader user={mockUser} />
            
            <div className="mt-8 flex-1 overflow-hidden">
                <ProfileDetails user={mockUser} />
            </div> 
        </div>
    );
}