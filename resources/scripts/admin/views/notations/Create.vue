<template>
  <BasePage>
    <BasePageHeader :title="pageTitle">
      <BaseBreadcrumb>
        <BaseBreadcrumbItem :title="$t('general.home')" to="dashboard" />
        <BaseBreadcrumbItem :title="$tc('notations.notation', 2)" to="/admin/notations" />
        <BaseBreadcrumbItem :title="pageTitle" to="#" active />
      </BaseBreadcrumb>
    </BasePageHeader>

    <form
      class="grid lg:grid-cols-2 mt-6"
      action="submit"
      @submit.prevent="submitNotation"
    >
      <BaseCard class="w-full">
        <BaseInputGrid layout="one-column">

          <!-- Customer -->
          <BaseInputGroup
            :label="$t('notations.customer')"
            :error="
              v$.currentNotation.customer_id.$error &&
              v$.currentNotation.customer_id.$errors[0].$message
            "
            :content-loading="isFetchingInitialData"
            required
          >
            <BaseCustomerSelectInput
              v-if="!isFetchingInitialData"
              v-model="notationStore.currentNotation.customer_id"
              :content-loading="isFetchingInitialData"
              :invalid="v$.currentNotation.customer_id.$error"
              :placeholder="$t('customers.select_a_customer')"
            />
          </BaseInputGroup>

          <!-- Date -->
          <BaseInputGroup
            :label="$t('notations.note_date')"
            :content-loading="isFetchingInitialData"
            required
            :error="
              v$.currentNotation.note_date.$error &&
              v$.currentNotation.note_date.$errors[0].$message
            "
          >
            <BaseDatePicker
              v-model="notationStore.currentNotation.note_date"
              :content-loading="isFetchingInitialData"
              :calendar-button="true"
              calendar-button-icon="calendar"
            />
          </BaseInputGroup>

          <!-- Notes -->
          <BaseInputGroup
            :label="$t('notations.note')"
            :content-loading="isFetchingInitialData"
            required
            :error="
              v$.currentNotation.note.$error &&
              v$.currentNotation.note.$errors[0].$message
            "
          >
            <BaseTextarea
              v-model="notationStore.currentNotation.note"
              :content-loading="isFetchingInitialData"
              name="note"
              :row="10"
              rows="10"
              @input="v$.currentNotation.note.$touch()"
            />
          </BaseInputGroup>

          <div>
            <BaseButton
              :content-loading="isFetchingInitialData"
              type="submit"
              :loading="isSaving"
            >
              <template #left="slotProps">
                <BaseIcon
                  v-if="!isSaving"
                  name="SaveIcon"
                  :class="slotProps.class"
                />
              </template>

              {{ isEdit ? $t('notations.update_notation') : $t('notations.save_notation') }}
            </BaseButton>
          </div>
        </BaseInputGrid>
      </BaseCard>
    </form>
  </BasePage>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import {
    required,
    minLength,
    numeric,
    minValue,
    maxLength,
    helpers,
  } from '@vuelidate/validators'
  import useVuelidate from '@vuelidate/core'
  import { useNotationsStore } from '@/scripts/admin/stores/notation'
  import { useCompanyStore } from '@/scripts/admin/stores/company'
  import { useUserStore } from '@/scripts/admin/stores/user'
  import abilities from '@/scripts/admin/stub/abilities'

  const notationStore = useNotationsStore()
  const companyStore = useCompanyStore()
  const { t } = useI18n()
  const route = useRoute()
  const router = useRouter()
  const userStore = useUserStore()

  const isSaving = ref(false)
  let isFetchingInitialData = ref(false)

  notationStore.$reset()
  loadData()

  const isEdit = computed(() => route.name === 'notations.edit')

  const pageTitle = computed(() =>
    isEdit.value ? t('notations.edit_notation') : t('notations.new_notation')
  )

  const rules = computed(() => {
    return {
      currentNotation: {
        customer_id: {
          required: helpers.withMessage(t('validation.required'), required),
        },
        note_date: {
          required: helpers.withMessage(t('validation.required'), required),
        },
        note: {
          required: helpers.withMessage(t('validation.required'), required),
          maxLength: helpers.withMessage(
            t('validation.description_maxlength'),
            maxLength(65000)
          ),
        },
      },
    }
  })

  const v$ = useVuelidate(rules, notationStore)

  async function loadData() {
    isFetchingInitialData.value = true

    // Wait 2 seconds to load
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (isEdit.value) {
      let id = route.params.id
      await notationStore.fetchNotation(id)
    }

    isFetchingInitialData.value = false
  }

  async function submitNotation() {
    v$.value.currentNotation.$touch()

    if (v$.value.currentNotation.$invalid) {
      return false
    }

    isSaving.value = true

    try {
      let data = {
        id: route.params.id,
        ...notationStore.currentNotation,
      }

      const action = isEdit.value ? notationStore.updateNotation : notationStore.addNotation

      await action(data)
      isSaving.value = false
      router.push('/admin/notations')
    } catch (error) {
      isSaving.value = false
      return
    }
  }
</script>
