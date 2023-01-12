import Link from 'next/link';

import { Text } from '@myra-ui';

import { ROUTES } from '../constants/ROUTES';

interface IProps {
  label?: string;
  id: string;
  type: 'member' | 'loan' | 'savings' | 'transactions' | 'account-close';
}

export const RouteToDetailsPage = ({ label, type, id }: IProps) => {
  switch (type) {
    case 'member':
      return (
        <Link target="_blank" href={`${ROUTES.CBS_MEMBER_DETAILS}?id=${id}`}>
          <Text fontSize="s3" color="primary.500">
            {label}{' '}
          </Text>
        </Link>
      );
    case 'loan':
      return (
        <Link target="_blank" href={`${ROUTES.CBS_LOAN_ACCOUNTS_DETAILS}?id=${id}`}>
          <Text fontSize="s3" color="primary.500">
            {label}{' '}
          </Text>
        </Link>
      );
    case 'savings':
      return (
        <Link target="_blank" href={`${ROUTES.CBS_ACCOUNT_SAVING_DETAILS}?id=${id}`}>
          <Text fontSize="s3" color="primary.500">
            {label}{' '}
          </Text>
        </Link>
      );
    case 'transactions':
      return (
        <Link target="_blank" href={`${ROUTES.CBS_TRANS_ALL_TRANSACTIONS_DETAILS}?id=${id}`}>
          <Text fontSize="s3" color="primary.500">
            {label}{' '}
          </Text>
        </Link>
      );
    case 'account-close':
      return (
        <Link target="_blank" href={`${ROUTES.CBS_ACCOUNT_CLOSED_DETAILS}?id=${id}`}>
          <Text fontSize="s3" color="primary.500">
            {label}{' '}
          </Text>
        </Link>
      );

    default:
      return (
        <Link target="_blank" href={`${ROUTES.CBS_ACCOUNT_CLOSED_DETAILS}?id=${id}`}>
          <Text fontSize="s3" color="primary.500">
            {label}{' '}
          </Text>
        </Link>
      );
  }
};
