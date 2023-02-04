import React from "react"
import { Redirect } from "react-router-dom"


// Profile
import UserProfile from "../pages/Authentication/user-profile"
import Profile from "../pages/Authentication/Profile";

// //Tasks
import TasksList from "../pages/Tasks/tasks-list"
import TasksCreate from "../pages/Tasks/tasks-create"
import CreateTask from "../pages/Customers/CustomerData/task-create";
import DetailTask from "../pages/Customers/CustomerData/task-detail";

// //Ecommerce Pages
import EcommerceCustomers from "../pages/Ecommerce/EcommerceCustomers/index"
import EcommerceCart from "../pages/Ecommerce/EcommerceCart"
import EcommerceCheckout from "../pages/Ecommerce/EcommerceCheckout"
import EcommerceAddProduct from "../pages/Ecommerce/EcommerceAddProduct"
import CreateEmployee from "../pages/Ecommerce/EcommerceCustomers/create-employee";

// Customers
import CustomersList from "../pages/Customers/CustomerData";
import CustomerUpdate from "../pages/Customers/CustomerData/customer-update";

//Invoices
import InvoicesList from "../pages/Invoices/invoices-list"
import InvoiceDetail from "../pages/Invoices/invoices-detail"
import MyDay from "../pages/Invoices/my-day";
import InvoiceCustomer from "../pages/Invoices/invoices-customer";

// MultiFormRegister
import MultiFormRegister from "../pages/Multi-Step-Signup/signup";

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

//  // Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login"
import Login2 from "../pages/AuthenticationInner/Login2"
import Register1 from "../pages/AuthenticationInner/Register"
import Register2 from "../pages/AuthenticationInner/Register2"
import Recoverpw from "../pages/AuthenticationInner/Recoverpw"
import Recoverpw2 from "../pages/AuthenticationInner/Recoverpw2"
import ForgetPwd1 from "../pages/AuthenticationInner/ForgetPassword"
import ForgetPwd2 from "../pages/AuthenticationInner/ForgetPassword2"
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen"
import LockScreen2 from "../pages/AuthenticationInner/auth-lock-screen-2"
import ConfirmMail from "../pages/AuthenticationInner/page-confirm-mail"
import ConfirmMail2 from "../pages/AuthenticationInner/page-confirm-mail-2"
import EmailVerification from "../pages/AuthenticationInner/auth-email-verification"
import EmailVerification2 from "../pages/AuthenticationInner/auth-email-verification-2"
import TwostepVerification from "../pages/AuthenticationInner/auth-two-step-verification"
import TwostepVerification2 from "../pages/AuthenticationInner/auth-two-step-verification-2"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

//Icons
import IconBoxicons from "../pages/Icons/IconBoxicons"
import IconDripicons from "../pages/Icons/IconDripicons"
import IconMaterialdesign from "../pages/Icons/IconMaterialdesign"
import IconFontawesome from "../pages/Icons/IconFontawesome"

//Tables
import BasicTables from "../pages/Tables/BasicTables"
import DatatableTables from "../pages/Tables/DatatableTables"
import ResponsiveTables from "../pages/Tables/ResponsiveTables"
import EditableTables from "../pages/Tables/EditableTables"
import DragDropTables from "../pages/Tables/DragDropTables"

// Forms
import FormElements from "../pages/Forms/FormElements"
import FormLayouts from "../pages/Forms/FormLayouts"
import FormAdvanced from "../pages/Forms/FormAdvanced"
import FormEditors from "../pages/Forms/FormEditors"
import FormValidations from "../pages/Forms/FormValidations"
import FormMask from "../pages/Forms/FormMask"
import FormRepeater from "../pages/Forms/FormRepeater"
import FormUpload from "../pages/Forms/FormUpload"
import FormWizard from "../pages/Forms/FormWizard"
import FormXeditable from "../pages/Forms/FormXeditable"

