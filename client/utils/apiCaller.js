import fetch from 'isomorphic-fetch';

export const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.BASE_URL || (`http://localhost:3000`) :
  '';

export default function callApi(endpoint, method = 'get', body) {
  console.log(`Send reqvest to ${endpoint}`);
  var headers = { 'content-type': 'application/json' };
  if (method == 'get'){
    headers = '';
  }
  return fetch(endpoint, {
    headers: headers,
    method,
    body: JSON.stringify(body),
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    return json;
  })
  .then(
    response => response,
    error => error
  );
}
