export interface Scorer {
  id: string
  name: string
  image: string
  matchesScored: number
  totalPoints: number
  dailyRate: number
  matchRate: number
  rank: number
  location: string
}