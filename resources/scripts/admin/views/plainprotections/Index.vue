<template>
  <BasePage>
    <BasePageHeader :title="$t('plains.title')">
      <BaseBreadcrumb>
        <BaseBreadcrumbItem :title="$t('general.home')" to="dashboard" />
        <BaseBreadcrumbItem :title="$tc('plains.plain', 2)" to="#" active />
      </BaseBreadcrumb>

      <template #actions>
        <div class="flex items-center justify-end space-x-5">
          <BaseButton
            v-show="plainStore.totalPlains"
            variant="primary-outline"
            @click="toggleFilter"
          >
            {{ $t('general.filter') }}
            <template #right="slotProps">
              <BaseIcon
                v-if="!showFilters"
                :class="slotProps.class"
                name="FilterIcon"
              />
              <BaseIcon v-else name="XIcon" :class="slotProps.class" />
            </template>
          </BaseButton>

          <BaseButton
            v-if="userStore.hasAbilities(abilities.CREATE_PLAIN_PROTECTION)"
            @click="$router.push('/admin/plain-protections/create')"
          >
            <template #left="slotProps">
              <BaseIcon name="PlusIcon" :class="slotProps.class" />
            </template>
            {{ $t('plains.add_plain') }}
          </BaseButton>
        </div>
      </template>
    </BasePageHeader>

    <BaseFilterWrapper :show="showFilters" class="mt-5" @clear="clearFilter">
      <BaseInputGroup :label="$tc('plains.vin')" class="text-left">
        <BaseInput
          v-model="filters.vin"
          type="text"
          name="name"
          autocomplete="off"
        />
      </BaseInputGroup>



    </BaseFilterWrapper>

    <BaseEmptyPlaceholder
      v-show="showEmptyScreen"
      :title="$t('plains.no_plains')"
      :description="$t('plains.list_of_plains')"
    >
      <SatelliteIcon class="mt-5 mb-4" />

      <template #actions>
        <BaseButton
          v-if="userStore.hasAbilities(abilities.CREATE_PLAIN_PROTECTION)"
          variant="primary-outline"
          @click="$router.push('/admin/plain-protections/create')"
        >
          <template #left="slotProps">
            <BaseIcon name="PlusIcon" :class="slotProps.class" />
          </template>
          {{ $t('plains.add_plain') }}
        </BaseButton>
      </template>
    </BaseEmptyPlaceholder>

    <div v-show="!showEmptyScreen" class="relative table-container">
      <div
        class="
          relative
          flex
          items-center
          justify-end
          h-5
          border-gray-200 border-solid
        "
      >
        <BaseDropdown v-if="plainStore.selectedPlains.length">
          <template #activator>
            <span
              class="
                flex
                text-sm
                font-medium
                cursor-pointer
                select-none
                text-primary-400
              "
            >
              {{ $t('general.actions') }}
              <BaseIcon name="ChevronDownIcon" />
            </span>
          </template>
          <BaseDropdownItem @click="removeMultiplePlains">
            <BaseIcon name="TrashIcon" class="mr-3 text-gray-600" />
            {{ $t('general.delete') }}
          </BaseDropdownItem>
        </BaseDropdown>
      </div>

      <BaseTable
        ref="table"
        :data="fetchData"
        :columns="plainColumns"
        :placeholder-count="plainStore.totalPlains >= 20 ? 10 : 5"
        class="mt-3"
      >
        <template #header>
          <div class="absolute items-center left-6 top-2.5 select-none">
            <BaseCheckbox
              v-model="plainStore.selectAllField"
              variant="primary"
              @change="plainStore.selectAllPlains"
            />
          </div>
        </template>

        <template #cell-status="{ row }">
          <div class="relative block">
            <BaseCheckbox
              :id="row.id"
              v-model="selectField"
              :value="row.data.id"
            />
          </div>
        </template>

        <template #cell-vin="{ row }">
          <router-link
            :to="{ path: `plain-protections/${row.data.id}/edit` }"
            class="font-medium text-primary-500"
          >
            {{ row.data.vin }}
          </router-link>
        </template>

        <template #cell-customer_id="{ row }">
          <BaseText :text="row.data.customer.name" :length="30" tag="span" />
        </template>

        <template #cell-make="{ row }">
          <span>
            {{ row.data.make }}
          </span>
        </template>

        <template #cell-model="{ row }">
          <span>
            {{ row.data.model }}
          </span>
        </template>

        <template #cell-employee_id="{ row }">
          <span>
            {{ row.data.employee_id }}
          </span>
        </template>

        <template #cell-created_at="{ row }">
          <span>{{ row.data.formatted_created_at }}</span>
        </template>

        <template v-if="hasAbilities()" #cell-actions="{ row }">
          <PlainDropdown
            :row="row.data"
            :table="table"
            :load-data="refreshTable"
          />
        </template>
      </BaseTable>
    </div>

  </BasePage>
