import { PenSquare, Trash2 } from "lucide-react";
import {
  Order,
  OrderResponse,
  TSortDirection,
  TSortField,
} from "../types/types";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { useOrders } from "../context/OrdersProvider";
import { edits } from "../data/sampleData";
import useDelete from "../hooks/useDelete";

const getStatusColor = (status: Order["status"]) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "shipped":
      return "bg-blue-100 text-blue-800";
    case "compeleted":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

interface TableBodyProps {
  field: TSortField;
  newDirection: TSortDirection;
}

export default function TableBody({ field, newDirection }: TableBodyProps) {
  const [showModal, setShowModal] = useState<boolean | string>(false);
  const { dispatch, orders } = useOrders();
  const { deleteService } = useDelete();

  useEffect(() => {
    const newOrders = [...orders].sort((a, b) => {
      const valueA =
        field === "packageId" || field === "status"
          ? a[field]
          : a.client[field];
      const valueB =
        field === "packageId" || field === "status"
          ? b[field]
          : b.client[field];

      return newDirection === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });
    dispatch({ type: "setOrders", payload: newOrders });
  }, [field, newDirection, dispatch]);

  const handleDelete = async (id: string) => {
    deleteService(id);

    dispatch({ type: "deleteOrder", payload: id });
  };

  const handleEdit = (id: string) => {
    setShowModal(true);
    dispatch({
      type: "setCurrentOrder",
      payload: orders.find((o) => o.id === id)!,
    });
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`);
        const data = await response.json();
        console.log(data);
        const orders = data.data.map((order: OrderResponse) => {
          const newOrder: Order = {
            id: order.id.toString(),
            status: order.status,
            packageId: order.packageId.toString(),
            client: {
              name: order.name,
              phone: order.phone,
              address: order.address,
              email: order.email,
              notes: order.note,
            },
            quantity: order.quantity,
          };
          return newOrder;
        });
        dispatch({ type: "setOrders", payload: orders });
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, [dispatch]);

  return (
    <tbody className="bg-white divide-y divide-gray-200 ">
      {orders.map((order) => (
        <tr key={order.id} className="hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {order.client.name}
          </td>
          <td
            dir="ltr"
            className="px-6 py-4  whitespace-nowrap text-sm text-gray-500"
          >
            {order.client.phone}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {order.client.address}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {order.client.email}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {order.client.notes}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {order.packageId}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span
              className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                order.status
              )}`}
            >
              {edits[order.status]}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <div className="flex gap-2  ">
              <button
                onClick={() => handleEdit(order.id)}
                className="block relative text-blue-600 hover:text-blue-900"
              >
                <PenSquare size={18} />
              </button>
              <button
                onClick={() => {
                  handleDelete(order.id);
                  setShowModal(false);
                }}
                className="block text-red-600 hover:text-red-900"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </td>
        </tr>
      ))}
      {showModal && <Modal showModal={showModal} setShowModal={setShowModal} />}
    </tbody>
  );
}
