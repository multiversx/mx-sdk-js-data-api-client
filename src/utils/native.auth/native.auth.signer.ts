import { SignableMessage } from '@multiversx/sdk-core/out';
import { NativeAuthClient } from '@multiversx/sdk-native-auth-client';
import { UserSigner } from '@multiversx/sdk-wallet/out';
import moment from 'moment';
import { AccessToken } from './access.token';
import { NativeAuthSignerConfig } from './config';


export class NativeAuthSigner {
  private readonly config: NativeAuthSignerConfig;
  private readonly nativeAuthClient: NativeAuthClient;
  private userSigner?: UserSigner;
  private accessTokenInfo?: AccessToken;

  constructor(config: Partial<NativeAuthSignerConfig>) {
    this.config = Object.assign(new NativeAuthSignerConfig(), config);
    this.nativeAuthClient = new NativeAuthClient(this.config);
  }

  public async getToken(): Promise<AccessToken> {
    const currentDate = moment().add(1, 'minutes').toDate();
    if (this.accessTokenInfo && currentDate <= this.accessTokenInfo.expiryDate) {
      return this.accessTokenInfo;
    }

    const userSigner = this.getUserSigner();
    const signableToken = await this.getSignableToken();
    const signerAddress = userSigner.getAddress().bech32();
    
    const signableMessage = this.getSignableMessage(signerAddress, signableToken);

    await userSigner.sign(signableMessage);

    const signature = signableMessage.getSignature();

    const token = this.nativeAuthClient.getToken(signerAddress, signableToken, signature.hex());
    const expiryDate = moment().add(this.config.expirySeconds, 'seconds').toDate();

    return this.accessTokenInfo = {
      token,
      expiryDate,
    };
  }

  private getUserSigner(): UserSigner {
    if (this.userSigner) {
      return this.userSigner;
    }

    if (!this.config.signerPrivateKey) {
      throw new Error('Missing SignerPrivateKey in NativeAuthSigner.');
    }

    const pemKey = this.config.signerPrivateKey;
    return this.userSigner = UserSigner.fromPem(pemKey);
  }

  private getSignableToken(): Promise<string> {
    return this.nativeAuthClient.initialize();
  }

  private getSignableMessage(
    signerAddress: string,
    signableToken: string,
  ): SignableMessage {
    const messageToSign = `${signerAddress}${signableToken}{}`;
    return new SignableMessage({
      message: Buffer.from(messageToSign, 'utf8'),
    });
  }
}
