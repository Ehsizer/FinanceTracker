<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Chart from 'chart.js/auto'

interface Transaction {
  title: string
  amount: number
  type: 'income' | 'expense'
  date: string
}

const props = defineProps<{
  transactions: Transaction[]
}>()

const canvas = ref<HTMLCanvasElement | null>(null)
let chart: Chart | null = null

function getChartData() {
  const grouped: Record<string, { income: number; expense: number }> = {}

  for (const tx of props.transactions) {
    const date = new Date(tx.date).toISOString().split('T')[0]
    if (!grouped[date]) {
      grouped[date] = { income: 0, expense: 0 }
    }
    grouped[date][tx.type] += tx.amount
  }

  const labels = Object.keys(grouped).sort()
  const incomeData = labels.map(d => grouped[d].income)
  const expenseData = labels.map(d => grouped[d].expense)

  return {
    labels,
    datasets: [
      {
        label: 'Доходы',
        data: incomeData,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.3)',
      },
      {
        label: 'Расходы',
        data: expenseData,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.3)',
      },
    ],
  }
}

function renderChart() {
  if (chart) chart.destroy()
  chart = new Chart(canvas.value!, {
    type: 'line',
    data: getChartData(),
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: 'white' } },
      },
      scales: {
        x: { ticks: { color: 'white' } },
        y: { ticks: { color: 'white' } },
      },
    },
  })
}

onMounted(renderChart)
watch(() => props.transactions, renderChart, { deep: true })
</script>
