// import debounce from 'lodash/debounce';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer, TextBoxContainer, TopText } from '../formui';

export const LoanLimit = () => {
  const { t } = useTranslation();

  return (
    <BoxContainer>
      <TextBoxContainer>
        <TopText>{t['loanProductLoanProvisionTreatment']} </TopText>
      </TextBoxContainer>
      <InputGroupContainer>
        <FormInput
          name="scheduleChangeOverride"
          type="number"
          label={t['loanProductScheduleChangeOverride']}
          // textAlign={'right'}
          placeholder={t['loanProductScheduleChangeOverride']}
          //   rightElement={'%'}
        />
      </InputGroupContainer>
    </BoxContainer>
  );
};
