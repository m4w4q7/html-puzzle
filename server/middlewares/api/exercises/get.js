import { exerciseLists } from '../../../database/dao/exercise-lists.js';
import { exercises as exercisesDao } from '../../../database/dao/exercises.js';


export default async (context) => {
  const defaultSlug = null;
  const exerciseList = await exerciseLists.getForSlug(defaultSlug);
  const exerciseIds = exerciseList.exerciseGroups.map(({ exercises }) => exercises).flat();
  const exercises = await exercisesDao.getByIds(exerciseIds);
  const exercisesDictionary = Object.fromEntries(exercises.map(exercise => [exercise._id.toHexString(), exercise]));
  const populatedExerciseList = {
    ...exerciseList,
    exerciseGroups: exerciseList.exerciseGroups.map(exerciseGroup => ({
      ...exerciseGroup,
      exercises: exerciseGroup.exercises.map(exerciseId => exercisesDictionary[exerciseId.toHexString()])
    }))
  };

  context.body = populatedExerciseList;
};
