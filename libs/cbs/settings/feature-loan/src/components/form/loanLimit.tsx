import React from 'react';

// import debounce from 'lodash/debounce';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSelect, FormSwitchTab } from '@coop/shared/form';
import { FormEditableTable } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';

import {
  BoxContainer,
  SubHeadingText,
  SubText,
  TextBoxContainer,
  TopText,
} from '../formui';

type AccountServiceTable = {
  loanProvision: string;
  provision: number;
};

const yesNo = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];
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
          label="Schedule Change Override"
          // textAlign={'right'}
          placeholder="Schedule Change Override"
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
