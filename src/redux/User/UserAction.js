export const userActions = (user) => {
    return {
      type: 'LOGIN_USER',
      payload: user,
    };
  };