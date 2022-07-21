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
        <Box display="grid" gridTemplateColumns="repeat(1, 1fr)" gap="s16">
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
          <FormCheckboxGroup
            name="individualRequiredDocuments"
            list={interestList}
            orientation="row"
          />
          {products === 'recurringSaving' && (
            <Box
              display="flex"
              gap="s12"
              px="s16"
              paddingTop="s16"
              bg="primary.0"
              borderRadius="br2"
            >
              <Icon
                as={IoInformationCircleOutline}
                color="neutralColorLight.Gray-80"
              />
              <Box display="flex" flexDirection="column">
                <Box display="flex" flexDirection="column" gap="s8">
                  <TextFields
                    fontSize="s3"
                    fontWeight="SemiBold"
                    color="neutralColorLight.Gray-80"
                  >
                    {t['accountOpenInterestRate']}
                  </TextFields>
                  <Box display="flex" flexDirection="column">
                    <TextFields
                      fontSize="s3"
                      fontWeight="Regular"
                      color="neutralColorLight.Gray-80"
                    >
                      Minimum Interest Rate: <b>7%</b>
                      <TextFields
                        fontSize="s3"
                        fontWeight="Regular"
                        color="neutralColorLight.Gray-80"
                        mb="s16"
                      >
                        Interest Rate: <b> 12%</b>
                      </TextFields>
                    </TextFields>
                  </Box>
                </Box>

                <Box display="flex" flexDirection="column" gap="s8">
                  <TextFields
                    fontSize="s3"
                    fontWeight="SemiBold"
                    color="neutralColorLight.Gray-80"
                  >
                    {t['accoutnOpenLadderRateInfo']}
                  </TextFields>
                  <Box display="flex" flexDirection="column">
                    <TextFields
                      fontSize="s3"
                      fontWeight="Regular"
                      color="neutralColorLight.Gray-80"
                    >
                      For More than <b>45,000.00</b> Ladder Rate is <b> 15%</b>.
                      <TextFields
                        fontSize="s3"
                        fontWeight="Regular"
                        color="neutralColorLight.Gray-80"
                        mb="s16"
                      >
                        For More than <b>10,000.00</b> Ladder Rate is
                        <b> 10%</b>.
                      </TextFields>
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
