import { DataApiClient } from '../src'
import { readFile } from 'fs/promises';
import path from 'path';
import moment from 'moment';
import BigNumber from 'bignumber.js';

export class HistoricDataModel {
  timestamp: string = '';
  value: string = '';

  constructor(init?: Partial<HistoricDataModel>) {
    Object.assign(this, init);
  }
}


let dataApiClient: DataApiClient;

async function getAggregatedValue() {
  // const pairAddress = 'erd1qqqqqqqqqqqqqpgqa0fsfshnff4n76jhcye6k7uvd7qacsq42jpsp6shh2';
  // const query = DataApiQueryBuilder
  //   .createXExchangeAnalyticsQuery()
  //   .metric(pairAddress, 'firstTokenVolume')
  //   .betweenDates(new Date(2022, 11, 25), new Date())
  //   .getAggregate(AggregateValue.sum);

  // const aggregatedValue = await dataApiClient.executeAggregateQuery(query);
  // console.log('aggregatedValue:', aggregatedValue);
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
  try {
    const startDate = moment.unix(parseInt('0')).utc().format('YYYY-MM-DD HH:mm:ss');
    const endDate = moment.utc().format('YYYY-MM-DD HH:mm:ss');

    const query = `query getLatestHistoricData($series: String!, $metric: String!, $startDate: DateTime!, $endDate: DateTime!) {
      maiar_exchange_analytics {
        values(
          series: $series
          key: $metric
          filter: { sort: ASC, start_date: $startDate, end_date: $endDate }
          ) {
          value
          time
        }
      }
    }`;

    const variables = {
      series: 'erd1qqqqqqqqqqqqqpgqpzlhg54w5upaeweyc6kugqspunpywwvx0n4sa9spnk',
      metric: 'launchedTokenPriceUSD',
      startDate,
      endDate
    }

    const response = await dataApiClient.executeRawQuery({ query, variables });
    const rows = response.maiar_exchange_analytics.values

    const data = rows.map((row: any) => new HistoricDataModel({
      timestamp: moment.utc(row.time).unix().toString(),
      value: new BigNumber(row.value ?? '0').toFixed(),
    }));
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

async function getLatestBinnedHistoricData() {
  // TODO
}

async function run() {
  const signerPrivateKey = await readFile(path.join(__dirname, './example.pem'))
    .then(buffer => buffer.toString());

  dataApiClient = new DataApiClient({
    host: 'example-client',
    dataApiUrl: 'https://devnet-tools.multiversx.com/data-api/graphql',
    multiversXApiUrl: 'https://devnet-api.multiversx.com',
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

