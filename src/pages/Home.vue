<template>
  <div class="main-container">
    <h1>💸 Финансовый трекер</h1>

    <div class="balance-card">
      Баланс: <strong>{{ balance }} ₽</strong>
    </div>

    <h2>Последние транзакции</h2>
    <ul class="transactions-list">
      <li v-for="tx in store.transactions" :key="tx.id" :class="tx.type">
        <div class="tx-info">
          <span>Дата: {{ tx.date }}</span>
          <span>Категория: {{ tx.category }}</span>
          <span>{{ tx.title }}</span>
        </div>
        <span class="tx-amount">
          {{ tx.type === 'income' ? '+' : '-' }}{{ tx.amount }} ₽
        </span>
      </li>
    </ul>

    <router-link to="/add">
      <button class="add-button">Добавить транзакцию</button>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { useTransactionStore } from '../stores/transactions'
import { computed } from 'vue'

const store = useTransactionStore()
const balance = computed(() => store.balance)
</script>

<style scoped>
.main-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  color: white;
  font-family: 'Arial', sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 16px;
}

.balance-card {
  background-color: #1f1f1f;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  font-size: 18px;
  margin-bottom: 24px;
}

h2 {
  margin-bottom: 12px;
}

/* Список транзакций */
.transactions-list {
  list-style: none;
  padding: 0;
  margin: 0 0 24px;
}

.transactions-list li {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #2b2b2b;
  padding: 14px 16px;
  border-radius: 8px;
  margin-bottom: 10px;
  transition: background-color 0.2s;
}

.transactions-list li:hover {
  background-color: #3a3a3a;
}

.tx-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.tx-amount {
  font-weight: bold;
}

li.income .tx-amount {
  color: lightgreen;
}

li.expense .tx-amount {
  color: tomato;
}

/* Кнопка */
.add-button {
  display: block;
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  border: none;
  background-color: #333;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  text-align: center;
}

.add-button:hover {
  background-color: #555;
}
</style>