</template>

<script setup>
import { ref, computed, inject, onMounted, reactive, onUnmounted } from 'vue'
import { debouncedWatch } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { usePlainProtectionStore } from '@/scripts/admin/stores/plainprotection'
import { useNotificationStore } from '@/scripts/stores/notification'
import { useDialogStore } from '@/scripts/stores/dialog'
import { useCompanyStore } from '@/scripts/admin/stores/company'
import { useUserStore } from '@/scripts/admin/stores/user'
import PlainDropdown from '@/scripts/admin/components/dropdowns/PlainIndexDropdown.vue'
import SatelliteIcon from '@/scripts/components/icons/empty/SatelliteIcon.vue'
import abilities from '@/scripts/admin/stub/abilities'

const utils = inject('utils')

const plainStore = usePlainProtectionStore()
const companyStore = useCompanyStore()
const notificationStore = useNotificationStore()
const dialogStore = useDialogStore()
const userStore = useUserStore()

const { t } = useI18n()
let showFilters = ref(false)
let isFetchingInitialData = ref(true)

const filters = reactive({
  employee_id: '',
  customer_id: '',
  vin: '',
  make: '',
  model: ''
})

const table = ref(null)

const showEmptyScreen = computed(
  () => !plainStore.totalPlains && !isFetchingInitialData.value
)

const selectField = computed({
  get: () => plainStore.selectedPlains,
  set: (value) => {
    return plainStore.selectPlain(value)
  },
})

const plainColumns = computed(() => {
  return [
    {
      key: 'status',
      thClass: 'extra w-10',
      tdClass: 'font-medium text-gray-900',
      placeholderClass: 'w-10',
      sortable: false,
    },
    { key: 'customer_id', label:t('plains.customer') },
    {
      key: 'vin',
      label: t('plains.vin'),
      thClass: 'extra',
      tdClass: 'font-medium text-gray-900',
    },
    { key: 'make', label: t('plains.make') },
    { key: 'model', label: t('plains.model') },
    { key: 'created_at', label: t('plains.added_on') },

    {
      key: 'actions',
      thClass: 'text-right',
      tdClass: 'text-right text-sm font-medium',
      sortable: false,
    },
  ];
})

debouncedWatch(
  filters,
  () => {
    setFilters()
  },
  { debounce: 500 }
)

onUnmounted(() => {
  if (plainStore.selectAllField) {
    plainStore.selectAllPlains()
  }
})

function clearFilter() {
  filters.vin = ''
  filters.make = ''
  filters.model = ''
  filters.employee_id = ''
}

function hasAbilities() {
  return userStore.hasAbilities([abilities.CREATE_PLAIN_PROTECTION, abilities.EDIT_PLAIN_PROTECTION])
}

function toggleFilter() {
  if (showFilters.value) {
    clearFilter()
  }

  showFilters.value = !showFilters.value
}

function refreshTable() {
  table.value && table.value.refresh()
}

function setFilters() {
  refreshTable()
}

async function fetchData({ page, filter, sort }) {
  let data = {
    search: filters.vin,
    employee_id: filters.employee_id !== null ? filters.employee_id : '',
    orderByField: sort.fieldName || 'created_at',
    orderBy: sort.order || 'desc',
    page,
  }

  isFetchingInitialData.value = true

  let response = await plainStore.fetchPlains(data)

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

function removeMultiplePlains(){
  dialogStore
    .openDialog({
      title: t('general.are_you_sure'),
      message: t('plains.confirm_delete', 2),
      yesLabel: t('general.ok'),
      noLabel: t('general.cancel'),
      variant: 'danger',
      hideNoButton: false,
      size: 'lg',
    })
    .then((res) => {
      if (res) {
        plainStore.deleteMultiplePlains().then((response) => {
          if (response.data.success) {
            table.value && table.value.refresh()
          }
        })
      }
    })
}

</script>
