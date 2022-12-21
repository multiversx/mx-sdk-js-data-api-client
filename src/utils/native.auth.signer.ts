import { UserSigner } from '@elrondnetwork/erdjs-walletcore/out';
import { SignableMessage } from '@elrondnetwork/erdjs/out';
import { NativeAuthClient } from '@elrondnetwork/native-auth-client';
import { NativeAuthClientConfig } from '@elrondnetwork/native-auth-client/lib/src/entities/native.auth.client.config';
import moment from 'moment';

export class NativeAuthSignerConfig extends NativeAuthClientConfig {
  signerPrivateKey?: string = undefined;
}

export class AccessTokenInfo {
  token = '';
  expiryDate: Date = new Date(0);
}

export class NativeAuthSigner {
  private readonly config: NativeAuthSignerConfig;
  private readonly nativeAuthClient: NativeAuthClient;
  private userSigner?: UserSigner;
  private accessTokenInfo?: AccessTokenInfo;

  constructor(config: Partial<NativeAuthSignerConfig>) {
    this.config = Object.assign(new NativeAuthSignerConfig(), config);
    this.nativeAuthClient = new NativeAuthClient(this.config);
  }

  public async getToken(): Promise<AccessTokenInfo> {
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
