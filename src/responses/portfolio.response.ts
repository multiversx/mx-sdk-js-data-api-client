import { DataSource } from '../entities';

export interface DataApiPortfolioResponse {
  timestamp: number;
  token: string;
  source: DataSource;
  value: string;
}
