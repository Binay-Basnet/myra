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

export const LoanLimit = ({ data }: any) => {
  const { t } = useTranslation();

  return (
    <BoxContainer>
      <TextBoxContainer>
        <TopText>{t['loanProductLoanProvisionTreatment']} </TopText>
        <SubText>{t['loanProductDifferentLoanProvisionTreatment']} </SubText>
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
            provision: data?.goodLoanProvision ? data?.goodLoanProvision : 0,
          },
          {
            loanProvision: 'doubtful',
            provision: data?.doubtfulLoanProvision
              ? data?.doubtfulLoanProvision
              : 0,
          },
          {
            loanProvision: 'problematic',
            provision: data?.problematicLoanProvision
              ? data?.problematicLoanProvision
              : 0,
          },
          {
            loanProvision: 'bad',
            provision: data?.badLoanProvision ? data?.badLoanProvision : 0,
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
