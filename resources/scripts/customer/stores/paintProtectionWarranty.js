import axios from 'axios'
import { defineStore } from 'pinia'
import { useNotificationStore } from '@/scripts/stores/notification'
import { handleError } from '@/scripts/helpers/error-handling'

export const usePaintProtectionWarrantyStore = (useWindow = false) => {
  const defineStoreFunc = useWindow ? window.pinia.defineStore : defineStore
  const { global } = window.i18n

  return defineStoreFunc({
    id: 'customerPaintProtectionWarrantyStore',

    state: () => ({
      paintProtectionWarranties: [],
      totalPaintProtectionWarranties: 0,
      selectedViewPaintProtectionWarranty: [],
      currentPaintProtectionWarranty: {
        id: null,
        vehicle_sale_date: '',
        vin: '',
        vehicle_year: '', 
        make: '',
        model: '',
        mileage: '',
        vehicle_price: '',
        contract_price: '',
        owner_name: '',
        owner_address: '',
        owner_primary_phone: '',
        owner_city: '',
        owner_state: '',
        owner_zip: '',
        dealer_name: '',
        dealer_lien_holder: '',
        dealer_primary_phone: '',
        dealer_phone: '',
        dealer_city: '',
        dealer_state: '',
        dealer_zip: '',
        request_deletion: false
      },
    }),

    getters: {
      isEdit: (state) => (state.currentPaintProtectionWarranty.id ? true : false),
    },

    actions: {
      resetCurrentPaintProtectionWarranty(){
        this.currentPaintProtectionWarranty = {
          id: '',
          vehicle_sale_date: '',
          vin: '',
          vehicle_year: '', 
          make: '',
          model: '',
          mileage: '',
          vehicle_price: '',
          contract_price: '',
          owner_name: '',
          owner_address: '',
          owner_primary_phone: '',
          owner_city: '',
          owner_state: '',
          owner_zip: '',
          dealer_name: '',
          dealer_lien_holder: '',
          dealer_primary_phone: '',
          dealer_phone: '',
          dealer_city: '',
          dealer_state: '',
          dealer_zip: '',
          request_deletion: false
        }
      },
      fetchPaintProtectionWarranties(params, slug){
        return new Promise((resolve, reject) => {
          axios
            .get(`/api/v1/${slug}/customer/paint-protection-warranties`, { params })
            .then((response) => {
              this.paintProtectionWarranties = response.data.data
              this.totalPaintProtectionWarranties = response.data.meta.paintProtectionWarrantyTotalCount
              resolve(response)
            })
            .catch((err) => {
              handleError(err)
              reject(err)
            })
        })
      },
      fetchViewPaintProtectionWarranty(params, slug){
        return new Promise((resolve, reject) => {
            axios
              .get(`/api/v1/${slug}/customer/paint-protection-warranties/${params.id}`, {
                params,
              })
    
              .then((response) => {
                this.selectedViewPaintProtectionWarranty = response.data.data
                resolve(response)
              })
              .catch((err) => {
                handleError(err)
                reject(err)
              })
        })
      },
      searchPaintProtectionWarranty(params, slug){
        return new Promise((resolve, reject) => {
            axios
              .get(`/api/v1/${slug}/customer/paint-protection-warranties`, { params })
              .then((response) => {
                this.paintProtectionWarranties = response.data
                resolve(response)
              })
              .catch((err) => {
                handleError(err)
                reject(err)
              })
        })
      },
      updatePaintProtectionWarranty(data, slug){
        return new Promise((resolve, reject) => {
          axios
            .put(`/api/v1/${slug}/customer/paint-protection-warranties/${data.id}`, data)
            .then((response) => {
              if (response.data) {
                const notificationStore = useNotificationStore()

                let pos = this.paintProtectionWarranties.findIndex(
                  (paintProtectionWarranty) => paintProtectionWarranty.id === response.data.data.id
                )

                this.paintProtectionWarranties[pos] = response.data.data

                notificationStore.showNotification({
                  type: 'success',
                  message: global.t('paint-protection-warranties.updated_message'),
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
      addPaintProtectionWarranty(data, slug){
        return new Promise((resolve, reject) => {
          axios
            .post(`/api/v1/${slug}/customer/paint-protection-warranties`, data)
            .then((response) => {
              const notificationStore = useNotificationStore()

              this.paintProtectionWarranties.push(response.data.data)

              notificationStore.showNotification({
                type: 'success',
                message: global.t('paint-protection-warranties.created_message'),
              })

              resolve(response)
            })
            .catch((err) => {
              handleError(err)
              reject(err)
            })
        })
      },

  


      deletePaintProtectionWarranty(id, slug){
        const notificationStore = useNotificationStore() 

        return new Promise((resolve, reject) => {
          axios
            .delete(`/api/v1/${slug}/customer/paint-protection-warranties/delete`, { id })
            // .delete(`/api/v1/${slug}/customer/paint-protection-warranties/${id}`)
            .then((response) => {
              let index = this.paintProtectionWarranties.findIndex((paintProtectionWarranty) => paintProtectionWarranty.id === id)
              this.paintProtectionWarranties.splice(index, 1)

              notificationStore.showNotification({
                type: 'success',
                message: global.tc('paint-protection-warranties.deleted_message', 1),
              })

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