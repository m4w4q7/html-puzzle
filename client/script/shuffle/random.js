export const popRandomElement = list => list.splice(random(list.length), 1)[0];

export const getRandomElement = list => list[random(list.length)];

export const random = limit => Math.floor(Math.random() * limit);
