export interface TournamentConfig {
  title: string;
  subtitle: string;
  hosts: string;
  prefix: string; // Used for ID generation (e.g., 'F26')
}

export interface PassportData {
  username: string;
  passportId: string;
  issueDate: string;
  qrUrl: string;
  isGuest: boolean;
}