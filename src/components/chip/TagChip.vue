<template>
  <div :class="['tag', `bg-${tag.backgroundColor}`, `border-${tag.textColor}`]">
    <ul>
      <li :class="`text-${tag.textColor}`">
        {{tag.name}}
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  tag: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.tag {
  height: 18px;
  padding-right: 4px;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  clip-path: polygon(10px 0, 100% 0, 100% 100%, 10px 100%, 0 70%, 0 30%);
  border-radius: 1px;
  margin-left: 2px;
  margin-right: 2px;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    margin-left: 15px;
  }

  li {
    font-size: 11px;
    display: flex;
    align-items: center;
  }

  li::before {
    font-size: 15px;
    content: "\2022"; /* Add content: \2022 is the CSS Code/unicode for a bullet */
    font-weight: bold; /* If you want it to be bold */
    display: inline-block; /* Needed to add space between the bullet and the text */
    width: 10px; /* Also needed for space (tweak if needed) */
    margin-left: -12px; /* Also needed for space (tweak if needed) */
    margin-top: 2px;
  }
}
</style>
