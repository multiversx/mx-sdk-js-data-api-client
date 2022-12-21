import { AggregateValue, DataApiQueryBuilder, HistoricalValue, TimeRange, TimeResolution } from '../src'

// eslint-disable-next-line require-await
async function run() {
  const countLast = DataApiQueryBuilder
    .createAccountsQuery()
    .count()
    .getLast();
  console.log(countLast);

  const countAvg = DataApiQueryBuilder
    .createAccountsQuery()
    .count()
    .withTimeRange(TimeRange.MONTH)
    .getAggregate(AggregateValue.sum);
  console.log(countAvg);

  const countMax = DataApiQueryBuilder
    .createAccountsQuery()
    .count()
    .betweenDates(new Date())
    .getAggregate(AggregateValue.max);
  console.log(countMax);

  const countHistorical = DataApiQueryBuilder
    .createAccountsQuery()
    .count()
    .withTimeRange(TimeRange.MONTH)
    .withTimeResolution(TimeResolution.INTERVAL_DAY)
    .fillDataGaps()
    .getHistorical(HistoricalValue.last, HistoricalValue.time);
  console.log(countHistorical);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
run();

