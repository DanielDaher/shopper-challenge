/* eslint-disable camelcase */
class AppException extends Error {
  public status;
  public error_code;
  public error_description;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.status = status;
    this.error_code = code;
    this.error_description = message;
  }
}

export default AppException;
