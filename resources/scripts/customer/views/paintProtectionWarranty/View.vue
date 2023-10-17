<template>
  <BasePage class="xl:pl-96">
    <BasePageHeader :title="pageTitle.owner_name">
      <template #actions>
        <BaseButton
          variant="primary-outline"
          class="mr-2"
          tag="a"
          :href="`/paint-protection-warranties/pdf/${paintProtectionWarranty.unique_hash}`"
          download
        >
          <template #left="slotProps">
            <BaseIcon name="DownloadIcon" :class="slotProps.class" />
            {{ $t('paint-protection-warranties.download') }}
          </template>
        </BaseButton>

        <BaseButton
          class="mr-2"
          v-if="!paintProtectionWarranty.request_deletion"
          @click="removePaintProtectionWarranty"
        >
          <template #left="slotProps">
            <BaseIcon name="TrashIcon" :class="slotProps.class" />
            {{ $t('paint-protection-warranties.delete') }}
          </template>
        </BaseButton>
      </template>
    </BasePageHeader> 

    <!-- Sidebar -->
    <div
      class="fixed top-0 left-0 hidden h-full pt-16 pb-4 bg-white w-88 xl:block"
    >
      <div
        class="
          flex
          items-center
          justify-between
          px-4
          pt-8
          pb-6
          border border-gray-200 border-solid
        "
      >
        <BaseInput
          v-model="searchData.vin"
          :placeholder="$t('general.search')"
          type="text"
          variant="gray"
          @input="onSearch"
        >
          <template #right>
            <BaseIcon name="SearchIcon" class="h-5 text-gray-400" />
          </template>
        </BaseInput>

        <div class="flex ml-3" role="group" aria-label="First group">
          <BaseDropdown
            position="bottom-start"
            width-class="w-50"
            position-class="left-0"
          >
            <template #activator>
              <BaseButton variant="gray">
                <BaseIcon name="FilterIcon" class="h-5" />
              </BaseButton>
            </template>

            <div
              class="
                px-4
                py-1
                pb-2
                mb-2
                text-sm
                border-b border-gray-200 border-solid
              "
            >
              {{ $t('general.sort_by') }}
            </div>

            <div class="px-2">
              <BaseDropdownItem class="pt-3 rounded-md hover:rounded-md">
                <BaseInputGroup class="-mt-3 font-normal">
                  <BaseRadio
                    id="filter_vehicle_sale_date"
                    v-model="searchData.orderByField"
                    :label="$t('paint-protection-warranties.vehicle_sale_date')"
                    name="filter"
                    size="sm"
                    value="vehicle_sale_date"
                    @update:modelValue="onSearch"
                  />
                </BaseInputGroup>
              </BaseDropdownItem>
            </div>

            <div class="px-2">
              <BaseDropdownItem class="pt-3 rounded-md hover:rounded-md">
                <BaseInputGroup class="-mt-3 font-normal">
                  <BaseRadio
                    id="filter_dealer_name"
                    v-model="searchData.orderByField"
                    :label="$t('paint-protection-warranties.dealer_name')"
                    name="filter"
                    size="sm"
                    value="dealer_name"
                    @update:modelValue="onSearch"
                  />
                </BaseInputGroup>
              </BaseDropdownItem>
            </div>

            <div class="px-2">
              <BaseDropdownItem class="pt-3 rounded-md hover:rounded-md">
                <BaseInputGroup class="-mt-3 font-normal">
                  <BaseRadio
                    id="filter_vin"
                    v-model="searchData.orderByField"
                    :label="$t('paint-protection-warranties.vin')"
                    size="sm"
                    name="filter"
                    value="vin"
                    @update:modelValue="onSearch"
                  />
                </BaseInputGroup>
              </BaseDropdownItem>
            </div>
          </BaseDropdown>

          <BaseButton class="ml-1" variant="white" @click="sortData">
            <BaseIcon v-if="getOrderBy" name="SortAscendingIcon" class="h-5" />
            <BaseIcon v-else name="SortDescendingIcon" class="h-5" />
          </BaseButton>
        </div>
      </div>

      <div
        class="
          h-full
          pb-32
          overflow-y-scroll
          border-l border-gray-200 border-solid
          sw-scroll
        "
      >
        <router-link
          v-for="(paint, index) in paintProtectionWarrantyStore.paintProtectionWarranties"
          :id="'paintProtectionWarranty-' + paint.id"
          :key="index"
          :to="`/${globalStore.companySlug}/customer/paint-protection-warranties/${paint.id}/view`"
          :class="[
            'flex justify-between p-4 items-center cursor-pointer hover:bg-gray-100 border-l-4 border-transparent',
            {
              'bg-gray-100 border-l-4 border-primary-500 border-solid':
                hasActiveUrl(paint.id),
            },
          ]"
          style="border-bottom: 1px solid rgba(185, 193, 209, 0.41)"
        >
          <div class="flex-2">
            <div
              class="
                mb-1
                not-italic
                font-medium
                leading-5
                text-gray-500
                capitalize
                text-md
              "
            >
              {{ paint.owner_name }}
            </div>
            {{ paint.vin }}
          </div>

          <div class="flex-1 whitespace-nowrap right">
            <BaseFormatMoney
              class="
                mb-2
                text-xl
                not-italic
                font-semibold
                leading-8
                text-right text-gray-900
                block
              "
              :amount="paint.vehicle_price"
              :currency="paint.currency"
            />

            <div class="text-sm text-right text-gray-500 non-italic">
              {{ paint.formatted_vehicle_sale_date }}
            </div>
          </div>
        </router-link>

        <p
          v-if="!paintProtectionWarrantyStore.paintProtectionWarranties.length"
          class="flex justify-center px-4 mt-5 text-sm text-gray-600"
        >
          {{ $t('paint-protection-warranties.no_matching_paint-protection-warranty') }}
        </p>
      </div>
    </div>

    <!-- pdf -->
    <div
      class="flex flex-col min-h-0 mt-8 overflow-hidden"
      style="height: 75vh"
    >
      <iframe
        v-if="shareableLink"
        ref="report"
        :src="shareableLink"
        class="flex-1 border border-gray-400 border-solid rounded-md"
        @click="ViewReportsPDF"
      />
    </div>
  </BasePage>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
