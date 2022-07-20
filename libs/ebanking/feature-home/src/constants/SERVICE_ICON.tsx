import { IconType } from 'react-icons';
import { AiOutlineBank } from 'react-icons/ai';
import { BiGlobe } from 'react-icons/bi';
import { IoHome, IoWalletOutline } from 'react-icons/io5';
import { MdOutlineSend } from 'react-icons/md';

export const SERVICE_ICON_DICT: Record<string, IconType> = {
  ACC_TRANSFER: IoHome,
  SEND_MONEY: MdOutlineSend,
  BANK_TRANSFER: AiOutlineBank,
  REMITTANCE: BiGlobe,
  LOAD_WALLET: IoWalletOutline,
  CARDLESS_WITHDRAW: IoHome,
};
