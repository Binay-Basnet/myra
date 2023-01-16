import { Resource } from '@coop/cbs/data-access';

export type Actions =
  | 'CREATE'
  | 'UPDATE'
  | 'VIEW'
  | 'DELETE'
  | 'EXPORT'
  | 'REVIEW'
  | 'APPROVED'
  | 'SHOW_IN_MENU';

export type Subjects = Resource;
export type AclKey = Subjects;
