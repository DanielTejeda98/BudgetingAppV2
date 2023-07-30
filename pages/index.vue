<template>
  <UserLayout>
    <div>
      <h1>Welcome {{ user.getUserDisplayName }} to the budget app!</h1>
    </div>
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-card
            title="Income"
            min-width="45%"
            color="grey-lighten-4"
            :text="`$${budget.getTotalIncome.toFixed(2)}`"
          >
            <v-card-actions>
              <v-btn @click.stop="toggleBottomDrawer(drawerActions.INCOME)"
                >Add new income</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card
            title="Expenses"
            min-width="45%"
            color="grey-lighten-4"
            :text="`$${budget.getTotalExpense.toFixed(2)}`"
          >
            <v-card-actions>
              <v-btn @click.stop="toggleBottomDrawer(drawerActions.EXPENSES)"
                >Add new expense</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8">
          <h2>Latest Expenses</h2>
        </v-col>
        <v-col cols="4">
          <v-btn
            size="small"
            @click.stop="toggleBottomDrawer(drawerActions.EXPENSES)"
            >Add Expense</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-table class="expense-table">
          <thead>
            <tr>
              <th class="text-left">Date</th>
              <th class="text-left">Description</th>
              <th class="text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="expense in latestExpense" :key="expense.id">
              <td>{{ getFormattedDate(expense.date) }}</td>
              <td>{{ expense.description }}</td>
              <td>-${{ expense.value.toFixed(2) }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-row>

      <v-row>
        <v-col cols="8">
          <h2>Latest Income</h2>
        </v-col>
        <v-col cols="4">
          <v-btn
            size="small"
            @click.stop="toggleBottomDrawer(drawerActions.INCOME)"
            >Add Income</v-btn
          >
        </v-col>
      </v-row>

      <v-row>
        <v-table class="income-table">
          <thead>
            <tr>
              <th class="text-left">Date</th>
              <th class="text-left">Description</th>
              <th class="text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="income in latestIncome" :key="income.id">
              <td>{{ getFormattedDate(income.date) }}</td>
              <td>{{ income.description }}</td>
              <td>{{ income.value.toFixed(2) }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-row>
    </v-container>
    <v-navigation-drawer
      location="bottom"
      v-model="showDrawer"
      scrim
      style="height: fit-content"
    >
      <v-container>
        <v-row>
          <h2>Add {{ activeDrawer }}</h2>
        </v-row>
        <v-row style="margin-top: 1rem">
          <form @submit.prevent="submitEntry" style="width: 100%">
            <v-text-field
              v-model="entry.description"
              required
              label="Description"
            ></v-text-field>

            <v-text-field
              v-model="entry.date"
              required
              label="Date"
              type="date"
            ></v-text-field>

            <v-text-field
              v-model="entry.value"
              required
              type="number"
              label="Amount"
            ></v-text-field>

            <v-btn type="submit" block class="mt-2"
              >Create {{ activeDrawer }}</v-btn
            >
          </form>
        </v-row>
      </v-container>
    </v-navigation-drawer>
  </UserLayout>
</template>

<script setup>
import UserLayout from "~/layouts/userLayout.vue";
import { userStore } from "~/store/userStore";
import { budgetStore } from "~/store/budgetStore";

const user = userStore();
const budget = budgetStore();

const showDrawer = useState("showDrawer", () => false);
const activeDrawer = useState("activeDrawer", () => "Closed");
const entry = useState("entry", () => {
  return {
    date: "",
    value: 0,
    description: "",
  };
});

const drawerActions = {
  EXPENSES: "Expense",
  INCOME: "Income",
  CLOSED: "closed",
};

const latestExpense = computed(() => {
  const expsensesList = budget.getExpenses;
  if (expsensesList.length > 4) {
    return expsensesList.slice(-4).reverse();
  }
  return expsensesList.reverse();
});

const latestIncome = computed(() => {
  const incomeList = budget.getIncome;
  if (incomeList.length > 4) {
    return incomeList.slice(-4).reverse();
  }
  return incomeList.reverse();
});

const toggleBottomDrawer = (action) => {
  action
    ? (activeDrawer.value = action)
    : (activeDrawer.value = drawerActions.CLOSED);

  showDrawer.value = activeDrawer.value != drawerActions.CLOSED;
};

const submitEntry = async (form) => {
  console.log(form);
  const { valid } = await form.value.validate();
  console.log(entry.value);
  if (valid) {
    console.log("form validated, we can submit");
  }
};

const getFormattedDate = (date) => {
  return new Date(date).toLocaleDateString("en-us");
};
</script>

<style lang="scss" scoped>
.budget-income {
  display: flex;
}

.expense-table,
.income-table {
  min-width: 100%;
}
</style>
