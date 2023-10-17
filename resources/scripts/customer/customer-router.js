const LayoutBasic = () => import('@/scripts/customer/layouts/LayoutBasic.vue')
const LayoutLogin = () => import('@/scripts/customer/layouts/LayoutLogin.vue')
const Login = () => import('@/scripts/customer/views/auth/Login.vue')
const ForgotPassword = () => import('@/scripts/customer/views/auth/ForgotPassword.vue')
const ResetPassword = () => import('@/scripts/customer/views/auth/ResetPassword.vue')
const Dashboard = () => import('@/scripts/customer/views/dashboard/Dashboard.vue')
const Invoice = () => import('@/scripts/customer/views/invoices/Index.vue')
const InvoiceView = () => import('@/scripts/customer/views/invoices/View.vue')
const Estimate = () => import('@/scripts/customer/views/estimates/Index.vue')
const EstimateView = () => import('@/scripts/customer/views/estimates/View.vue')
const Payment = () => import('@/scripts/customer/views/payments/Index.vue')
const PaymentView = () => import('@/scripts/customer/views/payments/View.vue')
const SettingIndex = () => import('@/scripts/customer/views/settings/SettingsIndex.vue')
const CustomerProfile = () => import('@/scripts/customer/views/settings/CustomerSettings.vue')
const AddressInfo = () => import('@/scripts/customer/views/settings/AddressInformation.vue')

const PaintProtectionWarranty = () => import('@/scripts/customer/views/paintProtectionWarranty/Index.vue')
const PaintProtectionWarrantyView = () => import('@/scripts/customer/views/paintProtectionWarranty/View.vue')
const PaintProtectionWarrantyCreate = () => import('@/scripts/customer/views/paintProtectionWarranty/Create.vue')

export default [
  {
    path: '/:company/customer',
    component: LayoutLogin,
    meta: { redirectIfAuthenticated: true },
    children: [
      {
        path: '',
        component: Login,
      },
      {
        path: 'login',
        component: Login,
        name: 'customer.login',
      },
      {
        path: 'forgot-password',
        component: ForgotPassword,
        name: 'customer.forgot-password',
      },
      {
        path: 'reset/password/:token',
        component: ResetPassword,
        name: 'customer.reset-password',
      },
    ],
  },
  {
    path: '/:company/customer',
    component: LayoutBasic,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
        name: 'customer.dashboard',
      },

      // Paint Protection Warranty
      {
        path: 'paint-protection-warranties',
        name: 'paint-protection-warranty.dashboard',
        component: PaintProtectionWarranty,
      },
      {
        path: 'paint-protection-warranties/:id/view',
        name: 'customer.paint-protection-warranty.view',
        component: PaintProtectionWarrantyView,
      },
      {
        path: 'paint-protection-warranties/:id/edit',
        name: 'customer.paint-protection-warranty.edit',
        component: PaintProtectionWarrantyCreate,
      },
      {
        path: 'paint-protection-warranties/create',
        name: 'customer.paint-protection-warranty.create',
        component: PaintProtectionWarrantyCreate,
      },

      {
        path: 'invoices',
        component: Invoice,
        name: 'invoices.dashboard',
      },
      {
        path: 'invoices/:id/view',
        component: InvoiceView,
        name: 'customer.invoices.view',
      },
      {
        path: 'estimates',
        component: Estimate,
        name: 'estimates.dashboard',
      },
      {
        path: 'estimates/:id/view',
        component: EstimateView,
        name: 'customer.estimates.view',
      },
      {
        path: 'payments',
        component: Payment,
        name: 'payments.dashboard',
      },
      {
        path: 'payments/:id/view',
        component: PaymentView,
        name: 'customer.payments.view',
      },
      {
        path: 'settings',
        component: SettingIndex,
        name: 'customer',
        children: [
          {
            path: 'customer-profile',
            component: CustomerProfile,
            name: 'customer.profile',
          },
          {
            path: 'address-info',
            component: AddressInfo,
            name: 'customer.address.info',
          },
        ],
      },
    ],
  },
]
