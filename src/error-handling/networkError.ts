export class NetworkError extends Error {
  status = 0;
  message = '';

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

