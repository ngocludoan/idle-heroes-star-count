<script setup lang="ts">
import { darkTheme } from "naive-ui";
const emit = defineEmits<{
  (e: "change", theme: any): void;
}>();

const handleChange = (value: any) => {
  if (value === "darkTheme") {
    emit("change", darkTheme);
  }
  if (value === "lightTheme") {
    emit("change", null);
  }
};
</script>

<template>
  <n-switch
    class="theme-switch"
    size="large"
    checked-value="darkTheme"
    unchecked-value="lightTheme"
    @update:value="handleChange"
  >
    <template #checked>Dark</template>
    <template #unchecked>Light</template>
  </n-switch>
</template>

<style lang="scss">
.theme-switch {
  position: fixed;
  top: 20px;
  right: 20px;
}
</style>
