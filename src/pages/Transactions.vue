<template>
  <div class="text-white">
    <h1 class="text-2xl font-bold mb-4">Доходы и расходы</h1>
    <div class="bg-gray-800 p-4 rounded shadow-md max-w-xl mx-auto">
      <form @submit.prevent="addTransaction" class="flex flex-col gap-4">
        <input v-model="newTransaction.title" placeholder="Название" class="input" />
        <input v-model.number="newTransaction.amount" type="number" placeholder="Сумма" class="input" />
        <select v-model="newTransaction.type" class="input">
          <option value="income">Доход</option>
          <option value="expense">Расход</option>
        </select>
        <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Добавить
        </button>
      </form>

      <div class="mt-6">
        <h2 class="text-xl font-semibold mb-2">История</h2>
        <ul>
          <li
            v-for="(tx, index) in transactions"
            :key="index"
            class="flex justify-between items-center py-2 border-b border-gray-700"
          >
            <span>{{ tx.title }} - {{ tx.amount }}₽</span>
            <span :class="tx.type === 'income' ? 'text-green-400' : 'text-red-400'">{{ tx.type }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Transaction {
  title: string
  amount: number
  type: 'income' | 'expense'
}

const transactions = ref<Transaction[]>([])

const newTransaction = ref<Transaction>({
  title: '',
  amount: 0,
  type: 'income',
})

function addTransaction() {
  if (!newTransaction.value.title || !newTransaction.value.amount) return
  transactions.value.push({ ...newTransaction.value })
  newTransaction.value.title = ''
  newTransaction.value.amount = 0
}
</script>

<style scoped>

</style>
