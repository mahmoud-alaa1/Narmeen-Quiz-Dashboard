import { X } from "lucide-react";
import { useOrders } from "../context/OrdersProvider";
import { edits } from "../data/sampleData";


const statusColor = (status: string) => {
  switch (status) {
    case "shipped":
      return "bg-blue-100 text-blue-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "fulfilled":
      return "bg-green-100 text-green-800";
  }
};

export default function Modal({
  setShowModal,
  showModal,
}: {
  setShowModal: (value: boolean) => void;
  showModal: boolean | string;
}) {
  const { currentOrder, dispatch } = useOrders();
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              تحديث حالة الطلب
            </h2>
            <button
              onClick={() => setShowModal(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600">
              رقم الاوردر:&nbsp;
              <span className="font-medium text-gray-900">
                {currentOrder?.packageId}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              العميل: &nbsp;
              <span className="font-medium text-gray-900">
                {currentOrder?.client.name}
              </span>
            </p>
          </div>

          <div className="space-y-3">
            {(["pending", "shipped", "fulfilled"] as const).map((status) => (
              <button
                onClick={() => {
                  setShowModal(false);
                  dispatch({
                    type: "updateOrder",
                    payload: { ...currentOrder!, status },
                  });
                }}
                key={status}
                className={`w-full py-2 px-4 rounded-md  ${statusColor(
                  status
                )} `}
              >
                {edits[status]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
