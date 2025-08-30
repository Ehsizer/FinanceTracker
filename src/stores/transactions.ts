// src/stores/transactions.ts
import { defineStore } from 'pinia'

export interface Transaction {
  id: string
  type: 'income' | 'expense'
  amount: number
  category: string
  date: string
  note?: string
  title: string
}

export const useTransactionStore = defineStore('transactions', {
  state: () => ({
    transactions: [] as Transaction[],
  }),
  getters: {
    incomes: state => state.transactions.filter(t => t.type === 'income'),
    expenses: state => state.transactions.filter(t => t.type === 'expense'),
    balance: state =>
      state.transactions.reduce((acc, t) =>
        t.type === 'income' ? acc + t.amount : acc - t.amount, 0),
  },
  actions: {
    addTransaction(tx: Transaction) {
      this.transactions.unshift(tx)
    },
  },
})
