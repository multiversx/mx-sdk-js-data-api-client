export interface DataApiQueryPath {
  name: string;
  args: { name: string, type: string, value: any }[];
  hasQuery?: boolean;
}
