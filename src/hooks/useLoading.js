import { useState } from 'react';

export default callback => {
  const [loading, setLoading] = useState(true);

  const doTask = async () => {
    if (!loading) {
      setLoading(true);
    }
    await callback();
    setLoading(false);
  };

  return [loading, doTask];
};
