<template>
  <BasePage>
    <BasePageHeader :title="pageTitle">
      <BaseBreadcrumb>
        <BaseBreadcrumbItem :title="$t('general.home')" to="dashboard" />
        <BaseBreadcrumbItem :title="$tc('plains.plain', 2)" to="/admin/plains" />
        <BaseBreadcrumbItem :title="pageTitle" to="#" active />
      </BaseBreadcrumb>
    </BasePageHeader>

    <form
      action="submit"
      @submit.prevent="submitItem"
    >
      <BaseCard class="w-full">
        <BaseInputGrid>

          <!-- customer -->
          <BaseInputGroup
            :label="$t('plains.customer')"
            :error="
              v$.currentPlain.customer_id.$error &&
              v$.currentPlain.customer_id.$errors[0].$message
            "
            :content-loading="isFetchingInitialData"
            required
          >
            <BaseCustomerSelectInput
              v-if="!isFetchingInitialData"
              v-model="plainStore.currentPlain.customer_id"
              :content-loading="isFetchingInitialData"
              :invalid="v$.currentPlain.customer_id.$error"
              :placeholder="$t('customers.select_a_customer')"
            />
          </BaseInputGroup>

          <!-- vin -->
          <BaseInputGroup
            :label="$t('plains.vin')"
            :content-loading="isFetchingInitialData"
            required
            :error="
              v$.currentPlain.vin.$error &&
              v$.currentPlain.vin.$errors[0].$message
            "
          >
            <BaseInput
              v-model="plainStore.currentPlain.vin"
              :content-loading="isFetchingInitialData"
              :invalid="v$.currentPlain.vin.$error"
              @input="v$.currentPlain.vin.$touch()"
            />
          </BaseInputGroup>

          <!-- make -->
          <BaseInputGroup
            :label="$t('plains.make')"
            :content-loading="isFetchingInitialData"
            required
            :error="
              v$.currentPlain.make.$error &&
              v$.currentPlain.make.$errors[0].$message
            "
          >
            <BaseInput
              v-model="plainStore.currentPlain.make"
              :content-loading="isFetchingInitialData"
              :invalid="v$.currentPlain.make.$error"
              @input="v$.currentPlain.make.$touch()"
            />
          </BaseInputGroup>

          <!-- model -->
          <BaseInputGroup
            :label="$t('plains.model')"
            :content-loading="isFetchingInitialData"
            required
            :error="
              v$.currentPlain.model.$error &&
              v$.currentPlain.model.$errors[0].$message
            "
          >
            <BaseInput
              v-model="plainStore.currentPlain.model"
              :content-loading="isFetchingInitialData"
              :invalid="v$.currentPlain.model.$error"
              @input="v$.currentPlain.model.$touch()"
            />
          </BaseInputGroup>

          <!-- employee -->
          <BaseInputGroup
            :content-loading="isFetchingInitialData"
            :label="$t('plains.employee')"
            required
            :error="
              v$.currentPlain.employee_id.$error &&
              v$.currentPlain.employee_id.$errors[0].$message
            "
          >
            <BaseMultiselect
              v-model="plainStore.currentPlain.employee_id"
              :content-loading="isFetchingInitialData"
              label="name"
              :options="plainStore.plainEmployees"
              value-prop="id"
              :placeholder="$t('plains.select_an_employee')"
              searchable
              track-by="name"
            >
            </BaseMultiselect>
          </BaseInputGroup>
        </BaseInputGrid>

        <div class="relative mt-6">
          <!-- notes -->
          <BaseInputGroup
            :label="$t('plains.notes')"
            :content-loading="isFetchingInitialData"
            :error="
              v$.currentPlain.notes.$error &&
              v$.currentPlain.notes.$errors[0].$message
            "
          >
            <BaseTextarea
              v-model="plainStore.currentPlain.notes"
              :content-loading="isFetchingInitialData"
              name="notes"
              :row="5"
              rows="5"
              @input="v$.currentPlain.notes.$touch()"
            />
          </BaseInputGroup>
        </div>

        <BaseButton
          :content-loading="isFetchingInitialData"
          type="submit"
          :loading="isSaving"
          class="mt-4"
        >
          <template #left="slotProps">
            <BaseIcon
              v-if="!isSaving"
              name="SaveIcon"
              :class="slotProps.class"
            />
          </template>

          {{ isEdit ? $t('plains.update_plain') : $t('plains.save_plain') }}
        </BaseButton>
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
  import { usePlainsStore } from '@/scripts/admin/stores/plain'
  import { useCompanyStore } from '@/scripts/admin/stores/company'
  import { useModalStore } from '@/scripts/stores/modal'
  import { useUserStore } from '@/scripts/admin/stores/user'

  const plainStore = usePlainsStore()
  const modalStore = useModalStore()
  const companyStore = useCompanyStore()
  const { t } = useI18n()
  const route = useRoute()
  const router = useRouter()
  const userStore = useUserStore()

  const isSaving = ref(false)

  let isFetchingInitialData = ref(false)

  plainStore.$reset()
  loadData()

  const isEdit = computed(() => route.name === 'plain-protections.edit')

  const pageTitle = computed(() =>
    isEdit.value ? t('plains.edit_plain') : t('plains.new_plain')
  )

  const rules = computed(() => {
    return {
      currentPlain: {
        customer_id: {
          required: helpers.withMessage(t('validation.required'), required),
        },
        employee_id: {
          required: helpers.withMessage(t('validation.required'), required),
        },
        vin: {
          required: helpers.withMessage(t('validation.required'), required),
        },
        make: {
          required: helpers.withMessage(t('validation.required'), required),
        },
        model: {
          required: helpers.withMessage(t('validation.required'), required),
        },
        notes: {
          maxLength: helpers.withMessage(
            t('validation.description_maxlength'),
            maxLength(65000)
          ),
        },
      }
    }
  })

  const v$ = useVuelidate(rules, plainStore)

  async function loadData() {
    isFetchingInitialData.value = true

    // Carregar todos usuário aqui
    await plainStore.fecthEmployees({});

    if (isEdit.value) {
      let id = route.params.id
      await plainStore.fetchPlain(id)
    }

    isFetchingInitialData.value = false
  }

  async function submitItem() {
    v$.value.currentPlain.$touch()

    if (v$.value.currentPlain.$invalid) {
      return false
    }

    isSaving.value = true

    try {
      let data = {
        id: route.params.id,
        ...plainStore.currentPlain,
      }

      const action = isEdit.value ? plainStore.updatePlain : plainStore.addPlain

      await action(data)
      isSaving.value = false
      router.push('/admin/plains')
    } catch (err) {
      isSaving.value = false
      return
    }
  }

</script>
