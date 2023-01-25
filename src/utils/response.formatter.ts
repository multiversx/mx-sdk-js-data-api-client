import moment from 'moment';
import { DataApiQueryType } from '../entities';
import { DataApiAggregateResponse, DataApiHistoricalResponse, DataApiMostUsedResponse, DataApiValueResponse } from '../responses';

export class DataApiResponseFormatter {
  public static formatResponse(responsePath: string[], response: any): any {
    for (const path of responsePath) {
      if (response) {
        response = response[path];
      }
    }

    return response;
  }

  public static buildValueResponse(queryType: DataApiQueryType, response: any): DataApiValueResponse | undefined {
    switch (queryType) {
      case DataApiQueryType.FIRST_OR_LAST:
        return DataApiResponseFormatter.buildFirstOrLastResponse(response);
      case DataApiQueryType.LATEST_QUOTE:
        return DataApiResponseFormatter.buildLatestQuoteResponse(response);
    }
    return undefined;
  }

  private static buildFirstOrLastResponse(response: any): DataApiValueResponse | undefined {
    if (response === undefined) {
      return undefined;
    }

    if (response.length === 0) {
      return undefined;
    }

    // TODO handle null values
    const first = response[0].first?.toString();
    const last = response[0].last?.toString();

    return {
      value: last ?? first,
      timestamp: moment(response[0].time).unix(),
    };
  }

  private static buildLatestQuoteResponse(response: any): DataApiValueResponse | undefined {
    if (response === undefined) {
      return undefined;
    }

    const price = response.price;
    const change24h = response.change_24h;
    const circulatingSupply = response.circulating_supply;
    const marketCap = response.market_cap;
    const volume24h = response.volume_24h;

    return {
      value: price ?? change24h ?? circulatingSupply ?? marketCap ?? volume24h,
      timestamp: moment(response.timestamp).unix(),
    };
  }

  public static buildAggregateResponse(response: any): DataApiAggregateResponse | undefined {
    if (response === undefined) {
      return undefined;
    }

    if (response.length === 0) {
      return undefined;
    }

    return {
      first: response[0].first,
      last: response[0].last,
      min: response[0].min,
      max: response[0].max,
      count: response[0].count,
      sum: response[0].sum,
      avg: response[0].avg,
    };
  }

  public static buildHistoricalResponse(response: any): DataApiHistoricalResponse[] {
    if (response === undefined) {
      return [];
    }
    return response.map((res: any) => ({
      first: res.first,
      last: res.last,
      min: res.min,
      max: res.max,
      count: res.count,
      sum: res.sum,
      avg: res.avg,
      timestamp: moment(res.time).unix(),
    }));
  }

  public static buildMostUsedResponse(response: any): DataApiMostUsedResponse[] {
    if (response === undefined) {
      return [];
    }

    return response.map((res: any) => ({
      rank: res.rank,
      key: res.key,
      value: res.value,
    }));
  }
}
