export interface PlayerPerformance {
  id: string;
  name: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  avatar: string;
}

export interface BowlerPerformance {
  id: string;
  name: string;
  overs: string;
  runs: number;
  wickets: number;
  economy: number;
  avatar: string;
}

export interface MatchMoment {
  id: string;
  over: string;
  description: string;
  type: "wicket" | "boundary" | "milestone";
}

export interface User {
  id: number;
  documntId: string;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface League {
  id: number;
  documentId: string;
  name: string;
  description?: string;
  start_date: string;
  end_date: string;
  status_type: 'Upcoming' | 'Ongoing' | 'Completed';
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  creator?: {
    data: {
      id: number;
      attributes: User;
    } | null;
  };
}

export interface Team {
  id: number;
  documentId: string;
  name: string;
  logo_url?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Match {
  id: number;
  documentId: string;
  team_a?: { // Changed from team1
    data: {
      id: number;
      attributes: Team;
    } | null;
  };
  team_b?: { // Changed from team2
    data: {
      id: number;
      attributes: Team;
    } | null;
  };
  match_date: string;
  venue: string;
  status: 'upcoming' | 'live' | 'completed';
  result?: string;
  toss_winner?: string;
  toss_decision?: 'bat' | 'bowl';
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  league?: {
    data: {
      id: number;
      attributes: League;
    } | null;
  };
}

export interface Player {
  id: number; // This is the internal Strapi ID (number)
  documentId: string; // This is the custom document ID (string)
  name: string;
  avatar?: string;
  age?: number;
  position?: string; // This is your "role" field
  batting_style?: string;
  bowling_style?: string;
  phone_number?: string;
  description?: string;
  experience?: string;
  game_type?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image?: any
}

export interface Inning {
  id: number;
  documentId: string;
  team_name: string;
  total_runs: number;
  total_wickets: number;
  total_overs: number;
  is_live: boolean;
  is_completed: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  match?: {
    data: {
      id: number;
      attributes: Match;
    } | null;
  };
}

export interface BattingPerformance {
  id: number;
  documentId: string;
  runs: number;
  balls_faced: number;
  fours: number;
  sixes: number;
  is_out: boolean;
  dismissal_type?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  player?: {
    data: {
      id: number;
      attributes: Player;
    } | null;
  };
  match?: {
    data: {
      id: number;
      attributes: Match;
    } | null;
  };
}

export interface BowlingPerformance {
  id: number;
  documentId: string;
  overs: number;
  runs_conceded: number;
  wickets: number;
  maidens: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  player?: {
    data: {
      id: number;
      attributes: Player;
    } | null;
  };
  match?: {
    data: {
      id: number;
      attributes: Match;
    } | null;
  };
}

export interface BattingStats {
    id: string;
    name: string;
    image: string;
    runs: number;
    balls: number;
    fours: number;
    sixes: number;
    strike_rate: number;
    isOut: boolean;
    dismissal?: string;
    is_out?: boolean;
    isCaptain?: boolean;
    isWicketKeeper?: boolean;
    player: any;
}

export interface BowlingStats {
    id: string;
    name: string;
    image: string;
    overs: any;
    maidens: number;
    runs_conceded: number;
    wickets: any;
    economy: string;
    wides: number;
    noBalls: number;
    isCaptain?: boolean;
    bowler: any
}

export interface FallOfWicket {
    playerName: string;
    score: number;
    wicket: number;
    over: string;
}

export interface TeamInnings {
    teamName: string;
    totalRuns: number;
    wickets: number;
    overs: string;
    runRate: string;
    battingStats: BattingStats[];
    bowlingStats: BowlingStats[];
    extras: {
        byes: number;
        legByes: number;
        noBalls: number;
        wides: number;
        total: number;
    };
    fallOfWickets: FallOfWicket[];
    yetToBat: string[];
}

export interface ManOfTheMatch {
  id: string
  name: string
  image: string
  team: string
  performance: {
    batting?: {
      runs: number
      balls: number
      fours: number
      sixes: number
      strikeRate: number
    }
    bowling?: {
      overs: string
      wickets: number
      runs: number
      economy: string
    }
    fielding?: {
      catches: number
      runOuts: number
    }
  }
  award: string
  description: string
}

export interface Official {
  id?: string | number;
  documentId?: string;
  name?: string;
  rank?: string;
  photo: any;
  country: string;
  address: string
}

export interface MatchOfficials {
  umpires: {
    first: Official | null;
    second: Official | null;
  };
  scorers: {
    first: Official | null;
    second: Official | null;
  };
  commentators: {
    first: Official | null;
    second: Official | null;
  };
  referee: Official | null;
  livestreamers: Official | null;
}

