/**
 * Fetches user data from the Lagan API.
 *
 * If a user ID is provided, fetches details for that specific user.
 * Otherwise, fetches a list of all  users.
 *
 * @param {number|string} [user_id] - The ID of the user to fetch details for. If not provided, fetches a list of users.
 */
const emulator = true;
let host = null;
if (emulator) {
  host = "http://192.168.1.67:8000"; //android
} else {
  host = "http://127.0.0.1:8000"; //web
}

export function getUsers(user_id) {
  let url = user_id
    ? `${host}/api/router/user/${user_id}/`
    : `${host}/api/router/user/`;
  console.log("USER:", url);
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error(`ERROR: ${response.status} ${response.statusText}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    })

    .catch((error) => {
      console.error(`ERROR: ${error}`);
      throw error;
    });
}

/**
 * Fetches data from the Lagan API for a specified model.
 *
 * If a user ID is provided, fetches details for that specific user within the model.
 * Otherwise, fetches a list of users.
 *
 * @param {string} model_name - The name of the model to fetch data from.
 * @param {number|string} [user_id] - The ID of the user to fetch details for. If not provided, fetches a list of that model.
 * @returns {Promise<Object>} A promise that resolves to the fetched data.
 * @throws {Error} Throws an error if the fetch operation fails.
 */
export function get_data(model_name, user) {
  let url = user[model_name];

  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error(`ERROR: ${response.status} ${response.statusText}`);
        return null;
      }
    })
    .catch((error) => {
      return null;
      //   throw error;
    });
}
