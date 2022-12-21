export class DataApiQuery {
  public readonly query: string;
  public readonly variables: any;

  constructor(query: string, variables: any) {
    this.query = query;
    this.variables = variables;
  }
}
