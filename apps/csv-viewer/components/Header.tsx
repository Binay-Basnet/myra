import { Avatar, Box, Text } from '@myra-ui/foundations';

export const Header = () => (
  <Box
    h="3rem"
    w="100%"
    bg="primary.500"
    display="flex"
    alignItems="center"
    color="white"
    fontSize="r1"
    fontWeight={500}
    px="s16"
    flexShrink={0}
    justifyContent="space-between"
  >
    <Box display="flex" alignItems="center" gap="s32">
      <Text fontSize="r2" color="#fff" fontWeight={600}>
        CSV Viewer
      </Text>
      <Box display="flex" alignItems="center" gap="s8">
        <Text fontSize="s2" color="#fff" fontWeight={500}>
          Product of
        </Text>
        <LightLogo />
        <Text fontSize="r2" color="#fff" fontWeight={700}>
          Myra
        </Text>
      </Box>
    </Box>
    <Avatar icon={<AvatarIcon />} />
  </Box>
);

const AvatarIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="16" fill="#E4E4E4" />
    <path
      d="M18.8699 8.83219C18.1412 8.04546 17.1234 7.61221 16.0001 7.61221C14.8707 7.61221 13.8496 8.04284 13.1243 8.8247C12.3911 9.61518 12.0338 10.6895 12.1177 11.8496C12.284 14.1382 14.0256 16 16.0001 16C17.9746 16 19.7132 14.1386 19.882 11.8503C19.9671 10.7007 19.6076 9.62866 18.8699 8.83219ZM22.5905 24.3878H9.40965C9.23713 24.3901 9.06627 24.3538 8.90952 24.2817C8.75276 24.2096 8.61405 24.1035 8.50347 23.971C8.26008 23.6801 8.16197 23.2828 8.23461 22.881C8.55065 21.1278 9.53697 19.6551 11.0872 18.6212C12.4645 17.7034 14.209 17.1983 16.0001 17.1983C17.7911 17.1983 19.5357 17.7038 20.9129 18.6212C22.4632 19.6547 23.4495 21.1274 23.7655 22.8806C23.8382 23.2824 23.7401 23.6797 23.4967 23.9707C23.3861 24.1032 23.2474 24.2094 23.0907 24.2816C22.9339 24.3537 22.763 24.39 22.5905 24.3878Z"
      fill="#969696"
    />
  </svg>
);

const LightLogo = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.8239 6.47525C12.2138 5.32269 12.2296 4.07746 11.8689 2.91553C11.5527 1.89695 10.9613 0.987521 10.1631 0.284345C9.96299 0.108093 9.66511 0.108297 9.46527 0.284816C8.90667 0.778222 8.44746 1.37464 8.11392 2.04248C7.71333 2.84457 7.50488 3.72793 7.50488 4.62345C7.50488 5.51896 7.71333 6.40233 8.11392 7.20443C8.44753 7.8724 8.90685 8.46892 9.4656 8.96239C9.66529 9.13875 9.96291 9.1391 10.163 8.96316C10.9238 8.29413 11.4977 7.43703 11.8239 6.47525Z"
      fill="#88BD40"
    />
    <rect
      x="2.19873"
      y="5.78912"
      width="9.79488"
      height="3.42056"
      rx="1.71028"
      transform="rotate(40 2.19873 5.78912)"
      fill="white"
    />
    <rect
      x="0.849121"
      y="18.5873"
      width="1.99281"
      height="1.99281"
      rx="0.996404"
      transform="rotate(-45 0.849121 18.5873)"
      fill="#88BD40"
    />
    <rect
      x="1.94775"
      y="11.9262"
      width="5.84172"
      height="2.39127"
      rx="1.19564"
      transform="rotate(40 1.94775 11.9262)"
      fill="#88BD40"
    />
    <rect
      width="9.79675"
      height="3.4215"
      rx="1.71075"
      transform="matrix(-0.765895 0.642966 0.642609 0.766194 17.4346 5.78604)"
      fill="white"
    />
    <rect
      width="1.99327"
      height="1.99327"
      rx="0.996635"
      transform="matrix(-0.70694 -0.707274 -0.70694 0.707274 18.7844 18.5902)"
      fill="#88BD40"
    />
    <rect
      width="5.84283"
      height="2.39193"
      rx="1.19596"
      transform="matrix(-0.765895 0.642966 0.642609 0.766194 17.6853 11.926)"
      fill="#88BD40"
    />
  </svg>
);

