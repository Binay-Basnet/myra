import { useFormContext } from 'react-hook-form';
import { IoInformationCircleOutline } from 'react-icons/io5';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormCheckboxGroup, FormInput } from '@coop/shared/form';
import { Box, Icon, Text, TextFields } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const Interest = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const products = watch('productId');

  const interestList = [
    { label: t['accountOpenCEOAuthority'], value: 'ceoAuthority' },
    { label: t['accountOpenBoardAuthority'], value: 'boardAuthority' },
  ];

  return (
    <GroupContainer
      scrollMarginTop={'200px'}
      display="flex"
      flexDirection={'column'}
      gap="s16"
    >
      <Box
        display="flex"
        flexDirection="column"
        w="100%"
        p="s20"
        background="neutralColorLight.Gray-0"
      >
        <Text
          fontSize="r1"
          fontWeight="SemiBold"
          color="neutralColorLight.Gray-60"
          mb="s16"
        >
          {t['accInterest']}
        </Text>
        <Box display="grid" gridTemplateColumns="repeat(1, 1fr)" gap={6}>
          <FormCheckboxGroup
            name="individualRequiredDocuments"
            list={interestList}
            orientation="row"
          />
          <InputGroupContainer>
            <FormInput
              name="interestRate"
              type="number"
              label={t['accountOpenInterestRate']}
              textAlign={'right'}
              placeholder="0.00"
              rightElement={
                <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                  %
                </Text>
              }
            />
            {products !== 'recurringSaving' && (
              <>
                <FormInput
                  name="sanctionedId"
                  type="number"
                  label={t['accountOpenInterestSanctionedByID']}
                  textAlign={'right'}
                  placeholder="0.00"
                />
                <FormInput
                  name="sanctionedName"
                  type="text"
                  label={t['accountOpenInterestSanctionedbyName']}
                  placeholder={t['accountOpenInterestSanctionedbyName']}
                />
              </>
            )}
          </InputGroupContainer>
          {products === 'recurringSaving' && (
            <Box
              display="flex"
              gap="s12"
              p="s12"
              bg="primary.0"
              borderRadius="br2"
            >
              <Icon
                as={IoInformationCircleOutline}
                color="neutralColorLight.Gray-80"
              />
              <Box display="flex" flexDirection="column" gap="s16">
                <Box display="flex" flexDirection="column">
                  <TextFields
                    fontSize="s3"
                    fontWeight="SemiBold"
                    color="neutralColorLight.Gray-80"
                    mb="s16"
                  >
                    {t['accountOpenInterestRate']}
                  </TextFields>
                  <Box display="flex" flexDirection="column">
                    <TextFields
                      fontSize="s3"
                      fontWeight="Regular"
                      color="neutralColorLight.Gray-80"
                      mb="s16"
                    >
                      Minimum Interest Rate:7%
                    </TextFields>

                    <TextFields
                      fontSize="s3"
                      fontWeight="Regular"
                      color="neutralColorLight.Gray-80"
                      mb="s16"
                    >
                      Interest Rate: 12%
                    </TextFields>
                  </Box>
                </Box>

                <Box display="flex" flexDirection="column" gap="s8">
                  <TextFields
                    fontSize="s3"
                    fontWeight="SemiBold"
                    color="neutralColorLight.Gray-80"
                    mb="s16"
                  >
                    {t['accoutnOpenLadderRateInfo']}
                  </TextFields>
                  <Box display="flex" flexDirection="column" gap="s2">
                    <TextFields
                      fontSize="s3"
                      fontWeight="Regular"
                      color="neutralColorLight.Gray-80"
                      mb="s16"
                    >
                      For More than 45,000.00 Ladder Rate is 15%.
                    </TextFields>
                    <TextFields
                      fontSize="s3"
                      fontWeight="Regular"
                      color="neutralColorLight.Gray-80"
                      mb="s16"
                    >
                      For More than 10,000.00 Ladder Rate is 10%.
                    </TextFields>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </GroupContainer>
  );
};
