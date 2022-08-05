import { IconType } from 'react-icons';
import { AiOutlineBank, AiOutlineMobile } from 'react-icons/ai';
import { IoGlobeOutline, IoWalletOutline, IoWifiSharp } from 'react-icons/io5';
import {
  MdCompareArrows,
  MdFlightTakeoff,
  MdLightbulbOutline,
  MdOutlineCameraFront,
  MdOutlineContactless,
  MdOutlineDomain,
  MdOutlineLiveTv,
  MdOutlineMovie,
  MdOutlineSchool,
  MdOutlineSend,
  MdOutlineWaterDrop,
} from 'react-icons/md';

export const SERVICE_ICON_DICT: Record<string, IconType> = {
  ACC_TRANSFER: MdCompareArrows,
  SEND_MONEY: MdOutlineSend,
  BANK_TRANSFER: AiOutlineBank,
  REMITTANCE: IoGlobeOutline,
  LOAD_WALLET: IoWalletOutline,
  CARDLESS_WITHDRAW: MdOutlineContactless,
};

export const SERVICE_LINK_DICT: Record<string, string> = {
  ACC_TRANSFER: '/home/account-transfer',
  SEND_MONEY: '/home/send-money',
  BANK_TRANSFER: '/home/bank-transfer',
  REMITTANCE: '/home/remittance',
  LOAD_WALLET: '/home/load_wallet',
  CARDLESS_WITHDRAW: '/home/cardless_withdraw',
};

export const UTILITY_ICON_DICT: Record<string, IconType> = {
  TOPUP: AiOutlineMobile,
  NEA_PAYMENT: MdLightbulbOutline,
  INTERNET: IoWifiSharp,
  TV: MdOutlineLiveTv,
  KHANEPANI: MdOutlineWaterDrop,
  E_TELLER: MdOutlineCameraFront,
  FLIGHT_BOOK: MdFlightTakeoff,
  SCHOOL_FEES: MdOutlineSchool,
  GOVT_PAYMENT: MdOutlineDomain,
  MOVIE_TICKET: MdOutlineMovie,
};
