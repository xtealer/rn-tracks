import axios from 'axios';
import { AsyncStorage } from 'react-native';

const ngrokURL = 'c90ba165';

const instance = axios.create({ baseURL: `https://${ngrokURL}.ngrok.io` });

instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

export default instance;
