export type ModuleType =
  | 'CBS'
  | 'MEMBER_AND_SHARE'
  | 'ALTERNATIVE_CHANNELS'
  | 'ACCOUNTING'
  | 'INVENTORY'
  | 'HCM';

const modules = {
  CBS: {
    dev: true,
    prod: true,
  },
  MEMBER_AND_SHARE: {
    dev: true,
    prod: true,
  },
  ALTERNATIVE_CHANNELS: {
    dev: true,
    prod: true,
  },
  ACCOUNTING: {
    dev: true,
    prod: true,
  },
  INVENTORY: {
    dev: true,
    prod: true,
  },
  HCM: {
    dev: true,
    prod: false,
  },
};

export const checkModuleAccess = (module: ModuleType) => {
  const appEnv = (process.env['NX_APP_ENV'] || 'dev') as 'dev' | 'prod';

  return modules[module][appEnv];
};
