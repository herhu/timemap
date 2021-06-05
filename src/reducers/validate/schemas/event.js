import { isObject, isArray, isString } from 'typanion';

export default isObject({
  category: isString(),
  date: isString(),
  description: isString(),
  filters: isArray(isString()),
  fuente: isString(),
  id: isString(),
  imgs: isArray(isString()),
  latitude: isString(),
  location: isString(),
  longitude: isString(),
  nombre_victima: isString(),
  ubicacion: isString(),
  videos: isArray(isString()),
});
