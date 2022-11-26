import { Fragment } from 'react';

import { FormCategory } from '@coop/cbs/data-access';
import { Box } from '@myra-ui';

import { KYMSettings } from '../components';
import { INSTITUTION_KYM_FIELDS } from '../constants/KYM_FIELDS';

export const InstitutionSettings = () => (
  <Box display="flex" flexDirection="column" gap="s16">
    {INSTITUTION_KYM_FIELDS.map((groupFields) => (
      <Fragment key={groupFields?.label}>
        <KYMSettings fields={groupFields} kymType={FormCategory.KymInstitution} />
      </Fragment>
    ))}
  </Box>
);
