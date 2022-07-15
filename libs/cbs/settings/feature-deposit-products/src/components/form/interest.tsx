// import debounce from 'lodash/debounce';
import { useFormContext } from 'react-hook-form';

import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import {
  FormEditableTable,
  FormInput,
  FormSelect,
  FormSwitchTab,
} from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer, TextBoxContainer, TopText } from '../formui';

const ladderSwitch = [
  {
    label: 'Yes',
    value: 'yes',
  },
  {
    label: 'No',
    value: 'no',
  },
];

const postingFreq = [
  {
    label: 'Max 1',
    value: 'max1',
  },
  {
    label: 'Max 2',
    value: 'max2',
  },
];

type SalesTable = {
  type: string;
  ladderAmount: number;
  ladderRate: number;
};

const type = [
  { label: 'Lenovo Laptop', value: 'mi001' },
  { label: 'Alienware Laptop', value: 'mi002' },
];

export const Interest = () => {
  const { watch } = useFormContext();
  const { t } = useTranslation();
  const depositNature = watch('nameOfDepositProduct');

  const ladderOptions = watch('ladderOptions');

  return (
    <>
      <BoxContainer>
        <TextBoxContainer>
          <TopText>Interest</TopText>
        </TextBoxContainer>
        <InputGroupContainer>
          <FormInput
            name="minimumInterestRate"
            type="number"
            label="Mininum Rate"
            textAlign={'right'}
            placeholder="0.00"
            rightElement={
              <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                %
              </Text>
            }
          />
          <FormInput
            name="maximumInterestRate"
            type="number"
            label="Maximum Rate"
            textAlign={'right'}
            placeholder="0.00"
            rightElement={
              <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                %
              </Text>
            }
          />
          <FormInput
            name="defaultInterestRate"
            type="number"
            label="Default Rate"
            textAlign={'right'}
            placeholder="0.00"
            rightElement={
              <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                %
              </Text>
            }
          />
          {depositNature !== 'recurringSaving' && (
            <FormInput
              type="number"
              name="qdditionalToBaseRate"
              label="Additional to Base Rate"
              textAlign={'right'}
              placeholder="0.00"
              rightElement={
                <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                  %
                </Text>
              }
            />
          )}

          <FormInput
            name="ceoAuthenticationRate"
            type="number"
            label="CEO Authority"
            textAlign={'right'}
            placeholder="0.00"
            rightElement={
              <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                %
              </Text>
            }
          />
          <FormInput
            name="boardAuthenticationRate"
            type="number"
            label="Board Authority"
            textAlign={'right'}
            placeholder="0.00"
            rightElement={
              <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                %
              </Text>
            }
          />
          {depositNature !== 'recurringSaving' && (
            <FormSelect
              name="minimumInterestRate"
              label="Posting Frequency"
              placeholder="Select Posting Frequency"
              options={postingFreq}
            />
          )}
        </InputGroupContainer>
      </BoxContainer>
      <Box display={'flex'} flexDirection="column" gap="s20">
        <Box
          alignItems="center"
          display={'flex'}
          justifyContent="space-between"
        >
          <Text
            color="neutralColorLight.Gray-70"
            fontSize={'s3'}
            fontWeight="Medium"
          >
            Ladder Rate
          </Text>
          <FormSwitchTab name={'ladderOptions'} options={ladderSwitch} />
        </Box>
        {ladderOptions === 'yes' && (
          <FormEditableTable<SalesTable>
            name="data"
            debug={false}
            columns={[
              {
                accessor: 'type',
                header: t['depositProductInterestType'],
                fieldType: 'select',
                selectOptions: type,
              },
              {
                accessor: 'ladderAmount',
                header: t['depositProductInterestLadderAmount'],
                isNumeric: true,
              },
              {
                accessor: 'ladderRate',
                header: t['depositProductInterestLadderRate'],
                fieldType: 'percentage',
                isNumeric: true,
              },
            ]}
          />
        )}
      </Box>
    </>
  );
};
