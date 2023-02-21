import { DataApiPortfolioQuery } from '../queries';
import { DataApiQueryType, DataSource } from '../entities';
import { DataApiBaseQueryBuilder } from './internal';

export class DataApiPortfolioQueryBuilder extends DataApiBaseQueryBuilder {
  private address?: string;
  private token?: string;
  private source?: DataSource;

  constructor() {
    super();
    this.addToPath({ name: 'portfolio', args: [] });
    this.addToPath({ name: 'value', args: [], hasQuery: true });
  }

  public forAddress(address: string): DataApiPortfolioQueryBuilder {
    this.address = address;
    return this;
  }

  public forToken(token: string): DataApiPortfolioQueryBuilder {
    this.token = token;
    return this;
  }

  public fromSource(source: DataSource): DataApiPortfolioQueryBuilder {
    this.source = source;
    return this;
  }

  public getValues(): DataApiPortfolioQuery {
    this.addPathArgs('value', [
      { name: 'address', type: 'String!', value: this.address },
      { name: 'token', type: 'String', value: this.token },
      { name: 'source', type: 'DataSource', value: this.source },
    ]);
    this.addValues('time', 'token', 'source', 'value');
    return this.buildQuery(DataApiQueryType.PORTFOLIO);
  }
}
