import axios from 'axios'
import { defineStore } from 'pinia'
import { useNotificationStore } from '@/scripts/stores/notification'
import { handleError } from '@/scripts/helpers/error-handling'

export const usePlainProtectionStore = (useWindow = false) => {
  const defineStoreFunc = useWindow ? window.pinia.defineStore : defineStore
  const { global } = window.i18n

  return defineStoreFunc({
    id: 'plainProtection',
    state: () => ({
      plains: [],
      totalPlains: 0,
      selectAllField: false,
      selectedPlains: [],
      itemUnits: [],
      currentPlain: {
        vin: '',
        make: '',
        model: '',
        notes: '',
        employee_id: '',
        customer_id: ''
      }
    }),
    actions: {
      resetCurrentPlain(){
        this.currentPlain = {
          vin: '',
          make: '',
          model: '',
          notes: '',
          employee_id: ''
        }
      },

      fetchPlains(params){
        return new Promise((resolve, reject) => {
          axios
            .get(`/api/v1/plain-protections`, { params })
            .then((response) => {
              this.plains = response.data.data
              this.totalPlains = response.data.meta.plain_total_count

              resolve(response)
            })
            .catch((err) => {
              handleError(err)
              reject(err)
            })
        })
      },

      fetchPlain(id){
        return new Promise((resolve, reject) => {
          axios
            .get(`/api/v1/plain-protections/${id}`)
            .then((response) => {
              if (response.data) {
                Object.assign(this.currentPlain, response.data.data)
              }
              resolve(response)
            })
            .catch((err) => {
              handleError(err)
              reject(err)
            })
        })
      },

      addPlain(data){
        return new Promise((resolve, reject) => {
          axios
            .post('/api/v1/plain-protections', data)
            .then((response) => {
              const notificationStore = useNotificationStore()

              this.plains.push(response.data.data)

              notificationStore.showNotification({
                type: 'success',
                message: global.t('plains.created_message'),
              })

              resolve(response)
            })
            .catch((err) => {
              handleError(err)
              reject(err)
            })
        })
      },

      updatePlain(data){
        return new Promise((resolve, reject) => {
          axios
            .put(`/api/v1/plain-protections/${data.id}`, data)
            .then((response) => {
              if (response.data) {
                const notificationStore = useNotificationStore()
                notificationStore.showNotification({
                  type: 'success',
                  message: global.t('plains.updated_message'),
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

      deletePlain(id){
        const notificationStore = useNotificationStore()

        return new Promise((resolve, reject) => {
          axios
            .post(`/api/v1/plain-protections/delete`, id)
            .then((response) => {
              let index = this.plains.findIndex((plain) => plain.id === id)
              this.plains.splice(index, 1)

              notificationStore.showNotification({
                type: 'success',
                message: global.tc('plains.deleted_message', 1),
              })

              resolve(response)
            })
            .catch((err) => {
              handleError(err)
              reject(err)
            })
        })
      },

      deleteMultiplePlains(){
        const notificationStore = useNotificationStore()

        return new Promise((resolve, reject) => {
          axios
            .post(`/api/v1/plain-protections/delete`, { ids: this.selectedPlains })
            .then((response) => {
              this.selectedPlains.forEach((plain) => {
                let index = this.plains.findIndex(
                  (_plain) => _plain.id === plain.id
                )
                this.plains.splice(index, 1)
              })

              notificationStore.showNotification({
                type: 'success',
                message: global.tc('plains.deleted_message', 2),
              })

              resolve(response)
            })
            .catch((err) => {
              handleError(err)
              reject(err)
            })
        })
      },

      selectPlain(data){
        this.selectedPlains = data
        if (this.selectedPlains.length === this.plains.length) {
          this.selectAllField = true
        } else {
          this.selectAllField = false
        }
      },

      selectAllPlains(data){
        if (this.selectedPlains.length === this.plains.length) {
          this.selectedPlains = []
          this.selectAllField = false
        } else {
          let allItemIds = this.plains.map((item) => item.id)
          this.selectedPlains = allItemIds
          this.selectAllField = true
        }
      },

      fetchPlainEmployee(params){
        return new Promise((resolve, reject) => {
          axios
            .get(`/api/v1/users`, { params })
            .then((response) => {
              this.itemUnits = response.data.data
              resolve(response)
            })
            .catch((err) => {
              handleError(err)
              reject(err)
            })
        })
      }
    }
  })()
}
