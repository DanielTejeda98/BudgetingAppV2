<template>
  <div class="account-sidebar-wrapper">
    <h2>Welcome {{ user.getUserDisplayName || "User" }},</h2>
  </div>
</template>

<script setup>
import { userStore } from "~/store/userStore";

const user = userStore();
</script>

<style lang="scss" scoped>
.account-sidebar-wrapper {
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>
