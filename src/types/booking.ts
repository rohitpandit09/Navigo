export interface BookingRequest {
  id: string;
  userId: string;
  userName: string;
  expertId: string;
  expertName: string;
  status: "pending" | "accepted" | "rejected";
}
