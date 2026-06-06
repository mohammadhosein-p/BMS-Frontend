export interface Tag {
    id: string;
    name: string;
}

export interface Announcement {
    id: string;
    apartment_id: string;
    title: string;
    description: string;
    body: string;
    order: "very_important" | "warning" | "important" | "other"; // important=information
    is_pinned: boolean;
    expired_date: string;
    tags: Tag[];
    created_at: string;
}

export interface AnnouncementPayload {
    title: string;
    description: string;
    body: string;
    order: string;
    is_pinned: boolean;
    expired_date: string;
    tag_ids: string[];
}