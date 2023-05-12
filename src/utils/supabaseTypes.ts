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
      challenges: {
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
      };
      commitments: {
        Row: {
          badgeLevel: number;
          challenge_id: number;
          created_at: string | null;
          frequency: string | null;
          id: number;
          isUpToDate: boolean;
          timeframe: string | null;
          updatedAt: string | null;
          user_id: string;
        };
        Insert: {
          badgeLevel?: number;
          challenge_id: number;
          created_at?: string | null;
          frequency?: string | null;
          id?: number;
          isUpToDate?: boolean;
          timeframe?: string | null;
          updatedAt?: string | null;
          user_id: string;
        };
        Update: {
          badgeLevel?: number;
          challenge_id?: number;
          created_at?: string | null;
          frequency?: string | null;
          id?: number;
          isUpToDate?: boolean;
          timeframe?: string | null;
          updatedAt?: string | null;
          user_id?: string;
        };
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          email: string | null;
          full_name: string | null;
          id: string;
          updated_at: string | null;
          username: string | null;
          website: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          email?: string | null;
          full_name?: string | null;
          id: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
      };
      reactions: {
        Row: {
          commitment_id: number | null;
          created_at: string | null;
          id: number;
          type: string | null;
          user_id: string | null;
        };
        Insert: {
          commitment_id?: number | null;
          created_at?: string | null;
          id?: number;
          type?: string | null;
          user_id?: string | null;
        };
        Update: {
          commitment_id?: number | null;
          created_at?: string | null;
          id?: number;
          type?: string | null;
          user_id?: string | null;
        };
      };
      rewards: {
        Row: {
          created_at: string | null;
          dateLastRedeemed: string | null;
          description: string | null;
          id: number;
          name: string | null;
          timesRedeemed: number | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          dateLastRedeemed?: string | null;
          description?: string | null;
          id?: number;
          name?: string | null;
          timesRedeemed?: number | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          dateLastRedeemed?: string | null;
          description?: string | null;
          id?: number;
          name?: string | null;
          timesRedeemed?: number | null;
          user_id?: string | null;
        };
      };
      users_2: {
        Row: {
          created_at: string | null;
          email: string;
          id: number;
          password: string | null;
          photoUrl: string | null;
          username: string;
        };
        Insert: {
          created_at?: string | null;
          email?: string;
          id?: number;
          password?: string | null;
          photoUrl?: string | null;
          username?: string;
        };
        Update: {
          created_at?: string | null;
          email?: string;
          id?: number;
          password?: string | null;
          photoUrl?: string | null;
          username?: string;
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
