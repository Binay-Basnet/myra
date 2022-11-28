import { ImBlocked } from 'react-icons/im';
import { IoCashOutline } from 'react-icons/io5';
import { RiBook3Fill } from 'react-icons/ri';

import {
  EBankingActiveLoanStatus,
  EBankingChequeRequestType,
  EbankingServiceRequestType,
} from '@coop/ebanking/data-access';
import { Box, Icon, Text } from '@myra-ui';
import { amountConverter } from '@coop/shared/utils';

const iconDict = {
  [EbankingServiceRequestType.ChequeRequest]: RiBook3Fill,
  [EbankingServiceRequestType.WithdrawViaCollector]: IoCashOutline,
  [EbankingServiceRequestType.ChequeBlockRequest]: ImBlocked,
};

const ChequeRequestType = {
  [EbankingServiceRequestType.ChequeRequest]: 'Chequebook request',
  [EbankingServiceRequestType.WithdrawViaCollector]: 'Withdraw via collector',
  [EbankingServiceRequestType.ChequeBlockRequest]: 'Cheque block request',
};

const getChequeRequestInfo = (requestInfo: RequestInfo) => {
  let info = '';

  switch (requestInfo?.typeOfRequest) {
    case EbankingServiceRequestType.ChequeRequest:
      if (requestInfo?.chequeRequestType === EBankingChequeRequestType.SelfPickup) {
        info = requestInfo?.branch?.name
          ? `Self-pickup, ${requestInfo.branch.name}`
          : 'Self-pickup';
      }

      if (requestInfo?.chequeRequestType === EBankingChequeRequestType.ThroughAgent) {
        info = requestInfo?.collector?.name
          ? `Through Agent, ${requestInfo.collector.name}`
          : 'Through Agent';
      }
      break;
    case EbankingServiceRequestType.WithdrawViaCollector: {
      const tempCollector = [];
      requestInfo?.branch?.name && tempCollector.push(requestInfo.branch.name);
      requestInfo?.collector?.name && tempCollector.push(requestInfo.collector.name);
      info = tempCollector.join(', ');
      break;
    }
    case EbankingServiceRequestType.ChequeBlockRequest:
      info = requestInfo?.chequeBlockReason as string;
      break;
    default:
      info = '';
      break;
  }

  return info;
};

type RequestInfo = {
  id: string;
  typeOfRequest?: EbankingServiceRequestType | null;
  chequeRequestType?: EBankingChequeRequestType | null;
  branch?: {
    name?: string | null;
  } | null;
  createdDate?: string | null;
  serviceStatus?: EBankingActiveLoanStatus;
  collector?: {
    name?: string | null;
  } | null;
  withdrawAmount?: string;
  withdrawDate?: string | null;
  chequeBlockReason?: string | null;
  chequeBlockNumber?: string | null;
  status?: string;
};

interface IChequeRequestCardProps {
  requestInfo: RequestInfo;
}

export const ChequeRequestCard = ({ requestInfo }: IChequeRequestCardProps) => {
  const { typeOfRequest, withdrawAmount, createdDate } = requestInfo;
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      pt="s16"
      pb="s8"
      pr="s16"
    >
      <Box display="flex" alignItems="flex-start" gap="s12">
        {typeOfRequest && (
          <Box
            borderRadius="br2"
            bg="primary.0"
            w="s32"
            h="s32"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="primary.500"
          >
            <Icon as={iconDict[typeOfRequest]} size="sm" />
          </Box>
        )}
        <Box display="flex" flexDirection="column" gap="s4">
          {typeOfRequest && (
            <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-90">
              {ChequeRequestType[typeOfRequest]}
            </Text>
          )}
          <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-50">
            {getChequeRequestInfo(requestInfo)}
          </Text>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column">
        {withdrawAmount && (
          <Text fontSize="r1" textAlign="right" fontWeight={600} color="neutralColorLight.Gray-80">
            {amountConverter(withdrawAmount)}
          </Text>
        )}
        {createdDate && (
          <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-50">
            {createdDate}
          </Text>
        )}
      </Box>
    </Box>
  );
};
