import React from 'react';

import { AccountOperatorDetails } from '../FormSections/account-operators';
import { DirectorDetails } from '../FormSections/board-directors-details';
import { CentralRepresentativeDetails } from '../FormSections/central-representative-details';
import { Declaration } from '../FormSections/decleration';
import { EconomicDetails } from '../FormSections/economic-details';
import { InstituteInfo } from '../FormSections/institute-info';

export const KYMCoopUnionForm = React.memo(() => (
  <>
    <InstituteInfo />
    <DirectorDetails />
    <AccountOperatorDetails />
    <CentralRepresentativeDetails />
    <EconomicDetails />
    <Declaration />
  </>
));
