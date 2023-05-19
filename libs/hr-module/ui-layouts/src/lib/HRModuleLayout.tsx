import React from 'react';
import { BiUserPin } from 'react-icons/bi';
import { FiBookOpen, FiBriefcase, FiDollarSign, FiFileText, FiUserCheck } from 'react-icons/fi';
import { TbScale } from 'react-icons/tb';

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
            aclKey: 'CBS_MEMBERS_MEMBER',
            navMenu: 'EMPLOYEE',
          },
          {
            title: 'Employee Lifecycle',
            icon: FiUserCheck,
            link: ROUTES.HR_LIFECYCLE_EMPLOYEE_ONBOAORDING,
            match: ['lifecycle'],
            aclKey: 'CBS_MEMBERS_MEMBER',
            navMenu: 'EMPLOYEE_LIFECYCLE',
          },
          {
            title: 'Payroll',
            icon: FiDollarSign,
            link: ROUTES.HR_LIFECYCLE_EMPLOYEE_ONBOAORDING,
            match: ['payroll'],
            aclKey: 'CBS_MEMBERS_MEMBER',
            navMenu: 'PAYROLL',
          },
          {
            title: 'Training',
            icon: FiBookOpen,
            link: ROUTES.HR_TRAINING_COURSES,
            match: ['training'],
            aclKey: 'CBS_MEMBERS_MEMBER',
            navMenu: 'TRAINING',
          },
          {
            title: 'Recruitment',
            icon: FiBriefcase,

            link: ROUTES.HR_RECRUITMENT_STAFF_PLANNING,
            match: ['recruitment'],
            aclKey: 'CBS_MEMBERS_MEMBER',
            navMenu: 'RECRUITMENT',
          },
          {
            title: 'Policy',
            icon: TbScale,

            link: '/hr/policy/list',
            match: ['policy'],
            aclKey: 'CBS_MEMBERS_MEMBER',
            navMenu: 'POLICY',
          },

          {
            title: 'reports',
            icon: FiFileText,
            link: ROUTES.ACCOUNTING_REPORTS,
            match: ['reports'],
            aclKey: 'ACCOUNTING_INVESTMENT',
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
