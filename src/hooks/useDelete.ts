import { useState } from "react";
import toast from "react-hot-toast";

export default function useDelete() {
  const [error] = useState<boolean | string>(false);
  const [loading, setLoading] = useState<boolean | string>(false);
  const deleteService = async (id: string) => {
    try {
      setLoading(id);
      await fetch("https://api.example.com/orders", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      toast.success("تم الحذف بنجاح");
    } catch (error) {
      console.error(error);
      toast.error("حدث خطا من فضلك حاول مرة اخرى");
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, deleteService };
}
