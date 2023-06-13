import type { NavType } from '../NAV';
import { ROUTES } from '../ROUTES';

export const HRMODULE: NavType = {
  label: 'HR & Capacity Management',
  menus: {
    EMPLOYEE: {
      aclKey: 'CBS_MEMBERS_MEMBER',
      label: 'Employee',
      forms: [
        {
          label: 'New Employee',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.HRMODULE_EMPLOYEES_ADD,
        },
        {
          label: 'New Attendance',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.HRMODULE_ATTENDENCE_ADD,
        },
        {
          label: 'New Leave',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.HRMODULE_LEAVE_ADD,
        },
      ],

      pages: [
        {
          label: 'Employees',
          route: ROUTES.HRMODULE_EMPLOYEES_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
          addRoute: ROUTES.HRMODULE_EMPLOYEES_ADD,
        },
        {
          label: 'Attedance',
          route: ROUTES.HRMODULE_ATTENDENCE_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
          addRoute: ROUTES.HRMODULE_ATTENDENCE_ADD,
        },
        {
          label: 'Leave',
          route: ROUTES.HRMODULE_LEAVE_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
          addRoute: ROUTES.HRMODULE_LEAVE_ADD,
        },
      ],
      settingPages: [
        {
          label: 'Employee Settings',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.HRMODULE_EMPLOYEES_SETTINGS,
        },
        {
          label: 'Attendance Settings',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.HRMODULE_LEAVE_SETTINGS,
        },
        {
          label: 'Leave Settings',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.HRMODULE_ATTENDENCE_SETTINGS,
        },
      ],
    },
    EMPLOYEE_LIFECYCLE: {
      aclKey: 'CBS_MEMBERS_MEMBER',
      label: 'Employee-Lifecycle',
      forms: [
        {
          label: 'New Employee Onboarding',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.HR_LIFECYCLE_EMPLOYEE_ONBOAORDING_ADD,
        },
        {
          label: 'New Employee Transfer',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.HR_LIFECYCLE_EMPLOYEE_TRANSFER_ADD,
        },
        {
          label: 'New Employee Separation',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.HR_LIFECYCLE_EMPLOYEE_SEPERATION_ADD,
        },
        {
          label: 'New Employee Promotion',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.HR_LIFECYCLE_EMPLOYEE_PROMOTION_ADD,
        },
        {
          label: 'New Employee Exit',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.HR_LIFECYCLE_EMPLOYEE_EXIT_ADD,
        },
      ],
      pages: [
        {
          label: 'Employee Onboarding',
          route: ROUTES.HR_LIFECYCLE_EMPLOYEE_ONBOAORDING_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
          addRoute: ROUTES.HR_LIFECYCLE_EMPLOYEE_ONBOAORDING_ADD,
        },
        {
          label: 'Employee Transfer',
          route: ROUTES.HR_LIFECYCLE_EMPLOYEE_TRANSFER_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
          addRoute: ROUTES.HR_LIFECYCLE_EMPLOYEE_TRANSFER_ADD,
        },
        {
          label: 'Employee Seperation',
          route: ROUTES.HR_LIFECYCLE_EMPLOYEE_SEPERATION_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
          addRoute: ROUTES.HR_LIFECYCLE_EMPLOYEE_SEPERATION_ADD,
        },
        {
          label: 'Employee Promotion',
          route: ROUTES.HR_LIFECYCLE_EMPLOYEE_PROMOTION_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
          addRoute: ROUTES.HR_LIFECYCLE_EMPLOYEE_PROMOTION_ADD,
        },
        {
          label: 'Employee Exit',
          route: ROUTES.HR_LIFECYCLE_EMPLOYEE_EXIT_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
          addRoute: ROUTES.HR_LIFECYCLE_EMPLOYEE_EXIT_ADD,
        },
      ],
      settingPages: [
        {
          label: 'Employee Settings',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.HRMODULE_EMPLOYEES_SETTINGS,
        },
        {
          label: 'Attendance Settings',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.HRMODULE_LEAVE_SETTINGS,
        },
        {
          label: 'Leave Settings',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.HRMODULE_ATTENDENCE_SETTINGS,
        },
      ],
    },
    RECRUITMENT: {
      aclKey: 'CBS_MEMBERS_MEMBER',
      label: 'Recruitment',
      forms: [
        {
          label: 'New Staff Planning',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.HR_RECRUITMENT_STAFF_PLANNING_ADD,
        },
        {
          label: 'New Job Posting',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.HR_RECRUITMENT_JOB_OPENING_ADD,
        },
        {
          label: 'New Job Application',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.HR_RECRUITMENT_JOB_APPLICATION_ADD,
        },
        {
          label: 'New Interview',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.HR_RECRUITMENT_INTERVIEW_ADD,
        },
        {
          label: 'New Job Offer',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.HR_RECRUITMENT_JOB_OFFER_ADD,
        },
        {
          label: 'New Appointment Letter',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.HR_RECRUITMENT_APPOINTMENT_LETTER_ADD,
        },
      ],
      pages: [
        {
          label: 'Staff Planing',
          route: ROUTES.HR_RECRUITMENT_STAFF_PLANNING_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
          addRoute: ROUTES.HR_RECRUITMENT_STAFF_PLANNING_ADD,
        },
        {
          label: 'Job Opening',
          route: ROUTES.HR_RECRUITMENT_JOB_OPENING_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
          addRoute: ROUTES.HR_RECRUITMENT_JOB_OPENING_ADD,
        },
        {
          label: 'Job Application',
          route: ROUTES.HR_RECRUITMENT_JOB_APPLICATION_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
          addRoute: ROUTES.HR_RECRUITMENT_JOB_APPLICATION_ADD,
        },
        {
          label: 'Interview',
          route: ROUTES.HR_RECRUITMENT_INTERVIEW_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
          addRoute: ROUTES.HR_RECRUITMENT_INTERVIEW_ADD,
        },
        {
          label: 'Job Offer',
          route: ROUTES.HR_RECRUITMENT_JOB_OFFER_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
          addRoute: ROUTES.HR_RECRUITMENT_JOB_OFFER_ADD,
        },
        {
          label: 'Appointment Letter',
          route: ROUTES.HR_RECRUITMENT_APPOINTMENT_LETTER_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
          addRoute: ROUTES.HR_RECRUITMENT_APPOINTMENT_LETTER_ADD,
        },
      ],
      settingPages: [
        {
          label: 'Recruitment Settings',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.HR_RECRUITMENT_SETTINGS,
        },
        {
          label: 'Interview Rounds',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.HR_INTERVIEW_ROUNDS,
        },
        {
          label: 'Email Templates',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.HR_EMAIL_TEMPLATES,
        },
      ],
    },
    PAYROLL: {
      aclKey: 'CBS_MEMBERS_MEMBER',
      label: 'Payroll',
      forms: [
        {
          label: 'New Payroll Entry',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.HR_PAYROLL_ENTRY_ADD,
        },
        {
          label: 'New Salary Structure Assignment',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.HR_PAYROLL_SALARY_STRUCTURE_ADD,
        },
        {
          label: 'New Salary Slip',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.HR_PAYROLL_SALARY_SLIP_ADD,
        },
        {
          label: 'New Expen',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.HR_PAYROLL_EXPEN_ADD,
        },
      ],
      pages: [
        {
          label: 'Payroll Entry',
          route: ROUTES.HR_PAYROLL_ENTRY_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
          addRoute: ROUTES.HR_PAYROLL_ENTRY_ADD,
        },
        {
          label: 'Salary Structure Alignment',
          route: ROUTES.HR_PAYROLL_SALARY_STRUCTURE_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
          addRoute: ROUTES.HR_PAYROLL_SALARY_STRUCTURE_ADD,
        },
        {
          label: 'Salary Slip',
          route: ROUTES.HR_PAYROLL_SALARY_SLIP_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
          addRoute: ROUTES.HR_PAYROLL_SALARY_SLIP_ADD,
        },
        {
          label: 'Expen',
          route: ROUTES.HR_PAYROLL_EXPEN_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
          addRoute: ROUTES.HR_PAYROLL_EXPEN_ADD,
        },
      ],
      settingPages: [
        {
          label: 'Employee Settings',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.HRMODULE_EMPLOYEES_SETTINGS,
        },
        {
          label: 'Attendance Settings',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.HRMODULE_LEAVE_SETTINGS,
        },
        {
          label: 'Leave Settings',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.HRMODULE_ATTENDENCE_SETTINGS,
        },
      ],
    },
    TRAINING: {
      aclKey: 'CBS_MEMBERS_MEMBER',
      label: 'Training',
      forms: [
        {
          label: 'New Courses',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.HR_TRAINING_COURSES_ADD,
        },
        {
          label: 'New Students',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.HR_TRAINING_STUDENTS_ADD,
        },
      ],
      pages: [
        {
          label: 'Courses',
          route: ROUTES.HR_TRAINING_COURSES_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
          addRoute: ROUTES.HR_TRAINING_COURSES_ADD,
        },
        {
          label: 'Students',
          route: ROUTES.HR_TRAINING_STUDENTS_LIST,
          aclKey: 'CBS_MEMBERS_MEMBER',
          addRoute: ROUTES.HR_TRAINING_STUDENTS_ADD,
        },
      ],
      settingPages: [
        {
          label: 'Training Settings',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.HR_TRAINING_SETTINGS,
        },
        {
          label: 'Training Reports',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.HR_TRAINING_REPORTS,
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
