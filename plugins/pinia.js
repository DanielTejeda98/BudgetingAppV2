import { userStore } from "~/store/userStore";
import { budgetStore } from "~/store/budgetStore";

export default defineNuxtPlugin(({ $pinia }) => {
  return {
    provide: {
      userStore: userStore($pinia),
      budgetStore: budgetStore($pinia),
    },
  };
});
