import mongodb from 'mongodb';
const { ObjectID } = mongodb;

export const ids = {
  exercises: {
    basic: new ObjectID(),
    basicCard: new ObjectID(),
    cardGridPage: new ObjectID(),
    complexCard: new ObjectID(),
    dropdown: new ObjectID(),
    emptystate: new ObjectID(),
    navigationBar: new ObjectID(),
    simplest: new ObjectID(),
    textStyles: new ObjectID(),
  }
};
