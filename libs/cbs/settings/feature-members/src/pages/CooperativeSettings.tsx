import { Fragment } from 'react';

import { FormCategory } from '@coop/cbs/data-access';
import { Box } from '@myra-ui';

import { KYMSettings } from '../components';
import { COOP_KYM_FIELDS } from '../constants/KYM_FIELDS';

export const CooperativeSettings = () => (
  <Box display="flex" flexDirection="column" gap="s16">
    {COOP_KYM_FIELDS.map((groupFields) => (
      <Fragment key={groupFields?.label}>
        <KYMSettings fields={groupFields} kymType={FormCategory.KymCoop} />
      </Fragment>
    ))}
  </Box>
);
