export type ModuleType =
  | 'HOME'
  | 'ACCOUNTS'
  | 'UTILITY_PAYMENTS'
  | 'COOP'
  | 'SHARE_INFO'
  | 'TRANSACTION_HISTORY'
  | 'SETTINGS';

const modules = {
  HOME: {
    dev: true,
    prod: true,
  },
  ACCOUNTS: {
    dev: true,
    prod: true,
  },
  UTILITY_PAYMENTS: {
    dev: true,
    prod: false,
  },
  COOP: {
    dev: true,
    prod: true,
  },
  SHARE_INFO: {
    dev: true,
    prod: true,
  },
  TRANSACTION_HISTORY: {
    dev: true,
    prod: true,
  },
  SETTINGS: {
    dev: true,
    prod: false,
  },
};

export const checkEbankingModuleAccess = (module: ModuleType) => {
  const appEnv = (process.env['NX_APP_ENV'] || 'dev') as 'dev' | 'prod';

  return modules[module][appEnv];
};
