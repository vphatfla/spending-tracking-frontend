export async function loginFunction(username: string, password: string) {
  try {
    const response = await (
      await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          raw_password: password,
        }),
      })
    ).json();
    if (response.error) return response.error;
    localStorage.setItem('user_token', response.token);
    localStorage.setItem('user_id', response.id);
    return null;
  } catch (err) {
    return err;
  }
}
