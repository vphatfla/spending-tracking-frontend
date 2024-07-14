import { authHeader } from '../auth/authHeader';
import { BACKEND_BASE_URL } from '../configuration/config';

export async function getTransactionsByUserId(user_id) {
  try {
    const response = await (
      await fetch(BACKEND_BASE_URL + '/transactions?user_id=' + user_id, {
        method: 'GET',
        headers: authHeader(),
      })
    ).json();
    if (response === null) return [];
    console.log('res = ' + JSON.stringify(response));
    return response;
  } catch (err) {
    return err;
  }
}
