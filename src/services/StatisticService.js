import { api, manageError } from 'boot/axios';
import { useTokenStore } from 'stores/token-store';

const tokenStore = useTokenStore();

export async function getTagDistribution() {
  return api.get('/statistics/activities/tags?field=tagId', {
    headers: {
      Authorization: `token ${tokenStore.value}`,
    },
  }).catch(manageError);
}
