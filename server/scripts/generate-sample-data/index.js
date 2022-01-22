/* eslint-disable no-console */
import mongodb from 'mongodb';
import prompts from 'prompts';
import { config } from '../../config.js';
import { getRecordsData } from './data/results.js';
import exercisesData from './data/exercises/index.js';
const { ObjectID } = mongodb;

(async () => {
  let client;
  try {
    const client = await mongodb.MongoClient.connect(config.mongodbUri);
    const db = await client.db();

    const users = (await db.collection('users').find({}).toArray());
    const choices = users
      .map(({ name, _id }) => ({ title: name, value: _id.toHexString() }))
      .concat({ title: '[anonymous]', value: new ObjectID().toHexString() });


    const { userId } = await prompts({
      type: 'select',
      name: 'userId',
      message: 'Which user should the data be generated for?',
      choices,
    });

    if (!userId) { process.exit(0); }

    const recordsData = getRecordsData({ userId });

    await Promise.all(
      [
        ...Object.entries(recordsData),
        ...Object.entries(exercisesData)
      ]
        .map(([collectionName, documents]) => db.collection(collectionName).insertMany(documents))
    );

    console.log('Done');

    await client.close();
    process.exit(0);

  } catch(error) {
    if (client) { await client.close(); }
    throw error;
  }
})();
