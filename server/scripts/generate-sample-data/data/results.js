import mongodb from 'mongodb';
const { ObjectID } = mongodb;

export const getRecordsData = ({ userId }) => {
  return {
    records: [
      {
        exercise: { id: 'simplest' },
        user: { id: userId },
        result: { hintsUsed: 0, timeTaken: 3576 },
        createdAt: new Date()
      },

      {
        exercise: { id: 'dropdown' },
        user: { id: userId },
        result: { hintsUsed: 1, timeTaken: 12576 },
        createdAt: new Date()
      },
      {
        exercise: { id: 'dropdown' },
        user: { id: new ObjectID().toHexString() },
        result: { hintsUsed: 1, timeTaken: 11576 },
        createdAt: new Date()
      },
      {
        exercise: { id: 'dropdown' },
        user: { id: new ObjectID().toHexString() },
        result: { hintsUsed: 0, timeTaken: 18576 },
        createdAt: new Date()
      },

      {
        exercise: { id: 'emptystate' },
        user: { id: userId },
        result: { hintsUsed: 1, timeTaken: 75576 },
        createdAt: new Date()
      },
      {
        exercise: { id: 'emptystate' },
        user: { id: new ObjectID().toHexString() },
        result: { hintsUsed: 2, timeTaken: 59576 },
        createdAt: new Date()
      }


    ]
  };
};
