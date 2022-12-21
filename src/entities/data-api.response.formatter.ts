import moment from 'moment';
import { DataApiQueryType } from '../data-api.query';
import { DataApiAggregateResponse, DataApiHistoricalResponse, DataApiLastResponse } from '../data-api.responses';

export class DataApiResponseFormatter {
  static formatResponse(responsePath: string[], response: any): any {
    for (const path of responsePath) {
      if (response) {
        response = response[path];
      }
    }

    return response;
  }

  static buildResponse(queryType: DataApiQueryType, response: any): DataApiLastResponse | DataApiAggregateResponse | DataApiHistoricalResponse[] | undefined {
    switch (queryType) {
      case DataApiQueryType.LAST:
        return DataApiResponseFormatter.buildLastResponse(response);
      case DataApiQueryType.AGGREGATE:
        return DataApiResponseFormatter.buildAggregateResponse(response);
      case DataApiQueryType.HISTORICAL:
        return DataApiResponseFormatter.buildHistoricalResponse(response);
      default:
        throw new Error(''); // TODO
    }
  }

  private static buildLastResponse(response: any[] | undefined): DataApiLastResponse | undefined {
    if (response === undefined) {
      return undefined;
    }

    if (response.length === 0) {
      return undefined;
    }

    // TODO handle null last
    return {
      value: response[0].last.toString(),
      timestamp: moment(response[0].time).unix(),
    };
  }

  private static buildAggregateResponse(response: any[] | undefined): DataApiAggregateResponse | undefined {
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

  private static buildHistoricalResponse(response: any[] | undefined): DataApiHistoricalResponse[] {
    if (response === undefined) {
      return [];
    }
    return response.map(res=> ({
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
}
