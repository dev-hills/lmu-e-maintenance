export type typeAuthContext = {
  token: string | null;
  setToken: (token: string | null) => void;
  userEmail: string | null;
  setUserEmail: (email: string | null) => void;
};

export type typeIssue = {
  id: number;
  description: string;
};

export type typecomplaintMessage = {
  userWebMail: string;
  image: null;
  block: string;
  hostel: string;
  roomNumber: number;
  timeAvailable: string;
  maintenanceIssueIds: number[];
};
