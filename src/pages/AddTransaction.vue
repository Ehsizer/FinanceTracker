<template>
  <div class="container">
    <h2>Добавить транзакцию</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label>Тип</label>
        <select v-model="type">
          <option value="income">Доход</option>
          <option value="expense">Расход</option>
        </select>
      </div>
      <div>
        <label>Категория</label>
        <input v-model="category" required />
      </div>
      <div>
        <label>Сумма</label>
        <input type="number" v-model.number="amount" required />
      </div>
      <div>
        <label>Дата</label>
        <input type="date" v-model="date" required />
      </div>
      <div>
        <label>Заметка</label>
        <input v-model="note" />
      </div>
      <button type="submit">Сохранить</button>
    </form>

    <router-link to="/">
      <button style="margin-top: 16px;">Назад</button>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { useTransactionStore } from '../stores/transactions'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const store = useTransactionStore()
const router = useRouter()

const type = ref<'income' | 'expense'>('income')
const category = ref('')
const amount = ref(0)
const date = ref('')
const note = ref('')

function handleSubmit() {
  store.addTransaction({
    id: Date.now().toString(),
    type: type.value,
    category: category.value,
    amount: amount.value,
    date: date.value,
    note: note.value,
  })
  router.push('/')
}
</script>
