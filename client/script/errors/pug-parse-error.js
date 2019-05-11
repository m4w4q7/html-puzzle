export class PugParseError extends Error {

  constructor(line, index) {
    super(`Could not parse line ${index}: ${line.trim()}`);
    this._line = line;
    this._index = index;
  }


  get name() {
    return 'PugParseError';
  }


  get line() {
    return this._line;
  }


  get index() {
    return this._index;
  }

}
