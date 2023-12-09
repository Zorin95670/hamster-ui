import { onMounted, onUnmounted, ref } from 'vue';
import Events from 'src/composables/Events';

export function useDialog(key, onOpen) {
  const show = ref(false);
  let dialogEventSubscription;

  function onDialogEvent(event) {
    if (event.key !== key) {
      return;
    }

    if (event.type === 'close') {
      show.value = false;
      return;
    }

    show.value = true;

    if (onOpen) {
      onOpen(event);
    }
  }

  onMounted(() => {
    dialogEventSubscription = Events.DialogEvent.subscribe(onDialogEvent);
  });

  onUnmounted(() => {
    dialogEventSubscription.unsubscribe();
  });

  return { show };
}
