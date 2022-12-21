import axios, { AxiosRequestConfig } from 'axios';
import { DataApiClientConfig } from './entities/data-api.client.config';
import Agent, { HttpsAgent } from 'agentkeepalive';
import { NativeAuthSigner } from './utils/utils';
import { DataApiQuery } from './data-api.query';
import { DataApiAggregateResponse, DataApiHistoricalResponse, DataApiLastResponse } from './data-api.responses';
import { DataApiResponseFormatter } from './entities/data-api.response.formatter';

export class DataApiClient {
  private url: string;
  private config: AxiosRequestConfig;
  private nativeAuthSigner: NativeAuthSigner;

  constructor(config: DataApiClientConfig) {
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
      timeout: config.proxyTimeout ?? 10000, // TODO
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
    const accessTokenInfo = await this.nativeAuthSigner.getToken();
    return {
      ...this.config,
      headers: {
        Authorization: `Bearer ${accessTokenInfo.token}`,
      },
      validateStatus: function () {
        return true;
      },
    };
  }

  private async post(payload: any): Promise<any> {
    try {
      const config = await this.getConfig();
      const { data } = await axios.post(this.url, payload, config);
      return data?.data;
      // TODO handle errors
    } catch (error) {
      throw error;
    }
  }

  public async runQuery(query: DataApiQuery): Promise<DataApiLastResponse | DataApiAggregateResponse | DataApiHistoricalResponse[] | undefined> {
    try {
      let response = await this.post(query.toJson());
  
      response = DataApiResponseFormatter.formatResponse(query.responsePath, response);

      return DataApiResponseFormatter.buildResponse(query.type, response);
    } catch (error) {
      // TODO
      throw error;
    }
  }
}
