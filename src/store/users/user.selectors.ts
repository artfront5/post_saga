import { RootStore } from '../types';

export const getUsers = (store: RootStore) => store.users.users;
