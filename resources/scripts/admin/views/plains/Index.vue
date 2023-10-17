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
            v-if="userStore.hasAbilities(abilities.CREATE_PLAIN)"
            @click="$router.push('/admin/plains/create')"
          >
            <template #left="slotProps">
              <BaseIcon name="PlusIcon" :class="slotProps.class" />
            </template>
            {{ $t('plains.add_plain') }}
          </BaseButton>
        </div>
      </template>
    </BasePageHeader>

    <BaseFilterWrapper
      :show="showFilters"
      :row-on-xl="true"
      @clear="clearFilter"
    >
      <BaseInputGroup :label="$tc('customers.customer', 1)">
        <BaseCustomerSelectInput
          v-model="filters.customer_id"
          :placeholder="$t('customers.type_or_click')"
          value-prop="id"
          label="name"
        />
      </BaseInputGroup>

      <BaseInputGroup :label="$t('plains.due_date')">
        <BaseDatePicker
          v-model="filters.due_date"
          :calendar-button="true"
          calendar-button-icon="calendar"
        />
      </BaseInputGroup>

      <BaseInputGroup :label="$tc('plains.vin')">
        <BaseInput
          v-model="filters.vin"
          type="text"
          name="name"
          autocomplete="off"
        />
      </BaseInputGroup>

      <BaseInputGroup :label="$tc('plains.make')">
        <BaseInput
          v-model="filters.make"
          type="text"
          name="name"
          autocomplete="off"
        />
      </BaseInputGroup>

      <BaseInputGroup :label="$tc('plains.model')">
        <BaseInput
          v-model="filters.model"
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
          v-if="userStore.hasAbilities(abilities.CREATE_PLAIN)"
          variant="primary-outline"
          @click="$router.push('/admin/plains/create')"
        >
          <template #left="slotProps">
            <BaseIcon name="PlusIcon" :class="slotProps.class" />
          </template>
          {{ $t('plains.add_new_plain') }}
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
        :columns="plainsColumns"
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

        <template #cell-customer_id="{ row }">
          <router-link :to="{ path: `plains/${row.data.id}/edit` }">
            <BaseText
              :text="row.data.customer.name"
              :length="30"
              tag="span"
              class="font-medium text-primary-500 flex flex-col"
            />
            <BaseText
              :text="row.data.customer.contact_name ? row.data.customer.contact_name : ''"
              :length="30"
              tag="span"
              class="text-xs text-gray-400"
            />
          </router-link>
        </template>

        <template #cell-due_date="{ row }">
          <span>{{ row.data.formatted_due_date }}</span>
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
  import { usePlainsStore } from '@/scripts/admin/stores/plain'
  import { useNotificationStore } from '@/scripts/stores/notification'
  import { useDialogStore } from '@/scripts/stores/dialog'
  import { useCompanyStore } from '@/scripts/admin/stores/company'
  import { useUserStore } from '@/scripts/admin/stores/user'
  import PlainDropdown from '@/scripts/admin/components/dropdowns/PlainIndexDropdown.vue'
  import SatelliteIcon from '@/scripts/components/icons/empty/SatelliteIcon.vue'
  import abilities from '@/scripts/admin/stub/abilities'

  const utils = inject('utils')

  const plainStore = usePlainsStore()
  const companyStore = useCompanyStore()
  const notificationStore = useNotificationStore()
  const dialogStore = useDialogStore()
  const userStore = useUserStore()

  const { t } = useI18n()
  let showFilters = ref(false)
  let isFetchingInitialData = ref(true)

  const filters = reactive({
    due_date: '',
    vin: '',
    make: '',
    model: '',
    employee_id: '',
    customer_id: '',
  })

  const table = ref(null)

  const showEmptyScreen = computed(
    () => !plainStore.totalPlains && !isFetchingInitialData.value
  )

  const selectField = computed({
    get: () => plainStore.selectedPlains,
    set: (value) => {
      return plainStore.selectPlains(value)
    }
  })

  const plainsColumns = computed(() => {
    return[
      {
        key: 'status',
        thClass: 'extra w-10',
        tdClass: 'font-medium text-gray-900',
        placeholderClass: 'w-10',
        sortable: false,
      },
      { key: 'customer_id', label:t('plains.customer') },
      { key: 'vin', label: t('plains.vin') },
      { key: 'make', label: t('plains.make') },
      { key: 'model', label: t('plains.model') },
      { key: 'due_date', label: t('plains.due_date') },
      { key: 'created_at', label: t('plains.added_on') },
      {
        key: 'actions',
        thClass: 'text-right',
        tdClass: 'text-right text-sm font-medium',
        sortable: false,
      },
    ]
  })

  debouncedWatch(
    filters,
    () => {
      setFilters()
    },
    { debounce: 500 }
  )

  onUnmounted(() => {
    if(plainStore.selectAllField){
      plainStore.selectAllPlains()
    }
  })

  function clearFilter(){
    filters.due_date = ''
    filters.vin = ''
    filters.make = ''
    filters.model = ''
    filters.employee_id = ''
    filters.customer_id = ''
  }

  function hasAbilities(){
    return userStore.hasAbilities([abilities.DELETE_PLAIN, abilities.EDIT_PLAIN])
  }

  function toggleFilter(){
    if(showFilters.value){
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

  async function fetchData({ page, filter, sort }){
    let data = {
      due_date: filters.due_date,
      vin: filters.vin,
      make: filters.make,
      model: filters.model,
      employee_id: filters.employee_id,
      customer_id: filters.customer_id,
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
        limit: 10,
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
        if(res){
          plainStore.deleteMultiplePlains().then((response) => {
            if(response.data.success){
              table.value && table.value.refresh()
            }
          })
        }
      })
  }


</script>
