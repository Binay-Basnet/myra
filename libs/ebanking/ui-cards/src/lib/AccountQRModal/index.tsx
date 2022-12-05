import { useRef } from 'react';
import { BsDownload } from 'react-icons/bs';
import { IoShareSocialSharp } from 'react-icons/io5';
import { QRCodeSVG } from 'qrcode.react';

import { Box, Button, Icon, Modal, Text } from '@myra-ui';

interface IAccountQRModalProps {
  open: boolean;
  onClose: () => void;
  account: {
    name: string;
    accountNo: string;
    phoneNo: string;
  };
}

export const AccountQRModal = ({ open, onClose, account }: IAccountQRModalProps) => {
  const ref = useRef(null);

  if (typeof window === 'undefined') return null;

  return (
    <Modal open={open} title="My QR Code" onClose={onClose}>
      <Box as="div" display="flex" flexDir="column" alignItems="center" gap="s16">
        <Text variant="bodyLarge" color="gray.900">
          Use your QR code to accept payments
        </Text>

        <Box ref={ref} display="flex" flexDir="column" alignItems="center" gap="s16">
          <Box p="s8">
            <QRCodeSVG
              width="180px"
              height="180px"
              value={`Name: ${account.name} \nAccount Number: ${account.accountNo} \nPhone Number: ${account.phoneNo} `}
            />
          </Box>

          <Box display="flex" flexDir="column" alignItems="center">
            <Text fontSize="r2" fontWeight={600} color="primary.500">
              {account.name}
            </Text>
            <Text fontSize="r1" color="gray.700">
              Account Number: {account.accountNo}
            </Text>
            <Text fontSize="r1" color="gray.700">
              Phone Number: {account.phoneNo}
            </Text>
          </Box>
        </Box>

        <Box display="flex" gap="s16" alignItems="center">
          <Button
            onClick={async () => {
              const { exportComponentAsPNG } = await import('react-component-export-image');

              exportComponentAsPNG(ref, {
                fileName: 'qr.png',
                html2CanvasOptions: {
                  x: 520,
                  y: 120,
                  width: 800,
                  height: 800,
                  backgroundColor: 'white',
                },
              });
            }}
            variant="ghost"
            w="120px"
            leftIcon={<Icon as={BsDownload} color="primary.500" />}
          >
            Download
          </Button>
          <Button
            variant="ghost"
            w="80px"
            leftIcon={<Icon as={IoShareSocialSharp} color="primary.500" />}
          >
            Share
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
