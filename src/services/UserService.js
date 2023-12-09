import { api } from 'boot/axios';

export async function initUser(token) {
  return api.get('me', {
    headers: {
      Authorization: `token ${token}`,
    },
  }).then(({ data }) => data);
}

export async function getPicture(token) {
  return api.get('me/picture', {
    headers: {
      Authorization: `token ${token}`,
    },
    responseType: 'arraybuffer',
  }).then((response) => {
    const imageBase64 = btoa(
      new Uint8Array(response.data)
        .reduce((data, byte) => data + String.fromCharCode(byte), ''),
    );
    return `data:${response.headers['content-type']};base64,${imageBase64}`;
  });
}
