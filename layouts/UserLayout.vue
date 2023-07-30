<template>
  <v-app>
    <v-app-bar v-if="mobile" color="primary">
      <v-app-bar-nav-icon variant="text" @click="toggleSidebar">
      </v-app-bar-nav-icon>
    </v-app-bar>
    <TheSidebar>
      <AccountSidebar v-if="displayedSidebar === sidebarKeys.ACCOUNT" />
      <MenuSidebar />
    </TheSidebar>
    <div class="app-wrapper" :class="{ mobile: mobile }">
      <slot />
    </div>
  </v-app>
</template>

<script setup>
import TheSidebar from "~/components/TheSidebar.vue";
import AccountSidebar from "~/components/AccountSidebar.vue";
import MenuSidebar from "~/components/MenuSidebar.vue";
import { useDisplay } from "vuetify";
const { mobile } = useDisplay();
const { $event } = useNuxtApp();
const sidebarKeys = {
  MENU: "menu_sidebar",
  ACCOUNT: "account_sidebar",
};

const displayedSidebar = useState(() => sidebarKeys.MENU);

const toggleSidebar = () => {
  $event("toggleSidebar");
};
</script>

<style lang="scss">
.app-wrapper {
  &.mobile {
    margin-top: 4rem;
  }
}
</style>
