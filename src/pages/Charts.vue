<template>
  <div class="chart-container">
    <h1 class="chart-title">График доходов и расходов</h1>
    <div class="chart-wrapper">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
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
import { useTransactionStore } from '@/stores/transactions'

// Регистрируем Chart.js компоненты
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

const store = useTransactionStore()

const chartData = computed(() => {
  const labelsSet = new Set<string>()
  const incomeMap = new Map<string, number>()
  const expenseMap = new Map<string, number>()

  for (const tx of store.transactions) {
    labelsSet.add(tx.date)
    if (tx.type === 'income') {
      incomeMap.set(tx.date, (incomeMap.get(tx.date) || 0) + tx.amount)
    } else {
      expenseMap.set(tx.date, (expenseMap.get(tx.date) || 0) + tx.amount)
    }
  }

  const sortedLabels = Array.from(labelsSet).sort()
  const incomeData = sortedLabels.map(date => incomeMap.get(date) || 0)
  const expenseData = sortedLabels.map(date => expenseMap.get(date) || 0)

  // Остаток бюджета по датам
  let cumulativeBalance = 0
  const balanceData = sortedLabels.map(date => {
    cumulativeBalance += (incomeMap.get(date) || 0) - (expenseMap.get(date) || 0)
    return cumulativeBalance
  })

  return {
    labels: sortedLabels,
    datasets: [
      {
        label: 'Доходы',
        data: incomeData,
        fill: false,
        tension: 0.4,
        borderColor: 'rgb(34, 197, 94)',
        pointBackgroundColor: 'rgb(34, 197, 94)',
      },
      {
        label: 'Расходы',
        data: expenseData,
        fill: false,
        tension: 0.4,
        borderColor: 'rgb(239, 68, 68)',
        pointBackgroundColor: 'rgb(239, 68, 68)',
      },
      {
        label: 'Остаток бюджета',
        data: balanceData,
        fill: false,
        tension: 0.4,
        borderColor: 'rgb(0, 123, 255)',
        borderDash: [5, 5],
        pointBackgroundColor: 'rgb(0, 123, 255)',
      },
    ],
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index' as const, // фикс TypeScript
    intersect: false,
  },
  plugins: {
    legend: {
      labels: { color: '#fff', font: { size: 16 } },
    },
    tooltip: {
      enabled: true,
      backgroundColor: '#444',
      titleFont: { size: 18, weight: 'bold' as const }, // фикс для TS
      bodyFont: { size: 16 },
      padding: 16,
      cornerRadius: 8,
      callbacks: {
        label: function(context: any) {
          const type = context.dataset.label
          const value = context.raw
          return `${type}: ${value} ₽`
        }
      }
    },
  },
  scales: {
    x: { ticks: { color: '#ccc', font: { size: 14 } } },
    y: { ticks: { color: '#ccc', font: { size: 14 } } },
  },
}
</script>

<style scoped>
.chart-container {
  color: white;
  padding: 16px;
}

.chart-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
}

.chart-wrapper {
  background-color: #2b2b2b;
  padding: 16px;
  border-radius: 10px;
  height: 60vh;       /* Высота графика */
  width: 100%;
  max-width: 900px;   /* Ограничение ширины */
  margin: 0 auto;
}
</style>
