// Re-defining or extending existing types for clarity and completeness
export interface Team {
  id: string;
  name: string;
  color?: string; // Optional, for UI representation
  players: Player[]; // Players associated with this team
  description?: string;
  privacy: 'public' | 'private';
  gameType: 'Leather ball' | 'Tape ball';
  image?: string;
}

export type BattingStyle = 'RightHanded' | 'LeftHanded';
export type BowlingStyle = 'Fast' | 'Medium' | 'OffSpin' | 'LegSpin' | 'LeftArmSpin' | 'LeftArmFast';
export type PlayerPosition = 'Batsman' | 'Bowler' | 'All-Rounder' | 'Wicketkeeper';
export type GameType = 'Leather ball' | 'Tape ball';

export interface Player {
  id: string;
  name: string;
  phoneNumber: string;
  avatar: string;
  battingStyle: BattingStyle;
  bowlingStyle: BowlingStyle;
  position: PlayerPosition;
  gameType: GameType;
  teamId?: string; // Optional: if player is currently assigned to a team
}

export type TossDecision = 'bat' | 'bowl';
export type MatchType = 'T20' | 'ODI' | 'Test Match' | 'Practice Match';

export interface Match {
  id: string;
  teamA: Team;
  teamB: Team;
  date: string; // e.g., "DD/MM/YYYY"
  time: string; // e.g., "HH:MM AM/PM"
  venue: string;
  matchType: MatchType;
  oversLimit: number;
  tossWinner?: Team;
  tossDecision?: TossDecision;
  result?: string;
  description?: string;
  innings: Innings[]; // One-to-many relation
}

export interface Innings {
  id: string;
  match: Match; // Many-to-one relation
  team: Team; // Many-to-one relation (team currently batting/bowling)
  inningsNumber: number; // 1st, 2nd, 3rd, 4th innings
  runs: number;
  wickets: number;
  overs: number; // Decimal for overs (e.g., 19.3 for 19 overs and 3 balls)
  battingPerformances: BattingPerformance[]; // One-to-many
  bowlingPerformances: BowlingPerformance[]; // One-to-many
  fallOfWickets: FallOfWicket[]; // One-to-many
}

export type DismissalType =
  | 'Caught'
  | 'Bowled'
  | 'LBW'
  | 'Run Out'
  | 'Stumped'
  | 'Hit Wicket'
  | 'Retired Hurt'
  | 'Obstructing the field'
  | 'Timed Out'
  | 'Not Out'
  | 'Retired Out'
  | 'Hit the ball twice';

export interface BattingPerformance {
  id: string;
  innings: Innings; // Many-to-one
  player: Player; // Many-to-one
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  dismissalType: DismissalType;
  isNotOut: boolean;
  strikeRate: number; // Calculated field
}

export interface BowlingPerformance {
  id: string;
  innings: Innings; // Many-to-one
  player: Player; // Many-to-one
  overs: number; // Decimal
  runs: number;
  wickets: number;
  wides: number;
  noBalls: number;
  economy: number; // Calculated field
}

export interface FallOfWicket {
  id: string;
  innings: Innings; // Many-to-one
  wicketNumber: number; // 1st, 2nd, etc.
  scoreAtFall: number;
  overNumber: number; // Decimal
  batsman: Player; // Many-to-one (player who got out)
  bowler?: Player; // Optional: bowler who took the wicket
  fielder?: Player; // Optional: fielder who took the catch/run out
  dismissalType: DismissalType; // Redundant with BattingPerformance but useful for FOW context
}