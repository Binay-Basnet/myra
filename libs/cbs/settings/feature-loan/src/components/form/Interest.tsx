import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { Box, FormSection, GridItem, Text } from '@myra-ui';

import { LoanProductInput } from '@coop/cbs/data-access';
import { SubText } from '@coop/shared/components';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { SubHeadingText } from '../formui';

export const Interest = () => {
  const router = useRouter();

  const { t } = useTranslation();
  const { watch } = useFormContext<LoanProductInput>();
  const minValueStr = watch('interest.minRate') ?? 0;
  const minValue = Number(minValueStr);

  const maxValueStr = watch('interest.maxRate') ?? 0;
  const maxValue = Number(maxValueStr);

  const yesNo = [
    { label: t['yes'], value: true, isDisabled: router?.asPath?.includes('/edit') },
    { label: t['no'], value: false, isDisabled: router?.asPath?.includes('/edit') },
  ];

  // const postingFrequency = [
  //   {
  //     label: t['daily'],
  //     value: LoanProductInstallment.Daily,
  //   },
  //   {
  //     label: t['monthly'],
  //     value: LoanProductInstallment.Monthly,
  //   },
  //   {
  //     label: t['quaterly'],
  //     value: LoanProductInstallment.Quarterly,
  //   },
  //   {
  //     label: t['halfYearly'],
  //     value: LoanProductInstallment.HalfYearly,
  //   },
  //   {
  //     label: t['yearly'],
  //     value: LoanProductInstallment.Yearly,
  //   },
  // ];

  return (
    <FormSection header="loanProductInterest">
      <FormInput
        name="interest.minRate"
        type="number"
        label={t['loanProductMinimumRate']}
        textAlign="right"
        rightElement={
          <Text fontWeight="Medium" fontSize="r1" color="primary.500">
            %
          </Text>
        }
        isDisabled={router?.asPath?.includes('/edit')}
      />
      <FormInput
        name="interest.maxRate"
        type="number"
        label={t['loanProductMaximumRate']}
        textAlign="right"
        rightElement={
          <Text fontWeight="Medium" fontSize="r1" color="primary.500">
            %
          </Text>
        }
        rules={{
          min: {
            value: minValueStr,
            message: 'Maximum interest rate should be greater than minimum interest rate',
          },
        }}
        isDisabled={router?.asPath?.includes('/edit')}
      />
      <FormInput
        isRequired
        name="interest.defaultRate"
        type="number"
        label={t['loanProductDefaultRate']}
        textAlign="right"
        rules={{
          max: {
            value: maxValue,
            message: 'Interest Rate is invalid',
          },
          min: {
            value: minValue,
            message: 'Interest Rate is invalid',
          },
        }}
        rightElement={
          <Text fontWeight="Medium" fontSize="r1" color="primary.500">
            %
          </Text>
        }
        isDisabled={router?.asPath?.includes('/edit')}
      />
      <FormInput
        name="interest.ceoAuthority"
        type="number"
        label={t['loanProductCEOAuthority']}
        textAlign="right"
        rightElement={
          <Text fontWeight="Medium" fontSize="r1" color="primary.500">
            %
          </Text>
        }
        isDisabled={router?.asPath?.includes('/edit')}
      />
      <FormInput
        name="interest.boardAuthority"
        type="number"
        label={t['loanProductBoardAuthority']}
        textAlign="right"
        rightElement={
          <Text fontWeight="Medium" fontSize="r1" color="primary.500">
            %
          </Text>
        }
        isDisabled={router?.asPath?.includes('/edit')}
      />
      <GridItem colSpan={3}>
        <Box display="flex" flexDirection="column" gap="s48">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mt="s16"
          >
            <Box>
              <SubHeadingText>{t['loanProductUpdateInterest']} </SubHeadingText>
              <SubText>{t['loanProductUpdateInterestForIndividual']}</SubText>
            </Box>
            <FormSwitchTab name="updateInterest" options={yesNo} />
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mt="s16"
          >
            <Box>
              <SubHeadingText>{t['loanProductWaiveInterest']} </SubHeadingText>
              <SubText>{t['loanProductWaiveInterestforindividual']}</SubText>
            </Box>
            <FormSwitchTab name="waiveInterest" options={yesNo} />
          </Box>
          {/* <Box w="35%">
            <FormSelect
              name="postingFrequency"
              label={t['loanProductPostingFrequency']}
              options={postingFrequency}
              isDisabled={router?.asPath?.includes('/edit')}
            />
          </Box> */}
        </Box>
      </GridItem>
    </FormSection>
  );
};
