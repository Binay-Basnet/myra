import { useCallback, useEffect, useState } from 'react';
import { FaMap } from 'react-icons/fa';
import { IoCloseOutline, IoCreateOutline } from 'react-icons/io5';
import dynamic from 'next/dynamic';
import axios from 'axios';

import { Box, Button, Icon, IconButton, Modal, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

const Map = dynamic(() => import('../lib/Map'), { ssr: false });

type MapPosition = {
  latitude: number;
  longitude: number;
};

interface MapComponentProps {
  id?: string;
  currentLoc: MapPosition;
  setCurrentLoc: (location: MapPosition) => void;
}

const MapComponent = ({ id, currentLoc, setCurrentLoc }: MapComponentProps) => {
  // const [currentLoc, setCurrentLoc] = useState({
  //   latitude: 0,
  //   longitude: 0,
  // });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasClickedModal, setHasClickedModal] = useState(false);
  const { t } = useTranslation();

  const openModal = useCallback(() => setIsModalOpen(true), []);

  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const [address, setAddress] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((loc) =>
      setCurrentLoc({
        longitude: loc.coords.longitude,
        latitude: loc.coords.latitude,
      })
    );
  }, []);

  useEffect(() => {
    const getPermanentAddress = async () => {
      try {
        const data = await reverseGeoCodeAddress(
          currentLoc.latitude,
          currentLoc.longitude
        );
        const address = data?.data?.address;
        setAddress(
          `${address?.amenity ? address?.amenity + ', ' : ''}${
            address?.road ? address?.road + ', ' : ''
          }${address?.neighbourhood ? address?.neighbourhood + ', ' : ''}${
            address?.suburb ? address?.suburb + ', ' : ''
          }${address?.town ? address?.town + ', ' : ''}${
            address?.city ? address?.city + ', ' : ''
          }${address?.country ? address?.country : ''}`
        );
      } catch (e) {
        console.error('Error:', e);
      }
    };

    if (hasClickedModal) {
      getPermanentAddress();
    }
  }, [JSON.stringify(currentLoc)]);

  const reverseGeoCodeAddress = (lat: number, lon: number) =>
    axios.get(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    );

  return (
    <Box display="flex" flexDir="column" gap="s20">
      <Button
        alignSelf="start"
        leftIcon={<Icon size="md" as={FaMap} />}
        isDisabled={!!address}
        onClick={() => {
          setHasClickedModal(true);
          openModal();
        }}
      >
        {t['pinOnMap']}
      </Button>

      <Modal
        open={isModalOpen}
        onClose={() => {
          closeModal();
          setAddress('');
        }}
        isCentered={true}
        size="3xl"
        title={
          <Text
            fontSize="r2"
            color="neutralColorLight.Gray-80"
            fontWeight="SemiBold"
          >
            {t['pinOnMap']}
          </Text>
        }
        footerPrimary1Props={
          <Box px={5} display="flex" justifyContent="flex-end" h={50}>
            <Button onClick={closeModal}>Save</Button>
          </Box>
        }
      >
        <Map position={currentLoc} setPosition={setCurrentLoc} />
      </Modal>

      {address && (
        <Box
          p="s12"
          display="flex"
          shadow="E0"
          width="50%"
          h={70}
          border="1px"
          borderColor="border.layout"
          borderRadius="br3"
          justifyContent="space-between"
          alignItems="center"
          gap="s16"
        >
          <Box display="flex" flexDirection="column">
            <Text
              fontSize="r2"
              noOfLines={1}
              fontWeight="500"
              textTransform="capitalize"
            >
              {address}
            </Text>
            <Text fontSize="s2" color="gray.600">
              {currentLoc.latitude}, {currentLoc.longitude}
            </Text>
          </Box>
          <Box display="flex" alignItems="center">
            <IconButton
              id={id}
              variant={'ghost'}
              aria-label="edit"
              colorScheme="gray"
              icon={<Icon as={IoCreateOutline} size="lg" />}
              onClick={() => openModal()}
            />

            <IconButton
              id={id}
              variant={'ghost'}
              aria-label="close"
              colorScheme="gray"
              icon={<Icon as={IoCloseOutline} size="lg" />}
              onClick={() => setAddress('')}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MapComponent;
