import { AclKey } from '@coop/cbs/utils';

interface ListItem {
  label: string;
  route: string;
  aclKey: AclKey;
  addRoute?: string;
  addAclKey?: AclKey;
  prod?: boolean;
  dev?: boolean;
}

export const checkMenuAccess = (item: ListItem) => {
  const appEnv = (process.env['NX_APP_ENV'] || 'dev') as 'dev' | 'prod';

  return item[appEnv];
};
