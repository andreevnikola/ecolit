export const getAvatar = (full_name: string): string =>
  `https://api.dicebear.com/7.x/thumbs/svg?seed=${full_name}`;