export class ErrorResponse {
  status: number;
  message: string;
  timestamp: string;
  path: string;

  constructor(status: number, message: string, path: string) {
    this.status = status;
    this.message = message;
    this.timestamp = new Date().toISOString();
    this.path = path;
  }

  toString(): string {
    return JSON.stringify(this);
  }

  getError(): string {
    return (
      'status: ' +
      this.status +
      '\n' +
      'message: ' +
      this.message +
      '\n' +
      'timestamp: ' +
      this.timestamp +
      '\n' +
      'path: ' +
      this.path
    );
  }
}
