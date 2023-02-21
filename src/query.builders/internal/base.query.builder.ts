import { DataApiQueryPath, DataApiQueryType, TimeRange, TimeResolution } from '../../entities';
import prettier from 'prettier';
import moment from 'moment';
import { AggregateValue, HistoricalValue } from '../../values';
import { DataApiBaseQuery } from '../../queries';

const QUERY_PLACEHOLDER = '%REPLACE_ME%';

export class QueryInput {
  resolution?: TimeResolution;
  range?: TimeRange;
  start_date?: string;
  end_date?: string;
  date?: string;
  fill_data_gaps?: boolean;
  fill_data_gaps_skip_null_values?: boolean;

  public toGraphQlInput() {
    let query = `query: {
      ${this.resolution ? `resolution: ${this.resolution}` : ''}
      ${this.range ? `range: ${this.range}` : ''}
      ${this.start_date ? `start_date: "${moment(this.start_date).format('yyyy-MM-DD HH:mm:ss')}"` : ''}
      ${this.end_date ? `end_date: "${moment(this.end_date).format('yyyy-MM-DD HH:mm:ss')}"` : ''}
      ${this.date ? `date: "${moment(this.date).format('yyyy-MM-DD')}"` : ''}
      ${this.fill_data_gaps ? `fill_data_gaps: ${this.fill_data_gaps}` : ''}
      ${this.fill_data_gaps_skip_null_values ? `fill_data_gaps_skip_null_values: ${this.fill_data_gaps}` : ''}
    }`;
    query = query.replace(/^\s*\n/gm, '');
    return query;
  }
}

export class DataApiBaseQueryBuilder {
  private path: DataApiQueryPath[] = [];
  private queryInput?: QueryInput;
  private values: (HistoricalValue | AggregateValue | string)[] = [];

  protected addToPath(path: DataApiQueryPath) {
    this.path.push(path);
  }

  protected addPathArgs(name: string, args: { name: string, type: string, value: any }[]) {
    const path = this.path.find((p) => p.name === name);
    if(!path) {
      throw new Error(`Path ${name} not found`);
    }

    path.args.push(...args);
  }

  protected addOption<T>(key: string, value: T) {
    if (this.queryInput === undefined) {
      this.queryInput = new QueryInput();
    }
    // @ts-ignore
    this.queryInput[key] = value;
  }

  protected addValues(...values: (HistoricalValue | AggregateValue | string)[]) {
    this.values.push(...values);
  }

  protected copyProps(query: DataApiBaseQueryBuilder) {
    this.path = query.path;
    this.queryInput = query.queryInput;
    this.values = query.values;
  }

  protected buildQuery(queryType: DataApiQueryType): DataApiBaseQuery {
    const variables: Record<string, any> = {};
    let query = QUERY_PLACEHOLDER;

    const argsDefinition = [];

    for (const { name, args, hasQuery } of this.path) {
      const inputArgs: string[] = [];

      for (const arg of args) {
        variables[arg.name] = arg.value;
        inputArgs.push(`${arg.name}: $${arg.name}`);
        argsDefinition.push(`$${arg.name}: ${arg.type}`);
      }

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

    const argsDefinitionString = argsDefinition.length > 0 ? `(${argsDefinition.join()})` : '';

    const queryId = moment().unix();
    query = `query clientQuery_${queryId}${argsDefinitionString} { ${query} }`;

    query = prettier.format(query, { parser: 'graphql' });

    const responsePath = this.path.map(p => p.name);

    return new DataApiBaseQuery(queryType, query, variables, responsePath);
  }

  private addQueryValues(query: string, values: (HistoricalValue | AggregateValue | string)[]) {
    return query.replace(QUERY_PLACEHOLDER, [...new Set(values)].join());
  }
}
