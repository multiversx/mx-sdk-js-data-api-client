import axios, { AxiosRequestConfig } from 'axios';
import Agent, { HttpsAgent } from 'agentkeepalive';
import { NativeAuthSigner, DataApiResponseFormatter, AccessToken } from './utils';
import { DataApiAggregateResponse, DataApiHistoricalResponse, DataApiMostUsedResponse, DataApiPortfolioResponse, DataApiTradingPairsResponse, DataApiValueResponse } from './responses';
import { DataApiAggregateQuery, DataApiHistoricalQuery, DataApiBaseQuery, DataApiLatestQuoteQuery, DataApiMostUsedQuery, DataApiTradingPairsQuery, DataApiPortfolioQuery } from './queries';
import { DataApiClientConfig, DataApiError, NetworkError } from './entities';
import { DataApiValueQuery } from './queries/value.query';
import { CLIENT_VERSION } from './version';

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

  public async executePortfolioQuery(query: DataApiPortfolioQuery): Promise<DataApiPortfolioResponse[]> {
    return await this.executeQuery(query)
      .then(DataApiResponseFormatter.buildPortfolioResponse);
  }

  private async executeQuery(query: DataApiBaseQuery): Promise<DataApiValueResponse | DataApiAggregateResponse | DataApiHistoricalResponse[] | undefined> {
    const response = await this.executeRawQuery(query.toJson());
    return DataApiResponseFormatter.formatResponse(query.responsePath, response);
  }

  private async executeRawQuery(body: { query: string, variables: Record<string, any> }): Promise<any> {
    try {
      const config = await this.getConfig();
      const { data } = await axios.post(this.url, body, config);

      if (data.errors) {
        throw new DataApiError(data.errors);
      }

      return data.data;
    } catch (error: DataApiError | any) {
      if (error instanceof DataApiError) {
        throw error;
      }
      throw new NetworkError(error);
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
      origin: config.origin,
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
        'X-Data-Api-Client-Version': CLIENT_VERSION,
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