import BaseDropdown from '@/scripts/components/base/BaseDropdown.vue'
import BaseDropdownItem from '@/scripts/components/base/BaseDropdownItem.vue'
import { debounce } from 'lodash'
import { ref, reactive, computed, inject, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useNotificationStore } from '@/scripts/stores/notification'
import moment from 'moment'
import { usePaintProtectionWarrantyStore } from '@/scripts/customer/stores/paintProtectionWarranty'
import { useGlobalStore } from '@/scripts/customer/stores/global'
import { useDialogStore } from '@/scripts/stores/dialog'

// Router
const route = useRoute()

//store
const paintProtectionWarrantyStore = usePaintProtectionWarrantyStore()
const globalStore = useGlobalStore()
const dialogStore = useDialogStore()
const { tm } = useI18n()

//local state
let paintProtectionWarranty = reactive({})
let searchData = reactive({
  orderBy: '',
  orderByField: '',
  vin: '',
  // searchText: '',
})

let url = ref(null)
let siteURL = ref(null)
let isSearching = ref(false)
let isMarkingAsSent = ref(false)

//Utils
const utils = inject('utils')

//Store

const notificationStore = useNotificationStore()

// Computed Props

const pageTitle = computed(() => {
  return paintProtectionWarrantyStore.selectedViewPaintProtectionWarranty
})

const getOrderBy = computed(() => {
  if (searchData.orderBy === 'asc' || searchData.orderBy == null) {
    return true
  }
  return false
})

const getOrderName = computed(() =>
  getOrderBy.value ? tm('general.ascending') : tm('general.descending')
)

const shareableLink = computed(() => {
  return paintProtectionWarranty.unique_hash ? `/paint-protection-warranties/pdf/${paintProtectionWarranty.unique_hash}` : false
})

// Watcher

watch(route, () => {
  loadPaintProtectionWarranty()
})

// Created
loadPaintProtectionWarranties()
loadPaintProtectionWarranty()

onSearch = debounce(onSearch, 500)


// Methods
function hasActiveUrl(id) {
  return route.params.id == id
}

async function loadPaintProtectionWarranties(){
  await paintProtectionWarrantyStore.fetchPaintProtectionWarranties(
    {
      limit: 'all',
    },
    globalStore.companySlug
  )

  setTimeout(() => {
    scrollToPaintProtectionWarranty()
  }, 500)
}

async function loadPaintProtectionWarranty(){
  if (route && route.params.id) {
    let response = await paintProtectionWarrantyStore.fetchViewPaintProtectionWarranty(
      {
        id: route.params.id,
      },
      globalStore.companySlug
    )

    if (response.data) {
      Object.assign(paintProtectionWarranty, response.data.data)
    }
  }
}

function scrollToPaintProtectionWarranty(){
  const el = document.getElementById(`paintProtectionWarranty-${route.params.id}`)

  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    el.classList.add('shake')
  }
}

async function onSearch() {
  let data = {}

  if (
    searchData.vin !== '' &&
    searchData.vin !== null &&
    searchData.vin !== undefined
  ) {
    data.vin = searchData.vin
  }

  if (searchData.orderBy !== null && searchData.orderBy !== undefined) {
    data.orderBy = searchData.orderBy
  }

  if (
    searchData.orderByField !== null &&
    searchData.orderByField !== undefined
  ) {
    data.orderByField = searchData.orderByField
  }

  isSearching.value = true
  try {
    let response = await paintProtectionWarrantyStore.searchPaintProtectionWarranty(
      data,
      globalStore.companySlug
    )
    isSearching.value = false

    if (response.data.data) {
      paintProtectionWarrantyStore.paintProtectionWarranties = response.data.data
    }
  } catch (error) {
    isSearching.value = false
  }
}

function sortData() {
  if (searchData.orderBy === 'asc') {
    searchData.orderBy = 'desc'
    onSearch()
    return true
  }
  searchData.orderBy = 'asc'
  onSearch()
  return true
}

async function removePaintProtectionWarranty() {
  dialogStore
    .openDialog({
      title: tm('general.are_you_sure'),
      message: tm('paint-protection-warranties.confirm_delete'),
      yesLabel: tm('general.ok'),
      noLabel: tm('general.cancel'),
      variant: 'danger',
      hideNoButton: false,
      size: 'lg',
    })
    .then((res) => {
      if (res) {

        
        let data = {
          id: route.params.id,
          request_deletion: true,
        }
        paintProtectionWarrantyStore
          .updatePaintProtectionWarranty(data, globalStore.companySlug)
          .then(() => {
            router.push(`/${globalStore.companySlug}/customer/paint-protection-warranties`);
          })
          .catch((err) => {
            console.error(err)
          })
      }
    })
}

</script>