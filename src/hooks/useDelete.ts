import { useState } from "react";
import toast from "react-hot-toast";

export default function useDelete() {
  const [error] = useState<boolean | string>(false);
  const [loading, setLoading] = useState<boolean | string>(false);

  const deleteService = async (id: string) => {
    try {
      setLoading(id);
      await fetch(`${import.meta.env.VITE_API_URL}/orders/${id}`, {
        method: "DELETE",
      });
      toast.error("تم الحذف بنجاح");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, deleteService };
}
