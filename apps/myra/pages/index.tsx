import {
  Box,
  Container,
  Flex,
  Spacer,
  Text,
  Img,
  HStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { Navbarfordaashboard } from '@saccos/myra/ui';
import { useTranslation } from '@saccos/myra/util';

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <>
      <Box position="fixed" width="100%" zIndex={2} top="0">
        <Navbarfordaashboard t={t} />
      </Box>
      <Container maxW="904px" height="fit-content" mt="100px" p="0" pb="55px">
        <Box>
          <Flex>
            <Box>
              <Text
                fontSize="20px"
                fontWeight="500"
                fontFamily="Inter"
                color="#07073F"
              >
                Hello Bishal Mahat
              </Text>
            </Box>
            <Spacer />
            <Box>
              <Text
                fontFamily="Inter"
                color="#006837"
                fontSize="16px"
                fontWeight="700"
              >
                20 Magh,2078
              </Text>
            </Box>
          </Flex>
        </Box>
        <Box mt="61">
          <Box>
            <Text
              fontFamily="Inter"
              fontSize="13px"
              fontWeight="600"
              color="#636972"
            >
              {t.yourApplication}
            </Text>
          </Box>
          <Box mt="24px " alignItems="center">
            <HStack spacing="14px">
              <Link href="/members" passHref>
                <Box
                  w="215.5px"
                  h="215.5px"
                  rounded="lg"
                  bg="#FFFFFF"
                  cursor="pointer"
                >
                  <Box
                    mt="32px"
                    mb="24px"
                    mr="64.25px"
                    ml="64.25px"
                    w="87px"
                    h="87px"
                    borderRadius="50%"
                    bg="#3CB054"
                  >
                    <Box>
                      <Flex justifyContent="center" alignItems="center">
                        <Img
                          src="/dashboardhome/1 upper.svg"
                          alt="corebanking"
                          m="20.39px  21.75px 17.67px 24.47px"
                        />
                      </Flex>
                    </Box>
                  </Box>
                  <Box mt="24px" mr="34.75px" ml="34.75px" mb="53px">
                    <Text
                      fontFamily="Inter"
                      fontSize="14px"
                      fontWeight="500"
                      color="#232323"
                    >
                      {t.corebankingSystems}
                    </Text>
                  </Box>
                </Box>
              </Link>
              <Box w="215.5px" h="215.5px" rounded="lg" bg="#FFFFFF">
                <Box
                  mt="32px"
                  mb="24px"
                  mr="64.25px"
                  ml="64.25px"
                  w="87px"
                  h="87px"
                  borderRadius="50%"
                  bg="#FFAA5C"
                >
                  <Box>
                    <Flex justifyContent="center" alignItems="center">
                      <Img
                        src="/dashboardhome/Business Anylytics.png"
                        alt="business analytics"
                        m="13.59px  16.31px 13.59px 16.31px"
                      />
                    </Flex>
                  </Box>
                </Box>
                <Box mt="24px" ml="44.75px" mr="44.75" mb="53px">
                  <Text
                    fontFamily="Inter"
                    fontSize="14px"
                    fontWeight="500"
                    color="#232323"
                  >
                    {t.businessAnalytics}
                  </Text>
                </Box>
              </Box>
              <Box w="215.5px" h="215.5px" rounded="lg" bg="#FFFFFF">
                <Box
                  mt="32px"
                  mb="24px"
                  mr="64.25px"
                  ml="64.25px"
                  w="87px"
                  h="87px"
                  borderRadius="50%"
                  bg="#2AB8E6"
                >
                  <Box>
                    <Flex justifyContent="center" alignItems="center">
                      <Img
                        src="/dashboardhome/Loan Management System.png"
                        alt="Loan Management System"
                        m="16.31px  27.19px 16.31px 27.19px"
                      />
                    </Flex>
                  </Box>
                </Box>
                <Box mt="24px" mr="20.25px" ml="20.25px" mb="53px">
                  <Text
                    fontFamily="Inter"
                    fontSize="14px"
                    fontWeight="500"
                    color="#232323"
                    align="center"
                  >
                    {t.loanManagementSystem}
                  </Text>
                </Box>
              </Box>
              <Box w="215.5px" h="215.5px" rounded="lg" bg="#FFFFFF">
                <Box
                  mt="32px"
                  mb="24px"
                  mr="64.25px"
                  ml="64.25px"
                  w="87px"
                  h="87px"
                  borderRadius="50%"
                  bg="#1591CA"
                >
                  <Box>
                    <Flex justifyContent="center" alignItems="center">
                      <Img
                        src="/dashboardhome/Accounting System.png"
                        alt="Accounting system"
                        m="20.02px  16.36px 17.81px 16.31px"
                      />
                    </Flex>
                  </Box>
                </Box>
                <Box mt="24px" mr="34.75px" ml="34.75px" mb="53px">
                  <Text
                    fontFamily="Inter"
                    fontSize="14px"
                    fontWeight="500"
                    color="#232323"
                    align="right"
                  >
                    {t.accountingSystem}
                  </Text>
                </Box>
              </Box>
            </HStack>
          </Box>
        </Box>
        <Box
          mt="32px"
          h="283px"
          bgImage="linear-gradient(180deg, #006837 0%, #025250 100% )"
          borderRadius="16px"
        >
          <Box mt="32px">
            <Flex>
              <Box
                w="113px"
                h="113px"
                borderRadius="50%"
                bg="#FD7A3D"
                mt="85px"
                mb="85px"
                ml="58.61px"
              >
                <Flex justifyContent="center" alignItems="center">
                  <Img
                    src="/dashboardhome/logoAtMiddle.png"
                    alt="cetral chakra"
                    m="17.66px 21.04px"
                  />
                </Flex>
              </Box>
              <Box mt="85px" mb="104px" ml="33.78px" maxW="418.22px">
                <Text
                  fontFamily="Mukta"
                  fontSize="36px"
                  fontWeight="500"
                  color="#FD7A3D"
                >
                  आफ्नो सदस्यहरु सहज रूपले व्यवस्थापन गर्नुहोस्
                </Text>
                <Box mt="6px">
                  <Text
                    fontFamily="Mukta"
                    fontSize="20px"
                    fontWeight="500"
                    color="#FFFFFF"
                  >
                    Customer Relationship Management Software
                  </Text>
                </Box>
              </Box>
              <Box mt="204px" ml="163.63px" mb="31.18px">
                <Img src="/dashboardhome/MyraLogo.png" alt="Main Logo" />
              </Box>
            </Flex>
          </Box>
        </Box>
        <Box mt="32px">
          <Flex>
            <Text fontFamily="Inter" fontSize="12px" fontWeight="600">
              {t.otherApplications}
            </Text>
          </Flex>
        </Box>
        <Box mt="24px " alignItems="center">
          <HStack spacing="14px">
            <Box w="215.5px" h="215.5px" rounded="lg" bg="#FFFFFF">
              <Box
                mt="32px"
                mb="24px"
                mr="64.25px"
                ml="64.25px"
                w="87px"
                h="87px"
                borderRadius="50%"
                bg="#F4C257"
              >
                <Box>
                  <Flex justifyContent="center" alignItems="center">
                    <Img
                      src="/dashboardhome/1.png"
                      alt="Asset And Inventory Management System"
                      m="8.3px  13.64px 9.39px 13.59px"
                    />
                  </Flex>
                </Box>
              </Box>
              <Box mt="24px" mr="16px" ml="16px" mb="23px">
                <Text
                  fontFamily="Inter"
                  fontSize="14px"
                  fontWeight="500"
                  color="#232323"
                  align="center"
                >
                  {t.assetsAndInventoryManagement}
                </Text>
              </Box>
            </Box>
            <Box w="215.5px" h="215.5px" rounded="lg" bg="#FFFFFF">
              <Box
                mt="32px"
                mb="24px"
                mr="64.25px"
                ml="64.25px"
                w="87px"
                h="87px"
                borderRadius="50%"
                bg="#C87035"
              >
                <Box>
                  <Flex justifyContent="center" alignItems="center">
                    <Img
                      src="/dashboardhome/2.png"
                      alt="HR Management System"
                      m="13.59px"
                    />
                  </Flex>
                </Box>
              </Box>
              <Box mt="24px" mr="16px" ml="16px" mb="23px">
                <Text
                  fontFamily="Inter"
                  fontSize="14px"
                  fontWeight="500"
                  color="#232323"
                  align="center"
                >
                  {t.memberAndShareManagement}
                </Text>
              </Box>
            </Box>
            <Box w="215.5px" h="215.5px" rounded="lg" bg="#FFFFFF">
              <Box
                mt="32px"
                mb="24px"
                mr="64.25px"
                ml="64.25px"
                w="87px"
                h="87px"
                borderRadius="50%"
                bg="#FF6600"
              >
                <Box>
                  <Flex justifyContent="center" alignItems="center">
                    <Img
                      src="/dashboardhome/3.png"
                      alt="HR TRaining and capacity building"
                      m="19.03px  16.31px 19.03px 16.31px"
                    />
                  </Flex>
                </Box>
              </Box>
              <Box mt="24px" mr="16px" ml="16px" mb="23px">
                <Text
                  fontFamily="Inter"
                  fontSize="14px"
                  fontWeight="500"
                  color="#232323"
                  align="center"
                >
                  {t.hrTrainingAndCapacityManagement}
                </Text>
              </Box>
            </Box>
            <Box w="215.5px" h="215.5px" rounded="lg" bg="#FFFFFF">
              <Box
                mt="32px"
                mb="24px"
                mr="64.25px"
                ml="64.25px"
                w="87px"
                h="87px"
                borderRadius="50%"
                bg="#417BA4"
              >
                <Box>
                  <Flex justifyContent="center" alignItems="center">
                    <Img
                      src="/dashboardhome/4.png"
                      alt="MOBILE APPLICATION"
                      m="16.31px"
                    />
                  </Flex>
                </Box>
              </Box>
              <Box mt="24px" mr="16px" ml="16px" mb="23px">
                <Text
                  fontFamily="Inter"
                  fontSize="14px"
                  fontWeight="500"
                  color="#232323"
                  align="center"
                >
                  {t.mobileApp}
                </Text>
              </Box>
            </Box>
          </HStack>
        </Box>
        <Box mt="24px " alignItems="center">
          <HStack spacing="14px">
            <Box w="215.5px" h="215.5px" rounded="lg" bg="#FFFFFF">
              <Box
                mt="32px"
                mb="24px"
                mr="64.25px"
                ml="64.25px"
                w="87px"
                h="87px"
                borderRadius="50%"
                bg="#624DBF"
              >
                <Box>
                  <Flex justifyContent="center" alignItems="center">
                    <Img
                      src="/dashboardhome/5.png"
                      alt="Document Management System"
                      m="24.47px 19.03px"
                    />
                  </Flex>
                </Box>
              </Box>
              <Box mt="24px" mr="16px" ml="16px" mb="23px">
                <Text
                  fontFamily="Inter"
                  fontSize="14px"
                  fontWeight="500"
                  color="#232323"
                  align="center"
                >
                  {t.documentManagement}
                </Text>
              </Box>
            </Box>
            <Box w="215.5px" h="215.5px" rounded="lg" bg="#FFFFFF">
              <Box
                mt="32px"
                mb="24px"
                mr="64.25px"
                ml="64.25px"
                w="87px"
                h="87px"
                borderRadius="50%"
                bg="#FF4081"
              >
                <Box>
                  <Flex justifyContent="center" alignItems="center">
                    <Img
                      src="/dashboardhome/6.png"
                      alt="Alternative systems and cross connectivity "
                      m="21.75px 16.31px 19.03px 16.31px"
                    />
                  </Flex>
                </Box>
              </Box>
              <Box mt="24px" mr="16px" ml="16px" mb="23px">
                <Text
                  fontFamily="Inter"
                  fontSize="14px"
                  fontWeight="500"
                  color="#232323"
                  align="center"
                >
                  {t.alternativeChannelsAndCrossConnectivity}
                </Text>
              </Box>
            </Box>
            <Box w="215.5px" h="215.5px" rounded="lg" bg="#FFFFFF">
              <Box
                mt="32px"
                mb="24px"
                mr="64.25px"
                ml="64.25px"
                w="87px"
                h="87px"
                borderRadius="50%"
                bg="#FD7A3D"
              >
                <Box>
                  <Flex justifyContent="center" alignItems="center">
                    <Img
                      src="/dashboardhome/7.png"
                      alt="CRM"
                      m="13.59px 16.31px"
                    />
                  </Flex>
                </Box>
              </Box>
              <Box mt="24px" mr="16px" ml="16px" mb="23px">
                <Text
                  fontFamily="Inter"
                  fontSize="14px"
                  fontWeight="500"
                  color="#232323"
                  align="center"
                >
                  {t.crm}
                </Text>
              </Box>
            </Box>
            <Box w="215.5px" h="215.5px" rounded="lg" bg="#FFFFFF">
              <Box
                mt="32px"
                mb="24px"
                mr="64.25px"
                ml="64.25px"
                w="87px"
                h="87px"
                borderRadius="50%"
                bg="#384182"
              >
                <Box>
                  <Flex justifyContent="center" alignItems="center">
                    <Img
                      src="/dashboardhome/8.png"
                      alt="reconciliation"
                      m="13.59px 25.52px"
                    />
                  </Flex>
                </Box>
              </Box>
              <Box mt="24px" mr="16px" ml="16px" mb="23px">
                <Text
                  fontFamily="Inter"
                  fontSize="14px"
                  fontWeight="500"
                  color="#232323"
                  align="center"
                >
                  {t.reconciliationSoftware}
                </Text>
              </Box>
            </Box>
          </HStack>
        </Box>
      </Container>
    </>
  );
};
export default Dashboard;
