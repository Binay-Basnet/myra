import { useFormContext } from 'react-hook-form';

import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormSelect } from '@coop/shared/form';
import { Box, Grid, GridItem, Text, TextFields } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const Product = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const products = watch('productId');

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
        background="neutralColorLight.Gray-0"
        p="s16"
        gap="s8"
      >
        <Box w="50%">
          <FormSelect
            name="productId"
            label={t['accProductName']}
            placeholder={t['accSelectProduct']}
            options={[
              {
                label: 'Recurring Saving',
                value: 'recurringSaving',
              },
              {
                label: 'Mandatory',
                value: 'mandatory',
              },
              {
                label: 'Voluntary',
                value: 'voluntary',
              },
              {
                label: 'Term Saving',
                value: 'termSaving',
              },
            ]}
          />
        </Box>
        <Box
          p="s16"
          display="flex"
          flexDirection="column"
          gap="s32"
          borderRadius="br2"
          bg="gray.0"
          border="1px solid"
          borderColor="border.layout"
        >
          <Box
            p="s20"
            gap="s10"
            bg="primary.100"
            display="grid"
            gridTemplateColumns="repeat(2,1fr)"
            borderRadius="br2"
          >
            <Box display="flex" flexDirection="column" gap="s4">
              <Text fontWeight="Medium" color="primary.400" fontSize="s2">
                CGSA-3025
              </Text>
              <Text fontWeight="Medium" color="primary.500" fontSize="r2">
                {t['accGoldSavingsAccount']}
              </Text>
            </Box>

            <Box display="flex" flexDirection="column" gap="s4">
              <Text fontWeight="Medium" color="primary.400" fontSize="s2">
                Interest Rate
              </Text>
              <Text fontWeight="Medium" color="primary.500" fontSize="r2">
                8.03%
              </Text>
            </Box>
          </Box>

          <Grid templateColumns="repeat(3,1fr)" gap="s32">
            {products !== 'voluntary' && (
              <GridItem display="flex" flexDirection="column">
                <Box display="flex" flexDirection="column" gap="s4">
                  <TextFields
                    color="primary.800"
                    fontSize="s3"
                    fontWeight="Medium"
                  >
                    {/* {t['accInterestRate']} */}
                    Tenure
                  </TextFields>

                  <TextFields
                    color="neutralColorLight.Gray-70"
                    fontSize="s2"
                    fontWeight="Regular"
                  >
                    Minimum: 7 days
                  </TextFields>
                  <TextFields
                    color="neutralColorLight.Gray-70"
                    fontSize="s2"
                    fontWeight="Regular"
                  >
                    Maximum: 500 days
                  </TextFields>
                </Box>
              </GridItem>
            )}

            <GridItem display="flex" flexDirection="column">
              <Box display="flex" flexDirection="column" gap="s4">
                <TextFields
                  color="primary.800"
                  fontSize="s3"
                  fontWeight="Medium"
                >
                  {/* {t['accInterestRate']} */}
                  Deposit Amount Limit
                </TextFields>
                <Box pl="s24">
                  <ul>
                    <li>
                      <TextFields
                        color="neutralColorLight.Gray-70"
                        fontSize="s2"
                        fontWeight="Regular"
                      >
                        Minimum: 5,000.00
                      </TextFields>
                    </li>

                    <li>
                      <TextFields
                        color="neutralColorLight.Gray-70"
                        fontSize="s2"
                        fontWeight="Regular"
                      >
                        Maximum: 30,000.00
                      </TextFields>
                    </li>
                  </ul>
                </Box>
              </Box>
            </GridItem>

            <GridItem display="flex" flexDirection="column">
              <Box display="flex" flexDirection="column" gap="s4">
                <TextFields
                  color="primary.800"
                  fontSize="s3"
                  fontWeight="Medium"
                >
                  {/* {t['accInterestRate']} */}
                  Transaction Limit
                </TextFields>
                <Box pl="s24">
                  <ul>
                    <li>
                      <TextFields
                        color="neutralColorLight.Gray-70"
                        fontSize="s2"
                        fontWeight="Regular"
                      >
                        Criteria: 1
                      </TextFields>
                    </li>

                    <li>
                      <TextFields
                        color="neutralColorLight.Gray-70"
                        fontSize="s2"
                        fontWeight="Regular"
                      >
                        Criteria: 2
                      </TextFields>
                    </li>
                  </ul>
                </Box>
              </Box>
            </GridItem>

            {(products === 'recurringSaving' || products === 'termSaving') && (
              <>
                <GridItem display="flex" flexDirection="column">
                  <TextFields
                    color="primary.800"
                    fontSize="s3"
                    fontWeight="Medium"
                  >
                    {/* {t['accInterestRate']} */}
                    Criteria
                  </TextFields>
                  <Box display="flex" flexDirection="column" gap="s4">
                    <Box
                      display="flex"
                      flexDirection="column"
                      gap="s16"
                      pl="s24"
                    >
                      <ul>
                        <li>
                          <TextFields
                            color="neutralColorLight.Gray-70"
                            fontSize="s2"
                            fontWeight="Regular"
                          >
                            Age: <b> Mininum: 12 : Maximum 35</b>
                          </TextFields>
                        </li>

                        <li>
                          <TextFields
                            color="neutralColorLight.Gray-70"
                            fontSize="s2"
                            fontWeight="Regular"
                          >
                            Gender: <b> Male, Female</b>
                          </TextFields>
                        </li>
                      </ul>

                      <ul>
                        <li>
                          <TextFields
                            color="neutralColorLight.Gray-70"
                            fontSize="s2"
                            fontWeight="Regular"
                          >
                            Foreign Employment: <b>No</b>
                          </TextFields>
                        </li>

                        <li>
                          <TextFields
                            color="neutralColorLight.Gray-70"
                            fontSize="s2"
                            fontWeight="Regular"
                          >
                            Business (Institutions): <b> Club</b>
                          </TextFields>
                        </li>
                      </ul>
                    </Box>
                  </Box>
                </GridItem>
                <GridItem display="flex" flexDirection="column">
                  <Box display="flex" flexDirection="column" gap="s4">
                    <Box
                      display="flex"
                      flexDirection="column"
                      gap="s16"
                      pl="s24"
                    >
                      <ul>
                        <li>
                          <TextFields
                            color="neutralColorLight.Gray-70"
                            fontSize="s2"
                            fontWeight="Regular"
                          >
                            Marital Status: <b> Married</b>
                          </TextFields>
                        </li>

                        <li>
                          <TextFields
                            color="neutralColorLight.Gray-70"
                            fontSize="s2"
                            fontWeight="Regular"
                          >
                            Occupation Detail: <b>Business, Agriculture</b>
                          </TextFields>
                        </li>
                      </ul>

                      <ul>
                        <li>
                          <TextFields
                            color="neutralColorLight.Gray-70"
                            fontSize="s2"
                            fontWeight="Regular"
                          >
                            Nature of Business ( COOP Union): <b>Club</b>
                          </TextFields>
                        </li>

                        <li>
                          <TextFields
                            color="neutralColorLight.Gray-70"
                            fontSize="s2"
                            fontWeight="Regular"
                          >
                            Cooperative Type: <b> Saving & Loan</b>
                          </TextFields>
                        </li>
                      </ul>
                    </Box>
                  </Box>
                </GridItem>
                <GridItem display="flex" flexDirection="column">
                  <Box display="flex" flexDirection="column" gap="s4">
                    <Box
                      display="flex"
                      flexDirection="column"
                      gap="s16"
                      pl="s24"
                    >
                      <ul>
                        <li>
                          <TextFields
                            color="neutralColorLight.Gray-70"
                            fontSize="s2"
                            fontWeight="Regular"
                          >
                            Education Qualification: <b> SEE</b>
                          </TextFields>
                        </li>

                        <li>
                          <TextFields
                            color="neutralColorLight.Gray-70"
                            fontSize="s2"
                            fontWeight="Regular"
                          >
                            Ethinicity: <b> Buddhist</b>
                          </TextFields>
                        </li>
                      </ul>
                    </Box>
                  </Box>
                </GridItem>
              </>
            )}

            <GridItem display="flex" flexDirection="column">
              <TextFields color="primary.800" fontSize="s3" fontWeight="Medium">
                {t['accRequiredDocument']}
              </TextFields>
              <Box pl="s24" display="grid">
                <ul>
                  <li>
                    <TextFields
                      color="neutralColorLight.Gray-70"
                      fontSize="s2"
                      fontWeight="Regular"
                    >
                      Photo
                    </TextFields>
                  </li>

                  <li>
                    <TextFields
                      color="neutralColorLight.Gray-70"
                      fontSize="s2"
                      fontWeight="Regular"
                    >
                      Signature
                    </TextFields>
                  </li>

                  <li>
                    <TextFields
                      color="neutralColorLight.Gray-70"
                      fontSize="s2"
                      fontWeight="Regular"
                    >
                      Nominee Document
                    </TextFields>
                  </li>
                </ul>
              </Box>
            </GridItem>

            {products !== 'voluntary' && (
              <>
                {' '}
                <GridItem display="flex" flexDirection="column">
                  <TextFields
                    color="primary.800"
                    fontSize="s3"
                    fontWeight="Medium"
                  >
                    {t['accPenalty']}
                  </TextFields>
                  <Box pl="s24">
                    <ul>
                      <li>
                        <TextFields
                          color="neutralColorLight.Gray-70"
                          fontSize="s2"
                          fontWeight="Regular"
                        >
                          Penalty 1
                        </TextFields>
                      </li>

                      <li>
                        <TextFields
                          color="neutralColorLight.Gray-70"
                          fontSize="s2"
                          fontWeight="Regular"
                        >
                          Penalty 2
                        </TextFields>
                      </li>

                      <li>
                        <TextFields
                          color="neutralColorLight.Gray-70"
                          fontSize="s2"
                          fontWeight="Regular"
                        >
                          Penalty 3
                        </TextFields>
                      </li>
                    </ul>
                  </Box>
                </GridItem>
                <GridItem display="flex" flexDirection="column" gap="s4">
                  <TextFields
                    color="primary.800"
                    fontSize="s3"
                    fontWeight="Medium"
                  >
                    {t['accRebate']}
                  </TextFields>
                  <Box pl="s24">
                    <ul>
                      <li>
                        <TextFields
                          color="neutralColorLight.Gray-70"
                          fontSize="s2"
                          fontWeight="Regular"
                        >
                          Rebate 1
                        </TextFields>
                      </li>

                      <li>
                        <TextFields
                          color="neutralColorLight.Gray-70"
                          fontSize="s2"
                          fontWeight="Regular"
                        >
                          Rebate 2
                        </TextFields>
                      </li>

                      <li>
                        <TextFields
                          color="neutralColorLight.Gray-70"
                          fontSize="s2"
                          fontWeight="Regular"
                        >
                          Rebate 3
                        </TextFields>
                      </li>
                    </ul>
                  </Box>
                </GridItem>
              </>
            )}
          </Grid>
        </Box>
      </Box>
    </GroupContainer>
  );
};
