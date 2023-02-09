import axios, { AxiosRequestConfig } from 'axios';
import Agent, { HttpsAgent } from 'agentkeepalive';
import { NativeAuthSigner, DataApiResponseFormatter, AccessToken } from './utils';
import { DataApiAggregateResponse, DataApiHistoricalResponse, DataApiMostUsedResponse, DataApiTradingPairsResponse, DataApiValueResponse } from './responses';
import { DataApiAggregateQuery, DataApiHistoricalQuery, DataApiBaseQuery, DataApiLatestQuoteQuery, DataApiMostUsedQuery, DataApiTradingPairsQuery } from './queries';
import { DataApiClientConfig } from './entities';
import { DataApiValueQuery } from './queries/value.query';

export class DataApiClient {
  private url!: string;
  private config!: AxiosRequestConfig;
  private nativeAuthSigner!: NativeAuthSigner;

  constructor(config: DataApiClientConfig) {
    this.initialize(config);
  }

  public async executeValueQuery(query: DataApiValueQuery | DataApiLatestQuoteQuery): Promise<DataApiValueResponse | undefined> {
    return await this.executeQuery(query)
      .then((res) => DataApiResponseFormatter.buildValueResponse(query.type, res));
  }

  public async executeAggregateQuery(query: DataApiAggregateQuery): Promise<DataApiAggregateResponse | undefined> {
    return await this.executeQuery(query)
      .then(DataApiResponseFormatter.buildAggregateResponse);
  }

  public async executeHistoricalQuery(query: DataApiHistoricalQuery): Promise<DataApiHistoricalResponse[]> {
    return await this.executeQuery(query)
      .then(DataApiResponseFormatter.buildHistoricalResponse);
  }

  public async executeMostUsedQuery(query: DataApiMostUsedQuery): Promise<DataApiMostUsedResponse[]> {
    return await this.executeQuery(query)
      .then(DataApiResponseFormatter.buildMostUsedResponse);
  }

  public async executeTradingPairsQuery(query: DataApiTradingPairsQuery): Promise<DataApiTradingPairsResponse[]> {
    return await this.executeQuery(query)
      .then(DataApiResponseFormatter.buildTradingPairsResponse);
  }

  private async executeQuery(query: DataApiBaseQuery): Promise<DataApiValueResponse | DataApiAggregateResponse | DataApiHistoricalResponse[] | undefined> {
    const response = await this.executeRawQuery(query.toJson());
    return DataApiResponseFormatter.formatResponse(query.responsePath, response);
  }

  public async executeRawQuery(body: { query: string, variables: Record<string, any> }): Promise<any> {
    try {
      const response = await this.post(body);
      return  response;
    } catch (error) {
      // TODO format error
      throw error;
    }
  }

  private async post(payload: any): Promise<any> {
    try {
      const config = await this.getConfig();
      const { data } = await axios.post(this.url, payload, config);

      if(data.errors) {
        throw data.errors;
      }
      
      return data.data;
    } catch (error) {
      throw error;
    }
  }

  private initialize(config: DataApiClientConfig) {
    this.url = config.dataApiUrl;

    const keepAliveOptions = {
      maxSockets: config.keepAlive?.maxSockets,
      maxFreeSockets: config.keepAlive?.maxFreeSockets,
      timeout: config.keepAlive?.timeout,
      freeSocketTimeout: config.keepAlive?.freeSocketTimeout,
      keepAlive: true,
    };
    const httpAgent = new Agent(keepAliveOptions);
    const httpsAgent = new HttpsAgent(keepAliveOptions);

    this.config = {
      timeout: config.proxyTimeout ?? 10000,
      httpAgent: config.keepAlive ? httpAgent : null,
      httpsAgent: config.keepAlive ? httpsAgent : null,
    };

    this.nativeAuthSigner = new NativeAuthSigner({
      host: config.host,
      apiUrl: config.multiversXApiUrl,
      signerPrivateKey: config.signerPrivateKey,
    });
  }

  private async getConfig(): Promise<AxiosRequestConfig> {
    const accessToken = await this.getAccessToken();

    return {
      ...this.config,
      headers: {
        Authorization: `Bearer ${accessToken.token}`,
      },
      validateStatus: function () {
        return true;
      },
    };
  }

  public async getAccessToken(): Promise<AccessToken> {
    return await this.nativeAuthSigner.getToken();
  }
}
