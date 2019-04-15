export const popRandomElement = list => list.splice(random(list.length), 1)[0];

export const pushElementRandomly = (list, element) => void list.splice(random(list.length + 1), 0, element);

export const getRandomElement = list => list[random(list.length)];

const random = limit => Math.floor(Math.random() * limit);
