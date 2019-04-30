export class AbstractMemberAccessError extends Error {

  constructor() {
    super('Abstract member must be overridden');
    this.name = 'AbstractMemberAccessError';
  }

}
