export class PugParseError extends Error {

  constructor(pug, lineNumber) {
    super(`Could not parse line ${lineNumber}: ${pug.trim()}`);
    this._pug = pug;
    this._lineNumber = lineNumber;
  }


  get name() {
    return 'PugParseError';
  }


  get pug() {
    return this._pug;
  }


  get lineNumber() {
    return this._lineNumber;
  }

}
