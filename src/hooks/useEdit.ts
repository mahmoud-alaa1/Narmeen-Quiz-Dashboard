import { useState } from "react";
import toast from "react-hot-toast";

export default function useEdit() {
  const [error] = useState<boolean | string>(false);
  const [loading, setLoading] = useState<boolean | string>(false);
  const [success, setSuccess] = useState<boolean | string>(false);

  const editService = async (id: string) => {
    try {
      toast.success("تم التحديث بنجاح");
      setSuccess(false);
      await fetch("https://api.example.com/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { error, success, loading, editService };
}
