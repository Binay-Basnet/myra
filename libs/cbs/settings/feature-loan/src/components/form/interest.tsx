// import debounce from 'lodash/debounce';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSelect, FormSwitchTab } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import {
  BoxContainer,
  SubHeadingText,
  TextBoxContainer,
  TopText,
} from '../formui';

export const Interest = () => {
  const { t } = useTranslation();

  const yesNo = [
    { label: t['yes'], value: true },
    { label: t['no'], value: false },
  ];

  return (
    <BoxContainer>
      <TextBoxContainer>
        <TopText>{t['loanProductInterest']} </TopText>
      </TextBoxContainer>
      <InputGroupContainer>
        <FormInput
          name="interest.minRate"
          type="number"
          label={t['loanProductMinimumRate']}
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
          label={t['loanProductMaximumRate']}
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
          label={t['loanProductDefaultRate']}
          textAlign={'right'}
          placeholder="0.00"
          rightElement={
            <Text fontWeight="Medium" fontSize="r1" color="primary.500">
              %
            </Text>
          }
        />
        <FormInput
          name="interest.ceoAuthority"
          type="number"
          label={t['loanProductCEOAuthority']}
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
          label={t['loanProductBoardAuthority']}
          textAlign={'right'}
          placeholder="0.00"
          rightElement={
            <Text fontWeight="Medium" fontSize="r1" color="primary.500">
              %
            </Text>
          }
        />

        <FormSelect
          name="interestMethod"
          label={t['loanProductInterestMethod']}
          placeholder={t['loanProductSelectInterestMethod']}
          options={[
            {
              label: 'Stated Rate Method',
              value: 'statedRateMethod',
            },
            {
              label: 'Bank Method',
              value: 'bankMethod',
            },
          ]}
        />
      </InputGroupContainer>
      <Box
        display={'flex'}
        flexDirection="row"
        justifyContent="space-between"
        alignItems={'center'}
        mt="s16"
      >
        <SubHeadingText>{t['loanProductOverrideInterest']} </SubHeadingText>
        <FormSwitchTab name="overrideInterest" options={yesNo} />
      </Box>
    </BoxContainer>
  );
};
