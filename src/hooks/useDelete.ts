import { useState } from "react";

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
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, deleteService };
}
