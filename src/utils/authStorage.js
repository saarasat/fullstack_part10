import AsyncStorage from '@react-native-community/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const accessToken = await AsyncStorage.getItem(`${this.namespace}:accessToken`);
    return accessToken;
  }

  async setAccessToken(accessToken) {
    return await AsyncStorage.setItem(`${this.namespace}:accessToken`, accessToken);
  }

  removeAccessToken() {
    return AsyncStorage.removeItem(`${this.namespace}:accessToken`);
  }
}

export default AuthStorage;