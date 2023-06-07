import React from 'react';
import { BiBookBookmark, BiUserPin } from 'react-icons/bi';
import { FiBriefcase, FiDollarSign, FiFileText, FiUserCheck } from 'react-icons/fi';

import { MainLayoutContainer, TabMenu, TopLevelHeader } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';

export interface HRModuleLayoutProps {
  children: React.ReactNode;
}

export const HRLayout = (props: HRModuleLayoutProps) => {
  const { children } = props;
  return (
    <MainLayoutContainer>
      <TopLevelHeader />
      <TabMenu
        module="HRMODULE"
        tabs={[
          {
            title: 'Employee',
            icon: BiUserPin,
            link: ROUTES.HRMODULE_EMPLOYEES_LIST,
            match: ['employee'],
            aclKey: 'HCM_EMPLOYEE',
            navMenu: 'EMPLOYEE',
          },
          {
            title: 'Employee Lifecycle',
            icon: FiUserCheck,
            link: ROUTES.HR_LIFECYCLE_EMPLOYEE_ONBOAORDING_LIST,
            match: ['lifecycle'],
            aclKey: 'HCM_EMPLOYEE_LIFECYCLE',
            navMenu: 'EMPLOYEE_LIFECYCLE',
          },
          {
            title: 'Recruitment',
            icon: FiBriefcase,
            link: ROUTES.HR_LIFECYCLE_EMPLOYEE_ONBOAORDING_LIST,
            // link: ROUTES.HR_RECRUITMENT_STAFF_PLANNING_LIST,
            match: ['recruitment'],
            aclKey: 'HCM_RECRUITMENT',
            navMenu: 'RECRUITMENT',
          },
          {
            title: 'Payroll',
            icon: FiDollarSign,
            link: ROUTES.HR_PAYROLL_ENTRY_LIST,
            match: ['payroll'],
            aclKey: 'HCM_PAYROLL',
            navMenu: 'PAYROLL',
          },
          {
            title: 'Training',
            icon: BiBookBookmark,
            link: ROUTES.HR_TRAINING_COURSES_LIST,
            match: ['training'],
            aclKey: 'HCM_TRAINING',
            navMenu: 'TRAINING',
          },

          // {
          //   title: 'Policy',
          //   icon: TbScale,

          //   link: '/hr/policy/list',
          //   match: ['policy'],
          //   aclKey: 'CBS_MEMBERS_MEMBER',
          //   navMenu: 'POLICY',
          // },

          {
            title: 'reports',
            icon: FiFileText,
            link: ROUTES.HR_REPORTS,
            match: ['reports'],
            aclKey: 'HCM_REPORT',
            navMenu: 'REPORTS',
          },
        ]}
        routeIndex={2}
      />
      {children}
    </MainLayoutContainer>
  );
};

export default HRLayout;
