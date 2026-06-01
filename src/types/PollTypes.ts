export interface CreatePollOption {
    id: number;
    title: string;
    percent: number;
    isVoted?: boolean;
}

export interface CreatePollBody {
    title: string;
    description: string;
    expires_at: string;
    is_votes_public: boolean;
    options: string[];
}

export interface AllPolls {
    id: string;
    title: string;
    description: string;
    expires_at: string;
    total_votes: number;
    options: PollOption[];
    user_voted_option_id?: string;
}

export interface PollOption {
    id: string;
    text: string;
    votes_count: number;
}
export interface PollCardProp {
    id: string;
    isActive: boolean;
    title: string;
    options: PollOption[];
    expires_at: string;
    onExpire: () => void;
}

export interface GetAllPollsResponse {
    data: AllPolls[];
}

export interface GetSinglePollResponse {
    data: AllPolls;
}

export interface PostVoteBody {
    option_id: string;
}
