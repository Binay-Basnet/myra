// import debounce from 'lodash/debounce';
import { FormEditableTable } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer, SubText, TextBoxContainer, TopText } from '../formui';

type AccountServiceTable = {
  loanProvision: string;
  provision: number;
};

const search_options = [
  { label: 'Good Loan', value: 'good' },
  { label: 'Doubtful Loan (after 1-30 Days)', value: 'doubtful' },
  {
    label: 'Problematic Loan (after 1 month - 12 months)',
    value: 'problematic',
  },
  { label: 'Bad Loan (1 year above)', value: 'bad' },
];

export const LoanLimit = () => {
  const { t } = useTranslation();

  return (
    <BoxContainer>
      <TextBoxContainer>
        <TopText>Loan Provision Treatment</TopText>
        <SubText> Different Loan Provision Treatment</SubText>
      </TextBoxContainer>
      {/* <InputGroupContainer>
        <FormInput
          name="scheduleChangeOverride"
          type="number"
          label={t['loanProductScheduleChangeOverride']}
          // textAlign={'right'}
          placeholder={t['loanProductScheduleChangeOverride']}
          //   rightElement={'%'}
        />
      </InputGroupContainer> */}

      <FormEditableTable<AccountServiceTable>
        name="loanProvisiontable"
        canDeleteRow={false}
        canAddRow={false}
        defaultData={[
          {
            loanProvision: 'good',
            provision: 0,
          },
          {
            loanProvision: 'doubtful',
            provision: 0,
          },
          {
            loanProvision: 'problematic',
            provision: 0,
          },
          {
            loanProvision: 'bad',
            provision: 0,
          },
        ]}
        debug={false}
        columns={[
          {
            accessor: 'loanProvision',
            header: 'Loan Provision',
            fieldType: 'search',
            cellWidth: 'auto',
            searchOptions: search_options,
          },
          {
            accessor: 'provision',
            header: 'Provision',
            fieldType: 'percentage',
            isNumeric: true,
            cellWidth: 'auto',
          },
        ]}
      />
    </BoxContainer>
  );
};
