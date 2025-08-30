<template>
  <div class="add-container">
    <h2>Добавить транзакцию</h2>

    <form @submit.prevent="handleSubmit" class="add-form">
      <div class="form-group">
        <label>Тип</label>
        <select v-model="type">
          <option value="income">Доход</option>
          <option value="expense">Расход</option>
        </select>
      </div>

      <div class="form-group">
        <label>Категория</label>
        <input v-model="category" placeholder="Введите категорию" required />
      </div>

      <div class="form-group">
        <label>Сумма</label>
        <input type="number" v-model.number="amount" placeholder="Введите сумму" required />
      </div>

      <div class="form-group">
        <label>Дата</label>
        <input type="date" v-model="date" required />
      </div>

      <div class="form-group">
        <label>Заметка</label>
        <input v-model="note" placeholder="Опционально" />
      </div>

      <button type="submit" class="save-button">Сохранить</button>
    </form>

    <router-link to="/">
      <button class="back-button">Назад</button>
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
    title: note.value || category.value
  })
  router.push('/')
}
</script>

<style scoped>
.add-container {
  max-width: 1200px;
  margin: 0 auto;
  width: 700px;
  padding: 20px;
  color: white;
  font-family: 'Arial', sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

/* Форма */
.add-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
  background-color: #1f1f1f;
  padding: 20px;
  border-radius: 10px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 2px;
}

.form-group input,
.form-group select {
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #444;
  background-color: #2b2b2b;
  color: white;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
}

.form-group input::placeholder {
  color: #888;
}

/* Кнопки */
.save-button,
.back-button {
  padding: 12px;
  border-radius: 6px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
  margin-top: 10px;
}

.save-button {
  background-color: #333;
  color: white;
}

.save-button:hover {
  background-color: #555;
}

.back-button {
  background-color: #444;
  color: #fff;
}

.back-button:hover {
  background-color: #666;
}
</style>
