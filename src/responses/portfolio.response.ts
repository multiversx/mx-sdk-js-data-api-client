import { DataSource } from '../entities';

export interface DataApiPortfolioResponse {
  time: string;
  token: string;
  source: DataSource;
  value: string;
}
