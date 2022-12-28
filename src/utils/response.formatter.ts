import moment from 'moment';
import { DataApiAggregateResponse, DataApiHistoricalResponse, DataApiLastResponse } from '../responses';

export class DataApiResponseFormatter {
  public static formatResponse(responsePath: string[], response: any): any {
    for (const path of responsePath) {
      if (response) {
        response = response[path];
      }
    }

    return response;
  }

  public static buildLastResponse(response: any): DataApiLastResponse | undefined {
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
}
