/* eslint-disable no-console */
import mongodb from 'mongodb';
import prompts from 'prompts';
import { config } from '../../config.js';

const collections = ['exercise-lists', 'exercises', 'records', 'results'];

(async () => {
  let client;
  try {
    const client = await mongodb.MongoClient.connect(config.mongodbUri);
    const db = await client.db();

    const { confirmed } = await prompts({
      type: 'confirm',
      name: 'confirmed',
      message: `Are you sure you want to drop the following collections: ${collections.join(', ')}?`,
      initial: false
    });

    if (!confirmed) { process.exit(0); }


    await Promise.all(
      collections.map((collection) => db.collection(collection).drop()
        .catch(error => { if (error.code !== 26) throw error; }))
    );

    console.log('Done');

    await client.close();
    process.exit(0);

  } catch(error) {
    if (client) { await client.close(); }
    throw error;
  }
})();
