import { AggregateValue, DataApiClient, DataApiQueryBuilder, HistoricalValue, TimeRange, TimeResolution } from '../src'
import { readFile } from 'fs/promises';
import path from 'path';
import { DataApiAggregateResponse, DataApiHistoricalResponse, DataApiLastResponse } from '../src/data-api.responses';

// eslint-disable-next-line require-await
async function run() {
  const signerPrivateKey = await readFile(path.join(__dirname, './example.pem'))
    .then(buffer => buffer.toString());

  const dataApiClient = new DataApiClient({
    host: 'example-client',
    dataApiUrl: 'https://tools.elrond.com/data-api/graphql',
    multiversXApiUrl: 'https://api.elrond.com',
    signerPrivateKey,
  });

  const countLastQuery = DataApiQueryBuilder
    .createAccountsQuery()
    .count()
    .getLast();
  const countLast = await dataApiClient.runQuery(countLastQuery) as DataApiLastResponse | undefined;
  console.log('countLast:', countLast);

  const countAvgQuery = DataApiQueryBuilder
    .createAccountsQuery()
    .count()
    .withTimeRange(TimeRange.MONTH)
    .getAggregate(AggregateValue.sum);
  const countAvg = await dataApiClient.runQuery(countAvgQuery) as DataApiAggregateResponse | undefined;
  console.log('countAvg:', countAvg);

  const countMaxQuery = DataApiQueryBuilder
    .createAccountsQuery()
    .count()
    .betweenDates(new Date())
    .getAggregate(AggregateValue.max);
  const countMax = await dataApiClient.runQuery(countMaxQuery) as DataApiAggregateResponse | undefined;
  console.log('countMax:', countMax);

  const countHistoricalQuery = DataApiQueryBuilder
    .createAccountsQuery()
    .count()
    .withTimeRange(TimeRange.WEEK)
    .withTimeResolution(TimeResolution.INTERVAL_DAY)
    .fillDataGaps()
    .getHistorical(HistoricalValue.last, HistoricalValue.time);
  const countHistorical = await dataApiClient.runQuery(countHistoricalQuery) as DataApiHistoricalResponse;
  console.log('countHistorical:', countHistorical);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
run();

