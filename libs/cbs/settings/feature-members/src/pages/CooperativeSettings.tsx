import React, { Fragment } from 'react';

import { FormCategory } from '@coop/shared/data-access';
import { Box } from '@coop/shared/ui';

import { KYMSettings } from '../components';
import { COOP_KYM_FIELDS } from '../constants/KYM_FIELDS';

export const CooperativeSettings = () => {
  return (
    <Box display="flex" flexDirection="column" gap="s16">
      {COOP_KYM_FIELDS.map((groupFields, index) => (
        <Fragment key={index}>
          <KYMSettings fields={groupFields} kymType={FormCategory.KymCoop} />
        </Fragment>
      ))}
    </Box>
  );
};
