
const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SIGN_OUT_USER":
      return {
        ...state,
        user: null,
      };
      case 'IS_LOADING' :
        return {
          ...state,
          isLoading: !state.isLoading
        };
        case 'OPERATION_TYPE' : 
        return {
          ...state,
          operationType: action.payload
        };
        case 'USER_PERSISTED' :
          return {
            ...state,
            isPersisted: action.payload
          }
        case 'UPDATE_AUTH_PENDING' :
          return {
            ...state,
            authPending: action.payload
          }
          case 'IS_MODAL_OPEN' : 
          return {
            ...state,
            isModalOpen: !state.isModalOpen
          }
          case 'UPDATE_PROFILE_PIC' : 
          return {
            ...state,
            user: {
              ...state.user,
              photoURL: action.payload
            }
          }
    default:
      return state;
  }
};

export default reducer;
