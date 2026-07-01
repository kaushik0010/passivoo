import { PassportData } from "../types/passport";
import { generatePassportId } from "./passport-id";
import { formatPassportDate } from "./passport-date";

export const GUEST_STORAGE_KEY = "passivoo_guest_passport";

export function createGuestPassport(eventPrefix: string): PassportData {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  
  return {
    username: `Guest${randomSuffix}`,
    passportId: generatePassportId(eventPrefix),
    issueDate: formatPassportDate(new Date()),
    qrUrl: "https://passivoo.com/passport",
    isGuest: true,
  };
}