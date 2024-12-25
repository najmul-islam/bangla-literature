const link = (user, url) => {
  switch (user?.role) {
    case "user":
      return `/user/${url}`;
    case "moderator":
      return `/moderator/${url}`;
    case "admin":
      return `/admin/${url}`;
    default:
      return `/${url}`;
  }
};

export default link;
