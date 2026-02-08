// // Mock Data for Incredible India Tourism Website

// export interface HeroSlide {
//   id: number;
//   image: string;
//   title: string;
//   subtitle: string;
// }

// export const heroSlides: HeroSlide[] = [
//   {
//     id: 1,
//     image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920&q=80',
//     title: 'Discover the Magic of India',
//     subtitle: 'Where Ancient Heritage Meets Timeless Beauty'
//   },
//   {
//     id: 2,
//     image: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?w=1920&q=80',
//     title: 'Explore Majestic Monuments',
//     subtitle: 'Journey Through Centuries of Architectural Marvels'
//   },
//   {
//     id: 3,
//     image: 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=1920&q=80',
//     title: 'Experience Rich Culture',
//     subtitle: 'Immerse Yourself in Vibrant Traditions'
//   },
//   {
//     id: 4,
//     image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1920&q=80',
//     title: 'The Taj Mahal Awaits',
//     subtitle: 'Witness the World\'s Greatest Monument of Love'
//   }
// ];

// export interface Monument {
//   id: number;
//   name: string;
//   location: string;
//   state: string;
//   type: 'Monument' | 'Temple' | 'Fort' | 'Heritage' | 'Palace';
//   image: string;
//   description: string;
//   hasAudio: boolean;
//   hasMap: boolean;
//   has360View: boolean;
// }

// export const monuments: Monument[] = [
//   {
//     id: 1,
//     name: 'Taj Mahal',
//     location: 'Agra',
//     state: 'Uttar Pradesh',
//     type: 'Monument',
//     image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80',
//     description: 'An ivory-white marble mausoleum, a UNESCO World Heritage Site.',
//     hasAudio: true,
//     hasMap: true,
//     has360View: true
//   },
//   {
//     id: 2,
//     name: 'Red Fort',
//     location: 'Delhi',
//     state: 'Delhi',
//     type: 'Fort',
//     image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80',
//     description: 'A historic fort that served as the main residence of Mughal emperors.',
//     hasAudio: true,
//     hasMap: true,
//     has360View: true
//   },
//   {
//     id: 3,
//     name: 'Hawa Mahal',
//     location: 'Jaipur',
//     state: 'Rajasthan',
//     type: 'Palace',
//     image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80',
//     description: 'The Palace of Winds with its unique honeycomb structure.',
//     hasAudio: true,
//     hasMap: true,
//     has360View: false
//   },
//   {
//     id: 4,
//     name: 'Khajuraho Temples',
//     location: 'Khajuraho',
//     state: 'Madhya Pradesh',
//     type: 'Temple',
//     image: 'https://images.unsplash.com/photo-1590766940554-634a4e695b32?w=800&q=80',
//     description: 'Medieval Hindu and Jain temples known for their sculptural art.',
//     hasAudio: true,
//     hasMap: true,
//     has360View: true
//   },
//   {
//     id: 5,
//     name: 'Gateway of India',
//     location: 'Mumbai',
//     state: 'Maharashtra',
//     type: 'Monument',
//     image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80',
//     description: 'An arch monument overlooking the Arabian Sea.',
//     hasAudio: true,
//     hasMap: true,
//     has360View: false
//   },
//   {
//     id: 6,
//     name: 'Amber Fort',
//     location: 'Jaipur',
//     state: 'Rajasthan',
//     type: 'Fort',
//     image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80',
//     description: 'A majestic fort made of red sandstone and marble.',
//     hasAudio: true,
//     hasMap: true,
//     has360View: true
//   },
//   {
//     id: 7,
//     name: 'Meenakshi Temple',
//     location: 'Madurai',
//     state: 'Tamil Nadu',
//     type: 'Temple',
//     image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80',
//     description: 'Historic Hindu temple with 14 colorful gopurams.',
//     hasAudio: true,
//     hasMap: true,
//     has360View: true
//   },
//   {
//     id: 8,
//     name: 'Qutub Minar',
//     location: 'Delhi',
//     state: 'Delhi',
//     type: 'Monument',
//     image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
//     description: 'A UNESCO World Heritage Site, tallest brick minaret in the world.',
//     hasAudio: true,
//     hasMap: true,
//     has360View: false
//   },
//   {
//     id: 9,
//     name: 'Hampi',
//     location: 'Hampi',
//     state: 'Karnataka',
//     type: 'Heritage',
//     image: 'https://images.unsplash.com/photo-1600100397608-30f43a88e680?w=800&q=80',
//     description: 'Ancient ruins of the Vijayanagara Empire, a UNESCO site.',
//     hasAudio: true,
//     hasMap: true,
//     has360View: true
//   }
// ];

// export interface Expert {
//   id: number;
//   name: string;
//   avatar: string;
//   specialization: string;
//   rating: number;
//   languages: string[];
//   description: string;
//   status: 'free' | 'busy';
//   location: string;
//   toursCompleted: number;
//   experience: string;
// }

