import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userName: null,
    userEmail: null,
    id: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setActiveUser: (state, action) => {
            state.userName = action.payload.userName
            state.userEmail = action.payload.userEmail
            state.id = action.payload.userId
        },
        setUserLogoutState: state => {
            state.userName = null
            state.userEmail = null
            state.id = null
        }
    }
});

export const { setActiveUser, setUserLogoutState} = userSlice.actions

export const selectUserName = state => state.user.userName
export const selectUserEmail = state => state.user.userEmail
export const selectUserId = state => state.user.id

export default userSlice.reducer