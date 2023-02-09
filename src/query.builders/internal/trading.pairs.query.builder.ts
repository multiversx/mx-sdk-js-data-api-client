import { DataApiTradingPairsQuery } from '../../queries';
import { DataApiQueryType } from '../../entities';
import { TradingPairsValue } from '../../values';
import { DataApiBaseQueryBuilder } from './base.query.builder';

export class DataApiTradingPairsQueryBuilder extends DataApiBaseQueryBuilder {
  constructor(query: DataApiBaseQueryBuilder) {
    super();
    this.copyProps(query);
  }

  public getValues(): DataApiTradingPairsQuery {
    const values = [
      TradingPairsValue.address,
      TradingPairsValue.state,
      TradingPairsValue.firstToken,
      TradingPairsValue.secondToken,
    ];
    this.addValues(...values);
    return this.buildQuery(DataApiQueryType.TRADING_PAIRS);
  }
}
