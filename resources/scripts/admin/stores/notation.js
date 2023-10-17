import axios from 'axios'
import { defineStore } from 'pinia'
import { useNotificationStore } from '@/scripts/stores/notification'
import { handleError } from '@/scripts/helpers/error-handling'

export const useNotationsStore = (useWindow = false) => {
  const defineStoreFunc = useWindow ? window.pinia.defineStore : defineStore
  const { global } = window.i18n

  return defineStoreFunc({
    id: 'notations',

    state: () => ({
      notations: [],
      totalNotations: 0,
      selectAllField: false,
      selectedNotations: [],
      currentNotation: {
        id: null,
        customer_id: '',
        note_date: '',
        note: '',
      },
    }),

    getters: {
      isEdit: (state) => (state.currentNotation.id ? true : false),
    },

    actions: {
      resetCurrentNotation(){
        this.currentNotation = {
          id: '',
          customer_id: '',
          note_date: '',
          note: '',
        }
      },

      fecthNotations(params){
        return new Promise((resolve, reject) => {
          axios
            .get(`/api/v1/notations`, { params })
            .then((response) => {
              this.notations = response.data.data
              this.totalNotations = response.data.meta.notation_total_count

              resolve(response)
            })
            .catch((err) => {
              handleError(err)
              reject(err)
            })
        })
      },

      fetchNotation(id){
        return new Promise((resolve, reject) => {
          axios
            .get(`/api/v1/notations/${id}`)
            .then((response) => {
              if (response.data) {
                Object.assign(this.currentNotation, response.data.data)
              }
              resolve(response)
            })
            .catch((err) => {
              handleError(err)
              reject(err)
            })
        })
      },

      addNotation(data){
        return new Promise((resolve, reject) => {
          axios
            .post('/api/v1/notations', data)
            .then((response) => {
              const notificationStore = useNotificationStore()

              this.notations.push(response.data.data)

              notificationStore.showNotification({
                type: 'success',
                message: global.t('notations.created_message'),
              })

              resolve(response)
            })
            .catch((err) => {
              handleError(err)
              reject(err)
            })
        })
      },

      updateNotation(data){
        return new Promise((resolve, reject) => {
          axios
            .put(`/api/v1/notations/${data.id}`, data)
            .then((response) => {
              if (response.data) {
                const notificationStore = useNotificationStore()

                let pos = this.notations.findIndex(
                  (notation) => notation.id === response.data.data.id
                )

                this.notations[pos] = data.item

                notificationStore.showNotification({
                  type: 'success',
                  message: global.t('notations.updated_message'),
                })
              }

              resolve(response)
            })
            .catch((err) => {
              handleError(err)
              reject(err)
            })
        })
      },

      deleteNotation(id){
        const notificationStore = useNotificationStore()

        return new Promise((resolve, reject) => {
          axios
            .post(`/api/v1/notations/delete`, id)
            .then((response) => {
              let index = this.notations.findIndex((notation) => notation.id === id)
              this.notations.splice(index, 1)

              notificationStore.showNotification({
                type: 'success',
                message: global.tc('notations.deleted_message', 1),
              })

              resolve(response)
            })
            .catch((err) => {
              handleError(err)
              reject(err)
            })
        })
      },

      deleteMultipleNotations(){
        const notificationStore = useNotificationStore()

        return new Promise((resolve, reject) => {
          axios
            .post(`/api/v1/notations/delete`, { ids: this.selectedNotations })
            .then((response) => {
              this.selectedNotations.forEach((notation) => {
                let index = this.notations.findIndex(
                  (_notation) => _notation.id === notation.id
                )
                this.notations.splice(index, 1)
              })

              notificationStore.showNotification({
                type: 'success',
                message: global.tc('notations.deleted_message', 2),
              })

              resolve(response)
            })
            .catch((err) => {
              handleError(err)
              reject(err)
            })
        })
      },

      selectNotation(data){
        this.selectedNotations = data
        if (this.selectedNotations.length === this.notations.length) {
          this.selectAllField = true
        } else {
          this.selectAllField = false
        }
      },

      selectAllNotations(data){
        if (this.selectedNotations.length === this.notations.length) {
          this.selectedNotations = []
          this.selectAllField = false
        } else {
          let allNotationIds = this.notations.map((notation) => notation.id)
          this.selectedNotations = allNotationIds
          this.selectAllField = true
        }
      }
    }
  })()
}
