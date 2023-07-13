import type { NavType } from '../NAV';
import { ROUTES } from '../ROUTES';

export const HRMODULE: NavType = {
  label: 'HR & Capacity Management',
  menus: {
    EMPLOYEE: {
      aclKey: 'HCM_EMPLOYEE',
      label: 'Employee',
      forms: [
        {
          label: 'New Employee',
          aclKey: 'HCM_EMPLOYEE',
          route: ROUTES.HRMODULE_EMPLOYEES_ADD,
        },
        {
          label: 'New Attendance',
          aclKey: 'HCM_EMPLOYEE_ATTENDANCE',
          route: ROUTES.HRMODULE_ATTENDENCE_ADD,
        },
        {
          label: 'New Leave',
          aclKey: 'HCM_EMPLOYEE_LEAVE',
          route: ROUTES.HRMODULE_LEAVE_ADD,
        },
      ],

      pages: [
        {
          label: 'Employees',
          route: ROUTES.HRMODULE_EMPLOYEES_LIST,
          aclKey: 'HCM_EMPLOYEE',
          addRoute: ROUTES.HRMODULE_EMPLOYEES_ADD,
        },
        {
          label: 'Attedance',
          route: ROUTES.HRMODULE_ATTENDENCE_LIST,
          aclKey: 'HCM_EMPLOYEE_ATTENDANCE',
          addRoute: ROUTES.HRMODULE_ATTENDENCE_ADD,
        },
        {
          label: 'Leave',
          route: ROUTES.HRMODULE_LEAVE_LIST,
          aclKey: 'HCM_EMPLOYEE_LEAVE',
          addRoute: ROUTES.HRMODULE_LEAVE_ADD,
        },
      ],
      settingPages: [
        {
          label: 'Employee Settings',
          aclKey: 'SETTINGS_HCM_EMPLOYEE',
          route: ROUTES.HRMODULE_EMPLOYEES_SETTINGS,
        },
        {
          label: 'Attendance Settings',
          aclKey: 'HCM_EMPLOYEE_ATTENDANCE',
          route: ROUTES.HRMODULE_EMPLOYEES_LEAVE_SETTINGS,
        },
        {
          label: 'Leave Settings',
          aclKey: 'HCM_EMPLOYEE_LEAVE',
          route: ROUTES.HRMODULE_EMPLOYEES_LEAVE_SETTINGS,
        },
      ],
    },
    EMPLOYEE_LIFECYCLE: {
      aclKey: 'HCM_EMPLOYEE_LIFECYCLE',
      label: 'Employee-Lifecycle',
      forms: [
        {
          label: 'New Employee Onboarding',
          aclKey: 'HCM_EMPLOYEE_LIFECYCLE_ONBOARDING',
          route: ROUTES.HR_LIFECYCLE_EMPLOYEE_ONBOAORDING_ADD,
        },
        {
          label: 'New Employee Transfer',
          aclKey: 'HCM_EMPLOYEE_LIFECYCLE_TRANSFER',
          route: ROUTES.HR_LIFECYCLE_EMPLOYEE_TRANSFER_ADD,
        },
        {
          label: 'New Employee Separation',
          aclKey: 'HCM_EMPLOYEE_LIFECYCLE_SEPERATION',
          route: ROUTES.HR_LIFECYCLE_EMPLOYEE_SEPERATION_ADD,
        },
        {
          label: 'New Employee Promotion',
          aclKey: 'HCM_EMPLOYEE_LIFECYCLE_PROMOTION',
          route: ROUTES.HR_LIFECYCLE_EMPLOYEE_PROMOTION_ADD,
        },
        {
          label: 'New Employee Exit',
          aclKey: 'HCM_EMPLOYEE_LIFECYCLE_EXIT',
          route: ROUTES.HR_LIFECYCLE_EMPLOYEE_EXIT_ADD,
        },
      ],
      pages: [
        {
          label: 'Employee Onboarding',
          route: ROUTES.HR_LIFECYCLE_EMPLOYEE_ONBOAORDING_LIST,
          aclKey: 'HCM_EMPLOYEE_LIFECYCLE_ONBOARDING',
          addRoute: ROUTES.HR_LIFECYCLE_EMPLOYEE_ONBOAORDING_ADD,
        },
        {
          label: 'Employee Transfer',
          route: ROUTES.HR_LIFECYCLE_EMPLOYEE_TRANSFER_LIST,
          aclKey: 'HCM_EMPLOYEE_LIFECYCLE_TRANSFER',
          addRoute: ROUTES.HR_LIFECYCLE_EMPLOYEE_TRANSFER_ADD,
        },
        {
          label: 'Employee Seperation',
          route: ROUTES.HR_LIFECYCLE_EMPLOYEE_SEPERATION_LIST,
          aclKey: 'HCM_EMPLOYEE_LIFECYCLE_SEPERATION',
          addRoute: ROUTES.HR_LIFECYCLE_EMPLOYEE_SEPERATION_ADD,
        },
        {
          label: 'Employee Promotion',
          route: ROUTES.HR_LIFECYCLE_EMPLOYEE_PROMOTION_LIST,
          aclKey: 'HCM_EMPLOYEE_LIFECYCLE_PROMOTION',
          addRoute: ROUTES.HR_LIFECYCLE_EMPLOYEE_PROMOTION_ADD,
        },
        {
          label: 'Employee Exit',
          route: ROUTES.HR_LIFECYCLE_EMPLOYEE_EXIT_LIST,
          aclKey: 'HCM_EMPLOYEE_LIFECYCLE_EXIT',
          addRoute: ROUTES.HR_LIFECYCLE_EMPLOYEE_EXIT_ADD,
        },
      ],
      settingPages: [
        {
          label: 'Employee Settings',
          aclKey: 'SETTINGS_HCM_EMPLOYEE',
          route: ROUTES.HRMODULE_EMPLOYEES_SETTINGS,
        },
        {
          label: 'Attendance Settings',
          aclKey: 'HCM_EMPLOYEE_ATTENDANCE',
          route: ROUTES.HRMODULE_EMPLOYEES_LEAVE_SETTINGS,
        },
        {
          label: 'Leave Settings',
          aclKey: 'HCM_EMPLOYEE_LEAVE',
          route: ROUTES.HRMODULE_EMPLOYEES_LEAVE_SETTINGS,
        },
      ],
    },
    RECRUITMENT: {
      aclKey: 'HCM_RECRUITMENT',
      label: 'Recruitment',
      forms: [
        {
          label: 'New Staff Planning',
          aclKey: 'HCM_RECRUITMENT_STAFF_PLANNING',
          route: ROUTES.HR_RECRUITMENT_STAFF_PLANNING_ADD,
        },
        {
          label: 'New Job Posting',
          aclKey: 'HCM_RECRUITMENT_JOB_OPENING',
          route: ROUTES.HR_RECRUITMENT_JOB_OPENING_ADD,
        },
        {
          label: 'New Job Application',
          aclKey: 'HCM_RECRUITMENT_JOB_APPLICATION',
          route: ROUTES.HR_RECRUITMENT_JOB_APPLICATION_ADD,
        },
        // {
        //   label: 'New Interview',
        //   aclKey: 'HCM_RECRUITMENT_INTERVIEW',
        //   route: ROUTES.HR_RECRUITMENT_INTERVIEW_ADD,
        // },
        {
          label: 'New Job Offer',
          aclKey: 'HCM_RECRUITMENT_JOB_OFFER',
          route: ROUTES.HR_RECRUITMENT_JOB_OFFER_ADD,
        },
        {
          label: 'New Appointment Letter',
          aclKey: 'HCM_RECRUITMENT_APPOINTMENT_LETTER',
          route: ROUTES.HR_RECRUITMENT_APPOINTMENT_LETTER_ADD,
        },
      ],
      pages: [
        {
          label: 'Staff Planning',
          route: ROUTES.HR_RECRUITMENT_STAFF_PLANNING_LIST,
          aclKey: 'HCM_RECRUITMENT_STAFF_PLANNING',
          addRoute: ROUTES.HR_RECRUITMENT_STAFF_PLANNING_ADD,
        },
        {
          label: 'Job Opening',
          route: ROUTES.HR_RECRUITMENT_JOB_OPENING_LIST,
          aclKey: 'HCM_RECRUITMENT_JOB_OPENING',
          addRoute: ROUTES.HR_RECRUITMENT_JOB_OPENING_ADD,
        },
        {
          label: 'Job Application',
          route: ROUTES.HR_RECRUITMENT_JOB_APPLICATION_LIST,
          aclKey: 'HCM_RECRUITMENT_JOB_APPLICATION',
          addRoute: ROUTES.HR_RECRUITMENT_JOB_APPLICATION_ADD,
        },
        // {
        //   label: 'Interview',
        //   route: ROUTES.HR_RECRUITMENT_INTERVIEW_LIST,
        //   aclKey: 'HCM_RECRUITMENT_INTERVIEW',
        //   addRoute: ROUTES.HR_RECRUITMENT_INTERVIEW_ADD,
        // },
        {
          label: 'Job Offer',
          route: ROUTES.HR_RECRUITMENT_JOB_OFFER_LIST,
          aclKey: 'HCM_RECRUITMENT_JOB_OFFER',
          addRoute: ROUTES.HR_RECRUITMENT_JOB_OFFER_ADD,
        },
        {
          label: 'Appointment Letter',
          route: ROUTES.HR_RECRUITMENT_APPOINTMENT_LETTER_LIST,
          aclKey: 'HCM_RECRUITMENT_APPOINTMENT_LETTER',
          addRoute: ROUTES.HR_RECRUITMENT_APPOINTMENT_LETTER_ADD,
        },
      ],
      settingPages: [
        {
          label: 'Recruitment Settings',
          aclKey: 'HCM_RECRUITMENT',
          route: ROUTES.HR_RECRUITMENT_SETTINGS,
        },
        {
          label: 'Interview Rounds',
          aclKey: 'HCM_RECRUITMENT_INTERVIEW',
          route: ROUTES.HR_INTERVIEW_ROUNDS,
        },
        {
          label: 'Email Templates',
          aclKey: 'HCM_RECRUITMENT',
          route: ROUTES.HR_EMAIL_TEMPLATES,
        },
      ],
    },
    PAYROLL: {
      aclKey: 'HCM_PAYROLL',
      label: 'Payroll',
      forms: [
        {
          label: 'New Payroll Entry',
          aclKey: 'HCM_PAYROLL_ENTRY',
          route: ROUTES.HR_PAYROLL_ENTRY_ADD,
        },
        {
          label: 'New Salary Structure Assignment',
          aclKey: 'HCM_PAYROLL_SALARY_STRUCTURE_ASSIGNMENT',
          route: ROUTES.HR_PAYROLL_SALARY_STRUCTURE_ADD,
        },
        {
          label: 'New Salary Slip',
          aclKey: 'HCM_PAYROLL_SALARY_SLIP',
          route: ROUTES.HR_PAYROLL_SALARY_SLIP_ADD,
        },
        {
          label: 'New Expen',
          aclKey: 'HCM_PAYROLL_EXPENSE',
          route: ROUTES.HR_PAYROLL_EXPEN_ADD,
        },
      ],
      pages: [
        {
          label: 'Payroll Entry',
          route: ROUTES.HR_PAYROLL_ENTRY_LIST,
          aclKey: 'HCM_PAYROLL_ENTRY',
          addRoute: ROUTES.HR_PAYROLL_ENTRY_ADD,
        },
        {
          label: 'Salary Structure Alignment',
          route: ROUTES.HR_PAYROLL_SALARY_STRUCTURE_LIST,
          aclKey: 'HCM_PAYROLL_SALARY_STRUCTURE_ASSIGNMENT',
          addRoute: ROUTES.HR_PAYROLL_SALARY_STRUCTURE_ADD,
        },
        {
          label: 'Salary Slip',
          route: ROUTES.HR_PAYROLL_SALARY_SLIP_LIST,
          aclKey: 'HCM_PAYROLL_SALARY_SLIP',
          addRoute: ROUTES.HR_PAYROLL_SALARY_SLIP_ADD,
        },
        {
          label: 'Expen',
          route: ROUTES.HR_PAYROLL_EXPEN_LIST,
          aclKey: 'HCM_PAYROLL_EXPENSE',
          addRoute: ROUTES.HR_PAYROLL_EXPEN_ADD,
        },
      ],
      settingPages: [
        {
          label: 'Employee Settings',
          aclKey: 'SETTINGS_HCM_EMPLOYEE',
          route: ROUTES.HRMODULE_EMPLOYEES_SETTINGS,
        },
        {
          label: 'Attendance Settings',
          aclKey: 'HCM_EMPLOYEE_ATTENDANCE',
          route: ROUTES.HRMODULE_LEAVE_SETTINGS,
        },
        {
          label: 'Leave Settings',
          aclKey: 'HCM_EMPLOYEE_LEAVE',
          route: ROUTES.HRMODULE_ATTENDENCE_SETTINGS,
        },
      ],
    },
    TRAINING: {
      aclKey: 'HCM_TRAINING',
      label: 'Training',
      forms: [
        {
          label: 'New Courses',
          aclKey: 'HCM_TRAINING_COURSES',
          route: ROUTES.HR_TRAINING_COURSES_ADD,
        },
        {
          label: 'New Students',
          aclKey: 'HCM_TRAINING_STUDENTS',
          route: ROUTES.HR_TRAINING_STUDENTS_ADD,
        },
      ],
      pages: [
        {
          label: 'Courses',
          route: ROUTES.HR_TRAINING_COURSES_LIST,
          aclKey: 'HCM_TRAINING_COURSES',
          addRoute: ROUTES.HR_TRAINING_COURSES_ADD,
        },
        {
          label: 'Students',
          route: ROUTES.HR_TRAINING_STUDENTS_LIST,
          aclKey: 'HCM_TRAINING_STUDENTS',
          addRoute: ROUTES.HR_TRAINING_STUDENTS_ADD,
        },
      ],
      settingPages: [
        {
          label: 'Training Settings',
          aclKey: 'HCM_TRAINING',
          route: ROUTES.HR_TRAINING_SETTINGS,
        },
        {
          label: 'Training Reports',
          aclKey: 'HCM_TRAINING',
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