// export const experts: Expert[] = [
//   {
//     id: 1,
//     name: 'Rajesh Kumar',
//     avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
//     specialization: 'Mughal Architecture',
//     rating: 4.9,
//     languages: ['Hindi', 'English', 'Urdu'],
//     description: 'Expert in Mughal history with 15+ years of experience guiding at Taj Mahal and Agra Fort.',
//     status: 'free',
//     location: 'Agra, Uttar Pradesh',
//     toursCompleted: 1250,
//     experience: '15 years'
//   },
//   {
//     id: 2,
//     name: 'Priya Sharma',
//     avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
//     specialization: 'Rajasthani Culture',
//     rating: 4.8,
//     languages: ['Hindi', 'English', 'Rajasthani'],
//     description: 'Passionate about Rajasthani heritage, specializing in Jaipur\'s royal palaces and forts.',
//     status: 'free',
//     location: 'Jaipur, Rajasthan',
//     toursCompleted: 890,
//     experience: '12 years'
//   },
//   {
//     id: 3,
//     name: 'Mohammed Farhan',
//     avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
//     specialization: 'Delhi Heritage',
//     rating: 4.7,
//     languages: ['Hindi', 'English', 'Urdu', 'Punjabi'],
//     description: 'Delhi native with deep knowledge of Old Delhi\'s monuments and hidden gems.',
//     status: 'busy',
//     location: 'Delhi',
//     toursCompleted: 750,
//     experience: '10 years'
//   },
//   {
//     id: 4,
//     name: 'Lakshmi Venkatesh',
//     avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
//     specialization: 'South Indian Temples',
//     rating: 4.9,
//     languages: ['Tamil', 'English', 'Hindi', 'Telugu'],
//     description: 'Temple architecture specialist with expertise in Dravidian style monuments.',
//     status: 'free',
//     location: 'Madurai, Tamil Nadu',
//     toursCompleted: 980,
//     experience: '18 years'
//   },
//   {
//     id: 5,
//     name: 'Arjun Mehta',
//     avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
//     specialization: 'Forts & Palaces',
//     rating: 4.6,
//     languages: ['Hindi', 'English', 'Marathi'],
//     description: 'Expert on Maharashtra\'s forts and the rich Maratha history.',
//     status: 'busy',
//     location: 'Mumbai, Maharashtra',
//     toursCompleted: 620,
//     experience: '8 years'
//   },
//   {
//     id: 6,
//     name: 'Ananya Reddy',
//     avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
//     specialization: 'Karnataka Heritage',
//     rating: 4.8,
//     languages: ['Kannada', 'English', 'Hindi'],
//     description: 'Hampi specialist with archaeological expertise in Vijayanagara Empire.',
//     status: 'free',
//     location: 'Hampi, Karnataka',
//     toursCompleted: 540,
//     experience: '7 years'
//   }
// ];

// export interface TourEvent {
//   id: number;
//   name: string;
//   description: string;
//   location: string;
//   state: string;
//   date: Date;
//   endDate?: Date;
//   images: string[];
//   category: 'ongoing' | 'upcoming' | 'past';
//   organizer: string;
//   price: string;
// }

// export const events: TourEvent[] = [
//   {
//     id: 1,
//     name: 'Jaipur Literature Festival',
//     description: 'The world\'s largest free literary festival featuring authors, thinkers, and culture enthusiasts.',
//     location: 'Jaipur',
//     state: 'Rajasthan',
//     date: new Date('2026-01-25'),
//     endDate: new Date('2026-01-29'),
//     images: [
//       'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80',
//       'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80'
//     ],
//     category: 'upcoming',
//     organizer: 'Teamwork Arts',
//     price: 'Free Entry'
//   },
//   {
//     id: 2,
//     name: 'Taj Mahotsav',
//     description: 'A 10-day cultural festival showcasing Indian arts, crafts, cuisine, and performances near the Taj Mahal.',
//     location: 'Agra',
//     state: 'Uttar Pradesh',
//     date: new Date('2026-02-18'),
//     endDate: new Date('2026-02-27'),
//     images: [
//       'https://images.unsplash.com/photo-1545987796-200677ee1011?w=800&q=80',
//       'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'
//     ],
//     category: 'ongoing',
//     organizer: 'UP Tourism',
//     price: '₹50 - ₹100'
//   },
//   {
//     id: 3,
//     name: 'Hampi Utsav',
//     description: 'A vibrant celebration of art, music, and dance amidst the ancient ruins of Hampi.',
//     location: 'Hampi',
//     state: 'Karnataka',
//     date: new Date('2026-11-03'),
//     endDate: new Date('2026-11-05'),
//     images: [
//       'https://images.unsplash.com/photo-1600100397608-30f43a88e680?w=800&q=80',
//       'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=800&q=80'
//     ],
//     category: 'upcoming',
//     organizer: 'Karnataka Tourism',
//     price: '₹200'
//   },
//   {
//     id: 4,
//     name: 'Rann Utsav',
//     description: 'Experience the magical white desert of Kutch with cultural performances and tent stays.',
//     location: 'Kutch',
//     state: 'Gujarat',
//     date: new Date('2025-11-01'),
//     endDate: new Date('2026-02-20'),
//     images: [
//       'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
//       'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80'
//     ],
//     category: 'ongoing',
//     organizer: 'Gujarat Tourism',
//     price: '₹1500+'
//   },
//   {
//     id: 5,
//     name: 'Konark Dance Festival',
//     description: 'Classical dance festival held against the backdrop of the Sun Temple.',
//     location: 'Konark',
//     state: 'Odisha',
//     date: new Date('2025-12-01'),
//     endDate: new Date('2025-12-05'),
//     images: [
//       'https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&q=80',
//       'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80'
//     ],
//     category: 'past',
//     organizer: 'Odisha Tourism',
//     price: '₹100'
//   },
//   {
//     id: 6,
//     name: 'Pushkar Camel Fair',
//     description: 'One of the world\'s largest camel fairs with cultural events and competitions.',
//     location: 'Pushkar',
//     state: 'Rajasthan',
//     date: new Date('2025-11-05'),
//     endDate: new Date('2025-11-13'),
//     images: [
//       'https://images.unsplash.com/photo-1524638431109-93d95c968f03?w=800&q=80',
//       'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80'
//     ],
//     category: 'past',
//     organizer: 'Rajasthan Tourism',
//     price: '₹300'
//   }
// ];

