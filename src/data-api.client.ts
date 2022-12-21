import axios, { AxiosRequestConfig } from 'axios';
import { DataApiClientConfig } from './entities/data-api.client.config';
import Agent, { HttpsAgent } from 'agentkeepalive';
import { NativeAuthSigner } from './utils/utils';

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
        authorization: `Bearer ${accessTokenInfo.token}`,
      },
    };
  }

  private async post(payload: any): Promise<any> {
    try {
      const config = await this.getConfig();
      const { data } = await axios.post(this.url, payload, config);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async query(query: string, variables: Record<string, any>): Promise<any> {
    // TODO
    try {
      return await this.post({ query, variables });
    } catch (error) {
      // TODO
      throw error;
    }
  }
}
