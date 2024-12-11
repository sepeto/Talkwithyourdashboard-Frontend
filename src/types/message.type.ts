export interface Message {
  id: number;
  isUser: boolean;
  text: string;
  queryDB?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  json?: Array<any>;
}
