import { AggregateValue, DataApiClient, DataApiQueryBuilder, HistoricalValue, TimeRange, TimeResolution } from '../src'
import { readFile } from 'fs/promises';
import path from 'path';

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
  const countLast = await dataApiClient.executeLastQuery(countLastQuery);
  console.log('countLast:', countLast?.value);

  const countAvgQuery = DataApiQueryBuilder
    .createAccountsQuery()
    .count()
    .withTimeRange(TimeRange.MONTH)
    .getAggregate(AggregateValue.avg);
  const countAvg = await dataApiClient.executeAggregateQuery(countAvgQuery);
  console.log('countAvg:', countAvg?.avg);

  const countMaxQuery = DataApiQueryBuilder
    .createAccountsQuery()
    .count()
    .betweenDates(new Date(2022, 11, 25))
    .getAggregate(AggregateValue.max);
  const countMax = await dataApiClient.executeAggregateQuery(countMaxQuery);
  console.log('countMax:', countMax?.max);

  const countHistoricalQuery = DataApiQueryBuilder
    .createAccountsQuery()
    .count()
    .withTimeRange(TimeRange.WEEK)
    .withTimeResolution(TimeResolution.INTERVAL_DAY)
    .fillDataGaps()
    .getHistorical(HistoricalValue.last, HistoricalValue.time);
  const countHistorical = await dataApiClient.executeHistoricalQuery(countHistoricalQuery);
  console.log('countHistorical:', countHistorical.map(x => ({ last: x.last, timestamp: x.timestamp })));
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
run();

