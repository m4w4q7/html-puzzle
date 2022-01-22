import { ids } from '../shared.js';

export default [
  {
    slug: null,
    exerciseGroups: [
      {
        name: null,
        exercises: [ids.exercises.simplest, ids.exercises.textStyles],
      },
      {
        name: 'Basic components',
        exercises: [ids.exercises.dropdown, ids.exercises.emptystate, ids.exercises.basicCard],
      },
      {
        name: 'Advanced',
        exercises: [ids.exercises.complexCard, ids.exercises.navigationBar],
      },
      {
        name: 'Pages',
        exercises: [ids.exercises.cardGridPage],
      },
    ],
  }
];
