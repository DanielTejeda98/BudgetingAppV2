<template>
  <div class="menu-sidebar-wrapper">
    <v-container>
      <v-row>
        <v-row class="menu-sidebar-top">
          <h2>Welcome {{ user.getUserDisplayName || "User" }},</h2>
        </v-row>
        <v-row> Menu </v-row>
        <v-row>
          <v-list>
            <v-list-item title="Home" />
            <v-list-item title="Income" />
            <v-list-item title="Expenses" />
            <v-list-item title="Savings" />
          </v-list>
        </v-row>
      </v-row>

      <v-row class="account-menu">
        <v-divider></v-divider>
        <v-list>
          <v-list-item
            v-if="user.getUserDisplayName"
            :title="user.getUserDisplayName"
          ></v-list-item>
          <v-list-item title="Log out"></v-list-item>
        </v-list>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { userStore } from "~/store/userStore";

const user = userStore();
</script>

<style lang="scss" scoped>
.menu-sidebar-wrapper {
  padding-left: 1rem;
  padding-right: 1rem;
  height: 100%;

  .v-container {
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    align-items: flex-start;

    .menu-sidebar-top {
      padding-top: 1rem;
    }

    .v-row,
    .v-list,
    .v-list-item {
      width: 100%;
    }

    .account-menu {
      margin-top: auto;
    }
  }
}
</style>
