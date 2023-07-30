<template>
  <v-navigation-drawer v-if="mobile" location="left" v-model="showSidebar">
    <slot />
  </v-navigation-drawer>
</template>

<script setup>
import { useDisplay } from "vuetify";
const { mobile } = useDisplay();
const { $listen } = useNuxtApp();

const showSidebar = useState("showSidebar", () => false);

$listen("toggleSidebar", () => {
  showSidebar.value = !showSidebar.value;
});
</script>
