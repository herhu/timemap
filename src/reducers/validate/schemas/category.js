import { isObject, isString } from 'typanion';

export default isObject({
  category: isString(),
  // description: isString(),
  // group: isString(),
});
