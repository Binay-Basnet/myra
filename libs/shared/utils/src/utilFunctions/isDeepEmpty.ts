import isEmpty from 'lodash/isEmpty';

export function isDeepEmpty(obj: object) {
  if (isEmpty(obj)) {
    return true;
  }
  if (typeof obj === 'object') {
    for (const item of Object.values(obj)) {
      // if item is not undefined and is a primitive, return false
      // otherwise dig deeper
      if (
        (item !== undefined && typeof item !== 'object') ||
        !isDeepEmpty(item)
      ) {
        return false;
      }
    }
    return true;
  }
  return isEmpty(obj);
}
