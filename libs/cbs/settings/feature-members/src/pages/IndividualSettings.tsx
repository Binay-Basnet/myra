import { Fragment } from 'react';

import { FormCategory } from '@coop/cbs/data-access';
import { Box } from '@coop/shared/ui';

import { KYMSettings } from '../components';
import { KYM_FIELDS } from '../constants/KYM_FIELDS';

export const IndividualSettings = () => (
  <Box display="flex" flexDirection="column" gap="s16">
    {KYM_FIELDS.map((groupFields) => (
      <Fragment key={groupFields?.label}>
        <KYMSettings fields={groupFields} kymType={FormCategory.KymIndividual} />
      </Fragment>
    ))}
  </Box>
);
