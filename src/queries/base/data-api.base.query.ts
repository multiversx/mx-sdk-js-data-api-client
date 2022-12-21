import { DataApiQuery, DataApiQueryType } from '../../data-api.query';
import { AggregateValue, HistoricalValue } from '../../data-api.values';
import { DataApiQueryPath, TimeRange, TimeResolution } from '../../entities';
import prettier from 'prettier';
import moment from 'moment';

const QUERY_PLACEHOLDER = '%REPLACE_ME%';

export class QueryInput {
  resolution?: TimeResolution;
  range?: TimeRange;
  start_date?: string;
  end_date?: string;
  date?: string;
  fill_data_gaps?: boolean;

  public toGraphQlInput() {
    let query = `query: {
      ${this.resolution ? `resolution: ${this.resolution}` : ''}
      ${this.range ? `range: ${this.range}` : ''}
      ${this.start_date ? `start_date: "${moment(this.start_date).format('yyyy-MM-DD HH:mm:ss')}"` : ''}
      ${this.end_date ? `end_date: "${moment(this.end_date).format('yyyy-MM-DD HH:mm:ss')}"` : ''}
      ${this.date ? `date: "${moment(this.date).format('yyyy-MM-DD')}"` : ''}
      ${this.fill_data_gaps ? `fill_data_gaps: ${this.fill_data_gaps}` : ''}
    }`;
    query = query.replace(/^\s*\n/gm, '');
    return query;
  }
}

export class DataApiBaseQuery {
  private path: DataApiQueryPath[] = [];
  private queryInput?: QueryInput;
  private values: (HistoricalValue | AggregateValue)[] = [];

  protected addToPath(path: DataApiQueryPath) {
    this.path.push(path);
  }

  protected addOption<T>(key: string, value: T) {
    if (this.queryInput === undefined) {
      this.queryInput = new QueryInput();
    }
    // @ts-ignore
    this.queryInput[key] = value;
  }

  protected addValues(...values: (HistoricalValue | AggregateValue)[]) {
    this.values.push(...values);
  }

  protected copyProps(query: DataApiBaseQuery) {
    this.path = query.path;
    this.queryInput = query.queryInput;
    this.values = query.values;
  }

  protected buildQuery(queryType: DataApiQueryType): DataApiQuery {
    const variables = {};
    let query = QUERY_PLACEHOLDER;

    for (const { name, hasQuery } of this.path) {
      const inputArgs: string[] = [];
      // TODO args;

      if (hasQuery && this.queryInput) {
        const queryInput = this.queryInput.toGraphQlInput();
        inputArgs.push(queryInput);
      }

      const inputQuery = inputArgs.length > 0 ? `(${inputArgs.join()})` : '';

      query = query.replace(QUERY_PLACEHOLDER, `${name}${inputQuery} {
        ${QUERY_PLACEHOLDER}
      }`);
    }

    query = this.addQueryValues(query, this.values);

    const queryId = moment().unix();
    query = `query clientQuery_${queryId} { ${query} }`;

    query = prettier.format(query, { parser: 'graphql' });

    const responsePath = this.path.map(p => p.name);
  
    return new DataApiQuery(query, variables, responsePath, queryType);
  }

  private addQueryValues(query: string, values: (HistoricalValue | AggregateValue)[]) {
    return query.replace(QUERY_PLACEHOLDER, [...new Set(values)].join());
  }
}
