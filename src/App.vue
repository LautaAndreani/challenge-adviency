<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { nanoid } from 'nanoid'
import { api } from './api/gifts'
import { Gift } from "./types/types"

import Form from './components/Form.vue'


const gifts = ref<Gift[]>([])
const showModal = ref(false)
const isEdit = ref(false)
const isLoading = ref(false)

const values = reactive({ value: '', quantity: 0, image: '', addressee: '', id: '', price: 0 })

function getRandomGifts() {
  const gifts = ["Medias", "Zapatillas", "Macbook", "iMac", "Laptop", "Auriculares", "Mouse"]
  const getRandom = Math.floor(Math.random() * gifts.length) - 1
  values.value = gifts.at(getRandom) || '' 
}


function handleModal() {
  showModal.value = !showModal.value
}

function handleResetForm() {
  values.quantity = 0
  values.value = ''
  values.image = ''
  values.addressee = ''
}

function handleAdd() {
  if (values.value === '' || gifts.value.some((gift) => gift.gift.includes(values.value))) return

  gifts.value = [
    ...gifts.value,
    { gift: values.value, quantity: values.quantity, image: values.image, addresse: values.addressee, price: values.price, id: nanoid() },
  ]

  return handleResetForm()
}

function handleRemove(giftValue: string) {
  return (gifts.value = gifts.value.filter((gift) => gift.gift !== giftValue))
}

function handleEditModal(gift: Gift) {
  isEdit.value = true

  values.value = gift.gift
  values.addressee = gift.addresse
  values.image = gift.image
  values.quantity = gift.quantity
  values.id = gift.id!!
  handleModal()
}

function handleEditGift(id: string) {
  if (gifts.value.find((gift) => gift.id === id)) {
    const editGift = ref<Gift[]>(
      gifts.value.map((gift) => {
        if (gift.id === values.id) {
          return { ...gift, gift: values.value, quantity: values.quantity, addresse: values.addressee, image: values.image }
        }
        return gift
      })
    )

    isEdit.value = false
    handleModal()
    handleResetForm()
    return (gifts.value = editGift.value)
  }
}

watch(gifts, () => localStorage.setItem('gifts', JSON.stringify(gifts.value)))

onMounted(async () => {
  try {
    isLoading.value = true
    await api.list().then((res) => (gifts.value = res))
    return (isLoading.value = false)
  } catch (error) {
    isLoading.value = true
    if (error instanceof Error) return console.error(error.message)
  }
})
</script>

<template>
  <main class="w-full h-screen flex justify-center items-center">
    <div
      class="container max-w-xl min-h-[30rem] max-h-[30rem] overflow-auto rounded-md flex flex-col bg-water_green p-10 border-b-8 border-soft_red"
    >
      <header>
        <h1 class="text-3xl font-bold text-white">Gifts 🎁</h1>
      </header>

      <Form
        v-if="showModal"
        @keyup.esc="showModal = !showModal"
        :getRandomGifts="getRandomGifts"
        :isEdit="isEdit"
        :values="values"
        :handleResetForm="handleResetForm"
        :handleAdd="handleAdd"
        :handleModal="handleModal"
        @edit="(id: string) => handleEditGift(id)"
        @cancelEdit="isEdit = false"
      />

      <button
        class="mt-4 bg-soft_red p-4 text-white rounded-md border-none focus:outline-outline_red focus:outline focus:outline-offset-2 focus:outline-4"
        @click="handleModal"
        autofocus
      >
        Add gift ✨
      </button>

      <template v-if="isLoading">
        <p class="text-center mt-4 text-white">Loading...</p>
      </template>
      <small class="text-center mt-4 text-white" v-if="!gifts.length && !isLoading">No gifts grinch! add something</small>

      <ul class="mt-4 text-custom_dark flex flex-col gap-2" v-if="gifts.length">
        <li v-for="gift in gifts" :key="gift.id" class="flex justify-between items-center w-full text-white">
          <p class="flex items-center gap-4">
            <img
              :src="gift.image"
              :alt="gift.gift"
              class="min-w-[4rem] max-w-[4rem] min-h-[4rem] max-h-20 rounded-md object-cover"
            />
            <span>
              {{ gift.gift }} <small v-if="gift.quantity !== 0">({{ gift.quantity }})</small> <small v-if="gift.price"> - {{ gift.price.toLocaleString("es-ar", {style: "currency", currency: "ARS", }) }}</small>
              <p class="text-sm text-gray-300">{{ gift.addresse }}</p>
            </span>
          </p>
          <span class="flex gap-4">
            <button class="text-gray-300" aria-label="edit gift" @click="handleEditModal(gift)">&#9998;</button>
            <button class="bg-soft_red py-2 px-4 rounded-md transition hover:bg-red-400" @click="handleRemove(gift.gift)">
              ×
            </button>
          </span>
        </li>
      </ul>

      <button v-if="gifts.length" class="bg-soft_red p-2 mt-4 rounded-md text-white hover:bg-red-400" @click="gifts = []">
        Delete all 🗑
      </button>
    </div>
  </main>
</template>

<style scoped></style>
