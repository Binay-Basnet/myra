import React, { Fragment } from 'react';

import { FormCategory } from '@coop/cbs/data-access';
import { Box } from '@coop/shared/ui';

import { KYMSettings } from '../components';
import { COOP_UNION_FIELDS } from '../constants/KYM_FIELDS';

export const CoopUnionSettings = () => {
  return (
    <Box display="flex" flexDirection="column" gap="s16">
      {COOP_UNION_FIELDS.map((groupFields, index) => (
        <Fragment key={index}>
          <KYMSettings
            fields={groupFields}
            kymType={FormCategory.KymCoopUnion}
          />
        </Fragment>
      ))}
    </Box>
  );
};
