import Image from 'next/image';

import { Box, LocaleSwitcher, Text } from '@coop/shared/ui';

interface IAuthContainerProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthContainer = ({ children, title, subtitle }: IAuthContainerProps) => (
  <Box minH="100vh" w="100%" bg="primary.0" display="flex">
    <Box
      w="65%"
      bg="primary.0"
      pl={{ '2xl': '170px', xl: '100px', lg: '50px' }}
      display="flex"
      flexDir="column"
      justifyContent="center"
    >
      <Box w={{ '2xl': '60%', xl: '75%', lg: '90%' }}>
        <Box position="relative" h="60px" w="100%">
          <Image src="/sidebar-logo.png" layout="fill" objectFit="contain" objectPosition="left" />
        </Box>

        <Box display="flex" flexDir="column" mt="s64" gap="s16">
          <Text
            w="85%"
            fontSize="m1"
            color="gray.700"
            fontWeight="500"
            lineHeight="125%"
            letterSpacing="-0.03em"
          >
            All co-operatives transactions now from one place
          </Text>
          <Text fontSize="r1" color="gray.700">
            A simple, secure and reliable digital platform connecting coo-operatives all over the
            nation to technology.
          </Text>

          <Box position="relative" h="324px" w="100%">
            <Image
              src="/img/login/login-hero.png"
              layout="fill"
              objectFit="contain"
              objectPosition="left"
            />
          </Box>

          <Text fontSize="l1" color="gray.700">
            Download Myra mobile app
          </Text>

          <Box display="flex" alignItems="center" w="300px" gap="s16">
            <Box position="relative" w="50%" h="s48">
              <Image
                src="/img/login/play-store.svg"
                layout="fill"
                objectFit="cover"
                objectPosition="left"
              />
            </Box>

            <Box position="relative" w="50%" h="s48">
              <Image
                src="/img/login/app-store.svg"
                layout="fill"
                objectFit="contain"
                objectPosition="left"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>

    <Box w="35%" px="s48" pt="120px" bg="white">
      <Box w={{ '2xl': '80%', xl: '90%', lg: '100%' }} display="flex" flexDir="column" gap="s32">
        <Box alignSelf="flex-end">
          <LocaleSwitcher />
        </Box>

        <Box display="flex" flexDir="column" gap="s8">
          <Text fontSize="l1" color="primary.500" fontWeight="500" lineHeight="125%">
            {title}
          </Text>
          <Text fontSize="r1" color="gray.700" lineHeight="150%">
            {subtitle}
          </Text>
        </Box>

        {children}
      </Box>
    </Box>
  </Box>
);