//Ui
import UiAlert from "../pages/Ui/UiAlert"
import UiButtons from "../pages/Ui/UiButtons"
import UiCards from "../pages/Ui/UiCards"
import UiCarousel from "../pages/Ui/UiCarousel"
import UiColors from "../pages/Ui/UiColors"
import UiDropdown from "../pages/Ui/UiDropdown"
import UiGeneral from "../pages/Ui/UiGeneral"
import UiGrid from "../pages/Ui/UiGrid"
import UiImages from "../pages/Ui/UiImages"
import UiLightbox from "../pages/Ui/UiLightbox"
import UiModal from "../pages/Ui/UiModal"
import UiProgressbar from "../pages/Ui/UiProgressbar"
import UiTabsAccordions from "../pages/Ui/UiTabsAccordions"
import UiTypography from "../pages/Ui/UiTypography"
import UiVideo from "../pages/Ui/UiVideo"
import UiSessionTimeout from "../pages/Ui/UiSessionTimeout"
import UiRating from "../pages/Ui/UiRating"
import UiRangeSlider from "../pages/Ui/UiRangeSlider"
import UiNotifications from "../pages/Ui/ui-notifications"
import UiOffCanvas from "pages/Ui/UiOffCanvas"
import UiUtilitie from "../pages/Ui/UiUtilitie"
import UiPlaceholders from "../pages/Ui/UiPlaceholders"
import UiToasts from "../pages/Ui/UiToast"

//Pages
import PagesStarter from "../pages/Utility/pages-starter"
import PagesMaintenance from "../pages/Utility/pages-maintenance"
import PagesComingsoon from "../pages/Utility/pages-comingsoon"
import PagesTimeline from "../pages/Utility/pages-timeline"
import PagesFaqs from "../pages/Utility/pages-faqs"
import PagesPricing from "../pages/Utility/pages-pricing"
import Pages404 from "../pages/Utility/pages-404"
import Pages500 from "../pages/Utility/pages-500"

//Reports
import Reports from "../pages/Reports/Reports";
import ReportOverview from "../pages/Reports/report-overview";
import ReportCrew from "../pages/Reports/report-crew";
import ReportCustomer from "../pages/Reports/report-customer";
import ReportTax from "../pages/Reports/report-tax";
import ReportOverviewDetail from "../pages/Reports/report-detail";

// Register
import RegisterStep2 from "../pages/Authentication/RegisterStep2";
import RegisterAccount from "../pages/Account/Register";
import UpdateAccountAdmin from "../pages/Account/AccountUpdate";

//Car
import CreateCar from "../pages/Customers/CustomerData/car-create";
import ListCars from "../pages/Customers/CustomerData/car-list";
import CarDetail from "../pages/Customers/CustomerData/car-detail";
import ListAllCars from "../pages/Car/car-all";

