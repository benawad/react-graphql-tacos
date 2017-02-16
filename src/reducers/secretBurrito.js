export default function setSecretBurritos(state = [], action) {
  switch (action.type) {
    case 'SET_SECRET_BURRITOS':
      return action.secretBurritos.data.updateSecretBurritos.user.secretBurritos;
      
    default:
      return state;
  }
}
