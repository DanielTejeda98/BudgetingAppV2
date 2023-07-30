import { defineStore } from "pinia";

export const budgetStore = defineStore("budget", {
  state: () => ({
    income: [],
    expsenses: [],
  }),
  actions: {
    setIncome(income) {
      this.income.push(income);
    },
    setExpenses(expense) {
      this.expsenses.push(expense);
    },
  },
  getters: {
    getExpenses() {
      return this.expsenses;
    },
    getIncome() {
      return this.income;
    },
    getTotalIncome() {
      return this.income?.reduce((acc, current) => (acc += current.value), 0);
    },
    getTotalExpense() {
      return this.expsenses?.reduce(
        (acc, current) => (acc += current.value),
        0
      );
    },
  },
});