//Customer
import CreateCustomer from "../pages/Customers/CustomerData/CreateCustomer";
import CustomerDetail from "../pages/Customers/CustomerData/customer-detail";
import ProfileUpdate from "../pages/Authentication/ProfileUpdate";

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },

  //Car
  { path: "/car-create/:id?", component: CreateCar },
  { path: "/car-list/:id?", component: ListCars },
  { path: "/car-detail/:id?", component: CarDetail },
  { path: "/car-all", component: ListAllCars },

  //Customer
  { path: "/customers", component: CustomersList },
  { path: "/create-customer", component: CreateCustomer },
  { path: "/customer-detail/:id?", component: CustomerDetail },
  { path: "/customer-update/:id?", component: CustomerUpdate },

  // Reports
  { path: "/reports", component: Reports },
  { path: "/report-overview", component: ReportOverview },
  { path: "/report-customer", component: ReportCustomer },
  { path: "/report-crew", component: ReportCrew },
  { path: "/report-tax", component: ReportTax },
  { path: "/report-overview-detail/:id", component: ReportOverviewDetail },

  // //profile
  { path: "/profile", component: Profile },
  { path: "/profile-update", component: ProfileUpdate },

  //Ecommerce
  { path: "/employee", component: EcommerceCustomers },
  { path: "/create-employee", component: CreateEmployee },
  { path: "/ecommerce-cart", component: EcommerceCart },
  { path: "/ecommerce-checkout", component: EcommerceCheckout },
  { path: "/ecommerce-add-product", component: EcommerceAddProduct },

  //Invoices
  { path: "/invoices-list", component: InvoicesList },
  { path: "/invoices-detail/:id?", component: InvoiceDetail },
  { path: "/my-day", component: MyDay },
  { path: "/invoices-list/:id?", component: InvoiceCustomer },

  // Tasks
  { path: "/tasks-list", component: TasksList },
  { path: "/tasks-create", component: TasksCreate },
  { path: "/tasks-create/:id?", component: CreateTask },
  { path: "/tasks-detail/:id?", component: DetailTask },

  // Icons
  { path: "/icons-boxicons", component: IconBoxicons },
  { path: "/icons-dripicons", component: IconDripicons },
  { path: "/icons-materialdesign", component: IconMaterialdesign },
  { path: "/icons-fontawesome", component: IconFontawesome },

  // Tables
  { path: "/tables-basic", component: BasicTables },
  { path: "/tables-datatable", component: DatatableTables },
  { path: "/tables-responsive", component: ResponsiveTables },
  { path: "/tables-editable", component: EditableTables },
  { path: "/tables-dragndrop", component: DragDropTables },

  // Forms
  { path: "/form-elements", component: FormElements },
  { path: "/form-layouts", component: FormLayouts },
  { path: "/form-advanced", component: FormAdvanced },
  { path: "/form-editors", component: FormEditors },
  { path: "/form-mask", component: FormMask },
  { path: "/form-repeater", component: FormRepeater },
  { path: "/form-uploads", component: FormUpload },
  { path: "/form-wizard", component: FormWizard },
  { path: "/form-validation", component: FormValidations },
  { path: "/form-xeditable", component: FormXeditable },

  // Ui
  { path: "/ui-alerts", component: UiAlert },
  { path: "/ui-buttons", component: UiButtons },
  { path: "/ui-cards", component: UiCards },
  { path: "/ui-carousel", component: UiCarousel },
  { path: "/ui-colors", component: UiColors },
  { path: "/ui-dropdowns", component: UiDropdown },
  { path: "/ui-general", component: UiGeneral },
  { path: "/ui-grid", component: UiGrid },
  { path: "/ui-images", component: UiImages },
  { path: "/ui-lightbox", component: UiLightbox },
  { path: "/ui-modals", component: UiModal },
  { path: "/ui-progressbars", component: UiProgressbar },
  { path: "/ui-tabs-accordions", component: UiTabsAccordions },
  { path: "/ui-typography", component: UiTypography },
  { path: "/ui-video", component: UiVideo },
  { path: "/ui-session-timeout", component: UiSessionTimeout },
  { path: "/ui-rating", component: UiRating },
  { path: "/ui-rangeslider", component: UiRangeSlider },
  { path: "/ui-notifications", component: UiNotifications },
  { path: "/ui-offcanvas", component: UiOffCanvas },
  { path: "/ui-utilities", component: UiUtilitie },
  { path: "/ui-placeholders", component: UiPlaceholders },
  { path: "/ui-toasts", component: UiToasts },

  //Utility
  { path: "/pages-starter", component: PagesStarter },
  { path: "/pages-timeline", component: PagesTimeline },
  { path: "/pages-faqs", component: PagesFaqs },
  { path: "/pages-pricing", component: PagesPricing },

  // register account
  {path: "/register/account", component: RegisterAccount},
  {path: "/update/account", component: UpdateAccountAdmin},

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
  { path: "/register-user", component: RegisterStep2 },

  // multi-form-register
  { path: "/register-account", component: MultiFormRegister },
  { path: "/pages-maintenance", component: PagesMaintenance },
  { path: "/pages-comingsoon", component: PagesComingsoon },
  { path: "/pages-404", component: Pages404 },
  { path: "/pages-500", component: Pages500 },

  // Authentication Inner
  { path: "/pages-login", component: Login1 },
  { path: "/pages-login-2", component: Login2 },
  { path: "/pages-register", component: Register1 },
  { path: "/pages-register-2", component: Register2 },
  { path: "/page-recoverpw", component: Recoverpw },
  { path: "/page-recoverpw-2", component: Recoverpw2 },
  { path: "/pages-forgot-pwd", component: ForgetPwd1 },
  { path: "/auth-recoverpw-2", component: ForgetPwd2 },
  { path: "/auth-lock-screen", component: LockScreen },
  { path: "/auth-lock-screen-2", component: LockScreen2 },
  { path: "/page-confirm-mail", component: ConfirmMail },
  { path: "/page-confirm-mail-2", component: ConfirmMail2 },
  { path: "/auth-email-verification", component: EmailVerification },
  { path: "/auth-email-verification-2", component: EmailVerification2 },
  { path: "/auth-two-step-verification", component: TwostepVerification },
  { path: "/auth-two-step-verification-2", component: TwostepVerification2 },
]

export { authProtectedRoutes, publicRoutes }
