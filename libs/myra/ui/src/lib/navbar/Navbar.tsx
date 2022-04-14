import { Flex, Image, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Box, Input, Text } from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface MyraUiNavbarProps {}

export function Navbar(props: MyraUiNavbarProps) {
  return (
    <Box
      height="60px"
      px="5"
      background={'primary.dark'}
      alignItems="center"
      display="flex"
      style={{
        borderBottom: '3px solid #1F4D36',
      }}
    >
      <Flex width="100%">
        <Box flex={1} display="flex" alignItems="center">
          <Image src="/logo.svg" alt="logo" />
          <Text color="white" mx="4">
            नमुना बचत तथा ऋण सहकारी संस्था
          </Text>
        </Box>
        <Box flex={1}>
          <InputGroup>
            <Input
              background="#EEF1F7"
              placeholder="Search Members Name, Reports, etc"
              _placeholder={{ color: '#333333' }}
            />
            <InputLeftElement
              children={<AiOutlineSearch size={16} color="green.500" />}
            />
          </InputGroup>
        </Box>
        <Box
          flex={1}
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Box mx="4">
            <svg
              width="37"
              height="36"
              viewBox="0 0 37 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8966 24.5785H17.4342C17.4342 25.3428 18.0538 25.9624 18.8181 25.9624C19.5824 25.9624 20.2019 25.3428 20.2019 24.5785H21.7395C21.7395 26.192 20.4316 27.5 18.8181 27.5C17.2046 27.5 15.8966 26.192 15.8966 24.5785ZM26.9674 22.4254V22.734C26.9674 23.5003 26.3478 24.1172 25.5832 24.1172H12.053C11.2885 24.1172 10.6687 23.4983 10.6687 22.734V22.4254C10.6687 21.3105 11.4612 20.3806 12.5138 20.1661V16.5827C12.5138 13.1002 15.3359 10.2787 18.8181 10.2787C22.3003 10.2787 25.1223 13.1009 25.1223 16.5827V20.1659C26.1762 20.3801 26.9674 21.3095 26.9674 22.4254ZM25.4298 22.4254C25.4298 22.0003 25.0862 21.6571 24.6582 21.6571C24.0648 21.6571 23.5847 21.1733 23.5847 20.5829V16.5827C23.5847 13.95 21.451 11.8163 18.8181 11.8163C16.1851 11.8163 14.0515 13.9495 14.0515 16.5827V20.5829C14.0515 21.1759 13.5688 21.6571 12.978 21.6571C12.5516 21.6571 12.2063 22.0016 12.2063 22.4254V22.5796H25.4298V22.4254Z"
                fill="white"
              />
              <circle
                cx="23.5285"
                cy="11.0832"
                r="3.0832"
                fill="#1ED760"
                stroke="#10223B"
              />
            </svg>
          </Box>
          <Box mx="4">
            <svg
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.8177 3.59998C8.87904 3.60117 7.97917 3.97458 7.31543 4.63831C6.6517 5.30204 6.27829 6.20192 6.2771 7.14058H8.0771C8.0771 6.18028 8.8583 5.39998 9.8177 5.39998C10.7771 5.39998 11.5583 6.18028 11.5583 7.14058C11.5583 7.67878 11.1254 8.06938 10.4639 8.60398C10.2478 8.77326 10.0402 8.95319 9.842 9.14308C8.9438 10.0404 8.9177 10.9935 8.9177 11.0997V11.7H10.7177L10.7168 11.1303C10.7177 11.1159 10.7465 10.7829 11.1137 10.4166C11.2487 10.2816 11.4188 10.1466 11.5952 10.0044C12.2963 9.43648 13.3574 8.57878 13.3574 7.14058C13.3567 6.20193 12.9836 5.30191 12.3199 4.6381C11.6563 3.97429 10.7564 3.60093 9.8177 3.59998ZM8.9177 12.6H10.7177V14.4H8.9177V12.6Z"
                fill="white"
              />
              <path
                d="M9.81812 0C4.85552 0 0.818115 4.0374 0.818115 9C0.818115 13.9626 4.85552 18 9.81812 18C14.7807 18 18.8181 13.9626 18.8181 9C18.8181 4.0374 14.7807 0 9.81812 0ZM9.81812 16.2C5.84822 16.2 2.61812 12.9699 2.61812 9C2.61812 5.0301 5.84822 1.8 9.81812 1.8C13.788 1.8 17.0181 5.0301 17.0181 9C17.0181 12.9699 13.788 16.2 9.81812 16.2Z"
                fill="white"
              />
            </svg>
          </Box>
          <Box mx="4">{/* <Image src={Avatar} /> */}</Box>
          <Box mx="4">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.4998 9.2499C11.4998 9.84664 11.2627 10.4189 10.8408 10.8409C10.4188 11.2629 9.84652 11.4999 9.24978 11.4999C8.65303 11.4999 8.08073 11.2629 7.65877 10.8409C7.23681 10.4189 6.99976 9.84664 6.99976 9.2499C6.99976 8.65316 7.23681 8.08085 7.65877 7.65889C8.08073 7.23693 8.65303 6.99988 9.24978 6.99988C9.84652 6.99988 10.4188 7.23693 10.8408 7.65889C11.2627 8.08085 11.4998 8.65316 11.4998 9.2499ZM11.4998 16C11.4998 16.5967 11.2627 17.169 10.8408 17.591C10.4188 18.0129 9.84652 18.25 9.24978 18.25C8.65303 18.25 8.08073 18.0129 7.65877 17.591C7.23681 17.169 6.99976 16.5967 6.99976 16C6.99976 15.4032 7.23681 14.8309 7.65877 14.409C8.08073 13.987 8.65303 13.7499 9.24978 13.7499C9.84652 13.7499 10.4188 13.987 10.8408 14.409C11.2627 14.8309 11.4998 15.4032 11.4998 16ZM9.24978 25C9.84652 25 10.4188 24.763 10.8408 24.341C11.2627 23.9191 11.4998 23.3468 11.4998 22.75C11.4998 22.1533 11.2627 21.581 10.8408 21.159C10.4188 20.7371 9.84652 20.5 9.24978 20.5C8.65303 20.5 8.08073 20.7371 7.65877 21.159C7.23681 21.581 6.99976 22.1533 6.99976 22.75C6.99976 23.3468 7.23681 23.9191 7.65877 24.341C8.08073 24.763 8.65303 25 9.24978 25ZM18.2499 9.2499C18.2499 9.84664 18.0128 10.4189 17.5908 10.8409C17.1689 11.2629 16.5966 11.4999 15.9998 11.4999C15.4031 11.4999 14.8308 11.2629 14.4088 10.8409C13.9869 10.4189 13.7498 9.84664 13.7498 9.2499C13.7498 8.65316 13.9869 8.08085 14.4088 7.65889C14.8308 7.23693 15.4031 6.99988 15.9998 6.99988C16.5966 6.99988 17.1689 7.23693 17.5908 7.65889C18.0128 8.08085 18.2499 8.65316 18.2499 9.2499ZM15.9998 18.25C16.5966 18.25 17.1689 18.0129 17.5908 17.591C18.0128 17.169 18.2499 16.5967 18.2499 16C18.2499 15.4032 18.0128 14.8309 17.5908 14.409C17.1689 13.987 16.5966 13.7499 15.9998 13.7499C15.4031 13.7499 14.8308 13.987 14.4088 14.409C13.9869 14.8309 13.7498 15.4032 13.7498 16C13.7498 16.5967 13.9869 17.169 14.4088 17.591C14.8308 18.0129 15.4031 18.25 15.9998 18.25ZM18.2499 22.75C18.2499 23.3468 18.0128 23.9191 17.5908 24.341C17.1689 24.763 16.5966 25 15.9998 25C15.4031 25 14.8308 24.763 14.4088 24.341C13.9869 23.9191 13.7498 23.3468 13.7498 22.75C13.7498 22.1533 13.9869 21.581 14.4088 21.159C14.8308 20.7371 15.4031 20.5 15.9998 20.5C16.5966 20.5 17.1689 20.7371 17.5908 21.159C18.0128 21.581 18.2499 22.1533 18.2499 22.75ZM22.7499 11.4999C23.3466 11.4999 23.9189 11.2629 24.3409 10.8409C24.7629 10.4189 24.9999 9.84664 24.9999 9.2499C24.9999 8.65316 24.7629 8.08085 24.3409 7.65889C23.9189 7.23693 23.3466 6.99988 22.7499 6.99988C22.1532 6.99988 21.5809 7.23693 21.1589 7.65889C20.7369 8.08085 20.4999 8.65316 20.4999 9.2499C20.4999 9.84664 20.7369 10.4189 21.1589 10.8409C21.5809 11.2629 22.1532 11.4999 22.7499 11.4999ZM24.9999 16C24.9999 16.5967 24.7629 17.169 24.3409 17.591C23.9189 18.0129 23.3466 18.25 22.7499 18.25C22.1532 18.25 21.5809 18.0129 21.1589 17.591C20.7369 17.169 20.4999 16.5967 20.4999 16C20.4999 15.4032 20.7369 14.8309 21.1589 14.409C21.5809 13.987 22.1532 13.7499 22.7499 13.7499C23.3466 13.7499 23.9189 13.987 24.3409 14.409C24.7629 14.8309 24.9999 15.4032 24.9999 16ZM22.7499 25C23.3466 25 23.9189 24.763 24.3409 24.341C24.7629 23.9191 24.9999 23.3468 24.9999 22.75C24.9999 22.1533 24.7629 21.581 24.3409 21.159C23.9189 20.7371 23.3466 20.5 22.7499 20.5C22.1532 20.5 21.5809 20.7371 21.1589 21.159C20.7369 21.581 20.4999 22.1533 20.4999 22.75C20.4999 23.3468 20.7369 23.9191 21.1589 24.341C21.5809 24.763 22.1532 25 22.7499 25Z"
                fill="white"
              />
            </svg>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default Navbar;
