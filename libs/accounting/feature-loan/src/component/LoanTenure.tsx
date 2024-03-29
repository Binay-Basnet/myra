import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormSection, GridItem } from '@myra-ui';

import { FrequencyTenure } from '@coop/cbs/data-access';
import { FormDatePicker, FormNumberInput, FormSwitchTab } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

interface IRightElementProps {
  rightElement: FrequencyTenure;
  t: Record<string, string>;
}

const inputRightElementText = (props: IRightElementProps) => {
  const { rightElement, t } = props;
  if (rightElement === FrequencyTenure.Day) {
    return t['days'];
  }
  if (rightElement === FrequencyTenure.Week) {
    return t['weeks'];
  }
  if (rightElement === FrequencyTenure.Month) {
    return t['months'];
  }
  if (rightElement === FrequencyTenure.Year) {
    return t['years'];
  }

  return '';
};

export const LoanTenure = () => {
  const { t } = useTranslation();
  const methods = useFormContext();
  const { watch, resetField } = methods;
  const tenureUnit = watch('tenureUnit');

  const [rightElement, setRightElement] = useState('days');

  const tenureList = [
    { label: t['day'], value: FrequencyTenure.Day },
    { label: t['week'], value: FrequencyTenure.Week },
    { label: t['month'], value: FrequencyTenure.Month },
    { label: t['year'], value: FrequencyTenure.Year },
  ];

  useEffect(() => {
    resetField('tenure');
    setRightElement(tenureUnit);
  }, [tenureUnit]);

  return (
    <FormSection>
      <GridItem colSpan={3}>
        <FormSwitchTab name="tenureUnit" label="Unit" options={tenureList} />
      </GridItem>

      <FormNumberInput
        isRequired
        name="tenure"
        textAlign="right"
        label="Tenure"
        rightAddonText={inputRightElementText({
          rightElement: rightElement as FrequencyTenure,
          t,
        })}
        // isDisabled={router?.asPath?.includes('/edit')}
      />

      <FormDatePicker name="repaymentStartDate" label="Repayment Start Date" />

      <FormDatePicker name="maturityDate" label="Maturity Date" />
    </FormSection>
  );
};
