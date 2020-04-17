import { useState, useEffect } from 'react';
import {
  Accuracy,
  requestPermissionsAsync,
  watchPositionAsync
} from 'expo-location';

export default (shouldTrack, callback) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    let subscriber;
    const startWatching = async () => {
      try {
        const permissionResponse = await requestPermissionsAsync();

        /* 
      triggers error on reject permission for any device and fixes issue
      with ios when rejecting permission that does not throw any exceptions
      */
        if (!permissionResponse.granted) {
          throw { message: 'Failed to get location permission' };
        }

        const sub = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10
          },
          callback
        );
        subscriber = sub;
      } catch (e) {
        setError(e);
      }
    };

    if (shouldTrack) {
      startWatching();
    } else {
      if (subscriber) {
        subscriber.remove();
      }
      subscriber = null;
    }

    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [shouldTrack, callback]);

  return [error];
};
