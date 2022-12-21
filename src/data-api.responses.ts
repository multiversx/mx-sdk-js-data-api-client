export interface DataApiLastResponse {
  value: string;
  timestamp: number;
}

export interface DataApiAggregateResponse {
  first?: string;
  last?: string;
  min?: string;
  max?: string;
  count?: number;
  sum?: string;
  avg?: string;
}

export interface DataApiHistoricalResponse {
  first?: string;
  last?: string;
  min?: string;
  max?: string;
  count?: number;
  sum?: string;
  avg?: string;
  timestamp?: number;
}
