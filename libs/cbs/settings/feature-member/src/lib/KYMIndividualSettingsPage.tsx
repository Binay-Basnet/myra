import React, { Fragment } from 'react';

import { KymMemberTypesEnum } from '@coop/shared/data-access';
import { Box } from '@coop/shared/ui';

import { KYMSettings } from '../components/KYMSettings';
import { KYM_FIELDS } from '../constants/KYM_FIELDS';

export const KYMIndividualSettingsPage = () => {
  return (
    <Box display="flex" flexDirection="column" gap="s16">
      {KYM_FIELDS.map((sectionFields, index) => (
        <Fragment key={index}>
          <KYMSettings
            fields={sectionFields}
            kymType={KymMemberTypesEnum.Individual}
          />
        </Fragment>
      ))}
    </Box>
  );
};
