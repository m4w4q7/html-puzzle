export class RequestError extends Error {

  constructor(response) {
    super(`Server responded with ${response.status}`);
    this._response = response;
    this.name = 'RequestError';
  }


  get status() {
    return this.response.status;
  }

}
