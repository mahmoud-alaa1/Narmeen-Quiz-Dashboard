import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useMemo,
} from "react";
import { Order } from "../types/types";

// Define the context type
type TOrdersContext = {
  orders: Order[];
  currentOrder: Order | null;
  dispatch: React.Dispatch<OrderAction>;
};

// Define the initial state structure
export const initialState: {
  currentOrder: Order | null;
  orders: Order[];
} = {
  currentOrder: null,
  orders: [
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
        address: "Egypt",
        email: "mail@example.com",
        notes: "I like it",
      },
      packageId: "PKG002",
      status: "fulfilled",
    },
  ],
};

// Define action types
type OrderAction =
  | { type: "setCurrentOrder"; payload: Order | null }
  | { type: "setOrders"; payload: Order[] }
  | { type: "addOrder"; payload: Order }
  | { type: "updateOrder"; payload: Order }
  | { type: "deleteOrder"; payload: string };

// Create context
const OrdersContext = createContext<TOrdersContext | undefined>(undefined);

// Reducer function
function reducer(state: typeof initialState, action: OrderAction) {
  switch (action.type) {
    case "setCurrentOrder":
      return { ...state, currentOrder: action.payload };

    case "setOrders":
      return { ...state, orders: action.payload };

    case "addOrder":
      return { ...state, orders: [...state.orders, action.payload] };

    case "updateOrder":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        ),
      };

    case "deleteOrder":
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.payload),
      };

    default:
      return state;
  }
}

// OrdersProvider Component
export default function OrdersProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = useMemo(
    () => ({ ...state, dispatch }),
    [state, dispatch]
  );

  return (
    <OrdersContext.Provider value={contextValue}>
      {children}
    </OrdersContext.Provider>
  );
}

// Custom hook to consume the context
function useOrders() {
  const context = useContext(OrdersContext);
  if (!context)
    throw new Error("useOrders must be used within an OrdersProvider");
  return context;
}

export { useOrders };
