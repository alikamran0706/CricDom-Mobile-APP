import { Player } from "@/lib/types/player"

export const players: Player[] = [
    { id: "1", name: "Alex Johnson", type: "batter", latitude: 40.7128, longitude: -74.006, experience: "Professional", rating: 4.9 },
    { id: "2", name: "Mike Rodriguez", type: "bowler", latitude: 40.7589, longitude: -73.9851, experience: "Professional", rating: 4.8 },
    { id: "3", name: "David Smith", type: "allrounder", latitude: 40.7505, longitude: -73.9934, experience: "Professional", rating: 4.7 },
    { id: "4", name: "Chris Wilson", type: "batter", latitude: 34.0522, longitude: -118.2437, experience: "Amateur", rating: 4.2 },
    { id: "5", name: "James Brown", type: "bowler", latitude: 34.0689, longitude: -118.2507, experience: "Semi-Pro", rating: 4.5 },
    { id: "6", name: "Robert Davis", type: "allrounder", latitude: 41.8781, longitude: -87.6298, experience: "Professional", rating: 4.6 },
    { id: "7", name: "Kevin Miller", type: "batter", latitude: 29.7604, longitude: -95.3698, experience: "Amateur", rating: 4.1 },
    { id: "8", name: "Steven Garcia", type: "bowler", latitude: 33.4484, longitude: -112.074, experience: "Semi-Pro", rating: 4.3 },

    // Additional players:
    { id: "9", name: "Liam Patel", type: "batter", latitude: 37.7749, longitude: -122.4194, experience: "Semi-Pro", rating: 4.4 },
    { id: "10", name: "Aaron Green", type: "bowler", latitude: 39.7392, longitude: -104.9903, experience: "Professional", rating: 4.6 },
    { id: "11", name: "Nate Parker", type: "allrounder", latitude: 47.6062, longitude: -122.3321, experience: "Amateur", rating: 4.0 },
    { id: "12", name: "Ethan White", type: "batter", latitude: 32.7767, longitude: -96.797, experience: "Professional", rating: 4.8 },
    { id: "13", name: "Ryan Hall", type: "bowler", latitude: 39.9612, longitude: -82.9988, experience: "Amateur", rating: 3.9 },
    { id: "14", name: "Oliver Scott", type: "allrounder", latitude: 25.7617, longitude: -80.1918, experience: "Semi-Pro", rating: 4.5 },
    { id: "15", name: "Jayden Lee", type: "batter", latitude: 36.1627, longitude: -86.7816, experience: "Professional", rating: 4.7 },
    { id: "16", name: "Cameron King", type: "bowler", latitude: 38.9072, longitude: -77.0369, experience: "Semi-Pro", rating: 4.2 },
    { id: "17", name: "Chase Young", type: "allrounder", latitude: 42.3601, longitude: -71.0589, experience: "Professional", rating: 4.6 },
    { id: "18", name: "Dylan Harris", type: "batter", latitude: 45.5051, longitude: -122.675, experience: "Amateur", rating: 3.8 },
    { id: "19", name: "Jaxon Wood", type: "bowler", latitude: 43.6532, longitude: -79.3832, experience: "Semi-Pro", rating: 4.3 },
    { id: "20", name: "Logan Rivera", type: "allrounder", latitude: 49.2827, longitude: -123.1207, experience: "Professional", rating: 4.9 },
    { id: "21", name: "Adam Price", type: "batter", latitude: 35.2271, longitude: -80.8431, experience: "Semi-Pro", rating: 4.4 },
    { id: "22", name: "Brandon Clark", type: "bowler", latitude: 33.749, longitude: -84.388, experience: "Professional", rating: 4.7 },
    { id: "23", name: "Sebastian Cox", type: "allrounder", latitude: 29.9511, longitude: -90.0715, experience: "Amateur", rating: 4.0 },
    { id: "24", name: "Leo Ramirez", type: "batter", latitude: 36.1699, longitude: -115.1398, experience: "Professional", rating: 4.6 },
    { id: "25", name: "Isaac Barnes", type: "bowler", latitude: 44.9778, longitude: -93.265, experience: "Semi-Pro", rating: 4.5 },
    { id: "26", name: "Zachary Bell", type: "allrounder", latitude: 30.2672, longitude: -97.7431, experience: "Professional", rating: 4.8 },
    { id: "27", name: "Owen Hughes", type: "batter", latitude: 39.1031, longitude: -84.512, experience: "Amateur", rating: 3.9 },
    { id: "28", name: "Lucas Griffin", type: "bowler", latitude: 35.1495, longitude: -90.049, experience: "Professional", rating: 4.4 },
    { id: "29", name: "Henry Foster", type: "allrounder", latitude: 40.4406, longitude: -79.9959, experience: "Semi-Pro", rating: 4.5 },
    { id: "30", name: "Gavin Hayes", type: "batter", latitude: 33.5207, longitude: -86.8025, experience: "Amateur", rating: 4.0 },
]

// Use the original image URLs you provided
export const playerTypeConfig = {
    batter: {
        color: "#10B981", // Green
        markerImage: {
            uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bat-marker-h2hkuyfoJt9I76vWBBD2lvE09j87n6.png",
        },
        label: "Batter",
    },
    bowler: {
        color: "#EF4444", // Red to match the ball marker
        markerImage: {
            uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ball-marker-apR34D0wd5mKGTU3ThUKZMYmwetjQu.png",
        },
        label: "Bowler",
    },
    allrounder: {
        color: "#F97316", // Orange to match the all-rounder marker
        markerImage: {
            uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/all-rounder-marker-marker-TG1aabX8vTarH2nqwrKW9fv0zer6dl.png",
        },
        label: "All-rounder",
    },
}