export interface Order {
  id: string;
  client: {
    name: string;
    phone: string;
    address: string;
    email: string;
    notes: string;
  };
  packageId: string;
  status: "pending" | "shipped" | "compeleted";
}
export type TSortField = keyof Order["client"] | "packageId" | "status";
export type TSortDirection = "asc" | "desc";
