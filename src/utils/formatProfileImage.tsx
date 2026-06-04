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

export function changeProfileImageUrl(profile_image_url: string | null): string | null {
  if (!profile_image_url) return null;

  if (!profile_image_url.startsWith("http")) {
    return `${BASE_URL}${profile_image_url.startsWith('/') ? profile_image_url.slice(1) : profile_image_url}`;
  }
  return profile_image_url;
}

export default formatProfileImage;
