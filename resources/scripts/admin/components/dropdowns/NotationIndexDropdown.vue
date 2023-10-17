<template>
  <BaseDropdown>
    <template #activator>
      <BaseButton v-if="route.name === 'notations.view'" variant="primary">
        <BaseIcon name="DotsHorizontalIcon" class="h-5 text-white" />
      </BaseButton>
      <BaseIcon v-else name="DotsHorizontalIcon" class="h-5 text-gray-500" />
    </template>

    <!-- edit notations  -->
    <router-link
      v-if="userStore.hasAbilities(abilities.EDIT_NOTATION)"
      :to="`/admin/notations/${row.id}/edit`"
    >
      <BaseDropdownItem>
        <BaseIcon
          name="PencilIcon"
          class="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500"
        />
        {{ $t('general.edit') }}
      </BaseDropdownItem>
    </router-link>

    <!-- delete notations  -->
    <BaseDropdownItem
      v-if="userStore.hasAbilities(abilities.DELETE_NOTATION)"
      @click="removeNotation(row.id)"
    >
      <BaseIcon
        name="TrashIcon"
        class="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500"
      />
      {{ $t('general.delete') }}
    </BaseDropdownItem>
  </BaseDropdown>
</template>

<script setup>
import { useDialogStore } from '@/scripts/stores/dialog'
import { useNotificationStore } from '@/scripts/stores/notification'
import { useI18n } from 'vue-i18n'
import { useNotationsStore } from '@/scripts/admin/stores/notation'
import { useRoute, useRouter } from 'vue-router'
import { inject } from 'vue'
import { useUserStore } from '@/scripts/admin/stores/user'
import abilities from '@/scripts/admin/stub/abilities'

const props = defineProps({
  row: {
    type: Object,
    default: null,
  },
  table: {
    type: Object,
    default: null,
  },
  loadData: {
    type: Function,
    default: null,
  },
})

const dialogStore = useDialogStore()
const notificationStore = useNotificationStore()
const { t } = useI18n()
const notationStore = useNotationsStore()
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const $utils = inject('utils')

function removeNotation(id) {
  dialogStore
    .openDialog({
      title: t('general.are_you_sure'),
      message: t('notations.confirm_delete'),
      yesLabel: t('general.ok'),
      noLabel: t('general.cancel'),
      variant: 'danger',
      hideNoButton: false,
      size: 'lg',
    })
    .then((res) => {
      if (res) {
        notationStore.deleteNotation({ ids: [id] }).then((response) => {
          if (response.data.success) {
            props.loadData && props.loadData()
            return true
          }
          return true
        })
      }
    })
}
</script>
