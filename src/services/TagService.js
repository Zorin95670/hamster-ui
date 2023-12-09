import { api, manageError } from 'boot/axios';
import { useTokenStore } from 'stores/token-store';

const tokenStore = useTokenStore();

export async function create(tag) {
  return api.post('tags', tag, {
    headers: {
      Authorization: `token ${tokenStore.value}`,
    },
  }).catch(manageError)
    .then(({ data }) => data);
}

export async function update(tag) {
  return api.put(`tags/${tag.id}`, tag, {
    headers: {
      Authorization: `token ${tokenStore.value}`,
    },
  }).catch(manageError);
}

export function find(filters = {}) {
  let queryParameters = '';
  Object.keys(filters).forEach((key) => {
    const value = filters[key];

    if (!value) {
      return;
    }
    queryParameters += queryParameters.length === 0 ? `?${key}=${value}` : `&${key}=${value}`;
  });

  return api.get(`tags${queryParameters}`, {
    headers: {
      Authorization: `token ${tokenStore.value}`,
    },
  }).catch(manageError);
}
