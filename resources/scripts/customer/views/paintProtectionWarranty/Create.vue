<template>
  <BasePage>
    <form @submit.prevent="submitPaintData">
      <BasePageHeader :title="pageTitle">
        <BaseBreadcrumb>
          <BaseBreadcrumbItem
            :title="$t('general.home')"
            :to="`/${globalStore.companySlug}/customer/dashboard`"
          />

          <BaseBreadcrumbItem
            :title="$tc('paint-protection-warranties.paint-protection-warranty', 2)"
            :to="`/${globalStore.companySlug}/customer/paint-protection-warranties`"
          />

          <BaseBreadcrumb-item :title="pageTitle" to="#" active />
        </BaseBreadcrumb>

        <template #actions>
          <div class="flex items-center justify-end">
            <BaseButton type="submit" :loading="isSaving" :disabled="isSaving">
              <template #left="slotProps">
                <BaseIcon name="SaveIcon" :class="slotProps.class" />
              </template>
              {{
                isEdit
                  ? $t('paint-protection-warranties.update_paint-protection-warranty')
                  : $t('paint-protection-warranties.save_paint-protection-warranty')
              }}
            </BaseButton>
          </div>
        </template>
      </BasePageHeader>

      <BaseCard class="mt-5">
        <!-- Vehicle Info -->
        <div class="grid grid-cols-5 gap-4 mb-8">
          <h6 class="col-span-5 text-lg font-semibold text-left lg:col-span-1">
            {{ $t('paint-protection-warranties.vehic_info') }}
          </h6>

          <BaseInputGrid class="col-span-5 lg:col-span-4">
            <BaseInputGroup
              :label="$t('paint-protection-warranties.vehicle_sale_date')"
              :content-loading="isFetchingInitialData"
              required
              :error="
                v$.currentPaintProtectionWarranty.vehicle_sale_date.$error &&
                v$.currentPaintProtectionWarranty.vehicle_sale_date.$errors[0].$message
              "
            >
              <BaseDatePicker
                v-model="paintProtectionWarrantyStore.currentPaintProtectionWarranty.vehicle_sale_date"
                :content-loading="isFetchingInitialData"
                :calendar-button="true"
                calendar-button-icon="calendar"
                name="vehicle_sale_date"
              />
            </BaseInputGroup>

            <BaseInputGroup
              :label="$t('paint-protection-warranties.vin')"
              :content-loading="isFetchingInitialData"
              required
              :error="
                v$.currentPaintProtectionWarranty.vin.$error &&
                v$.currentPaintProtectionWarranty.vin.$errors[0].$message
              "
            >
              <BaseInput
                v-model="paintProtectionWarrantyStore.currentPaintProtectionWarranty.vin"
                :content-loading="isFetchingInitialData"
                name="vin"
                type="text"
              />
            </BaseInputGroup>

            <BaseInputGroup
              :label="$t('paint-protection-warranties.vehicle_year')"
              :content-loading="isFetchingInitialData"
              required
              :error="
                v$.currentPaintProtectionWarranty.vehicle_year.$error &&
                v$.currentPaintProtectionWarranty.vehicle_year.$errors[0].$message
              "
            >
              <BaseDatePicker
                v-model="paintProtectionWarrantyStore.currentPaintProtectionWarranty.vehicle_year"
                :content-loading="isFetchingInitialData"
                :calendar-button="true"
                calendar-button-icon="calendar"
                name="vehicle_year"
              />
            </BaseInputGroup>

            <BaseInputGroup
              :label="$t('paint-protection-warranties.make')"
              :content-loading="isFetchingInitialData"
              required
              :error="
                v$.currentPaintProtectionWarranty.make.$error &&
                v$.currentPaintProtectionWarranty.make.$errors[0].$message
              "
            >
              <BaseInput
                v-model="paintProtectionWarrantyStore.currentPaintProtectionWarranty.make"
                :content-loading="isFetchingInitialData"
                name="make"
                type="text"
              />
            </BaseInputGroup>

            <BaseInputGroup
              :label="$t('paint-protection-warranties.model')"
              :content-loading="isFetchingInitialData"
              required
              :error="
                v$.currentPaintProtectionWarranty.model.$error &&
                v$.currentPaintProtectionWarranty.model.$errors[0].$message
              "
            >
              <BaseInput
                v-model="paintProtectionWarrantyStore.currentPaintProtectionWarranty.model"
                :content-loading="isFetchingInitialData"
                name="model"
                type="text"
              />
            </BaseInputGroup>

            <BaseInputGroup
              :label="$t('paint-protection-warranties.mileage')"
              :content-loading="isFetchingInitialData"
              required
              :error="
                v$.currentPaintProtectionWarranty.mileage.$error &&
                v$.currentPaintProtectionWarranty.mileage.$errors[0].$message
              "
            >
              <BaseInput
                v-model="paintProtectionWarrantyStore.currentPaintProtectionWarranty.mileage"
                :content-loading="isFetchingInitialData"
                name="mileage"
                type="text"
              />
            </BaseInputGroup>

            <BaseInputGroup
              :label="$t('paint-protection-warranties.vehicle_price')"
              :content-loading="isFetchingInitialData"
              required
              :error="
                v$.currentPaintProtectionWarranty.vehicle_price.$error &&
                v$.currentPaintProtectionWarranty.vehicle_price.$errors[0].$message
              "
            >
              <BaseMoney
                v-model="paintProtectionWarrantyStore.currentPaintProtectionWarranty.vehicle_price"
                :currency="globalStore.currency"
                :content-loading="isFetchingInitialData"
                name="vehicle_price"
              />
            </BaseInputGroup>

            <BaseInputGroup
              :label="$t('paint-protection-warranties.contract_price')"
              :content-loading="isFetchingInitialData"
              required
              :error="
                v$.currentPaintProtectionWarranty.contract_price.$error &&
                v$.currentPaintProtectionWarranty.contract_price.$errors[0].$message
              "
            >
              <BaseMoney
                v-model="paintProtectionWarrantyStore.currentPaintProtectionWarranty.contract_price"
                :currency="globalStore.currency"
                :content-loading="isFetchingInitialData"
                name="contract_price"
              />
            </BaseInputGroup>
          </BaseInputGrid>
        </div>

        <BaseDivider class="mb-5 md:mb-8" />

        <!-- Owner Info-->
        <div class="grid grid-cols-5 gap-4 mb-8">
          <h6 class="col-span-5 text-lg font-semibold text-left lg:col-span-1">
            {{ $t('paint-protection-warranties.owner_info') }}
          </h6>

          <BaseInputGrid class="col-span-5 lg:col-span-4">
            <BaseInputGroup
              :label="$t('paint-protection-warranties.owner_name')"
              :content-loading="isFetchingInitialData"
              required
              :error="
                v$.currentPaintProtectionWarranty.owner_name.$error &&
                v$.currentPaintProtectionWarranty.owner_name.$errors[0].$message
              "
            >
              <BaseInput
                v-model="paintProtectionWarrantyStore.currentPaintProtectionWarranty.owner_name"
                :content-loading="isFetchingInitialData"
                name="owner_name"
                type="text"
              />
            </BaseInputGroup>

            <BaseInputGroup
              :label="$t('paint-protection-warranties.owner_address')"
              :content-loading="isFetchingInitialData"
              required
              :error="
                v$.currentPaintProtectionWarranty.owner_address.$error &&
                v$.currentPaintProtectionWarranty.owner_address.$errors[0].$message
              "
            >
              <BaseInput
                v-model="paintProtectionWarrantyStore.currentPaintProtectionWarranty.owner_address"
                :content-loading="isFetchingInitialData"
                name="owner_address"
                type="text"
              />
            </BaseInputGroup>

            <BaseInputGroup
              :label="$t('paint-protection-warranties.owner_primary_phone')"
              :content-loading="isFetchingInitialData"
              required
              :error="
                v$.currentPaintProtectionWarranty.owner_primary_phone.$error &&
                v$.currentPaintProtectionWarranty.owner_primary_phone.$errors[0].$message
              "
            >
              <BaseInput
                v-model="paintProtectionWarrantyStore.currentPaintProtectionWarranty.owner_primary_phone"
                :content-loading="isFetchingInitialData"
                name="owner_primary_phone"
                type="text"
              />
            </BaseInputGroup>

            <BaseInputGroup
              :label="$t('paint-protection-warranties.owner_city')"
              :content-loading="isFetchingInitialData"
              required
              :error="
                v$.currentPaintProtectionWarranty.owner_city.$error &&
                v$.currentPaintProtectionWarranty.owner_city.$errors[0].$message
              "
            >
              <BaseInput
                v-model="paintProtectionWarrantyStore.currentPaintProtectionWarranty.owner_city"
                :content-loading="isFetchingInitialData"
                name="owner_city"
                type="text"
              />
            </BaseInputGroup>

            <BaseInputGroup
              :label="$t('paint-protection-warranties.owner_state')"
              :content-loading="isFetchingInitialData"
              required
              :error="
                v$.currentPaintProtectionWarranty.owner_state.$error &&
                v$.currentPaintProtectionWarranty.owner_state.$errors[0].$message
              "
            >
              <BaseInput
                v-model="paintProtectionWarrantyStore.currentPaintProtectionWarranty.owner_state"
                :content-loading="isFetchingInitialData"
                name="owner_state"
                type="text"
              />
            </BaseInputGroup>

            <BaseInputGroup
              :label="$t('paint-protection-warranties.owner_zip')"
              :content-loading="isFetchingInitialData"
              required
              :error="
                v$.currentPaintProtectionWarranty.owner_zip.$error &&
                v$.currentPaintProtectionWarranty.owner_zip.$errors[0].$message
              "
            >
              <BaseInput
                v-model="paintProtectionWarrantyStore.currentPaintProtectionWarranty.owner_zip"
                :content-loading="isFetchingInitialData"
                name="owner_zip"
                type="text"
              />
            </BaseInputGroup>
          </BaseInputGrid>
        </div>

        <BaseDivider class="mb-5 md:mb-8" />

        <!-- Dealer Info-->
        <div class="grid grid-cols-5 gap-4 mb-8">
          <h6 class="col-span-5 text-lg font-semibold text-left lg:col-span-1">
            {{ $t('paint-protection-warranties.dealer_info') }}
          </h6>

          <BaseInputGrid class="col-span-5 lg:col-span-4">
            <BaseInputGroup
              :label="$t('paint-protection-warranties.dealer_name')"
              :content-loading="isFetchingInitialData"
              required
              :error="
                v$.currentPaintProtectionWarranty.dealer_name.$error &&
                v$.currentPaintProtectionWarranty.dealer_name.$errors[0].$message
              "
            >
              <BaseInput
                v-model="paintProtectionWarrantyStore.currentPaintProtectionWarranty.dealer_name"
                :content-loading="isFetchingInitialData"
                name="dealer_name"
                type="text"
              />
            </BaseInputGroup>

            <BaseInputGroup
              :label="$t('paint-protection-warranties.dealer_lien_holder')"
              :content-loading="isFetchingInitialData"
              required
              :error="
                v$.currentPaintProtectionWarranty.dealer_lien_holder.$error &&
                v$.currentPaintProtectionWarranty.dealer_lien_holder.$errors[0].$message
              "
            >
              <BaseInput
                v-model="paintProtectionWarrantyStore.currentPaintProtectionWarranty.dealer_lien_holder"
                :content-loading="isFetchingInitialData"
                name="dealer_lien_holder"
                type="text"
              />
            </BaseInputGroup>

            <BaseInputGroup
              :label="$t('paint-protection-warranties.dealer_primary_phone')"
              :content-loading="isFetchingInitialData"
              required
              :error="
                v$.currentPaintProtectionWarranty.dealer_primary_phone.$error &&
                v$.currentPaintProtectionWarranty.dealer_primary_phone.$errors[0].$message
              "
            >
              <BaseInput
                v-model="paintProtectionWarrantyStore.currentPaintProtectionWarranty.dealer_primary_phone"
                :content-loading="isFetchingInitialData"
                name="dealer_primary_phone"
                type="text"
              />
            </BaseInputGroup>

            <BaseInputGroup
              :label="$t('paint-protection-warranties.dealer_phone')"
              :content-loading="isFetchingInitialData"
              required
              :error="
                v$.currentPaintProtectionWarranty.dealer_phone.$error &&
                v$.currentPaintProtectionWarranty.dealer_phone.$errors[0].$message
              "
            >
              <BaseInput
                v-model="paintProtectionWarrantyStore.currentPaintProtectionWarranty.dealer_phone"
                :content-loading="isFetchingInitialData"
                name="dealer_phone"
                type="text"
              />
            </BaseInputGroup>

            <BaseInputGroup
              :label="$t('paint-protection-warranties.dealer_address')"
              :content-loading="isFetchingInitialData"
              required
              :error="
                v$.currentPaintProtectionWarranty.dealer_address.$error &&
                v$.currentPaintProtectionWarranty.dealer_address.$errors[0].$message
              "
            >
              <BaseInput
                v-model="paintProtectionWarrantyStore.currentPaintProtectionWarranty.dealer_address"
                :content-loading="isFetchingInitialData"
                name="dealer_address"
                type="text"
              />
            </BaseInputGroup>

            <BaseInputGroup
              :label="$t('paint-protection-warranties.dealer_city')"
              :content-loading="isFetchingInitialData"
              required
              :error="
                v$.currentPaintProtectionWarranty.dealer_city.$error &&
                v$.currentPaintProtectionWarranty.dealer_city.$errors[0].$message
              "
            >
              <BaseInput
                v-model="paintProtectionWarrantyStore.currentPaintProtectionWarranty.dealer_city"
                :content-loading="isFetchingInitialData"
                name="dealer_city"
                type="text"
              />
            </BaseInputGroup>

            <BaseInputGroup
              :label="$t('paint-protection-warranties.dealer_state')"
              :content-loading="isFetchingInitialData"
              required
              :error="
                v$.currentPaintProtectionWarranty.dealer_state.$error &&
                v$.currentPaintProtectionWarranty.dealer_state.$errors[0].$message
              "
            >
              <BaseInput
                v-model="paintProtectionWarrantyStore.currentPaintProtectionWarranty.dealer_state"
                :content-loading="isFetchingInitialData"
                name="dealer_state"
                type="text"
              />
            </BaseInputGroup>

            <BaseInputGroup
              :label="$t('paint-protection-warranties.dealer_zip')"
              :content-loading="isFetchingInitialData"
              required
              :error="
                v$.currentPaintProtectionWarranty.dealer_zip.$error &&
                v$.currentPaintProtectionWarranty.dealer_zip.$errors[0].$message
              "
            >
              <BaseInput
                v-model="paintProtectionWarrantyStore.currentPaintProtectionWarranty.dealer_zip"
                :content-loading="isFetchingInitialData"
                name="dealer_zip"
                type="text"
              />
            </BaseInputGroup>
          </BaseInputGrid>
        </div>
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
  import { usePaintProtectionWarrantyStore } from '@/scripts/customer/stores/paintProtectionWarranty'
  import { useGlobalStore } from '@/scripts/customer/stores/global'

  const paintProtectionWarrantyStore = usePaintProtectionWarrantyStore()
  const globalStore = useGlobalStore()
  const { t } = useI18n()
  const route = useRoute()
  const router = useRouter()

  const isSaving = ref(false)
  let isFetchingInitialData = ref(false)

  paintProtectionWarrantyStore.$reset()
  loadData()

  const isEdit = computed(() => route.name === 'paint-protection-warranties.edit')

  const pageTitle = computed(() =>
    isEdit.value ? t('paint-protection-warranties.edit_paint-protection-warranty') : t('paint-protection-warranties.new_paint-protection-warranty')
  )

  const rules = computed(() => {
    return {
      currentPaintProtectionWarranty: {
        vehicle_sale_date: {
          required: helpers.withMessage(t('validation.required'), required),
        },
        vin: {
          required: helpers.withMessage(t('validation.required'), required),
        },
        vehicle_year: {
          required: helpers.withMessage(t('validation.required'), required),
        },
        make: {
          required: helpers.withMessage(t('validation.required'), required),
        },
        model: {
          required: helpers.withMessage(t('validation.required'), required),
        },
        mileage: {
          required: helpers.withMessage(t('validation.required'), required),
        },
        vehicle_price: {
          required: helpers.withMessage(t('validation.required'), required),
        },
        contract_price: {
          required: helpers.withMessage(t('validation.required'), required),
        },
        owner_name: {
          required: helpers.withMessage(t('validation.required'), required),
        },
        owner_address: {
          required: helpers.withMessage(t('validation.required'), required),
        },
        owner_primary_phone: {
          required: helpers.withMessage(t('validation.required'), required),
        },
        owner_city: {
          required: helpers.withMessage(t('validation.required'), required),
        },
        owner_state: {
          required: helpers.withMessage(t('validation.required'), required),
        },
        owner_zip: {
          required: helpers.withMessage(t('validation.required'), required),
        },
        dealer_name: {
          required: helpers.withMessage(t('validation.required'), required),
        },
        dealer_lien_holder: {
          required: helpers.withMessage(t('validation.required'), required),
        },
        dealer_primary_phone: {
          required: helpers.withMessage(t('validation.required'), required),
        },
        dealer_phone: {
          required: helpers.withMessage(t('validation.required'), required),
        },
        dealer_address: {
          required: helpers.withMessage(t('validation.required'), required),
        },
        dealer_city: {
          required: helpers.withMessage(t('validation.required'), required),
        },
        dealer_state: {
          required: helpers.withMessage(t('validation.required'), required),
        },
        dealer_zip: {
          required: helpers.withMessage(t('validation.required'), required),
        },
      },
    }
  })

  const v$ = useVuelidate(rules, paintProtectionWarrantyStore);

  async function loadData() {
    isFetchingInitialData.value = true

    // Wait 2 seconds to load
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (isEdit.value) {
      let id = route.params.id
      await paintProtectionWarrantyStore.fetchViewPaintProtectionWarranty(id)
    }

    isFetchingInitialData.value = false
  }

  async function submitPaintData() {
    v$.value.currentPaintProtectionWarranty.$touch()

    if (v$.value.currentPaintProtectionWarranty.$invalid) {
      return false
    }

    isSaving.value = true
    
    try {
      let data = {
        id: route.params.id,
        company_id: globalStore.currentUser.company_id,
        ...paintProtectionWarrantyStore.currentPaintProtectionWarranty,
      }

      const action = isEdit.value ? paintProtectionWarrantyStore.updatePaintProtectionWarranty : paintProtectionWarrantyStore.addPaintProtectionWarranty

      await action(data)
      isSaving.value = false
      router.push(`/${globalStore.companySlug}/customer/paint-protection-warranties`);
    } catch (err) {
      isSaving.value = false;
      console.error(err);
      return;
    }
  }
</script>