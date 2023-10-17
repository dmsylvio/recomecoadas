<template>
  <BasePage>
    <!-- Page Header -->
    <BasePageHeader :title="$t('paint-protection-warranties.title')">
      <BaseBreadcrumb>
        <BaseBreadcrumbItem
          :title="$t('general.home')"
          :to="`/${globalStore.companySlug}/customer/dashboard`"
        />
        <BaseBreadcrumbItem :title="$tc('paint-protection-warranties.paint-protection-warranty', 2)" to="#" active />
      </BaseBreadcrumb>

      <template #actions>
        <BaseButton
          v-show="paintProtectionWarrantyStore.totalPaintProtectionWarranties"
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

        <router-link
          to="paint-protection-warranties/create"
        >
          <BaseButton variant="primary" class="ml-4">
            <template #left="slotProps">
              <BaseIcon name="PlusIcon" :class="slotProps.class" />
            </template>
            {{ $t('paint-protection-warranties.new_paint-protection-warranty') }}
          </BaseButton>
        </router-link>
      </template>

    </BasePageHeader>

    <BaseFilterWrapper v-show="showFilters" @clear="clearFilter">

      <BaseInputGroup :label="$t('paint-protection-warranties.vehicle_sale_date')" class="px-3">
        <BaseDatePicker
          v-model="filters.vehicle_sale_date"
          :calendar-button="true"
          calendar-button-icon="calendar"
        />
      </BaseInputGroup>

      <BaseInputGroup :label="$t('paint-protection-warranties.vin')" class="px-3">
        <BaseInput
          v-model="filters.vin"
          :placeholder="$t('paint-protection-warranties.vin')"
        />
      </BaseInputGroup>

      <BaseInputGroup :label="$t('paint-protection-warranties.owner_name')" class="px-3">
        <BaseInput
          v-model="filters.owner_name"
          :placeholder="$t('paint-protection-warranties.owner_name')"
        />
      </BaseInputGroup>

      <BaseInputGroup :label="$t('paint-protection-warranties.dealer_name')" class="px-3">
        <BaseInput
          v-model="filters.dealer_name"
          :placeholder="$t('paint-protection-warranties.dealer_name')"
        />
      </BaseInputGroup>
    </BaseFilterWrapper>

    <BaseEmptyPlaceholder
      v-if="showEmptyScreen"
      :title="$t('paint-protection-warranties.no_paint-protection-warranty')"
      :description="$t('paint-protection-warranties.list_of_paint-protection-warranties')"
    >
      <MoonwalkerIcon class="mt-5 mb-4" />
    </BaseEmptyPlaceholder>

    <div v-show="!showEmptyScreen" class="relative table-container">
      <BaseTable
        ref="table"
        :data="fetchData"
        :columns="itemColumns"
        :placeholder-count="paintProtectionWarrantyStore.totalPaintProtectionWarranties >= 20 ? 10 : 5"
        class="mt-10"
      >
        <template #cell-vehicle_sale_date="{ row }">
          {{ row.data.formatted_vehicle_sale_date }}
        </template>

        <template #cell-vin="{ row }">
          {{ row.data.vin }}
        </template>

        <template #cell-owner_name="{ row }">
          <router-link
            :to="{ path: `paint-protection-warranties/${row.data.id}/view` }"
            class="font-medium text-primary-500"
          >
            <BaseText
              :text="row.data.owner_name"
              :length="30"
              tag="span"
              class="font-medium text-primary-500 flex flex-col"
            />
            <BaseText
              :text="row.data.owner_primary_phone ? row.data.owner_primary_phone : ''"
              :length="30"
              tag="span"
              class="text-xs text-gray-400"
            />
          </router-link>
        </template>

        <template #cell-owner_address="{ row }">
          {{ row.data.owner_address }}
        </template>

       <template #cell-vehicle_price="{ row }">
          <BaseFormatMoney
            :amount="row.data.vehicle_price"
            :currency="row.data.customer.currency"
          />
        </template>

        <template #cell-dealer_name="{ row }">
          <BaseText
              :text="row.data.dealer_name"
              :length="30"
              tag="span"
              class="font-medium text-primary-500 flex flex-col"
            />
            <BaseText
              :text="row.data.dealer_primary_phone ? row.data.dealer_primary_phone : ''"
              :length="30"
              tag="span"
              class="text-xs text-gray-400"
            />
        </template>

        <template #cell-contract_price="{ row }">
          <BaseFormatMoney
            :amount="row.data.contract_price"
            :currency="row.data.customer.currency"
          />
        </template>

        <template #cell-actions="{ row }">
          <BaseDropdown>
            <template #activator>
              <BaseIcon name="DotsHorizontalIcon" class="h-5 text-gray-500" />
            </template>
            <router-link :to="`paint-protection-warranties/${row.data.id}/view`">
              <BaseDropdownItem>
                <BaseIcon name="EyeIcon" class="h-5 mr-3 text-gray-600" />
                {{ $t('general.view') }}
              </BaseDropdownItem>
            </router-link>
          </BaseDropdown>
        </template>
      </BaseTable>
    </div>
  </BasePage>
</template>

<script setup>
import { usePaintProtectionWarrantyStore } from '@/scripts/customer/stores/paintProtectionWarranty'
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
const filters = reactive({
  vehicle_sale_date: '',
  vin: '',
  owner_name: '',
  dealer_name: ''
})

// store
const paintProtectionWarrantyStore = usePaintProtectionWarrantyStore()
const globalStore = useGlobalStore()

const itemColumns = computed(() => {
  return [
    {
      key: 'vehicle_sale_date',
      label: t('paint-protection-warranties.vehicle_sale_date'),
    },
    {
      key: 'vin',
      label: t('paint-protection-warranties.vin'),
    },
    {
      key: 'owner_name',
      label: t('paint-protection-warranties.owner_name'),
      thClass: 'extra',
      tdClass: 'font-medium text-gray-900',
    },
    {
      key: 'owner_address',
      label: t('paint-protection-warranties.owner_address'),
    },
    {
      key: 'vehicle_price',
      label: t('paint-protection-warranties.vehicle_price'),
    },
    {
      key: 'dealer_name',
      label: t('paint-protection-warranties.dealer_name'),
    },
    {
      key: 'contract_price',
      label: t('paint-protection-warranties.contract_price'),
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
  return !paintProtectionWarrantyStore.totalPaintProtectionWarranties && !isFetchingInitialData.value
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
  filters.vehicle_sale_date = ''
  filters.vin = ''
  filters.owner_name = ''
  filters.dealer_name = ''
}

function toggleFilter() {
  if (showFilters.value) {
    clearFilter()
  }

  showFilters.value = !showFilters.value
}

async function fetchData({ page, sort }) {
  let data = { 
    vehicle_sale_date: filters.vehicle_sale_date,
    vin: filters.vin,
    owner_name: filters.owner_name,
    dealer_name: filters.dealer_name,
    orderByField: sort.fieldName || 'created_at',
    orderBy: sort.order || 'desc',
    page,
  }

  isFetchingInitialData.value = true

  let response = await paintProtectionWarrantyStore.fetchPaintProtectionWarranties(data, globalStore.companySlug)

  isFetchingInitialData.value = false

  return {
    data: response.data.data,
    pagination: {
      totalPages: response.data.meta.last_page,
      currentPage: page,
      totalCount: response.data.meta.total,
      limit: 20,
    },
  }
}
</script>