<script lang="ts" setup>
import { PropType, VueElement } from 'vue'

const emit = defineEmits(['cancelEdit'])
const props =defineProps({
  handleAdd: {
    type: Function as PropType<() => void>,
    required: true,
  },
  handleModal: {
    type: Function as PropType<() => void>,
    required: true,
  }, 
  handleResetForm: {
    type: Function as PropType<() => void>,
    required: true,
  }, 
  values: {
    type: Object as PropType<{ value: string; quantity: number; image: string, addressee: string, id?: string }>,
    required: true,
    default: { value: '', quantity: 0, image: '', addressee: '' },
  },
  isEdit: Boolean,
})

const vFocus = { mounted: (el: VueElement) => el.focus() }

function handleSetGift() {
  props.handleModal()
  props.handleAdd()
}

function handleCancelEdit() {
  props.handleModal()
  props.handleResetForm()
  emit("cancelEdit")
}
</script>

<template>
  <div class="absolute top-0 w-full h-screen left-0 flex justify-center items-center backdrop-blur-md bg-slate-600 bg-opacity-70">
    <div class="container max-w-[25rem] bg-gray-300 p-10 rounded-md">
      <div class="close-container w-full flex justify-end" v-if="!isEdit">
        <button class="bg-soft_red py-1 px-2 rounded-md text-white" @click="handleModal">×</button>
      </div>

      <form class="mt-5 flex flex-col gap-4" @submit.prevent="handleSetGift">
        <input
          type="text"
          placeholder="Type your gift"
          v-model="values.value"
          class="outline-none p-2 rounded-md bg-slate-100 placeholder:text-gray-400"
          v-focus
        />
        <input type="url" placeholder="Paste image link" class=" outline-none rounded-md p-2" v-model="values.image" />
        <input
          type="text"
          placeholder="Who is going to receive it?"
          v-model="values.addressee"
          class="outline-none p-2 rounded-md bg-slate-100 placeholder:text-gray-400"
        />
        <span>
          <input type="number" placeholder="0" class="w-20 h-10 rounded-md outline-none px-2" v-model="values.quantity" />
          <small class="ml-2">quantity</small>
        </span>
        <input type="submit" class="bg-soft_red text-white p-4 rounded-md cursor-pointer focus:outline-outline_red focus:outline focus:outline-offset-2 focus:outline-4" value="Agregar" v-if="!isEdit"/>
        <span v-else class="w-full flex justify-between">
          <button class="bg-gray-400 rounded-md p-4 text-white" @click.prevent="handleCancelEdit">Cancelar</button>
          <input type="submit" class="bg-soft_red text-white p-4 rounded-md cursor-pointer min-w-[6rem]" value="Editar" @click="$emit('edit', values.id)" />
        </span>
      </form>
    </div>
  </div>
</template>
