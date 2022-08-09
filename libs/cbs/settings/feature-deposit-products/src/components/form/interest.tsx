// import debounce from 'lodash/debounce';
import { useFormContext } from 'react-hook-form';

import { NatureOfDepositProduct } from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormEditableTable, FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer, TextBoxContainer, TopText } from '../formui';

const ladderSwitch = [
  {
    label: 'Yes',
    value: true,
  },
  {
    label: 'No',
    value: false,
  },
];

type SalesTable = {
  type: string;
  amount: number;
  rate: number;
};

const type = [
  { label: 'Lenovo Laptop', value: 'mi001' },
  { label: 'Alienware Laptop', value: 'mi002' },
];

export const Interest = () => {
  const { watch } = useFormContext();
  const { t } = useTranslation();
  const depositNature = watch('nature');

  const ladderRate = watch('ladderRate');

  return (
    <>
      <BoxContainer>
        <TextBoxContainer>
          <TopText>{t['depositProductInterest']} </TopText>
        </TextBoxContainer>
        <InputGroupContainer>
          <FormInput
            name="interest.minRate"
            type="number"
            label={t['depositProductMinimumAmount']}
            textAlign={'right'}
            placeholder="0.00"
            rightElement={
              <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                %
              </Text>
            }
          />
          <FormInput
            name="interest.maxRate"
            type="number"
            label={t['depositProductMaximumAmount']}
            textAlign={'right'}
            placeholder="0.00"
            rightElement={
              <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                %
              </Text>
            }
          />
          <FormInput
            name="interest.defaultRate"
            type="number"
            label={t['depositProductDefaultRate']}
            textAlign={'right'}
            placeholder="0.00"
            rightElement={
              <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                %
              </Text>
            }
          />
          {depositNature !== NatureOfDepositProduct.RecurringSaving && (
            <FormInput
              type="number"
              name="interest.additionalRate"
              label={t['depositProductAdditionalBaseRate']}
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
            name="interest.ceoAuthority"
            type="number"
            label={t['depositProductCEOAuthority']}
            textAlign={'right'}
            placeholder="0.00"
            rightElement={
              <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                %
              </Text>
            }
          />
          <FormInput
            name="interest.boardAuthority"
            type="number"
            label={t['depositProductBoardAuthority']}
            textAlign={'right'}
            placeholder="0.00"
            rightElement={
              <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                %
              </Text>
            }
          />
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
            {t['depositProductLadderRate']}
          </Text>
          <FormSwitchTab name="ladderRate" options={ladderSwitch} />
        </Box>
        {ladderRate && (
          <FormEditableTable<SalesTable>
            name="ladderRateData"
            debug={false}
            columns={[
              {
                accessor: 'type',
                header: t['depositProductInterestType'],
                fieldType: 'select',
                selectOptions: type,
              },
              {
                accessor: 'amount',
                header: t['depositProductInterestLadderAmount'],
                isNumeric: true,
              },
              {
                accessor: 'rate',
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
