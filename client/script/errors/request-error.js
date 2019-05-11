export class RequestError extends Error {

  constructor(response) {
    super(`Server responded with ${response.status}`);
    this._response = response;
  }


  get name() {
    return 'RequestError';
  }


  get status() {
    return this.response.status;
  }

}
