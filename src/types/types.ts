export interface Order {
  id: string;
  client: {
    name: string;
    phone: string;
    address: string;
    email: string;
    notes: string;
  };
  quantity: number;
  packageId: string;
  created_at: string;
  status: "pending" | "shipped" | "compeleted";
}

export interface OrderResponse {
  address: string;
  id: number;
  email: string;
  phone: string;
  status: "pending" | "shipped" | "compeleted";
  note: string;
  packageId: number;
  name: string;
  quantity: number;
  created_at: string;
}

export type TSortField =
  | keyof Order["client"]
  | "packageId"
  | "status"
  | "created_at";
export type TSortDirection = "asc" | "desc";
