export interface PlayerStats {
  fame: number;
  fitness: number;
  reputation: number;
  gamesPlayed: number;
  gamesWon: number;
  touchdowns: number;
  interceptions: number;
  season: number;
  week: number;
  xp?: number;
  level?: string;
  achievements?: string[];
}

export interface PlayerInfo {
  name: string;
  position: string;
  avatar: string;
  age?: number;
  team?: string;
}

export interface StoryNodeOption {
  label: string;
  next: string;
  effects: Partial<PlayerStats>;
  condition?: (player: PlayerInfo | null, stats: PlayerStats) => boolean;
}

export interface StoryNode {
  text: string | ((player: PlayerInfo | null, stats: PlayerStats) => string);
  options:
    | StoryNodeOption[]
    | ((player: PlayerInfo | null, stats: PlayerStats) => StoryNodeOption[]);
  component?: string;
  backgroundImage?: string;
  audioClip?: string;
  tag?: string;
}
