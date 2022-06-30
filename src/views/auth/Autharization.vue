<template>
  <div class="container">
    <form class="form" @submit.prevent="formSend">
      <h1 class="section-title">Авторизация</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>

      <DefaultInput
          label="Id site"
          name="site_id"
          type="text"
          placeholder="4f2475902b0be670555f1bb2"
          v-model.trim="formData.site_id.value"
          :options="v$.site_id.value"
      >
        <template #message>
          {{v$.site_id.value.$silentErrors[0].$message}}
        </template>
      </DefaultInput>
      <div class="form__actions">
        <button
            class="button"
        >Войти</button>
        <button
            class="button outline"
            @click="clearForm"
        >Очистить форму</button>
      </div>
    </form>
    {{formData.site_id.length}}
  </div>
</template>

<script>
import {defineComponent, ref} from "vue";
// Store
import {useStore} from 'vuex'
// Валидация
import useVuelidate from '@vuelidate/core'
import { helpers, maxLength, minLength, required} from '@vuelidate/validators'
import { validationMessages } from "@/validate-config";

// Компоненты
import DefaultInput from "@/components/form/defaultInput/DefaultInput";

export default defineComponent({
  name: "Autharuzation",
  components: {DefaultInput},
  setup () {
    const Store = useStore();


    const formData = ref({
      site_id: {
        value : '5f8475902b0be670555f1bb3',
        isTyping : false,
      },
    })

    const rules = {
      site_id: {
        value : {
          required: helpers.withMessage(() => `${validationMessages.required.error}`, required),
          minLength: helpers.withMessage(() => `${validationMessages.idSite.error}`, minLength(24)),
          maxLength: helpers.withMessage(() => `${validationMessages.idSite.error}`, maxLength(24)),
        }
      }
    }

    function clearForm () {
      formData.value = {
        site_id: ''
      };
    }

    function formSend () {
      v$.value.$validate();

      if(v$.value.$silentErrors.length === 0) {
        Store.dispatch('authModuleStore/auth', formData.value.site_id.value);
      }
    }


    const v$ = useVuelidate(rules, formData.value);

    return {
      formSend,
      formData,
      clearForm,
      v$
    }
  }
})
</script>

<style src="../../assets/styles/form.css" scoped>

</style>
