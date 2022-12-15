import { DataApiClientConfig } from './entities/data-api.client.config';

export class DataApiClient {
  private readonly config: DataApiClientConfig;

  constructor(config?: Partial<DataApiClientConfig>) {
    this.config = Object.assign(new DataApiClientConfig(), config);
  }
}
