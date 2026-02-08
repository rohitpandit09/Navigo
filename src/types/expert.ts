export interface Expert {
  id: string;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  languages: string[];
  description: string;
  specialization: string;
  toursCompleted: number;
  status: "free" | "busy";
  isOnline: boolean;
}
