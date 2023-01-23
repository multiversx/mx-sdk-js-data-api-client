import { DataApiQueryType } from '../../entities';
import { DataApiLatestQuoteQuery } from '../../queries';
import { LatestQuoteValue } from '../../values';
import { DataApiBaseQueryBuilder } from './base.query.builder';

export class DataApiLatestQuoteQueryBuilder extends DataApiBaseQueryBuilder {
  constructor(query: DataApiBaseQueryBuilder) {
    super();
    this.copyProps(query);
  }

  public getPrice(): DataApiLatestQuoteQuery {
    this.addValues(LatestQuoteValue.price, LatestQuoteValue.time);
    return this.buildQuery(DataApiQueryType.LATEST_QUOTE);
  }

  public getChange24h(): DataApiLatestQuoteQuery {
    this.addValues(LatestQuoteValue.change24h, LatestQuoteValue.time);
    return this.buildQuery(DataApiQueryType.LATEST_QUOTE);
  }

  public getCirculatingSupply(): DataApiLatestQuoteQuery {
    this.addValues(LatestQuoteValue.circulatingSupply, LatestQuoteValue.time);
    return this.buildQuery(DataApiQueryType.LATEST_QUOTE);
  }

  public getMarketCap(): DataApiLatestQuoteQuery {
    this.addValues(LatestQuoteValue.marketCap, LatestQuoteValue.time);
    return this.buildQuery(DataApiQueryType.LATEST_QUOTE);
  }

  public getVolume24h(): DataApiLatestQuoteQuery {
    this.addValues(LatestQuoteValue.volume24h, LatestQuoteValue.time);
    return this.buildQuery(DataApiQueryType.LATEST_QUOTE);
  }
}
