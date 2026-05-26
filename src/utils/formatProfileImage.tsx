import type { User } from "@/types/authTypes";

const BASE_URL = "http://localhost:8080/";

function formatProfileImage(user: User): User;
function formatProfileImage(user: null): null;
function formatProfileImage(user: User | null): User | null;
function formatProfileImage(user: User | null): User | null {
  if (!user || !user.profile_image_url) return user;

  if (!user.profile_image_url.startsWith("http")) {
    return {
      ...user,
      profile_image_url: `${BASE_URL}${user.profile_image_url.startsWith('/') ? user.profile_image_url.slice(1) : user.profile_image_url}`,
    };
  }
  return user;
}

export default formatProfileImage;
