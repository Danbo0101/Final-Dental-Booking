

import { FETCH_USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS } from '../action/userAction';


const INITIAL_STATE = {
    account: {
        id: null,
        name: "",
        email: "",
        birthday: "",
        id_Number: "",
        gender: "",
        roleId: "",
        phone: "",
        userName: '',
        password: "",
        image: '',
    },
    isAuthenticated: false
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            return {
                ...state, account: {
                    id: action?.payload?.sub,
                    name: action?.payload?.FullName,
                    email: action?.payload?.Email,
                    birthday: action?.payload?.Birthday,
                    id_Number: action?.payload?.ID_Number,
                    gender: action?.payload?.Gender,
                    roleId: action?.payload?.Role_Id,
                    phone: action?.payload?.Phone,
                    userName: action?.payload?.Username,
                    password: action?.payload?.Password,
                    image: action?.payload?.image,
                },
                isAuthenticated: true
            };

        case USER_LOGOUT_SUCCESS:
            return {
                ...state, account: {
                    id: null,
                    name: "",
                    email: "",
                    birthday: "",
                    id_Number: "",
                    gender: "",
                    roleId: "",
                    phone: "",
                    userName: '',
                    password: "",
                    image: '',
                },
                isAuthenticated: false

            };
        default: return state;
    }
};

export default userReducer;