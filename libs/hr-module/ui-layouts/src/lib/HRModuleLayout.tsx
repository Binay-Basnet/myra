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
            link: '/hr/employee/list',
            match: ['employee'],
            aclKey: 'CBS_MEMBERS_MEMBER',
            navMenu: 'EMPLOYEE',
          },
          {
            title: 'Employee Lifecycle',
            icon: FiUserCheck,
            link: '/hr/lifecycle/list',
            match: ['lifecycle'],
            aclKey: 'CBS_MEMBERS_MEMBER',
            navMenu: 'EMPLOYEE_LIFECYCLE',
          },
          {
            title: 'Payroll',
            icon: FiDollarSign,
            link: '/hr/payroll/list',
            match: ['payroll'],
            aclKey: 'CBS_MEMBERS_MEMBER',
            navMenu: 'PAYROLL',
          },
          {
            title: 'Training',
            icon: FiBookOpen,
            link: '/hr/training/list',
            match: ['training'],
            aclKey: 'CBS_MEMBERS_MEMBER',
            navMenu: 'TRAINING',
          },
          {
            title: 'Recruitment',
            icon: FiBriefcase,

            link: '/hr/recruitment/list',
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
