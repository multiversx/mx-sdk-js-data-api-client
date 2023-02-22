export class NetworkError extends Error {
  status?: string;
  response?: string;
  stack?: string;

  constructor(rawError: any) {
    super(rawError?.message);

    this.name = 'NetworkError';
    this.response = rawError?.response?.data;
    this.status = rawError?.response?.status;
    this.stack = rawError?.stack;

    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

export class DataApiError extends Error {
  errors?: any[];

  constructor(errors: any[]) {
    super(`Errors: ${errors.map((e) => `[${e.extensions?.id}] ${e.extensions?.code}: ${e.message}`).join('; ')}`);
    
    this.name = 'DataApiError';
    this.errors = errors;

    Object.setPrototypeOf(this, DataApiError.prototype);
  }
}
