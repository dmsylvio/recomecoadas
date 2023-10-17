<template>
  <BasePage>
    <BasePageHeader :title="$t('notations.title')">
      <BaseBreadcrumb>
        <BaseBreadcrumbItem :title="$t('general.home')" to="dashboard" />
        <BaseBreadcrumbItem :title="$tc('notations.notation', 2)" to="#" active />
      </BaseBreadcrumb>

      <template #actions>
        <div class="flex items-center justify-end space-x-5">
          <BaseButton
            v-show="notationStore.totalNotations"
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
            v-if="userStore.hasAbilities(abilities.CREATE_NOTATION)"
            @click="$router.push('/admin/notations/create')"
          >
            <template #left="slotProps">
              <BaseIcon name="PlusIcon" :class="slotProps.class" />
            </template>
            {{ $t('notations.add_notation') }}
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

      <BaseInputGroup :label="$t('notations.added_on')">
        <BaseDatePicker
          v-model="filters.note_date"
          :calendar-button="true"
          calendar-button-icon="calendar"
        />
      </BaseInputGroup>

      <BaseInputGroup :label="$tc('notations.note')" class="text-left">
        <BaseInput
          v-model="filters.note"
          type="text"
          name="name"
          autocomplete="off"
        />
      </BaseInputGroup>

    </BaseFilterWrapper>

    <BaseEmptyPlaceholder
      v-show="showEmptyScreen"
      :title="$t('notations.no_notations')"
      :description="$t('notations.list_of_notations')"
    >
      <SatelliteIcon class="mt-5 mb-4" />

      <template #actions>
        <BaseButton
          v-if="userStore.hasAbilities(abilities.CREATE_NOTATION)"
          variant="primary-outline"
          @click="$router.push('/admin/notations/create')"
        >
          <template #left="slotProps">
            <BaseIcon name="PlusIcon" :class="slotProps.class" />
          </template>
          {{ $t('notations.add_new_notation') }}
        </BaseButton>
      </template>
    </BaseEmptyPlaceholder>

    <div v-show="!showEmptyScreen" class="relative table-container">
      <div class="
        relative
        flex
        items-center
        justify-end
        h-5
        border-gray-200 border-solid
      ">
        <BaseDropdown v-if="notationStore.selectedNotations.length">
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
          <BaseDropdownItem @click="removeMultipleNotations">
            <BaseIcon name="TrashIcon" class="mr-3 text-gray-600" />
            {{ $t('general.delete') }}
          </BaseDropdownItem>
        </BaseDropdown>
      </div>

      <BaseTable
        ref="table"
        :data="fetchData"
        :columns="notationColumns"
        :placeholder-count="notationStore.totalNotations >= 20 ? 10 : 5"
        class="mt-3"
      >
        <template #header>
          <div class="absolute items-center left-6 top-2.5 select-none">
            <BaseCheckbox
              v-model="notationStore.selectAllField"
              variant="primary"
              @change="notationStore.selectAllNotations"
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
          <router-link :to="{ path: `notations/${row.data.id}/edit` }">
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

        <template #cell-employee_id="{ row }">
          <BaseText :text="row.data.employee.name" :length="30" tag="span" />
        </template>

        <template #cell-note_date="{ row }">
          <span>{{ row.data.formatted_note_date }}</span>
        </template>

        <template #cell-updated_at="{ row }">
          <span>{{ row.data.formatted_updated_at }}</span>
        </template>

        <template v-if="hasAbilities()" #cell-actions="{ row }">
          <NotationDropdown
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
  import { useNotationsStore } from '@/scripts/admin/stores/notation'
  import { useNotificationStore } from '@/scripts/stores/notification'
  import { useDialogStore } from '@/scripts/stores/dialog'
  import { useCompanyStore } from '@/scripts/admin/stores/company'
  import { useUserStore } from '@/scripts/admin/stores/user'
  import NotationDropdown from '@/scripts/admin/components/dropdowns/NotationIndexDropdown.vue'
  import SatelliteIcon from '@/scripts/components/icons/empty/SatelliteIcon.vue'
  import abilities from '@/scripts/admin/stub/abilities'

  const utils = inject('utils')

  const notationStore = useNotationsStore()
  const companyStore = useCompanyStore()
  const notificationStore = useNotificationStore()
  const dialogStore = useDialogStore()
  const userStore = useUserStore()


  const { t } = useI18n()
  let showFilters = ref(false)
  let isFetchingInitialData = ref(true)

  const currentRole = userStore.currentUser.role;

  const filters = reactive({
    customer_id: '',
    note_date: '',
    note: '',
    employee_id: ''
  });

  const table  = ref(null)

  const showEmptyScreen = computed(
    () => !notationStore.totalNotations && !isFetchingInitialData.value
  )

  const selectField = computed({
    get: () => notationStore.selectedNotations,
    set: (value) => {
      return notationStore.selectNotation(value)
    },
  })

  const notationColumns = computed(() => {
    return [
      {
        key: 'status',
        thClass: 'extra w-10',
        tdClass: 'font-medium text-gray-900',
        placeholderClass: 'w-10',
        sortable: false,
      },
      { key: 'customer_id', label:t('notations.customer') },
      { key: 'employee_id', label:t('notations.employee') },
      { key: 'note_date', label: t('notations.added_on') },
      { key: 'updated_at', label: t('notations.updated_on') },
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
    if(notationStore.selectAllField){
      notationStore.selectAllNotations()
    }
  })

  function clearFilter(){
    filters.customer_id = ''
    filters.note_date = ''
    filters.note = ''
    filters.employee_id = ''
  }

  function hasAbilities(){
    return userStore.hasAbilities([abilities.DELETE_NOTATION, abilities.EDIT_NOTATION])
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
      customer_id: filters.customer_id,
      role: currentRole,
      note_date: filters.note_date,
      note: filters.note,
      page,
    }

    isFetchingInitialData.value = true

    let response = await notationStore.fecthNotations(data)

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

  function removeMultipleNotations(){
    dialogStore
      .openDialog({
        title: t('general.are_you_sure'),
        message: t('notations.confirm_delete', 2),
        yesLabel: t('general.ok'),
        noLabel: t('general.cancel'),
        variant: 'danger',
        hideNoButton: false,
        size: 'lg',
      })
      .then((res) => {
        if(res){
          notationStore.deleteMultipleNotations().then((response) => {
            if(response.data.success){
              table.value && table.value.refresh()
            }
          })
        }
      })
  }
</script>
