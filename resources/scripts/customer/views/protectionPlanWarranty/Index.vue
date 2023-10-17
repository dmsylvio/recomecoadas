<template>
    <BasePage>
      <!-- Page Header -->
      <BasePageHeader :title="$t('protection-plan-warranties.title')">
        <BaseBreadcrumb>
          <BaseBreadcrumbItem
            :title="$t('general.home')"
            :to="`/${globalStore.companySlug}/customer/dashboard`"
          />
          <BaseBreadcrumbItem :title="$tc('protection-plan-warranties.protection-plan-warranty', 2)" to="#" active />
        </BaseBreadcrumb>
        <template #actions>
          <BaseButton
            v-show="protectionPlanWarrantyStore.totalProtectionPlanWarranties"
            variant="primary-outline"
            @click="toggleFilter"
          >
            {{ $t('general.filter') }}
            <template #right="slotProps">
              <BaseIcon
                v-if="!showFilters"
                name="FilterIcon"
                :class="slotProps.class"
              />
              <BaseIcon v-else name="XIcon" :class="slotProps.class" />
            </template>
          </BaseButton>
        </template>
      </BasePageHeader>

      <div v-show="!showEmptyScreen" class="relative table-container">
        <BaseTable
          ref="table"
          :data="fetchData"
          :columns="itemColumns"
          :placeholder-count="protectionPlanWarrantyStore.totalProtectionPlanWarranties >= 20 ? 10 : 5"
          class="mt-10"
        >
          <template #cell-vehicle_sale_date="{ row }">
            {{ row.data.vehicle_sale_date }}
          </template>

          <template #cell-vin="{ row }">
            {{ row.data.vin }}
          </template>

          <template #cell-owner_name="{ row }">
            <router-link
              :to="{ path: `protection-plan-warranties/${row.data.id}/view` }"
              class="font-medium text-primary-500"
            >
              {{ row.data.owner_name }}
            </router-link>
         </template>

         <template #cell-dealer_name="{ row }">
            {{ row.data.dealer_name }}
          </template>

          <template #cell-mileage_at_contract_expiration="{ row }">
            {{ row.data.mileage_at_contract_expiration }}
          </template>

        </BaseTable>
      </div>
    </BasePage>
</template>

<script setup>
import { useProtectionPlanWarrantyStore } from '@/scripts/customer/stores/protectionPlanWarranty'
import { debouncedWatch } from '@vueuse/core'
import BaseTable from '@/scripts/components/base/base-table/BaseTable.vue'
import { ref, computed, reactive, inject, onMounted } from 'vue'
import { useGlobalStore } from '@/scripts/customer/stores/global'
import { useRoute } from 'vue-router'
import MoonwalkerIcon from '@/scripts/components/icons/empty/MoonwalkerIcon.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

//Utils
const utils = inject('utils')
const route = useRoute()

// local state
const table = ref(null)
let isFetchingInitialData = ref(true)
let showFilters = ref(false)
const filters = reactive({})

// store
const protectionPlanWarrantyStore = useProtectionPlanWarrantyStore()
const globalStore = useGlobalStore()

const itemColumns = computed(() => {
  return [
    {
      key: 'vehicle_sale_date',
      label: t('protection-plan-warranties.vehicle_sale_date'),
    },
    {
      key: 'vin',
      label: t('protection-plan-warranties.vin'),
    },
    {
      key: 'owner_name',
      label: t('protection-plan-warranties.owner_name'),
      thClass: 'extra',
      tdClass: 'font-medium text-gray-900',
    },
    {
      key: 'dealer_name',
      label: t('protection-plan-warranties.dealer_name'),
    },
    {
      key: 'mileage_at_contract_expiration',
      label: t('protection-plan-warranties.mileage_at_contract_expiration'),
    },
    {
      key: 'actions',
      thClass: 'text-right',
      tdClass: 'text-right text-sm font-medium',
      sortable: false,
    },
  ]
})

// computed props
const showEmptyScreen = computed(() => {
  return !protectionPlanWarrantyStore.totalProtectionPlanWarranties && !isFetchingInitialData.value
})

//watch
debouncedWatch(
  filters,
  () => {
    setFilters()
  },
  { debounce: 500 }
)

//methods
function refreshTable() {
  table.value.refresh()
}

function setFilters() {
  refreshTable()
}

function clearFilter() {

}

function toggleFilter() {
  if (showFilters.value) {
    clearFilter()
  }

  showFilters.value = !showFilters.value
}

async function fetchData({ page, sort }) {
  let data = {
    orderByField: sort.fieldName || 'created_at',
    orderBy: sort.order || 'desc',
    page,
  }

  isFetchingInitialData.value = true

  let response = await protectionPlanWarrantyStore.fetchProtectionPlanWarranties(data, globalStore.companySlug)

  isFetchingInitialData.value = false

  return {
    data: response.data.data,
    pagination: {
      totalPages: response.data.meta.last_page,
      currentPage: page,
      totalCount: response.data.meta.total,
      limit: 10,
    },
  }
}
</script>