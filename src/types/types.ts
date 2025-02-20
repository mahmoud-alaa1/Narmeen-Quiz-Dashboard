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

/*
address
: 
"abdallah 211"
created_at
: 
"2025-02-19T22:39:47.000000Z"
email
: 
"a.yasser9999@gmail.com"
id
: 
2
name
: 
"Abdallah"
note
: 
"test"
packageId
: 
2
phone
: 
"20202002"
status
: 
"pending"
updated_at
: 
"2025-02-19T22:39:47.000000Z"
*/

export interface OrderResponse {
  address: string;
  id: number;
  email: string;
  phone: string;
  status: "pending" | "shipped" | "compeleted";
  note: string;
  packageId: number;
  name: string;
}

export type TSortField = keyof Order["client"] | "packageId" | "status" ;
export type TSortDirection = "asc" | "desc" ;
