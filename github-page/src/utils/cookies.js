export function getUserFromCookie() {
  const name = 'Usercookie=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(';');
  for (let c of cookies) {
    c = c.trim();
    if (c.startsWith(name)) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}