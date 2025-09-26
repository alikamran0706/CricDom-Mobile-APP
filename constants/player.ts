import { BowlingStyle, GameType, Position } from "@/lib/types/player";

export const battingStyles = [
  { label: "Right Handed", value: "Right Handed", image: require('../assets/images/scoring/33.png') },
  { label: "Left Handed", value: "Left Handed", image: require('../assets/images/scoring/32.png') },
];

export const bowlingStyles: BowlingStyle[] = ['Fast', 'Medium', 'OffSpin', 'LegSpin', 'LeftArmSpin', 'LeftArmFast'];
export const positions: Position[] = ['Batsman', 'Bowler', 'All-Rounder'];
export const gameTypes: GameType[] = ['Leather Ball', 'Tape Ball'];