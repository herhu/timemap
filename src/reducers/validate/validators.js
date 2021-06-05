import eventSchema from './schemas/event';
import categorySchema from './schemas/category';

import { calcDatetime, isValidDate } from '../../common/utilities';

/**
 * Limpia los datos que llegan del API y descarta todos los items que no pasen la validación.
 *
 * @param {Object} domain Datos agregados de los diferentes endpoints del API.
 * @returns Datos que pasan validación.
 */
export function validateDomain(domain) {
  // La nueva estructura sólo con datos validados. Esta es la que devuelve la función.
  const sanitizedDomain = {
    events: [],
    categories: [],
  };

  // Si no hay datos del API, salir de acá inmediatamente y devolver los arrays vacios.
  if (domain === undefined) {
    return sanitizedDomain;
  }

  // Acumula los errores que se van generando para luego imprimirlos en la consola.
  const errors = [];
  // Contiene las categorias que se encuentran en los eventos, sirve para comparar con lista de categorias completa.
  const categoriasUsadas = [];

  /**
   * Valida cada elemento contenido en la respuesta de un endpoint del API.
   *
   * @param {Array} items Los elementos que llegan de un endpoint del API.
   * @param {String} domainKey Nombre de la llave en estructura de sanitizedDomain.
   * @param {Function} schema El esquema que valida cada item dendtro del Array (estos se encuentran en ./schemas/...)
   */
  const validateArray = (items, domainKey, schema) => {
    items.forEach((item) => {
      if (schema(item, { errors })) {
        sanitizedDomain[domainKey].push(item);
      }
    });
  };

  // Ejecutar validaciones
  validateArray(domain.eventos, 'events', eventSchema);
  validateArray(domain.categories, 'categories', categorySchema);

  // Filtrar los eventos que tienen fechas validas.
  sanitizedDomain.events = sanitizedDomain.events.filter((event, idx) => {
    // Acumular las categorias que si se usan en los eventos para filtrar luego las categorias.
    if (!categoriasUsadas.includes(event.category)) categoriasUsadas.push(event.category);

    // Darle un id único a cada evento.
    event.id = idx;
    // Crear un nuevo campo con fecha valida de JS.
    event.datetime = calcDatetime(event.date, event.time);

    // Si no logra generar una fecha valida, sumar a los errores y eliminar evento del array.
    if (!isValidDate(event.datetime)) {
      errors.push(`Invalid date (${event.date}) in event with description: ${event.description}`);
      return false;
    }

    // Si logra pasar validación de fecha, aceptar evento.
    return true;
  });

  // Filtrar lista de categorias con las que si se están usando en los eventos.
  sanitizedDomain.categories = sanitizedDomain.categories.filter(({ category }) => categoriasUsadas.includes(category));

  // Ordenar eventos por fecha.
  sanitizedDomain.events.sort((a, b) => a.datetime - b.datetime);

  // Imprimir errores acumulados en el proceso.
  if (errors.length) {
    console.error(`Validation errors:\n${errors.join(`\n`)}`);
  }

  return sanitizedDomain;
}
