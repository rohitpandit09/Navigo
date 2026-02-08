export interface EventData {
  id: string;
  name: string;
  description: string;
  location: string;
  state: string;
  date: any; // Firebase timestamp
  images: string[];
  timeline: string;
  createdBy: string;
  createdByName: string;
  createdAt: any;
}
