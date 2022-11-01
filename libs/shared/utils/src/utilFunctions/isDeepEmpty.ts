import isEmpty from 'lodash/isEmpty';

export function isDeepEmpty(obj: object) {
  if (isEmpty(obj)) {
    return true;
  }
  if (typeof obj === 'object') {
    Object.values(obj).forEach((item) => {
      if ((item !== undefined && typeof item !== 'object') || !isDeepEmpty(item as object)) {
        return false;
      }
      return true;
    });
    // if item is not undefined and is a primitive, return false
    // otherwise dig deeper

    return true;
  }
  return isEmpty(obj);
}
