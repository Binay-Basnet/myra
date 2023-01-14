export const getSchemaPath = () => {
  const schemaPathFromLocalStorage =
    typeof window !== 'undefined' ? window.localStorage.getItem('url') : null;

  if (schemaPathFromLocalStorage) {
    return `${schemaPathFromLocalStorage}/query`;
  }

  return `${process.env['NX_SCHEMA_PATH']}/query`;
};

export const getAPIUrl = () => {
  const schemaPathFromLocalStorage =
    typeof window !== 'undefined' ? window.localStorage.getItem('url') : null;

  if (schemaPathFromLocalStorage) {
    return schemaPathFromLocalStorage;
  }

  return `${process.env['NX_SCHEMA_PATH']}`;
};
