export interface KeepAliveConfig {
  maxSockets?: number;
  maxFreeSockets?: number;
  timeout?: number;
  freeSocketTimeout?: number;
}

export interface DataApiClientConfig {
  host: string;
  dataApiUrl: string;
  multiversXApiUrl: string;
  signerPrivateKey: string;
  proxyTimeout?: number
  keepAlive?: KeepAliveConfig;
}
