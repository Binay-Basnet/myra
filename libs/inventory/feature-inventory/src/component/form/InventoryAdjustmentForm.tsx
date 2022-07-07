import { FormProvider, useForm } from 'react-hook-form';

import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/shared/form';
import { Box } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

const InventoryAdjustmentForm = () => {
  const { t } = useTranslation();
  const methods = useForm({});
  return (
    <FormProvider {...methods}>
      <form>
        <Box p="s20" gap="s32" bg="neutralColorLight.Gray-0">
          <InputGroupContainer>
            <FormInput
              type="text"
              name="code"
              label={t['itemUnitCode']}
              placeholder={t['itemUnitCode']}
            />
            <FormInput type="date" name="date" label={t['itemUnitDate']} />
            <FormInput
              type="text"
              name="referenceNumber"
              label={t['itemUnitReferenceNumber']}
              placeholder={t['itemUnitReferenceNumber']}
            />
          </InputGroupContainer>
        </Box>
      </form>
    </FormProvider>
  );
};

export default InventoryAdjustmentForm;
