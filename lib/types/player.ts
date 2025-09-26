export type BattingStyle = 'Right Handed' | 'Left Handed';
export type BowlingStyle = 'Fast' | 'Medium' | 'OffSpin' | 'LegSpin' | 'LeftArmSpin' | 'LeftArmFast';
export type Position = 'Batsman' | 'Bowler' | 'All-Rounder';
export type GameType = 'Leather Ball' | 'Tape Ball';

type PlayerType = "batter" | "bowler" | "allrounder"

export interface Player {
    id: string
    name: string
    type: PlayerType
    latitude: number
    longitude: number
    experience: string
    rating: number
}
