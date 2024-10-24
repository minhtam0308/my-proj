import { accounted_user } from "../action/userActon";


const INITIAL_STATE = {
    account: {
        access_token: "",
        email: "",
        image: "",
        refresh_token: "",
        role: "",
        username: ""
    },
    isAuthued: false
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case accounted_user:
            return {
                ...state, account: {
                    access_token: action.payload.DT.access_token,
                    email: action.payload.DT.email,
                    image: action.payload.DT.image,
                    refresh_token: action.payload.DT.refresh_token,
                    role: action.payload.DT.role,
                    username: action.payload.DT.username
                },
                isAuthued: true
            };

        default: return state;
    }
};

export default userReducer;