/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: { currentUser?: API.User } | undefined) {
  const {currentUser} = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.userRole.includes('管理'),
  };
}
