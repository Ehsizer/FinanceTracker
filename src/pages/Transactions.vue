<template>
  <div class="text-white">
    <h1 class="text-2xl font-bold mb-4">Доходы и расходы</h1>
    <div class="bg-gray-800 p-4 rounded shadow-md max-w-xl mx-auto">
      <!-- Форма добавления транзакции -->
<form @submit.prevent="addTransaction" class="transaction-form">
  <input
    v-model="newTransaction.title"
    placeholder="Название"
    type="text"
  />
  <input
    v-model.number="newTransaction.amount"
    type="number"
    placeholder="Сумма"
  />
  <select v-model="newTransaction.type">
    <option value="income">Доход</option>
    <option value="expense">Расход</option>
  </select>
  <button type="submit">Добавить</button>
</form>

      <!-- История транзакций -->
<div class="transactions-container">
  <h2>Последние транзакции</h2>
  <ul class="transactions-list">
    <li v-for="tx in store.transactions" :key="tx.id" :class="tx.type">
      <div class="tx-info">
        <span>Дата транзакции: {{ tx.date }}</span>
        <span>Категория: {{ tx.category }}</span>
        <span>{{ tx.title }}</span>
      </div>
      <span class="tx-amount">
        {{ tx.type === 'income' ? '+' : '-' }}{{ tx.amount }} ₽
      </span>
    </li>
  </ul>
  <p v-if="store.transactions.length === 0" class="no-transactions">Нет транзакций</p>
</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTransactionStore } from '@/stores/transactions'
import type { Transaction } from '@/stores/transactions'
import { v4 as uuidv4 } from 'uuid'


// Подключаем стор
const store = useTransactionStore()

// Форма новой транзакции
const newTransaction = ref<Omit<Transaction, 'id' | 'date' | 'category'>>({
  title: '',
  amount: 0,
  type: 'income',
})

// Реактивный массив транзакций из стора
const transactions = store.transactions

// Добавление транзакции
function addTransaction() {
  if (!newTransaction.value.title || newTransaction.value.amount <= 0) return

  const tx: Transaction = {
    id: uuidv4(),
    title: newTransaction.value.title,
    amount: newTransaction.value.amount,
    type: newTransaction.value.type,
    category: 'Прочее',
    date: new Date().toISOString().slice(0, 10),
  }

  store.addTransaction(tx)

  // Сбрасываем форму
  newTransaction.value.title = ''
  newTransaction.value.amount = 0
  newTransaction.value.type = 'income'
}
</script>

<style scoped>
.input {
  border: 1px solid #444;
}
/* Форма */
.transaction-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: #1f1f1f; /* чуть темнее для минимализма */
  padding: 16px;
  border-radius: 8px;
  max-width: 600px;
  margin: 0 auto 24px;
  color: white;
  box-sizing: border-box;
}

.transaction-form input,
.transaction-form select {
  width: 100%;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #444;
  background-color: #2b2b2b;
  color: white;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
}

.transaction-form input::placeholder {
  color: #888;
}

.transaction-form button {
  padding: 10px 16px;
  border-radius: 6px;
  border: none;
  background-color: #333; /* более тёмная кнопка */
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.transaction-form button:hover {
  background-color: #555; /* чуть светлее при hover */
}

/* История транзакций */
.transactions-container {
  color: white;
  max-width: 1400px; /* расширяем блок истории */
  width: 500px;
  margin: 0 auto;
  padding: 16px;
}

.transactions-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.transactions-list li {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #2b2b2b;
  padding: 14px 16px;
  border-radius: 15px;
  margin-bottom: 10px;
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

.no-transactions {
  color: #aaa;
  margin-top: 8px;
  text-align: center;
}
</style>
