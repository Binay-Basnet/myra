import { FormSection } from '@myra-ui';

import { DividendTreatment } from '@coop/cbs/data-access';
import { FormRadioGroup } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const DividendTransferTreatmentSection = () => {
  const { t } = useTranslation();
  return (
    <FormSection
      header={t['shareDividentTransferTreatment']}
      subHeader={t['shareDividentTransferTreatmentSubtitle']}
    >
      <FormRadioGroup
        name="treatment"
        options={[
          {
            label: t['shareDividentTransferTreatmentShareAndAccount'],
            value: DividendTreatment.ShareAndAccount,
          },
          {
            label: t['shareDividentTransferTreatmentAccountTransfer'],
            value: DividendTreatment.AccountTransfer,
          },
          {
            label: t['shareDividentTransferTreatmentBookPayable'],
            value: DividendTreatment.BookPayable,
          },
        ]}
      />
    </FormSection>
  );
};
