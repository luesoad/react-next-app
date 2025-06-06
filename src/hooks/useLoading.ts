import { useState } from "react";

const useLoading = () => {
  const [loading, setLoading] = useState(false);

  const executeWithLoading = async (callback: () => Promise<void>) => {
    setLoading(true);
    await callback();
    setLoading(false);
  };

  return { loading, executeWithLoading };
};

export default useLoading;
