import { EsdtToken } from '../entities';

export interface DataApiTradingPairsResponse {
  address: string;
  state: string;
  firstToken: EsdtToken;
  secondToken: EsdtToken;
}
