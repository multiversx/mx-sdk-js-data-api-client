import { AggregateValue, DataApiClient, DataApiQueryBuilder } from '../src'
import { readFile } from 'fs/promises';
import path from 'path';

let dataApiClient: DataApiClient;

async function getAggregatedValue() {
  const pairAddress = 'erd1qqqqqqqqqqqqqpgqa0fsfshnff4n76jhcye6k7uvd7qacsq42jpsp6shh2';
  const query = DataApiQueryBuilder
    .createXExchangeAnalyticsQuery()
    .metric(pairAddress, 'firstTokenVolume')
    .betweenDates(new Date(2022, 11, 25), new Date())
    .getAggregate(AggregateValue.sum);

  const aggregatedValue = await dataApiClient.executeAggregateQuery(query);
  console.log('aggregatedValue:', aggregatedValue);
}

async function getLatestCompleteValues() {
  // TODO
}

async function getSumCompleteValues() {
  // TODO
}

async function getValues24h() {
  // TODO
}

async function getValues24hSum() {
  // TODO
}

async function getLatestHistoricData() {
  // TODO
}

async function getLatestBinnedHistoricData() {
  // TODO
}

async function run() {
  const signerPrivateKey = await readFile(path.join(__dirname, './example.pem'))
    .then(buffer => buffer.toString());

  dataApiClient = new DataApiClient({
    host: 'example-client',
    dataApiUrl: 'https://staging-tools.elrond.com/data-api/graphql',
    multiversXApiUrl: 'https://api.elrond.com',
    signerPrivateKey,
  });

  await getAggregatedValue();

  await getLatestCompleteValues();

  await getSumCompleteValues();

  await getValues24h();

  await getValues24hSum();

  await getLatestHistoricData();

  await getLatestBinnedHistoricData();
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
run();

