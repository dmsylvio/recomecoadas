import { handleError } from '@/scripts/customer/helpers/error-handling'
const { defineStore } = window.pinia
import axios from 'axios'
export const useProtectionPlanWarrantyStore = defineStore({
  id: 'customerProtectionPlanWarrantyStore',
  state: () => ({
    totalProtectionPlanWarranties: 0,
    protectionPlanWarranties: [],
    selectedViewProtectionPlanWarranty: [],
  }),
  
  actions: {
    fetchProtectionPlanWarranties(params, slug){
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/v1/${slug}/customer/paint-protection-warranties`, { params })
          .then((response) => {
            this.protectionPlanWarranties = response.data.data
            this.totalProtectionPlanWarranties = response.data.meta.protectionPlanWarrantyTotalCount
            resolve(response)
          })
          .catch((err) => {
            handleError(err)
            reject(err)
          })
      })
    },
    fetchViewProtectionPlanWarranty(params, slug){
      return new Promise((resolve, reject) => {
          axios
            .get(`/api/v1/${slug}/customer/paint-protection-warranties/${params.id}`, {
              params,
            })
  
            .then((response) => {
              this.selectedViewProtectionPlanWarranty = response.data.data
              resolve(response)
            })
            .catch((err) => {
              handleError(err)
              reject(err)
            })
      })
    },
    searchProtectionPlanWarranty(params, slug){
      return new Promise((resolve, reject) => {
          axios
            .get(`/api/v1/${slug}/customer/paint-protection-warrantiess`, { params })
            .then((response) => {
              this.protectionPlanWarranties = response.data
              resolve(response)
            })
            .catch((err) => {
              handleError(err)
              reject(err)
            })
      })
    },
  },
})