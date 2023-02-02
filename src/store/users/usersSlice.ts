import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUsers {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface IUsersState {
  users: Array<IUsers>;
}

const initialState: IUsersState = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsers: () => {},
    setUsers: (state, action: PayloadAction<Array<IUsers>>) => {
      state.users = action.payload;
    },
  },
});

export const { actions: usersActions, reducer: usersReducer } = usersSlice;
