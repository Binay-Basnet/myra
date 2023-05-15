import type { NavType } from '../NAV';
import { ROUTES } from '../ROUTES';

export const HRMODULE: NavType = {
  label: 'HR & Capacity Management',
  menus: {
    EMPLOYEE: {
      aclKey: 'CBS_MEMBERS_MEMBER',
      label: 'Employee',

      pages: [
        {
          label: 'Employees',
          route: ROUTES.HRMODULE_EMPLOYEES_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
        {
          label: 'Contracts',
          route: ROUTES.HRMODULE_CONTRACTS_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
        {
          label: 'Attedance',
          route: ROUTES.HRMODULE_ATTENDENCE_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
        {
          label: 'Leave',
          route: ROUTES.HRMODULE_LEAVE_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
        {
          label: 'Exit Details',
          route: ROUTES.HRMODULE_EXIT_DETAILS_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
      ],
    },
    EMPLOYEE_LIFECYCLE: {
      aclKey: 'CBS_MEMBERS_MEMBER',
      label: 'Employee-Lifecycle',
      pages: [
        {
          label: 'Employees',
          route: ROUTES.HRMODULE_EMPLOYEES_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
        {
          label: 'Contracts',
          route: ROUTES.HRMODULE_EMPLOYEES_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
        {
          label: 'Attedance',
          route: ROUTES.HRMODULE_EMPLOYEES_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
        {
          label: 'Leave',
          route: ROUTES.HRMODULE_EMPLOYEES_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
        {
          label: 'Exit Details',
          route: ROUTES.HRMODULE_EMPLOYEES_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
      ],
    },
    PAYROLL: {
      aclKey: 'CBS_MEMBERS_MEMBER',
      label: 'Payroll',
      pages: [
        {
          label: 'Employees',
          route: ROUTES.HRMODULE_EMPLOYEES_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
        {
          label: 'Contracts',
          route: ROUTES.HRMODULE_EMPLOYEES_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
        {
          label: 'Attedance',
          route: ROUTES.HRMODULE_EMPLOYEES_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
        {
          label: 'Leave',
          route: ROUTES.HRMODULE_EMPLOYEES_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
        {
          label: 'Exit Details',
          route: ROUTES.HRMODULE_EMPLOYEES_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
      ],
    },
    TRAINING: {
      aclKey: 'CBS_MEMBERS_MEMBER',
      label: 'Training',
      pages: [
        {
          label: 'Employees',
          route: ROUTES.HRMODULE_EMPLOYEES_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
        {
          label: 'Contracts',
          route: ROUTES.HRMODULE_EMPLOYEES_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
        {
          label: 'Attedance',
          route: ROUTES.HRMODULE_EMPLOYEES_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
        {
          label: 'Leave',
          route: ROUTES.HRMODULE_EMPLOYEES_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
        {
          label: 'Exit Details',
          route: ROUTES.HRMODULE_EMPLOYEES_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
      ],
    },
    RECRUITMENT: {
      aclKey: 'CBS_MEMBERS_MEMBER',
      label: 'Recruitment',
      pages: [
        {
          label: 'Employees',
          route: ROUTES.HRMODULE_EMPLOYEES_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
        {
          label: 'Contracts',
          route: ROUTES.HRMODULE_EMPLOYEES_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
        {
          label: 'Attedance',
          route: ROUTES.HRMODULE_EMPLOYEES_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
        {
          label: 'Leave',
          route: ROUTES.HRMODULE_EMPLOYEES_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
        {
          label: 'Exit Details',
          route: ROUTES.HRMODULE_EMPLOYEES_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
      ],
    },

    POLICY: {
      aclKey: 'CBS_MEMBERS_MEMBER',
      label: 'Policy',
      pages: [
        {
          label: 'Employees',
          route: ROUTES.HRMODULE_EMPLOYEES_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
        {
          label: 'Contracts',
          route: ROUTES.HRMODULE_EMPLOYEES_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
        {
          label: 'Attedance',
          route: ROUTES.HRMODULE_EMPLOYEES_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
        {
          label: 'Leave',
          route: ROUTES.HRMODULE_EMPLOYEES_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
        {
          label: 'Exit Details',
          route: ROUTES.HRMODULE_EMPLOYEES_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
      ],
    },
    REPORTS: {
      label: 'REPORTS',
      aclKey: 'ACCOUNTING_INVESTMENT',
      pages: [
        {
          label: 'Accounting Reports',
          aclKey: 'ACCOUNTING_INVESTMENT',
          route: ROUTES.ACCOUNTING_REPORTS,
        },
      ],
    },
  },
};
