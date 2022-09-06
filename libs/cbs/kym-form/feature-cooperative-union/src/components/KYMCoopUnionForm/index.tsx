import React from 'react';
import { Box } from '@chakra-ui/react';

import { AccountOperatorDetails } from '../FormSections/account-operators';
import { DirectorDetails } from '../FormSections/board-directors-details';
import { CentralRepresentativeDetails } from '../FormSections/central-representative-details';
import { Declaration } from '../FormSections/decleration';
import { EconomicDetails } from '../FormSections/economic-details';
import { InstituteInfo } from '../FormSections/institute-info';

type KYMSection = {
  section: string;
  subSection: string;
};

interface KYMCoopFormProps {
  setKymCurrentSection: (section: KYMSection) => void;
}

export const KYMCoopUnionForm = React.memo(
  ({ setKymCurrentSection }: KYMCoopFormProps) => {
    return (
      <Box zIndex={1} background="gray.0" ml="320" pb="120px">
        <InstituteInfo setSection={setKymCurrentSection} />
        <DirectorDetails setSection={setKymCurrentSection} />
        <AccountOperatorDetails setSection={setKymCurrentSection} />
        <CentralRepresentativeDetails setSection={setKymCurrentSection} />
        <EconomicDetails setSection={setKymCurrentSection} />
        <Declaration setSection={setKymCurrentSection} />
      </Box>
    );
  }
);
