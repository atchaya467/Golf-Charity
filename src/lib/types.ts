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

export interface Charity {
  id: string;
  name: string;
  description: string;
  logo_url: string | null;
  active_status: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  event_date: string;
  price: number;
  capacity: number;
  image_url: string | null;
  created_at: string;
}

export interface Donation {
  id: string;
  user_id: string | null;
  charity_id: string | null;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  stripe_id: string | null;
  created_at: string;
}
