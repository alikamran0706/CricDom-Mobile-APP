import { Scorer } from "@/lib/types/scorer";

export const scorers: Scorer[] = [
    {
        id: "1",
        name: "Waqar Younus",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
        matchesScored: 9,
        totalPoints: 2484,
        dailyRate: 1000,
        matchRate: 800,
        rank: 1,
        location: "Karachi",
    },
    {
        id: "2",
        name: "Saleem Khan",
        image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop&q=60",
        matchesScored: 8,
        totalPoints: 2081,
        dailyRate: 1600,
        matchRate: 800,
        rank: 2,
        location: "Lahore",
    },
    {
        id: "3",
        name: "Muhammad Aamir",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60",
        matchesScored: 7,
        totalPoints: 1377,
        dailyRate: 2500,
        matchRate: 1000,
        rank: 3,
        location: "Islamabad",
    },
]