<script setup lang="ts">
import { ref, computed } from "vue";
import Home from "./components/Home.vue";
import ThemeSwitch from "./components/ThemeSwitch.vue";

const theme = ref<string | null>(null);
const classTheme = computed(() => {
  if (!theme.value) {
    return "light-theme";
  }

  return "dark-theme";
});

const changeTheme = (val: any) => {
  theme.value = val;
};
</script>

<template>
  <n-config-provider :theme="theme" :class="classTheme" class="root">
    <ThemeSwitch @change="changeTheme" />
    <Home />
  </n-config-provider>
</template>

<style lang="scss">
#app {
  font-family: Lato;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .root {
    min-height: 100vh;
  }
  .light-theme {
    color: #2c3e50;
    background-color: #fff;
  }
  .dark-theme {
    color: rgba(255, 255, 255, 0.82);
    background-color: rgb(24, 24, 28);
  }
}
</style>
