import { Order } from "../types/types";

export const initialOrders: Order[] = [
  {
    id: "1",
    client: {
      name: "John Doe",
      phone: "+1 234-567-8900",
      address: "123 Main St, City, Country",
      email: "john@example.com",
      notes: "Fragile items",
    },
    packageId: "PKG001",
    status: "pending",
  },
  {
    id: "2",
    client: {
      name: "Jane Smith",
      phone: "+1 234-567-8901",
      address: "456 Oak St, City, Country",
      email: "jane@example.com",
      notes: "Express delivery",
    },
    packageId: "PKG002",
    status: "shipped",
  },
  {
    id: "3",
    client: {
      name: "Mahmoud",
      phone: "+201028800187",
      address: "egypt",
      email: "mail@example.com",
      notes: "I like it",
    },
    packageId: "PKG002",
    status: "fulfilled",
  },
];
