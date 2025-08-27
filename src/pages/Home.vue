<template>
  <div class="container">
    <h1>💸 Финансовый трекер</h1>
    <p>Баланс: <strong>{{ balance }} ₽</strong></p>

    <h2>Последние транзакции</h2>
    <ul>
      <li v-for="tx in store.transactions" :key="tx.id">
        {{ tx.date }} — {{ tx.category }} —
        <span :style="{ color: tx.type === 'income' ? 'lightgreen' : 'tomato' }">
          {{ tx.type === 'income' ? '+' : '-' }}{{ tx.amount }} ₽
        </span>
      </li>
    </ul>

    <router-link to="/add">
      <button>Добавить транзакцию</button>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { useTransactionStore } from '../stores/transactions'
import { computed } from 'vue'

const store = useTransactionStore()
const balance = computed(() => store.balance)
</script>
