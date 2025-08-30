<template>
  <div class="text-white p-4">
    <h1 class="text-2xl font-bold mb-4">График доходов и расходов</h1>
    <div class="bg-gray-800 p-4 rounded">
      <Chart
        type="line"
        :data="chartData"
        :options="chartOptions"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js'
import { Chart } from 'vue-chartjs'
import { useTransactionStore } from '@/stores/transactions'

// Регистрируем компоненты Chart.js
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

const store = useTransactionStore()

const chartData = computed(() => {
  const labelsSet = new Set<string>()
  const incomeMap = new Map<string, number>()
  const expenseMap = new Map<string, number>()

  for (const tx of store.transactions) {
    const date = tx.date
    labelsSet.add(date)

    if (tx.type === 'income') {
      incomeMap.set(date, (incomeMap.get(date) || 0) + tx.amount)
    } else {
      expenseMap.set(date, (expenseMap.get(date) || 0) + tx.amount)
    }
  }

  const sortedLabels = Array.from(labelsSet).sort()
  const incomeData = sortedLabels.map(date => incomeMap.get(date) || 0)
  const expenseData = sortedLabels.map(date => expenseMap.get(date) || 0)

  return {
    labels: sortedLabels,
    datasets: [
      {
        label: 'Доходы',
        data: incomeData,
        fill: false,
        tension: 0.4,
        borderColor: 'rgb(34, 197, 94)',
      },
      {
        label: 'Расходы',
        data: expenseData,
        fill: false,
        tension: 0.4,
        borderColor: 'rgb(239, 68, 68)',
      },
    ],
  }
})

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      labels: { color: '#fff' },
    },
  },
  scales: {
    x: {
      ticks: { color: '#ccc' },
    },
    y: {
      ticks: { color: '#ccc' },
    },
  },
}
</script>
