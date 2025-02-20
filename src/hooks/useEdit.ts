import { useState } from "react";
import toast from "react-hot-toast";

export default function useEdit() {
  const [error] = useState<boolean | string>(false);
  const [loading, setLoading] = useState<boolean | string>(false);
  const [success, setSuccess] = useState<boolean | string>(false);

  const editService = async (id: string, status: string) => {
    try {
      setSuccess(false);
      await fetch(`${`${import.meta.env.VITE_API_URL}/orders/${id}/status`}`, {
        method: "PATCH",

        body: JSON.stringify({ status }),
      });
      toast.success("تم التحديث بنجاح");
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      console.error(error);
      toast.error("حدث خطأ ما. اعد تحميل الصفحة وحاول مرة اخرى");
    } finally {
      setLoading(false);
    }
  };

  return { error, success, loading, editService };
}
