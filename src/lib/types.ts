export type SubscriptionStatus = 'active' | 'inactive' | 'trial';

export interface UserProfile {
  id: string;
  email: string;
  subscription_status: SubscriptionStatus;
  charity_id: string | null;
  charity_percent: number;
  is_admin: boolean;
  created_at: string;
}

export interface Score {
  id: string;
  user_id: string;
  score_value: number;
  date_created: string;
}

export interface Charity {
  id: string;
  name: string;
  description: string;
  logo_url: string | null;
  active_status: boolean;
}

export interface Draw {
  id: string;
  draw_date: string;
  winning_numbers: number[];
  prize_pool_total: number;
  is_published: boolean;
}
