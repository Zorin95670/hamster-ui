import { api, manageError } from 'boot/axios';
import { useTokenStore } from 'stores/token-store';

const tokenStore = useTokenStore();

export function find(filters) {
  let queryParameters = '';
  Object.keys(filters).forEach((key) => {
    const value = filters[key];

    if (!value) {
      return;
    }
    queryParameters += queryParameters.length === 0 ? `?${key}=${value}` : `&${key}=${value}`;
  });

  return api.get(`activities${queryParameters}`, {
    headers: {
      Authorization: `token ${tokenStore.value}`,
    },
  }).catch(manageError);
}

export async function create(activity) {
  return api.post('activities', activity, {
    headers: {
      Authorization: `token ${tokenStore.value}`,
    },
  }).catch(manageError)
    .then(({ data }) => data);
}

export async function update(activity) {
  return api.put(`activities/${activity.id}`, {
    ...activity,
    tags: activity.tags.map(({ id }) => id),
  }, {
    headers: {
      Authorization: `token ${tokenStore.value}`,
    },
  }).catch(manageError);
}

export async function remove(id) {
  return api.delete(`activities/${id}`, {
    headers: {
      Authorization: `token ${tokenStore.value}`,
    },
  }).catch(manageError);
}
