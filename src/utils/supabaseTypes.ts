export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Challenge {
  category_id: number | null;
  created_at: string | null;
  created_by: string | null;
  id: number;
  name: string | null;
  description: string | null;
  category?: {
    name?: string;
  };
}

export interface Challenges {
  Row: {
    category_id: number | null;
    created_at: string | null;
    created_by: string | null;
    id: number;
    name: string | null;
  };
  Insert: {
    category_id?: number | null;
    created_at?: string | null;
    created_by?: string | null;
    id?: number;
    name?: string | null;
  };
  Update: {
    category_id?: number | null;
    created_at?: string | null;
    created_by?: string | null;
    id?: number;
    name?: string | null;
  };
}

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string | null;
          id: number;
          name: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          name?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          name?: string | null;
        };
      };
      challenge_users: {
        Row: {
          challenge: {
            name: string;
          };
          challenge_id: number;
          created_at: string | null;
          id: number;
          profile: {
            username: string;
            avatar_url: string | null;
          };
          user_id: string;
        }
        Insert: {
          challenge_id: number;
          created_at?: string | null;
          id?: number;
          user_id: string;
        };
        Update: {
          challenge_id?: number;
          created_at?: string | null;
          id?: number;
          user_id?: string;
        };
      };
      challenges: {
        Row: {
          category_id: number | null;
          category: {
            name: string;
          };
          created_at: string | null;
          created_by: string | null;
          description: string | null;
          id: number;
          name: string | null;
        };
        Insert: {
          category_id?: number | null;
          created_at?: string | null;
          created_by?: string | null;
          description?: string | null;
          id?: number;
          name?: string | null;
        };
        Update: {
          category_id?: number | null;
          created_at?: string | null;
          created_by?: string | null;
          description?: string | null;
          id?: number;
          name?: string | null;
        };
      };
      commitments: {
        Row: {
          badge_level: number;
          challenge: {
            category: {
              name: string;
            };
            category_id: number;
            name: string;
          };
          challenge_id: number;
          created_at: string | null;
          frequency: string;
          goals: string | null;
          id: number;
          is_active: boolean;
          is_clicked: boolean;
          is_up_to_date: boolean;
          reward: {
            is_clicked: boolean;
            name: string;
          };
          reward_id: number | null;
          timeframe: string;
          updated_at: string | null;
          user_id: string;
          xp_counters: number;
        };
        Insert: {
          badge_level?: number;
          challenge_id: number;
          created_at?: string | null;
          frequency: string;
          goals?: string | null;
          id?: number;
          is_active?: boolean;
          is_clicked?: boolean;
          is_up_to_date?: boolean;
          reward_id?: number | null;
          timeframe: string;
          updated_at?: string | null;
          user_id: string;
          xp_counters?: number;
        };
        Update: {
          badge_level?: number;
          challenge_id?: number;
          created_at?: string | null;
          frequency?: string;
          goals?: string | null;
          id?: number;
          is_active?: boolean;
          is_clicked?: boolean;
          is_up_to_date?: boolean;
          reward_id?: number | null;
          timeframe?: string;
          updated_at?: string | null;
          user_id?: string;
          xp_counters?: number;
        };
      };
      crontest: {
        Row: {
          created_at: string | null;
          day: string | null;
          id: number;
          time: string | null;
        };
        Insert: {
          created_at?: string | null;
          day?: string | null;
          id?: number;
          time?: string | null;
        }
        Update: {
          created_at?: string | null;
          day?: string | null;
          id?: number;
          time?: string | null;
        };
      };
      earned_rewards: {
        Row: {
          commitment_id: number | null
          created_at: string | null
          date_redeemed: string | null
          id: number
          is_redeemed: boolean | null
          reward_id: number | null
        }
        Insert: {
          commitment_id?: number | null
          created_at?: string | null
          date_redeemed?: string | null
          id?: number
          is_redeemed?: boolean | null
          reward_id?: number | null
        }
        Update: {
          commitment_id?: number | null
          created_at?: string | null
          date_redeemed?: string | null
          id?: number
          is_redeemed?: boolean | null
          reward_id?: number | null
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null;
          email: string | null;
          full_name: string | null;
          id: string;
          updated_at: string | null;
          username: string;
        };
        Insert: {
          avatar_url?: string | null;
          email?: string | null;
          full_name?: string | null;
          id: string;
          updated_at?: string | null;
          username: string;
        };
        Update: {
          avatar_url?: string | null;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          updated_at?: string | null;
          username?: string;
        };
      };
      reactions: {
        Row: {
          commitment_id: number | null;
          created_at: string | null;
          id: number;
          is_archived: boolean;
          is_clicked: boolean;
          type: string | null;
          user_id: string | null;
        };
        Insert: {
          commitment_id?: number | null;
          created_at?: string | null;
          id?: number;
          is_archived?: boolean;
          is_clicked?: boolean;
          type?: string | null;
          user_id?: string | null;
        };
        Update: {
          commitment_id?: number | null;
          created_at?: string | null;
          id?: number;
          is_archived?: boolean;
          is_clicked?: boolean;
          type?: string | null;
          user_id?: string | null;
        };
      };
      rewards: {
        Row: {
          created_at: string | null;
          date_last_redeemed: string | null;
          description: string | null;
          id: number;
          is_clicked: boolean;
          name: string;
          times_redeemed: number | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          date_last_redeemed?: string | null;
          description?: string | null;
          id?: number;
          is_clicked?: boolean;
          name: string;
          times_redeemed?: number | null;
          user_id?: string;
        };
        Update: {
          created_at?: string | null;
          date_last_redeemed?: string | null;
          description?: string | null;
          id?: number;
          is_clicked?: boolean;
          name?: string;
          times_redeemed?: number | null;
          user_id?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
