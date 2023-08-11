import type { NavType } from '../NAV';
import { ROUTES } from '../ROUTES';

export const BPM: NavType = {
  label: 'Business Process Management',
  menus: {
    TASKS: {
      aclKey: 'HCM_EMPLOYEE',
      label: 'Tasks',
      forms: [
        {
          label: 'Tasks',
          aclKey: 'HCM_EMPLOYEE',
          route: ROUTES.BPM_TASKS_LISTS,
        },
      ],

      pages: [
        {
          label: 'Tasks',
          route: ROUTES.BPM_TASKS_LISTS,
          aclKey: 'HCM_EMPLOYEE',
          addRoute: ROUTES.BPM_TASKS_ADD,
        },
      ],
    },
    PROGRAMS: {
      aclKey: 'HCM_EMPLOYEE_LIFECYCLE',
      label: 'Programs',
      forms: [
        {
          label: 'Events',
          aclKey: 'HCM_EMPLOYEE_LIFECYCLE_ONBOARDING',
          route: ROUTES.BPM_PROGRAMS_EVENTS_ADD,
        },
        {
          label: 'Meetings',
          aclKey: 'HCM_EMPLOYEE_LIFECYCLE_TRANSFER',
          route: ROUTES.BPM_PROGRAMS_MEETINGS_ADD,
        },
      ],
      pages: [
        {
          label: 'Events',
          route: ROUTES.BPM_PROGRAMS_EVENTS_LIST,
          aclKey: 'HCM_EMPLOYEE_LIFECYCLE_ONBOARDING',
          addRoute: ROUTES.BPM_PROGRAMS_EVENTS_ADD,
        },
        {
          label: 'Meetings',
          route: ROUTES.BPM_PROGRAMS_MEETINGS_LIST,
          aclKey: 'HCM_EMPLOYEE_LIFECYCLE_TRANSFER',
          addRoute: ROUTES.BPM_PROGRAMS_MEETINGS_ADD,
        },
      ],
    },
    OPERATIONS: {
      aclKey: 'HCM_RECRUITMENT',
      label: 'Operations',
      forms: [
        {
          label: 'New Minor Addition',
          aclKey: 'HCM_RECRUITMENT_STAFF_PLANNING',
          route: ROUTES.BPM_OPERATIONS_MINOR_ADDITION_ADD,
        },
        {
          label: 'New Loan Product Update',
          aclKey: 'HCM_RECRUITMENT_JOB_OPENING',
          route: ROUTES.BPM_OPERATIONS_LOAN_PRODUCT_UPDATES_ADD,
        },
        {
          label: 'New Saving Product Update',
          aclKey: 'HCM_RECRUITMENT_JOB_APPLICATION',
          route: ROUTES.BPM_OPERATIONS_SAVING_PRODUCT_UPDATES_ADD,
        },
        // {
        //   label: 'New Interview',
        //   aclKey: 'HCM_RECRUITMENT_INTERVIEW',
        //   route: ROUTES.HR_RECRUITMENT_INTERVIEW_ADD,
        // },
        {
          label: 'New Auto Open Account Update',
          aclKey: 'HCM_RECRUITMENT_JOB_OFFER',
          route: ROUTES.BPM_OPERATIONS_AUTO_OPEN_ACCOUNT_UPDATES_ADD,
        },
        {
          label: 'New Collateral Management',
          aclKey: 'HCM_RECRUITMENT_APPOINTMENT_LETTER',
          route: ROUTES.BPM_OPERATIONS_COLLATERAL_MANAGEMENT_ADD,
        },
        {
          label: 'New Nominee Balance Transfer',
          aclKey: 'HCM_RECRUITMENT_APPOINTMENT_LETTER',
          route: ROUTES.BPM_OPERATIONS_NOMINEE_BALANCE_TRANSFER_ADD,
        },
        {
          label: 'Member Deactivation',
          aclKey: 'HCM_RECRUITMENT_APPOINTMENT_LETTER',
          route: ROUTES.BPM_OPERATIONS_MEMBER_DEACTIVATION_ADD,
        },
      ],
      pages: [
        {
          label: 'Minor Addition',
          aclKey: 'HCM_RECRUITMENT_STAFF_PLANNING',
          route: ROUTES.BPM_OPERATIONS_MINOR_ADDITION_LIST,
          addRoute: ROUTES.BPM_OPERATIONS_MINOR_ADDITION_ADD,
        },
        {
          label: 'Loan Product Update',
          aclKey: 'HCM_RECRUITMENT_JOB_OPENING',
          route: ROUTES.BPM_OPERATIONS_LOAN_PRODUCT_UPDATES_LIST,
          addRoute: ROUTES.BPM_OPERATIONS_LOAN_PRODUCT_UPDATES_ADD,
        },
        {
          label: 'Saving Product Update',
          aclKey: 'HCM_RECRUITMENT_JOB_APPLICATION',
          route: ROUTES.BPM_OPERATIONS_SAVING_PRODUCT_UPDATES_LIST,
          addRoute: ROUTES.BPM_OPERATIONS_SAVING_PRODUCT_UPDATES_ADD,
        },
        // {
        //   label: 'Interview',
        //   aclKey: 'HCM_RECRUITMENT_INTERVIEW',
        //   route: ROUTES.HR_RECRUITMENT_INTERVIEW_ADD,
        // },
        {
          label: 'Auto Open Account Update',
          aclKey: 'HCM_RECRUITMENT_JOB_OFFER',
          route: ROUTES.BPM_OPERATIONS_AUTO_OPEN_ACCOUNT_UPDATES_LIST,
          addRoute: ROUTES.BPM_OPERATIONS_AUTO_OPEN_ACCOUNT_UPDATES_ADD,
        },
        {
          label: 'Collateral Management',
          aclKey: 'HCM_RECRUITMENT_APPOINTMENT_LETTER',
          route: ROUTES.BPM_OPERATIONS_COLLATERAL_MANAGEMENT_LIST,
          addRoute: ROUTES.BPM_OPERATIONS_COLLATERAL_MANAGEMENT_ADD,
        },
        {
          label: 'Nominee Balance Transfer',
          aclKey: 'HCM_RECRUITMENT_APPOINTMENT_LETTER',
          route: ROUTES.BPM_OPERATIONS_NOMINEE_BALANCE_TRANSFER_LIST,
          addRoute: ROUTES.BPM_OPERATIONS_NOMINEE_BALANCE_TRANSFER_ADD,
        },
        {
          label: 'Member Deactivation',
          aclKey: 'HCM_RECRUITMENT_APPOINTMENT_LETTER',
          route: ROUTES.BPM_OPERATIONS_MEMBER_DEACTIVATION_LIST,
          addRoute: ROUTES.BPM_OPERATIONS_MEMBER_DEACTIVATION_ADD,
        },
      ],
    },
    REQUESTS: {
      aclKey: 'HCM_PAYROLL',
      label: 'Requests',

      forms: [
        {
          label: 'Add loan request',
          aclKey: 'HCM_EMPLOYEE',
          route: ROUTES.BPM_REQUESTS_LOAN_REQUESTS_ADD,
        },
      ],

      pages: [
        {
          label: 'Membership Requests',
          aclKey: 'HCM_RECRUITMENT_STAFF_PLANNING',
          route: ROUTES.BPM_REQUESTS_MEMBERSHIP_REQUESTS,
        },
        {
          label: 'Minor Addition Requests',
          aclKey: 'HCM_RECRUITMENT_JOB_OPENING',
          route: ROUTES.BPM_REQUESTS_MINOR_ADDITION_REQUESTS,
        },
        {
          label: 'Loan Requests',
          aclKey: 'HCM_RECRUITMENT_JOB_APPLICATION',
          route: ROUTES.BPM_REQUESTS_LOAN_REQUESTS,
        },
        // {
        //   label: 'New Interview',
        //   aclKey: 'HCM_RECRUITMENT_INTERVIEW',
        //   route: ROUTES.HR_RECRUITMENT_INTERVIEW_ADD,
        // },
        {
          label: 'Saving Accounts Requests',
          aclKey: 'HCM_RECRUITMENT_JOB_OFFER',
          route: ROUTES.BPM_REQUESTS_SAVING_ACCOUNTS_REQUESTS,
        },
        {
          label: 'Alternative Channel Requests',
          aclKey: 'HCM_RECRUITMENT_APPOINTMENT_LETTER',
          route: ROUTES.BPM_REQUESTS_ALTERNATIVE_CHANNEL_REQUESTS,
        },
        {
          label: 'New Nominee Balance Transfer',
          aclKey: 'HCM_RECRUITMENT_APPOINTMENT_LETTER',
          route: ROUTES.BPM_REQUESTS_NOMINEE_BALANCE_TRANSFER_REQUESTS,
        },
        {
          label: 'Member Branch Trasfer',
          aclKey: 'HCM_RECRUITMENT_APPOINTMENT_LETTER',
          route: ROUTES.BPM_REQUESTS_MEMBER_BRANCH_TRANSFER_REQUESTS,
        },
      ],
    },

    REPORTS: {
      label: 'REPORTS',
      aclKey: 'CBS_MEMBERS_MEMBER',
      pages: [
        {
          label: 'Accounting Reports',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.ACCOUNTING_REPORTS,
        },
      ],
    },
  },
};
