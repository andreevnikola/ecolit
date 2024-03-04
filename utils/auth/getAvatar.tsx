export const getAvatar = (email: string): string =>
  `https://api.dicebear.com/7.x/thumbs/png?seed=${email.split('@')[0]}&scale=70`;
