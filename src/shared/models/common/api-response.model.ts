export class ResponseAPI<T = object> {
  status: number;
  message: string;
  data?: T;

  constructor(status: number, message: string, data?: T) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  toString(): string {
    return JSON.stringify(this);
  }
}
