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
    { label: t['yes'], value: 'yes' },
    { label: t['no'], value: 'no' },
  ];

  return (
    <BoxContainer>
      <TextBoxContainer>
        <TopText>{t['loanProductInterest']} </TopText>
      </TextBoxContainer>
      <InputGroupContainer>
        <FormInput
          name="minimumInterestRate"
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
          name="maximumInterestRate"
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
          name="defaultInterestRate"
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
          name="ceoAuthenticationRate"
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
          name="boardAuthenticationRate"
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
          name="postingFrequency"
          label={t['loanProductPostingFrequency']}
          placeholder={t['loanProductSelectPostingFrequency']}
        />
        <FormSelect
          name="interestMethod"
          label={t['loanProductInterestMethod']}
          placeholder={t['loanProductSelectInterestMethod']}
        />
      </InputGroupContainer>
      <Box
        display={'flex'}
        flexDirection="row"
        border="1px solid"
        borderColor={'border.layout'}
        justifyContent="space-between"
        p="s16"
        alignItems={'center'}
        borderRadius="4px"
      >
        <SubHeadingText>{t['loanProductOverrideInterest']} </SubHeadingText>
        <FormSwitchTab name={'overrideInterest'} options={yesNo} />
      </Box>
    </BoxContainer>
  );
};
