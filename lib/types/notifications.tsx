export interface CricketNotification {
  id: string;
  type: 'match_alert' | 'team_update' | 'join_request' | 'match_result' | 'player_update' | 'tournament_invite';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  actionRequired?: boolean;
  
  // Match related
  matchId?: string;
  matchName?: string;
  matchTime?: Date;
  venue?: string;
  
  // Team related
  teamId?: string;
  teamName?: string;
  
  // Player related
  playerId?: string;
  playerName?: string;
  playerAvatar?: string;
  
  // Tournament related
  tournamentId?: string;
  tournamentName?: string;
}

export interface JoinRequest {
  id: string;
  playerId: string;
  playerName: string;
  playerAvatar?: string;
  teamId: string;
  teamName: string;
  message?: string;
  timestamp: Date;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface MatchAlert {
  id: string;
  matchId: string;
  matchName: string;
  alertType: 'starting_soon' | 'reminder' | 'lineup_announced' | 'result';
  scheduledTime: Date;
  venue: string;
  teams: {
    team1: string;
    team2: string;
  };
}

export interface TeamUpdate {
  id: string;
  teamId: string;
  teamName: string;
  updateType: 'player_joined' | 'player_left' | 'captain_changed' | 'match_scheduled';
  details: string;
  timestamp: Date;
}