import { ExpoConfig, ConfigContext } from '@expo/config';
import 'dotenv/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  return <ExpoConfig>{
    ...config,
    extra: {
      apiUrl: process.env.API_URL,
    },
  };
};
