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
          addRoute: ROUTES.HREMPLOYEE_ADD_FORM,
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
          label: 'Employee Onboarding',
          route: ROUTES.HR_LIFECYCLE_EMPLOYEE_ONBOAORDING,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
        {
          label: 'Employee Transfer',
          route: ROUTES.HR_LIFECYCLE_EMPLOYEE_TRANSFER,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
        {
          label: 'Employee Seperation',
          route: ROUTES.HR_LIFECYCLE_EMPLOYEE_SEPERATION,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
        {
          label: 'Employee Promotion',
          route: ROUTES.HR_LIFECYCLE_EMPLOYEE_PROMOTION,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
        {
          label: 'Employee Exit',
          route: ROUTES.HR_LIFECYCLE_EMPLOYEE_EXIT,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
      ],
    },
    PAYROLL: {
      aclKey: 'CBS_MEMBERS_MEMBER',
      label: 'Payroll',
      pages: [
        {
          label: 'Payroll Run',
          route: ROUTES.HR_PAYROLL_PAYROLL_RUN,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
        {
          label: 'Salary Structure Alignment',
          route: ROUTES.HR_PAYROLL_SALARY_STRUCTURE_,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
        {
          label: 'Salary Slip',
          route: ROUTES.HR_PAYROLL_SALARY_SLIP,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
        {
          label: 'Expen',
          route: ROUTES.HR_PAYROLL_EXPEN,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
      ],
    },
    TRAINING: {
      aclKey: 'CBS_MEMBERS_MEMBER',
      label: 'Training',
      pages: [
        {
          label: 'Courses',
          route: ROUTES.HR_TRAINING_COURSES,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
        {
          label: 'Students',
          route: ROUTES.HR_TRAINING_STUDENTS,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
      ],
    },
    RECRUITMENT: {
      aclKey: 'CBS_MEMBERS_MEMBER',
      label: 'Recruitment',
      pages: [
        {
          label: 'Staff Planing',
          route: ROUTES.HR_RECRUITMENT_STAFF_PLANNING,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
        {
          label: 'Job Posting',
          route: ROUTES.HR_RECRUITMENT_JOB_POSTING,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
        {
          label: 'Job Application',
          route: ROUTES.HR_RECRUITMENT_JOB_APPLICATION,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
        {
          label: 'Interview',
          route: ROUTES.HR_RECRUITMENT_INTERVIEW,
          aclKey: 'CBS_MEMBERS_MEMBER',
        },
        {
          label: 'Appointment Letter',
          route: ROUTES.HR_RECRUITMENT_APPOINTMENT_LETTER,
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
