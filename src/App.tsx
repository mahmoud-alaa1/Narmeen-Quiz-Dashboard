import { useState } from "react";
import {
  ArrowUpDown,
  Package,
  User,
  Phone,
  MapPin,
  Mail,
  StickyNote,
  Tag,
} from "lucide-react";
import { TSortDirection, TSortField } from "./types/types";
import TableBody from "./components/TableBody";

function App() {
  const [sortField, setSortField] = useState<TSortField>("name");
  const [sortDirection, setSortDirection] = useState<TSortDirection>("asc");

  const handleSort = (field: typeof sortField) => {
    const newDirection =
      field === sortField && sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newDirection);
    setSortField(field);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          لوحة تحكم الطلبات
        </h1>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <button
                      onClick={() => handleSort("name")}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <User size={16} />
                      <span>الاسم </span>
                      <ArrowUpDown size={16} />
                    </button>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex items-center space-x-3">
                      <span>رقم الهاتف</span>
                      <Phone size={16} />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 w-[10rem] text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex items-center">
                      <span>العنوان</span>
                      <MapPin size={16} />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <button
                      onClick={() => handleSort("email")}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <Mail size={16} />
                      <span>البريد الالكتروني</span>
                      <ArrowUpDown size={16} />
                    </button>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex items-center space-x-1">
                      <span>الملاحظات</span>
                      <StickyNote size={16} />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <button
                      onClick={() => handleSort("packageId")}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <Package size={16} />
                      <span>رقم الباقة</span>
                      <ArrowUpDown size={16} />
                    </button>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <button
                      onClick={() => handleSort("status")}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <Tag size={16} />
                      <span>حالة الطلب</span>
                      <ArrowUpDown size={16} />
                    </button>
                  </th>
                  {/* <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <button
                      onClick={() => handleSort("date")}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <Tag size={16} />
                      <span>تاريخ الطلب</span>
                      <ArrowUpDown size={16} />
                    </button>
                  </th> */}
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    اجراءات
                  </th>
                </tr>
              </thead>
              <TableBody field={sortField} newDirection={sortDirection} />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