// export interface User {
//   id: number;
//   name: string;
//   email: string;
//   avatar: string;
//   role: 'user' | 'expert';
//   bio: string;
//   joinDate: Date;
//   trips: number;
//   friends: number;
//   reviews: number;
// }

// export const mockUser: User = {
//   id: 1,
//   name: 'Vikram Singh',
//   email: 'vikram@example.com',
//   avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
//   role: 'user',
//   bio: 'Passionate traveler exploring the rich heritage of India. Photography enthusiast and history lover.',
//   joinDate: new Date('2024-06-15'),
//   trips: 12,
//   friends: 48,
//   reviews: 23
// };

// export const mockExpertProfile: Expert & { revenue: number; daysWorked: number } = {
//   ...experts[0],
//   revenue: 245000,
//   daysWorked: 185
// };

// export interface BookingRequest {
//   id: number;
//   userId: number;
//   userName: string;
//   userAvatar: string;
//   date: string;
//   location: string;
//   message: string;
//   status: 'pending' | 'accepted' | 'rejected';
// }

// export const bookingRequests: BookingRequest[] = [
//   {
//     id: 1,
//     userId: 2,
//     userName: 'Amit Patel',
//     userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
//     date: '2026-02-15',
//     location: 'Taj Mahal, Agra',
//     message: 'Looking for a detailed tour of Taj Mahal and nearby monuments.',
//     status: 'pending'
//   },
//   {
//     id: 2,
//     userId: 3,
//     userName: 'Sarah Johnson',
//     userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
//     date: '2026-02-18',
//     location: 'Agra Fort',
//     message: 'Family of 4, interested in Mughal history.',
//     status: 'pending'
//   }
// ];

// export interface ChatMessage {
//   id: number;
//   senderId: number;
//   text: string;
//   timestamp: Date;
//   type: 'sent' | 'received';
// }

// export const initialChatMessages: ChatMessage[] = [
//   {
//     id: 1,
//     senderId: 1,
//     text: 'Hello! I\'m excited about our tour tomorrow!',
//     timestamp: new Date('2026-02-07T10:00:00'),
//     type: 'received'
//   },
//   {
//     id: 2,
//     senderId: 2,
//     text: 'Namaste! I\'m looking forward to it as well. Do you have any specific interests?',
//     timestamp: new Date('2026-02-07T10:02:00'),
//     type: 'sent'
//   },
//   {
//     id: 3,
//     senderId: 1,
//     text: 'I\'d love to learn about the architecture and the love story behind the Taj Mahal.',
//     timestamp: new Date('2026-02-07T10:05:00'),
//     type: 'received'
//   },
//   {
//     id: 4,
//     senderId: 2,
//     text: 'Perfect! I\'ll share fascinating details about Shah Jahan and Mumtaz. Best time to visit is early morning!',
//     timestamp: new Date('2026-02-07T10:07:00'),
//     type: 'sent'
//   }
// ];

// export const states = [
//   'All States',
//   'Delhi',
//   'Gujarat',
//   'Karnataka',
//   'Madhya Pradesh',
//   'Maharashtra',
//   'Odisha',
//   'Rajasthan',
//   'Tamil Nadu',
//   'Uttar Pradesh'
// ];

// export const monumentTypes = [
//   'All Types',
//   'Monument',
//   'Temple',
//   'Fort',
//   'Heritage',
//   'Palace'
// ];