export const DarkLogo = () => (
  <svg width="77" height="24" viewBox="0 0 77 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14.1887 7.77031C14.6566 6.38723 14.6755 4.89296 14.2427 3.49864C13.8633 2.27634 13.1536 1.18503 12.1957 0.341214C11.9556 0.129711 11.5981 0.129956 11.3583 0.341779C10.688 0.933867 10.137 1.64957 9.73671 2.45098C9.256 3.41349 9.00586 4.47352 9.00586 5.54814C9.00586 6.62276 9.256 7.68281 9.73671 8.64532C10.137 9.44689 10.6882 10.1627 11.3587 10.7549C11.5984 10.9665 11.9555 10.9669 12.1956 10.7558C13.1086 9.95297 13.7972 8.92444 14.1887 7.77031Z"
      fill="#88BD40"
    />
    <rect
      x="2.63843"
      y="6.94698"
      width="11.7539"
      height="4.10468"
      rx="2.05234"
      transform="rotate(40 2.63843 6.94698)"
      fill="#006636"
    />
    <rect
      x="1.0188"
      y="22.3047"
      width="2.39137"
      height="2.39137"
      rx="1.19569"
      transform="rotate(-45 1.0188 22.3047)"
      fill="#88BD40"
    />
    <rect
      x="2.3374"
      y="14.3114"
      width="7.01007"
      height="2.86953"
      rx="1.43477"
      transform="rotate(40 2.3374 14.3114)"
      fill="#88BD40"
    />
    <rect
      width="11.7561"
      height="4.1058"
      rx="2.0529"
      transform="matrix(-0.765895 0.642966 0.642609 0.766194 20.9216 6.94327)"
      fill="#006636"
    />
    <rect
      width="2.39193"
      height="2.39193"
      rx="1.19596"
      transform="matrix(-0.70694 -0.707274 -0.70694 0.707274 22.5413 22.3083)"
      fill="#88BD40"
    />
    <rect
      width="7.01141"
      height="2.87032"
      rx="1.43516"
      transform="matrix(-0.765895 0.642966 0.642609 0.766194 21.2227 14.3112)"
      fill="#88BD40"
    />
    <path
      d="M33.0165 19.5V5.78189H35.4102L40.5476 12.7606H39.406L44.4329 5.78189H46.8266V19.5H44.304V8.636L45.2799 8.87537L40.0688 15.8173H39.7742L34.6921 8.87537L35.5207 8.636V19.5H33.0165ZM50.4647 23.5694C50.1947 23.5694 49.9307 23.5448 49.673 23.4957C49.4152 23.4589 49.1819 23.3914 48.9732 23.2932V21.2677C49.1328 21.3045 49.3231 21.3414 49.5441 21.3782C49.7773 21.415 49.9921 21.4334 50.1885 21.4334C50.7409 21.4334 51.1399 21.3045 51.3854 21.0467C51.6432 20.7889 51.8703 20.4514 52.0667 20.034L52.7296 18.4873L52.6928 20.5127L48.3288 9.48302H50.9251L53.9817 17.6218H53.0611L56.0993 9.48302H58.714L54.35 20.5127C54.0922 21.1634 53.7792 21.7158 53.4109 22.17C53.0426 22.6242 52.613 22.9679 52.122 23.2011C51.6432 23.4466 51.0908 23.5694 50.4647 23.5694ZM60.0386 19.5V9.48302H62.3035V11.7111L62.1194 11.3796C62.3526 10.6308 62.7147 10.1091 63.2058 9.81447C63.7091 9.51985 64.3106 9.37254 65.0103 9.37254H65.5995V11.5085H64.7341C64.0467 11.5085 63.4943 11.7233 63.0769 12.153C62.6595 12.5704 62.4508 13.1596 62.4508 13.9207V19.5H60.0386ZM69.964 19.721C69.2643 19.721 68.6566 19.6043 68.141 19.3711C67.6255 19.1379 67.2265 18.8064 66.9442 18.3768C66.6618 17.9348 66.5206 17.4254 66.5206 16.8484C66.5206 16.296 66.6434 15.805 66.8889 15.3754C67.1344 14.9334 67.515 14.5652 68.0306 14.2705C68.5461 13.9759 69.1968 13.7672 69.9824 13.6445L73.26 13.1105V14.9518L70.4427 15.4306C69.964 15.5165 69.608 15.67 69.3747 15.8909C69.1415 16.1119 69.0249 16.4004 69.0249 16.7564C69.0249 17.1001 69.1538 17.3763 69.4116 17.585C69.6816 17.7814 70.0131 17.8796 70.4059 17.8796C70.9092 17.8796 71.3511 17.7753 71.7317 17.5666C72.1245 17.3456 72.4253 17.0449 72.6339 16.6643C72.8549 16.2838 72.9654 15.8664 72.9654 15.4122V12.8343C72.9654 12.4046 72.7935 12.0486 72.4498 11.7663C72.1184 11.4717 71.6764 11.3244 71.124 11.3244C70.6085 11.3244 70.1481 11.4655 69.743 11.7479C69.3502 12.018 69.0617 12.3801 68.8776 12.8343L66.9073 11.8768C67.1037 11.3489 67.4106 10.8947 67.828 10.5142C68.2577 10.1214 68.761 9.81447 69.3379 9.5935C69.9149 9.37254 70.5409 9.26206 71.2161 9.26206C72.0386 9.26206 72.7628 9.4155 73.3889 9.7224C74.015 10.017 74.4999 10.4344 74.8436 10.9745C75.1996 11.5024 75.3776 12.1223 75.3776 12.8343V19.5H73.0943V17.7875L73.6099 17.7507C73.3521 18.1804 73.0452 18.5425 72.6892 18.8371C72.3332 19.1195 71.9281 19.3404 71.4739 19.5C71.0197 19.6473 70.5164 19.721 69.964 19.721Z"
      fill="#006636"
    />
  </svg>
);
