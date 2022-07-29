import { DetailPageContentCard } from '@coop/cbs/settings/ui-layout';
import { Box, Text } from '@coop/shared/ui';

export function LoanProductOverviewDetailPage() {
  return (
    <Box display="flex" flexDirection="column" p="s16" gap="s16">
      <DetailPageContentCard header="loanProductGeneralInformation">
        <Box
          display="grid"
          gridTemplateColumns="repeat(2,1fr)"
          p="s16"
          gap="s20"
        >
          <Box display="flex" flexDirection="column" gap="s4">
            <Text
              color="neutralColorLight.Gray-70"
              fontWeight="Medium"
              fontSize="s3"
            >
              Product Name
            </Text>
            <Text
              color="neutralColorLight.Gray-80"
              fontWeight="SemiBold"
              fontSize="r1"
            >
              House Purchase Loan
            </Text>
          </Box>
          <Box display="flex" flexDirection="column" gap="s4">
            <Text
              color="neutralColorLight.Gray-70"
              fontWeight="Medium"
              fontSize="s3"
            >
              Product Type
            </Text>
            <Text
              color="neutralColorLight.Gray-80"
              fontWeight="SemiBold"
              fontSize="r1"
            >
              Assets Purchases and Maintanance Loan
            </Text>
          </Box>
          <Box display="flex" flexDirection="column" gap="s4">
            <Text
              color="neutralColorLight.Gray-70"
              fontWeight="Medium"
              fontSize="s3"
            >
              Product Subtype
            </Text>
            <Text
              color="neutralColorLight.Gray-80"
              fontWeight="SemiBold"
              fontSize="r1"
            >
              House Purchase Loan
            </Text>
          </Box>
          <Box display="flex" flexDirection="column" gap="s4">
            <Text
              color="neutralColorLight.Gray-70"
              fontWeight="Medium"
              fontSize="s3"
            >
              Nature of Loan Product
            </Text>
            <Text
              color="neutralColorLight.Gray-80"
              fontWeight="SemiBold"
              fontSize="r1"
            >
              Unproductive
            </Text>
          </Box>
        </Box>
      </DetailPageContentCard>

      <DetailPageContentCard header="loanProductDetailCriteria">
        <Box p="s16">
          <Box px="s16" display="grid" gridTemplateColumns="repeat(2,1fr)">
            <Box>
              <ul>
                <li>
                  <Text
                    fontSize="r1"
                    color="neutralColorLight.Gray-70"
                    fontWeight="Regular"
                  >
                    Minimum Age:
                    <Text
                      as="span"
                      fontSize="r1"
                      color="neutralColorLight.Gray-70"
                      fontWeight="Medium"
                    >
                      12
                    </Text>
                  </Text>
                </li>

                <li>
                  <Text
                    fontSize="r1"
                    color="neutralColorLight.Gray-70"
                    fontWeight="Regular"
                  >
                    Maximum Age:
                    <Text
                      as="span"
                      fontSize="r1"
                      color="neutralColorLight.Gray-70"
                      fontWeight="Medium"
                    >
                      35
                    </Text>
                  </Text>
                </li>

                <li>
                  <Text
                    fontSize="r1"
                    color="neutralColorLight.Gray-70"
                    fontWeight="Regular"
                  >
                    Gender:
                    <Text
                      as="span"
                      fontSize="r1"
                      color="neutralColorLight.Gray-70"
                      fontWeight="Medium"
                    >
                      Male, Female
                    </Text>
                  </Text>
                </li>

                <li>
                  <Text
                    fontSize="r1"
                    color="neutralColorLight.Gray-70"
                    fontWeight="Regular"
                  >
                    Marital Status:
                    <Text
                      as="span"
                      fontSize="r1"
                      color="neutralColorLight.Gray-70"
                      fontWeight="Medium"
                    >
                      Married
                    </Text>
                  </Text>
                </li>

                <li>
                  <Text
                    fontSize="r1"
                    color="neutralColorLight.Gray-70"
                    fontWeight="Regular"
                  >
                    Occupation Detail:
                    <Text
                      as="span"
                      fontSize="r1"
                      color="neutralColorLight.Gray-70"
                      fontWeight="Medium"
                    >
                      Business, Agriculture
                    </Text>
                  </Text>
                </li>

                <li>
                  <Text
                    fontSize="r1"
                    color="neutralColorLight.Gray-70"
                    fontWeight="Regular"
                  >
                    Education Qualification:
                    <Text
                      as="span"
                      fontSize="r1"
                      color="neutralColorLight.Gray-70"
                      fontWeight="Medium"
                    >
                      SEE
                    </Text>
                  </Text>
                </li>
              </ul>
            </Box>

            <Box>
              <ul>
                <li>
                  <Text
                    fontSize="r1"
                    color="neutralColorLight.Gray-70"
                    fontWeight="Regular"
                  >
                    Foreign Employment:
                    <Text
                      as="span"
                      fontSize="r1"
                      color="neutralColorLight.Gray-70"
                      fontWeight="Medium"
                    >
                      No
                    </Text>
                  </Text>
                </li>

                <li>
                  <Text
                    fontSize="r1"
                    color="neutralColorLight.Gray-70"
                    fontWeight="Regular"
                  >
                    Nature of Business (Institutions):
                    <Text
                      as="span"
                      fontSize="r1"
                      color="neutralColorLight.Gray-70"
                      fontWeight="Medium"
                    >
                      Club
                    </Text>
                  </Text>
                </li>

                <li>
                  <Text
                    fontSize="r1"
                    color="neutralColorLight.Gray-70"
                    fontWeight="Regular"
                  >
                    Nature of Business ( COOP Union):
                    <Text
                      as="span"
                      fontSize="r1"
                      color="neutralColorLight.Gray-70"
                      fontWeight="Medium"
                    >
                      Club
                    </Text>
                  </Text>
                </li>

                <li>
                  <Text
                    fontSize="r1"
                    color="neutralColorLight.Gray-70"
                    fontWeight="Regular"
                  >
                    Cooperative Type:
                    <Text
                      as="span"
                      fontSize="r1"
                      color="neutralColorLight.Gray-70"
                      fontWeight="Medium"
                    >
                      Saving & Loan
                    </Text>
                  </Text>
                </li>

                <li>
                  <Text
                    fontSize="r1"
                    color="neutralColorLight.Gray-70"
                    fontWeight="Regular"
                  >
                    Ethinicity:
                    <Text
                      as="span"
                      fontSize="r1"
                      color="neutralColorLight.Gray-70"
                      fontWeight="Medium"
                    >
                      Buddhist
                    </Text>
                  </Text>
                </li>
              </ul>
            </Box>
          </Box>
        </Box>
      </DetailPageContentCard>

      <DetailPageContentCard header="loanProductAdditionalFeatures">
        <Box
          display="grid"
          gridTemplateColumns="repeat(2,1fr)"
          p="s16"
          gap="s20"
        >
          <Box display="flex" flexDirection="column" gap="s4">
            <Text
              color="neutralColorLight.Gray-70"
              fontWeight="Medium"
              fontSize="s3"
            >
              Allow Partial Installment
            </Text>
            <Text
              color="neutralColorLight.Gray-80"
              fontWeight="SemiBold"
              fontSize="r1"
            >
              Yes
            </Text>
          </Box>
          <Box display="flex" flexDirection="column" gap="s4">
            <Text
              color="neutralColorLight.Gray-70"
              fontWeight="Medium"
              fontSize="s3"
            >
              Is Monthly Interest Compulsory
            </Text>
            <Text
              color="neutralColorLight.Gray-80"
              fontWeight="SemiBold"
              fontSize="r1"
            >
              Yes
            </Text>
          </Box>
          <Box display="flex" flexDirection="column" gap="s4">
            <Text
              color="neutralColorLight.Gray-70"
              fontWeight="Medium"
              fontSize="s3"
            >
              Insurance
            </Text>
            <Text
              color="neutralColorLight.Gray-80"
              fontWeight="SemiBold"
              fontSize="r1"
            >
              No
            </Text>
          </Box>
          <Box display="flex" flexDirection="column" gap="s4">
            <Text
              color="neutralColorLight.Gray-70"
              fontWeight="Medium"
              fontSize="s3"
            >
              Collateral
            </Text>
            <Text
              color="neutralColorLight.Gray-80"
              fontWeight="SemiBold"
              fontSize="r1"
            >
              No
            </Text>
          </Box>

          <Box display="flex" flexDirection="column" gap="s4">
            <Text
              color="neutralColorLight.Gray-70"
              fontWeight="Medium"
              fontSize="s3"
            >
              Staff Product
            </Text>
            <Text
              color="neutralColorLight.Gray-80"
              fontWeight="SemiBold"
              fontSize="r1"
            >
              Yes
            </Text>
          </Box>
          <Box display="flex" flexDirection="column" gap="s4">
            <Text
              color="neutralColorLight.Gray-70"
              fontWeight="Medium"
              fontSize="s3"
            >
              Support Multiple Account
            </Text>
            <Text
              color="neutralColorLight.Gray-80"
              fontWeight="SemiBold"
              fontSize="r1"
            >
              Yes
            </Text>
          </Box>
          <Box display="flex" flexDirection="column" gap="s4">
            <Text
              color="neutralColorLight.Gray-70"
              fontWeight="Medium"
              fontSize="s3"
            >
              Loan Schedule Change Override
            </Text>
            <Text
              color="neutralColorLight.Gray-80"
              fontWeight="SemiBold"
              fontSize="r1"
            >
              No
            </Text>
          </Box>
          <Box display="flex" flexDirection="column" gap="s4">
            <Text
              color="neutralColorLight.Gray-70"
              fontWeight="Medium"
              fontSize="s3"
            >
              Override Interest
            </Text>
            <Text
              color="neutralColorLight.Gray-80"
              fontWeight="SemiBold"
              fontSize="r1"
            >
              No
            </Text>
          </Box>
        </Box>
      </DetailPageContentCard>
    </Box>
  );
}

export default LoanProductOverviewDetailPage;
