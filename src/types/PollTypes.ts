export interface PollOption {
    id: number;
    title: string;
    percent: number;
    isVoted?: boolean;
}

export interface PollDetailsDialogProps {
    trigger: React.ReactNode;
    title: string;
    description?: string;
    isActive?: boolean;
    isPublic?: boolean;
    options: PollOption[];
}

export interface CreatePollBody{
    title: string;
    description: string;
    expires_at: string;
    is_votes_public: boolean;
    options: string[]
}