import Link from 'next/link';

import { Button } from '@myra-ui';

import { ROUTES } from '../constants/ROUTES';

interface IProps {
  label?: string;
  id: string;
  type: 'member' | 'loan' | 'savings' | 'transactions' | 'account-close' | 'saving-product';
}

export const RouteToDetailsPage = ({ label, type, id }: IProps) => {
  switch (type) {
    case 'saving-product':
      return (
        <Link target="_blank" href={`${ROUTES.CBS_ACCOUNT_SAVING_PRODUCT_DETAILS}?id=${id}`}>
          <Button variant="link" color="primary.500" minW="auto" px={0}>
            {label}{' '}
          </Button>
        </Link>
      );
    case 'member':
      return (
        <Link target="_blank" href={`${ROUTES.CBS_MEMBER_DETAILS}?id=${id}`}>
          <Button variant="link" color="primary.500" minW="auto" px={0}>
            {label}{' '}
          </Button>
        </Link>
      );
    case 'loan':
      return (
        <Link target="_blank" href={`${ROUTES.CBS_LOAN_ACCOUNTS_DETAILS}?id=${id}`}>
          <Button variant="link" color="primary.500" minW="auto" px={0}>
            {label}{' '}
          </Button>
        </Link>
      );
    case 'savings':
      return (
        <Link target="_blank" href={`${ROUTES.CBS_ACCOUNT_SAVING_DETAILS}?id=${id}`}>
          <Button variant="link" color="primary.500" minW="auto" px={0}>
            {label}{' '}
          </Button>
        </Link>
      );
    case 'transactions':
      return (
        <Link target="_blank" href={`${ROUTES.CBS_TRANS_ALL_TRANSACTIONS_DETAILS}?id=${id}`}>
          <Button variant="link" color="primary.500" minW="auto" px={0}>
            {label}{' '}
          </Button>
        </Link>
      );
    case 'account-close':
      return (
        <Link target="_blank" href={`${ROUTES.CBS_ACCOUNT_CLOSED_DETAILS}?id=${id}`}>
          <Button variant="link" color="primary.500" minW="auto" px={0}>
            {label}{' '}
          </Button>
        </Link>
      );

    default:
      return (
        <Link target="_blank" href={`${ROUTES.CBS_ACCOUNT_CLOSED_DETAILS}?id=${id}`}>
          <Button variant="link" color="primary.500">
            {label}{' '}
          </Button>
        </Link>
      );
  }
};
