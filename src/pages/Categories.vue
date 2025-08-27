<template>
  <div class="p-4 bg-gray-900 text-white min-h-screen">
    <h2 class="text-xl font-bold mb-4">Категории</h2>

    <form @submit.prevent="addCategory" class="flex gap-2 mb-4">
      <input
        v-model="newCategory"
        placeholder="Новая категория"
        class="bg-gray-700 text-white p-2 rounded outline-none focus:ring-2 focus:ring-green-400 flex-1"
      />
      <button
        type="submit"
        class="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded"
      >
        Добавить
      </button>
    </form>

    <ul class="space-y-2">
      <li
        v-for="(cat, index) in categories"
        :key="index"
        class="flex justify-between items-center bg-gray-800 p-2 rounded"
      >
        <span>{{ cat }}</span>
        <button
          @click="removeCategory(index)"
          class="text-red-400 hover:text-red-200"
        >
          ❌
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const newCategory = ref('')
const categories = ref<string[]>([])

function addCategory() {
  if (newCategory.value.trim() === '') return
  categories.value.push(newCategory.value.trim())
  newCategory.value = ''
}

function removeCategory(index: number) {
  categories.value.splice(index, 1)
}
</script>
