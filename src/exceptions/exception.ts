export class BaseException extends Error {
  status: number

  constructor(message: string, status: number, name: string) {
    super(message)
    this.status = status
    this.name = name
  }
}

export class ClientException extends BaseException {
  constructor(message: string, status: number) {
    super(message, status, 'ClientException')
  }
}

export class HmacException extends BaseException {
  constructor(message: string, status: number) {
    super(message, status, 'HmacException')
  }
}

export class RequestException extends BaseException {
  constructor(message: string, status: number) {
    super(message, status, 'RequestException')
  }
}

export class ValidateException extends BaseException {
  constructor(message: string, status: number) {
    super(message, status, 'ValidateException')
  }
}
