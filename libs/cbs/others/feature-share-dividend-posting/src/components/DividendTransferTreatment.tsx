import { DividendTransferTreatment } from '@coop/cbs/data-access';
import { FormRadioGroup } from '@coop/shared/form';
import { FormSection } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const DividendTransferTreatmentSection = () => {
  const { t } = useTranslation();
  return (
    <FormSection
      header={t['shareDividentTransferTreatment']}
      subHeader={t['shareDividentTransferTreatmentSubtitle']}
    >
      <FormRadioGroup
        name="dividendTransferTreatment"
        options={[
          {
            label: t['shareDividentTransferTreatmentShareAndAccount'],
            value: DividendTransferTreatment?.ShareAndAccount,
          },
          {
            label: t['shareDividentTransferTreatmentAccountTransfer'],
            value: DividendTransferTreatment?.AccountTransfer,
          },
          {
            label: t['shareDividentTransferTreatmentBookPayable'],
            value: DividendTransferTreatment?.BookPayable,
          },
        ]}
      />
    </FormSection>
  );
};
