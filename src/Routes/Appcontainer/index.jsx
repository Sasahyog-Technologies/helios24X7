/* eslint-disable no-unused-vars */

// Customized
import CustomClientList from "../../views/pages/Client/ClientList.jsx";
import TestPage from "../../components/Test/TestPage.jsx";

import React, { useEffect } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import ComponentSidebar from "../../components/ComponentSidebar";
import ChatSidebar from "../../components/Mainpages/chatSidebar";
import EmailSidebar from "../../components/Mainpages/emailSidebar";
import SettingsSidebar from "../../components/SettingsSidebar";
import Header from "../../views/layout/Header";
import Sidebar from "../../views/layout/Sidebar";

import GoalTracking from "../../views/pages/Performance/Goals/GoalTracking";
import GoalType from "../../views/pages/Performance/Goals/GoalType";
import PerformanceAppraisal from "../../views/pages/Performance/Performance/PerformanceAppraisal";
import PerformanceIndicator from "../../views/pages/Performance/Performance/PerformanceIndicator";
import PerformanceReview from "../../views/pages/Performance/Performance/PerformanceReview";
import Trainers from "../../views/pages/Performance/Training/Trainers";
import Training from "../../views/pages/Performance/Training/Training";
import TrainingType from "../../views/pages/Performance/Training/TrainingType";
import BasicInputs from "../../views/pages/Ui_Interface/Forms/BasicInputs";
import Formmask from "../../views/pages/Ui_Interface/Forms/Formmask";
import Formvalidation from "../../views/pages/Ui_Interface/Forms/Formvalidation";
import HorizontalForm from "../../views/pages/Ui_Interface/Forms/HorizontalForm";
import InputGroups from "../../views/pages/Ui_Interface/Forms/InputGroups";
import VerticalForm from "../../views/pages/Ui_Interface/Forms/VerticalForm";
import DataTables from "../../views/pages/Ui_Interface/Tables/DataTables";
import TablesBasic from "../../views/pages/Ui_Interface/Tables/TablesBasic";

// import EmployeeProfile from "../../views/pages/Pages/profile/employeeprofile";
import OffCanvas from "../../components/OffCanvas";
import Activities from "../../views/pages/Administration/Activities";
import Assets from "../../views/pages/Administration/Assets";
import AptitudeResults from "../../views/pages/Administration/Jobs/AptitudeResults";
import CanditatesList from "../../views/pages/Administration/Jobs/CanditatesList";
import ExperienceLevel from "../../views/pages/Administration/Jobs/ExperienceLevel";
import InterviewingQuestions from "../../views/pages/Administration/Jobs/InterviewingQuestions";
import JobsDashboard from "../../views/pages/Administration/Jobs/JobDashboard";
import ManageJobs from "../../views/pages/Administration/Jobs/ManageJobs";
import ManageJobResumes from "../../views/pages/Administration/Jobs/ManageResumes";
import OfferApprovals from "../../views/pages/Administration/Jobs/OfferApprovals";
import ScheduleTiming from "../../views/pages/Administration/Jobs/ScheduleTiming.jsx";
import ShortListCandidates from "../../views/pages/Administration/Jobs/ShortListCandidates";
import AppliedJobs from "../../views/pages/Administration/Jobs/UserJob/AppliedJobs";
import ArchivedJobs from "../../views/pages/Administration/Jobs/UserJob/ArchivedJobs";
import Interviewing from "../../views/pages/Administration/Jobs/UserJob/Interviewing";
import JobAptitude from "../../views/pages/Administration/Jobs/UserJob/JobAptitude";
import Questions from "../../views/pages/Administration/Jobs/UserJob/Questions";
import SavedJobs from "../../views/pages/Administration/Jobs/UserJob/SavedJobs";
import UserAllJobs from "../../views/pages/Administration/Jobs/UserJob/UserAllJobs";
import UserDashboard from "../../views/pages/Administration/Jobs/UserJob/UserDashboard";
import UserOfferedJobs from "../../views/pages/Administration/Jobs/UserJob/UserOfferedJobs";
import VisitedJobs from "../../views/pages/Administration/Jobs/UserJob/VisitedJobs";
import KnowledgeBase from "../../views/pages/Administration/Knowledgebase/KnowledgeBase";
import KnowledgeBaseView from "../../views/pages/Administration/Knowledgebase/KnowledgeBaseView";
import ApprovalSetting from "../../views/pages/Administration/Settings/ApprovalSetting";
import CronSetting from "../../views/pages/Administration/Settings/CronSetting";
import EmailSettings from "../../views/pages/Administration/Settings/EmailSettings";
import InvoiceSettings from "../../views/pages/Administration/Settings/InvoiceSettings";
import LeaveType from "../../views/pages/Administration/Settings/LeaveType";
import Localization from "../../views/pages/Administration/Settings/Localization";
import NotificationSettings from "../../views/pages/Administration/Settings/NotificationSettings";
import PerformanceSetting from "../../views/pages/Administration/Settings/Performance/PerformanceSetting";
import RolesPermissions from "../../views/pages/Administration/Settings/RolesPermissions";
import SalarySettings from "../../views/pages/Administration/Settings/SalarySettings";
import Settings from "../../views/pages/Administration/Settings/Settings";
import ThemeSettings from "../../views/pages/Administration/Settings/ThemeSettings";
import ToxboxSetting from "../../views/pages/Administration/Settings/ToxboxSetting";
import Users from "../../views/pages/Administration/Users";
import Analytics from "../../views/pages/Crm/Analytics.jsx";
import Companies from "../../views/pages/Crm/companies.jsx";
import CompaniesGrid from "../../views/pages/Crm/CompaniesGrid.jsx";
import CompanyDetails from "../../views/pages/Crm/CompanyDetails.jsx";
import ContactDetails from "../../views/pages/Crm/ContactDetails.jsx";
import ContactGrid from "../../views/pages/Crm/ContactGrid.jsx";
import ContactList from "../../views/pages/Crm/ContactList.jsx";
import Deals from "../../views/pages/Crm/Deals.jsx";
import DealsDetails from "../../views/pages/Crm/DealsDetails.jsx";
import DealsKanban from "../../views/pages/Crm/DealsKanban.jsx";
import LeadsDetails from "../../views/pages/Crm/LeadsDetails.jsx";
import LeadsKanban from "../../views/pages/Crm/LeadsKanban.jsx";
import LeadsList from "../../views/pages/Crm/LeadsList.jsx";
import PipeLine from "../../views/pages/Crm/PipeLine.jsx";
import AdminLeave from "../../views/pages/Employees/AdminLeave";
import AllEmpoyee from "../../views/pages/Employees/AllEmpoyee";
import AttendenceAdmin from "../../views/pages/Employees/Attendenceadmin";
import AttendanceEmployee from "../../views/pages/Employees/AttendenceEmployee";
import ClientList from "../../views/pages/Employees/ClientList";
import Clients from "../../views/pages/Employees/Clients";
import Department from "../../views/pages/Employees/Department";
import Designation from "../../views/pages/Employees/Designation";
import EmployeeLeave from "../../views/pages/Employees/EmployeeLeave";
import EmployeeList from "../../views/pages/Employees/EmployeeList";
import Holidays from "../../views/pages/Employees/Holidays";
import Leads from "../../views/pages/Employees/Leads";
import LeaveSettings from "../../views/pages/Employees/LeaveSetting";
import OverTime from "../../views/pages/Employees/OverTime";
import Project from "../../views/pages/Employees/Projects/Project";
import ProjectList from "../../views/pages/Employees/Projects/ProjectList";
import ProjectView from "../../views/pages/Employees/Projects/ProjectView";
import { SidebarProject } from "../../views/pages/Employees/Projects/SidebarProject";
import TaskBoard from "../../views/pages/Employees/Projects/TaskBoard";
import Tasks from "../../views/pages/Employees/Projects/Tasks";
import ShiftScheduling from "../../views/pages/Employees/ShiftandSchedule";
import ShiftList from "../../views/pages/Employees/ShiftList";
import Ticket from "../../views/pages/Employees/Ticket";
import TicketDetails from "../../views/pages/Employees/TicketDetails.jsx";
import TimeSheet from "../../views/pages/Employees/TimeSheet";
import BudgetExpenses from "../../views/pages/HR/Accounting/BudgetExpenses";
import BudgetRevenues from "../../views/pages/HR/Accounting/BudgetRevenue";
import Budgets from "../../views/pages/HR/Accounting/Budgets.jsx";
import Categories from "../../views/pages/HR/Accounting/Categories";
import SubCategory from "../../views/pages/HR/Accounting/Categories/subCategory";
import EmployeeSalary from "../../views/pages/HR/Payroll/EmployeeSalary.jsx";
import PayrollItems from "../../views/pages/HR/Payroll/PayrollItems.jsx";
import PaySlip from "../../views/pages/HR/Payroll/Payslip";
import Policies from "../../views/pages/HR/Policies";
import AttendanceReport from "../../views/pages/HR/Reports/AttendanceReport";
import DailyReports from "../../views/pages/HR/Reports/DailyReports";
import EmployeeReport from "../../views/pages/HR/Reports/EmployeeReports";
import ExpenseReport from "../../views/pages/HR/Reports/ExpenseReport";
import InvoiceReport from "../../views/pages/HR/Reports/InvoiceReport";
import LeaveReport from "../../views/pages/HR/Reports/LeaveReport";
import PaymentReport from "../../views/pages/HR/Reports/PaymentReport";
import PaySlipReports from "../../views/pages/HR/Reports/PaySlipReports";
import ProjectReport from "../../views/pages/HR/Reports/ProjectReport";
import TaskReport from "../../views/pages/HR/Reports/TaskReport";
import UserReport from "../../views/pages/HR/Reports/UserReport";
import Estimates from "../../views/pages/HR/Sales/Estimates";
import CreateEstimate from "../../views/pages/HR/Sales/Estimates/createEstimate";
import EditEstimate from "../../views/pages/HR/Sales/Estimates/EditEstimate";
import Expenses from "../../views/pages/HR/Sales/Expenses";
import CreateInvoice from "../../views/pages/HR/Sales/Invoices/createInvoice";
import EditInvoice from "../../views/pages/HR/Sales/Invoices/editInvoice";
import Invoices from "../../views/pages/HR/Sales/Invoices/Index";
import InvoiceView from "../../views/pages/HR/Sales/Invoices/invoiceView";
import Payments from "../../views/pages/HR/Sales/payments";
import ProvidentFund from "../../views/pages/HR/Sales/ProvidentFund";
import Taxes from "../../views/pages/HR/Sales/Taxes";
import Calendar from "../../views/pages/MainPages/Apps/calendar";
import IncomingCall from "../../views/pages/MainPages/Apps/calls/incomingCall";
import Outgoing from "../../views/pages/MainPages/Apps/calls/outgoingCall";
import VideoCall from "../../views/pages/MainPages/Apps/calls/VideoCall";
import VoiceCall from "../../views/pages/MainPages/Apps/calls/voiceCall";
import Chat from "../../views/pages/MainPages/Apps/chat";
import Contacts from "../../views/pages/MainPages/Apps/contacts";
import Email from "../../views/pages/MainPages/Apps/Email";
import Compose from "../../views/pages/MainPages/Apps/Email/compose";
import EmailView from "../../views/pages/MainPages/Apps/Email/emailView.jsx";
import FileManager from "../../views/pages/MainPages/Apps/FileManager";
import AdminDashboard from "../../views/pages/MainPages/Dashboard/AdminDashboard/adminDashboard";
import DealsDashboard from "../../views/pages/MainPages/Dashboard/DealsDashboard/index.jsx";
import EmployeeDashboard from "../../views/pages/MainPages/Dashboard/EmployeeDashboard";
import LeadsDashboard from "../../views/pages/MainPages/Dashboard/LeadsDashboard/index.jsx";
import BlankPage from "../../views/pages/Pages/BlankPage";
import Faq from "../../views/pages/Pages/Faq";
import PrivacyPolicy from "../../views/pages/Pages/PrivacyPolicy";
import Search from "../../views/pages/Pages/Search/Search";
import Terms from "../../views/pages/Pages/Terms";
import Promotion from "../../views/pages/Performance/Promotion";
import Resignation from "../../views/pages/Performance/Resignation";
import Termination from "../../views/pages/Performance/Termination";
import ClientProfile from "../../views/pages/Profile/ClientProfile";
import Profile from "../../views/pages/Profile/Profile";
import SubscribedCompany from "../../views/pages/Subscribtions/SubscribedCompany";
import Subscribtions from "../../views/pages/Subscribtions/Subscribtions";
import SubscribtionsCompany from "../../views/pages/Subscribtions/SubscribtionsCompany";
import TrainerList from "../../views/pages/Trainer/TrainerList.jsx";
import Apexchart from "../../views/pages/Ui_Interface/Charts/Apexcharts.jsx";
import C3Charts from "../../views/pages/Ui_Interface/Charts/C3charts.jsx";
import ChartJs from "../../views/pages/Ui_Interface/Charts/Chartjs.jsx";
import FlotCharts from "../../views/pages/Ui_Interface/Charts/Flotcharts.jsx";
import MorrisCharts from "../../views/pages/Ui_Interface/Charts/Morrischarts.jsx";
import PeityCharts from "../../views/pages/Ui_Interface/Charts/Peitycharts.jsx";
import Components from "../../views/pages/Ui_Interface/Components/Components";
import Clipboard from "../../views/pages/Ui_Interface/Elements/Clipboard.jsx";
import Counter from "../../views/pages/Ui_Interface/Elements/Counter.jsx";
import Dragdrop from "../../views/pages/Ui_Interface/Elements/Dragdrop.jsx";
import Formwizard from "../../views/pages/Ui_Interface/Elements/Formwizard.jsx";
import Notification from "../../views/pages/Ui_Interface/Elements/Notification.jsx";
import Ratings from "../../views/pages/Ui_Interface/Elements/Rating.jsx";
import Ribbon from "../../views/pages/Ui_Interface/Elements/Ribbon.jsx";
import Scrollbar from "../../views/pages/Ui_Interface/Elements/Scrollbar.jsx";
import Stickynotes from "../../views/pages/Ui_Interface/Elements/Stickynote.jsx";
import Texteditor from "../../views/pages/Ui_Interface/Elements/Texteditor.jsx";
import Timeline from "../../views/pages/Ui_Interface/Elements/Timeline.jsx";
import FileUpload from "../../views/pages/Ui_Interface/Forms/FileUpload.jsx";
import FormSelectTwo from "../../views/pages/Ui_Interface/Forms/FormSelectTwo.jsx";
import FeatherIcons from "../../views/pages/Ui_Interface/Icons/Feathericons.jsx";
import FlagIcons from "../../views/pages/Ui_Interface/Icons/Flagicons.jsx";
import FontAwesomeicons from "../../views/pages/Ui_Interface/Icons/Fontawesomeicons.jsx";
import IonicIcon from "../../views/pages/Ui_Interface/Icons/Ionicicons.jsx";
import MaterialIcons from "../../views/pages/Ui_Interface/Icons/Materialicons.jsx";
import Pe7Icon from "../../views/pages/Ui_Interface/Icons/Pe7icons.jsx";
import SimpleLine from "../../views/pages/Ui_Interface/Icons/Simpleicons.jsx";
import Themifyicons from "../../views/pages/Ui_Interface/Icons/Themifyicons.jsx";
import Typicons from "../../views/pages/Ui_Interface/Icons/Typicons.jsx";
import WeatherIcons from "../../views/pages/Ui_Interface/Icons/Weathericons.jsx";
import PlansList from "../../views/pages/Plans/PlansList.jsx";
import MembershipList from "../../views/pages/Memberships/MembershipList.jsx";
import UserProfile from "../../views/pages/Client/ClientProfile.jsx";
import EventsList from "../../views/pages/events/EventsList.jsx";
import TrainerProfile from "../../views/pages/Trainer/TrainerProfile.jsx";
import { useSession } from "../../Hook/useSession.jsx";
import MyProfile from "../../views/pages/User/MyProfile.jsx";
import PaymentList from "../../views/pages/payment/PaymentList.jsx";
import InvoiceList from "../../views/pages/Invoices/InvoiceList.jsx";
import InvoiceDetails from "../../views/pages/Invoices/InvoiceDetails.jsx";
import PTPList from "../../views/pages/PTP/PTPList.jsx";
import MyPayments from "../../views/pages/User/MyPayments.jsx";

const AppContainer = () => {
  useEffect(() => {
    localStorage.setItem("colorschema", "orange");
    localStorage.setItem("layout", "vertical");
    localStorage.setItem("layoutwidth", "fixed");
    localStorage.setItem("layoutpos", "fluid");
    localStorage.setItem("topbartheme", "light");
    localStorage.setItem("layoutSized", "lg");
    localStorage.setItem("layoutStyling", "default");
    localStorage.setItem("layoutSidebarStyle", "dark");
  }, []);

  const routingObjects = [
    {
      id: 1,
      path: "form-basic-inputs",
      element: <BasicInputs />,
    },
    {
      id: 2,
      path: "admin-dashboard",
      element: <AdminDashboard />,
    },
    {
      id: 3,
      path: "form-horizontal",
      element: <HorizontalForm />,
    },
    {
      id: 4,
      path: "form-vertical",
      element: <VerticalForm />,
    },
    {
      id: 5,
      path: "form-mask",
      element: <Formmask />,
    },
    {
      id: 6,
      path: "form-validation",
      element: <Formvalidation />,
    },
    {
      id: 7,
      path: "tables-basic",
      element: <TablesBasic />,
    },
    {
      id: 8,
      path: "data-tables",
      element: <DataTables />,
    },
    {
      id: 9,
      path: "performance-indicator",
      element: <PerformanceIndicator />,
    },
    {
      id: 10,
      path: "performance",
      element: <PerformanceReview />,
    },
    {
      id: 11,
      path: "performance-appraisal",
      element: <PerformanceAppraisal />,
    },
    {
      id: 12,
      path: "goal-tracking",
      element: <GoalTracking />,
    },
    {
      id: 13,
      path: "goal-type",
      element: <GoalType />,
    },
    {
      id: 14,
      path: "trainers",
      element: <Trainers />,
    },
    {
      id: 15,
      path: "training",
      element: <Training />,
    },
    {
      id: 16,
      path: "training-type",
      element: <TrainingType />,
    },
    {
      id: 17,
      path: "employee-dashboard",
      element: <EmployeeDashboard />,
    },
    {
      id: 18,
      path: "activities",
      element: <Activities />,
    },
    {
      id: 19,
      path: "form-input-groups",
      element: <InputGroups />,
    },
    // {
    //   id: 20,
    //   path: "profile",
    //   element: <EmployeeProfile />,
    // },
    {
      id: 21,
      path: "events",
      element: <Calendar />,
    },
    {
      id: 22,
      path: "contacts",
      element: <Contacts />,
    },

    {
      id: 23,
      path: "file-manager",
      element: <FileManager />,
    },
    {
      id: 24,
      path: "estimates",
      element: <Estimates />,
    },
    {
      id: 25,
      path: "create-estimate",
      element: <CreateEstimate />,
    },
    {
      id: 26,
      path: "edit-estimate",
      element: <EditEstimate />,
    },
    {
      id: 27,
      path: "invoices",
      element: <Invoices />,
    },
    {
      id: 28,
      path: "create-invoice",
      element: <CreateInvoice />,
    },
    {
      id: 29,
      path: "edit-invoice",
      element: <EditInvoice />,
    },
    {
      id: 30,
      path: "invoice-view",
      element: <InvoiceView />,
    },
    {
      id: 31,
      path: "payments",
      element: <Payments />,
    },
    {
      id: 32,
      path: "promotion",
      element: <Promotion />,
    },
    {
      id: 33,
      path: "resignation",
      element: <Resignation />,
    },
    {
      id: 34,
      path: "termination",
      element: <Termination />,
    },
    {
      id: 34,
      path: "employees",
      element: <AllEmpoyee />,
    },
    {
      id: 35,
      path: "holidays",
      element: <Holidays />,
    },
    {
      id: 36,
      path: "adminleaves",
      element: <AdminLeave />,
    },
    {
      id: 37,
      path: "leaves-employee",
      element: <EmployeeLeave />,
    },
    {
      id: 38,
      path: "leave-settings",
      element: <LeaveSettings />,
    },
    {
      id: 39,
      path: "adminattendance",
      element: <AttendenceAdmin />,
    },
    {
      id: 40,
      path: "attendance-employee",
      element: <AttendanceEmployee />,
    },
    {
      id: 41,
      path: "departments",
      element: <Department />,
    },
    {
      id: 42,
      path: "designations",
      element: <Designation />,
    },
    {
      id: 43,
      path: "timesheet",
      element: <TimeSheet />,
    },
    {
      id: 43,
      path: "shift-scheduling",
      element: <ShiftScheduling />,
    },
    {
      id: 44,
      path: "shift-list",
      element: <ShiftList />,
    },
    {
      id: 45,
      path: "overtime",
      element: <OverTime />,
    },
    {
      id: 46,
      path: "clients",
      element: <Clients />,
    },
    {
      id: 47,
      path: "projects",
      element: <Project />,
    },
    {
      id: 48,
      path: "clients-list",
      element: <ClientList />,
    },
    {
      id: 49,
      path: "task-board",
      element: <TaskBoard />,
    },
    {
      id: 50,
      path: "leads",
      element: <Leads />,
    },
    {
      id: 51,
      path: "tickets",
      element: <Ticket />,
    },
    {
      id: 52,
      path: "client-profile",
      element: <ClientProfile />,
    },
    {
      id: 53,
      path: "profile",
      element: <Profile />,
    },
    {
      id: 54,
      path: "subscriptions",
      element: <Subscribtions />,
    },
    {
      id: 55,
      path: "subscribed-companies",
      element: <SubscribedCompany />,
    },
    {
      id: 56,
      path: "subscriptions-company",
      element: <SubscribtionsCompany />,
    },
    {
      id: 57,
      path: "search",
      element: <Search />,
    },
    {
      id: 58,
      path: "faq",
      element: <Faq />,
    },
    {
      id: 59,
      path: "terms",
      element: <Terms />,
    },
    {
      id: 60,
      path: "terms",
      element: <Terms />,
    },
    {
      id: 61,
      path: "privacy-policy",
      element: <PrivacyPolicy />,
    },
    {
      id: 62,
      path: "blank-page",
      element: <BlankPage />,
    },
    {
      id: 63,
      path: "knowledgebase",
      element: <KnowledgeBase />,
    },
    {
      id: 64,
      path: "knowledgebase-view",
      element: <KnowledgeBaseView />,
    },
    {
      id: 64,
      path: "employees-list",
      element: <EmployeeList />,
    },
    {
      id: 65,
      path: "expenses",
      element: <Expenses />,
    },
    {
      id: 66,
      path: "provident-fund",
      element: <ProvidentFund />,
    },
    {
      id: 67,
      path: "taxes",
      element: <Taxes />,
    },
    {
      id: 68,
      path: "categories",
      element: <Categories />,
    },
    {
      id: 69,
      path: "sub-category",
      element: <SubCategory />,
    },
    {
      id: 70,
      path: "budgets",
      element: <Budgets />,
    },
    {
      id: 71,
      path: "budget-expenses",
      element: <BudgetExpenses />,
    },
    {
      id: 72,
      path: "budget-revenues",
      element: <BudgetRevenues />,
    },
    {
      id: 73,
      path: "salary-view",
      element: <PaySlip />,
    },
    {
      id: 74,
      path: "payroll-items",
      element: <PayrollItems />,
    },
    {
      id: 75,
      path: "policies",
      element: <Policies />,
    },
    {
      id: 76,
      path: "salary",
      element: <EmployeeSalary />,
    },
    {
      id: 77,
      path: "expense-reports",
      element: <ExpenseReport />,
    },
    {
      id: 78,
      path: "invoice-reports",
      element: <InvoiceReport />,
    },

    {
      id: 79,
      path: "payments-reports",
      element: <PaymentReport />,
    },
    {
      id: 80,
      path: "project-reports",
      element: <ProjectReport />,
    },
    {
      id: 81,
      path: "task-reports",
      element: <TaskReport />,
    },
    {
      id: 82,
      path: "user-reports",
      element: <UserReport />,
    },
    {
      id: 83,
      path: "employee-reports",
      element: <EmployeeReport />,
    },
    {
      id: 84,
      path: "payslip-reports",
      element: <PaySlipReports />,
    },
    {
      id: 85,
      path: "attendance-reports",
      element: <AttendanceReport />,
    },
    {
      id: 86,
      path: "attendance-reports",
      element: <AttendanceReport />,
    },

    {
      id: 87,
      path: "leave-reports",
      element: <LeaveReport />,
    },
    {
      id: 88,
      path: "daily-reports",
      element: <DailyReports />,
    },
    {
      id: 89,
      path: "project-list",
      element: <ProjectList />,
    },
    {
      id: 90,
      path: "project-view",
      element: <ProjectView />,
    },
    {
      id: 91,
      path: "form-select2",
      element: <FormSelectTwo />,
    },
    {
      id: 92,
      path: "file-upload",
      element: <FileUpload />,
    },
    {
      id: 93,
      path: "ribbon",
      element: <Ribbon />,
    },
    {
      id: 94,
      path: "clipboard",
      element: <Clipboard />,
    },
    {
      id: 95,
      path: "dragdrop",
      element: <Dragdrop />,
    },
    {
      id: 96,
      path: "rating",
      element: <Ratings />,
    },
    {
      id: 97,
      path: "text-editor",
      element: <Texteditor />,
    },
    {
      id: 98,
      path: "counter",
      element: <Counter />,
    },
    {
      id: 99,
      path: "scrollbar",
      element: <Scrollbar />,
    },
    {
      id: 100,
      path: "notification",
      element: <Notification />,
    },
    {
      id: 101,
      path: "stickynote",
      element: <Stickynotes />,
    },
    {
      id: 102,
      path: "timeline",
      element: <Timeline />,
    },

    {
      id: 103,
      path: "form-wizard",
      element: <Formwizard />,
    },
    {
      id: 104,
      path: "apex-charts",
      element: <Apexchart />,
    },
    {
      id: 105,
      path: "chartjs",
      element: <ChartJs />,
    },
    {
      id: 106,
      path: "morris-charts",
      element: <MorrisCharts />,
    },
    {
      id: 107,
      path: "flot-charts",
      element: <FlotCharts />,
    },
    {
      id: 108,
      path: "peity-charts",
      element: <PeityCharts />,
    },
    {
      id: 109,
      path: "charts-c3",
      element: <C3Charts />,
    },
    {
      id: 110,
      path: "fontawesome-icons",
      element: <FontAwesomeicons />,
    },
    {
      id: 111,
      path: "feather-icons",
      element: <FeatherIcons />,
    },
    {
      id: 112,
      path: "ionic-icons",
      element: <IonicIcon />,
    },
    {
      id: 113,
      path: "material-icons",
      element: <MaterialIcons />,
    },
    {
      id: 114,
      path: "pe7-icons",
      element: <Pe7Icon />,
    },
    {
      id: 115,
      path: "simpleline-icons",
      element: <SimpleLine />,
    },
    {
      id: 116,
      path: "themify-icons",
      element: <Themifyicons />,
    },
    {
      id: 117,
      path: "weather-icons",
      element: <WeatherIcons />,
    },
    {
      id: 118,
      path: "typicons",
      element: <Typicons />,
    },
    {
      id: 119,
      path: "flag-icons",
      element: <FlagIcons />,
    },
    {
      id: 120,
      path: "contact-list",
      element: <ContactList />,
    },
    {
      id: 121,
      path: "contact-grid",
      element: <ContactGrid />,
    },
    {
      id: 122,
      path: "deals-dashboard",
      element: <DealsDashboard />,
    },
    {
      id: 123,
      path: "leads-dashboard",
      element: <LeadsDashboard />,
    },
    {
      id: 124,
      path: "ticket-details",
      element: <TicketDetails />,
    },
    {
      id: 125,
      path: "companies",
      element: <Companies />,
    },
    {
      id: 126,
      path: "contact-details",
      element: <ContactDetails />,
    },
    {
      id: 126,
      path: "leads-list",
      element: <LeadsList />,
    },
    {
      id: 127,
      path: "leads-kanban",
      element: <LeadsKanban />,
    },
    {
      id: 128,
      path: "leads-details",
      element: <LeadsDetails />,
    },
    {
      id: 128,
      path: "pipeline",
      element: <PipeLine />,
    },
    {
      id: 129,
      path: "Companies-grid",
      element: <CompaniesGrid />,
    },
    {
      id: 130,
      path: "company-details",
      element: <CompanyDetails />,
    },
    {
      id: 131,
      path: "deals",
      element: <Deals />,
    },
    {
      id: 132,
      path: "deals-kanban",
      element: <DealsKanban />,
    },
    {
      id: 130,
      path: "analytics",
      element: <Analytics />,
    },
    {
      id: 131,
      path: "deals-details",
      element: <DealsDetails />,
    },
  ];

  const ChatRoutingeObjects = [
    {
      id: 1,
      path: "chat",
      element: <Chat />,
    },
    {
      id: 2,
      path: "voice-call",
      element: <VoiceCall />,
    },
    {
      id: 3,
      path: "video-call",
      element: <VideoCall />,
    },
    {
      id: 4,
      path: "outgoing-call",
      element: <Outgoing />,
    },
    {
      id: 5,
      path: "incoming-call",
      element: <IncomingCall />,
    },
  ];
  const ComponentsRoutingeObjects = [
    {
      id: 1,
      path: "components",
      element: <Components />,
    },
  ];
  const EmailRoutingeObjects = [
    {
      id: 1,
      path: "inbox",
      element: <Email />,
    },
    {
      id: 2,
      path: "compose",
      element: <Compose />,
    },
    {
      id: 3,
      path: "mail-view",
      element: <EmailView />,
    },
  ];
  const SettingsRoutingeObjects = [
    {
      id: 1,
      path: "company-settings",
      element: <Settings />,
    },
    {
      id: 2,
      path: "localization",
      element: <Localization />,
    },
    {
      id: 3,
      path: "theme-settings",
      element: <ThemeSettings />,
    },
    {
      id: 4,
      path: "roles-permissions",
      element: <RolesPermissions />,
    },
    {
      id: 5,
      path: "email-settings",
      element: <EmailSettings />,
    },
    {
      id: 6,
      path: "performance-setting",
      element: <PerformanceSetting />,
    },
    {
      id: 7,
      path: "approval-setting",
      element: <ApprovalSetting />,
    },
    {
      id: 8,
      path: "invoice-settings",
      element: <InvoiceSettings />,
    },
    {
      id: 9,
      path: "salary-settings",
      element: <SalarySettings />,
    },
    {
      id: 10,
      path: "notifications-settings",
      element: <NotificationSettings />,
    },
    {
      id: 11,
      path: "leave-type",
      element: <LeaveType />,
    },
    {
      id: 14,
      path: "toxbox-setting",
      element: <ToxboxSetting />,
    },
    {
      id: 15,
      path: "cron-setting",
      element: <CronSetting />,
    },
  ];
  const ProjectRoutingeObjects = [
    {
      id: 1,
      path: "tasks",
      element: <Tasks />,
    },
  ];

  const AdministrationRoutingeObjects = [
    {
      id: 1,
      path: "assets",
      element: <Assets />,
    },
    {
      id: 2,
      path: "user-dashboard",
      element: <UserDashboard />,
    },
    {
      id: 3,
      path: "user-all-jobs",
      element: <UserAllJobs />,
    },
    {
      id: 4,
      path: "saved-jobs",
      element: <SavedJobs />,
    },
    {
      id: 5,
      path: "applied-jobs",
      element: <AppliedJobs />,
    },

    {
      id: 6,
      path: "interviewing",
      element: <Interviewing />,
    },
    {
      id: 7,
      path: "job-aptitude",
      element: <JobAptitude />,
    },
    {
      id: 8,
      path: "questions",
      element: <Questions />,
    },
    {
      id: 9,
      path: "offered-jobs",
      element: <UserOfferedJobs />,
    },
    {
      id: 10,
      path: "visited-jobs",
      element: <VisitedJobs />,
    },
    {
      id: 11,
      path: "archived-jobs",
      element: <ArchivedJobs />,
    },
    {
      id: 12,
      path: "jobs-dashboard",
      element: <JobsDashboard />,
    },
    {
      id: 13,
      path: "jobs",
      element: <ManageJobs />,
    },
    {
      id: 14,
      path: "manage-resumes",
      element: <ManageJobResumes />,
    },
    {
      id: 15,
      path: "shortlist-candidates",
      element: <ShortListCandidates />,
    },
    {
      id: 16,
      path: "interview-questions",
      element: <InterviewingQuestions />,
    },
    {
      id: 17,
      path: "offer_approvals",
      element: <OfferApprovals />,
    },
    {
      id: 18,
      path: "experiance-level",
      element: <ExperienceLevel />,
    },
    {
      id: 19,
      path: "candidates",
      element: <CanditatesList />,
    },
    {
      id: 21,
      path: "schedule-timing",
      element: <ScheduleTiming />,
    },
    {
      id: 22,
      path: "apptitude-result",
      element: <AptitudeResults />,
    },
    {
      id: 23,
      path: "users",
      element: <Users />,
    },
  ];

  const OwnerRoutingObjects = [
    {
      id: 1,
      path: "client-list",
      element: <CustomClientList />,
    },
    {
      id: 2,
      path: `client-profile/:clientId`,
      element: <UserProfile />,
    },
    {
      id: 3,
      path: `trainer-profile/:trainerId`,
      element: <TrainerProfile />,
    },
    {
      id: 4,
      path: "trainer-list",
      element: <TrainerList />,
    },
    {
      id: 5,
      path: "plans-list",
      element: <PlansList />,
    },
    {
      id: 6,
      path: "event-list",
      element: <EventsList />,
    },
    {
      id: 7,
      path: "membership-list",
      element: <MembershipList />,
    },
    {
      id: 8,
      path: "payment-list",
      element: <PaymentList />,
    },
    {
      id: 9,
      path: "invoice-list",
      element: <InvoiceList />,
    },
    {
      id: 10,
      path: "/owner/invoice-details/:invoiceId",
      element: <InvoiceDetails />,
    },
    {
      id: 11,
      path: "/owner/ptp-list",
      element: <PTPList />,
    },
  ];
  const ClientRoutingObjects = [
    {
      id: 1,
      path: "my-profile",
      element: <MyProfile />,
    },
    {
      id: 2,
      path: "my-payments",
      element: <MyPayments />,
    },
  ];

  const SidebarLayout = () => (
    <>
      <Header />
      <Sidebar />
      <OffCanvas />
      <Outlet />
    </>
  );
  const AuthendicationLayout = () => <div></div>;
  const ChatSidebarLayout = () => (
    <>
      <Header />
      <ChatSidebar />
      <Outlet />
    </>
  );
  const ComponentSidebarLayout = () => (
    <>
      <Header />
      <ComponentSidebar />
      <Outlet />
    </>
  );
  const EmailSidebarLayout = () => (
    <>
      <Header />
      <EmailSidebar />
      <Outlet />
    </>
  );
  const SettingsSidebarLayout = () => (
    <>
      <Header />
      <SettingsSidebar />
      <Outlet />
    </>
  );
  const ProjectSidebarLayout = () => (
    <>
      <Header />
      <SidebarProject />
      <Outlet />
    </>
  );

  const mobileResponsive = (event) => {
    const excludedHeader = document.querySelector(".header");
    const excludedSidebar = document.querySelector(".sidebar");

    if (
      !excludedHeader.contains(event.target) &&
      !excludedSidebar.contains(event.target)
    ) {
      document.body.classList.remove("slide-nav");
    }
  };

  const { getUserDataToCookie } = useSession();
  const user = getUserDataToCookie();
  //console.log(user);
  const OwnerProtectedRoute = ({ children }) => {
    if (user || user?.jwt) {
      if (user?.user.type === "owner") {
        return children;
      }
      return <Navigate to={"/client/my-profile"} replace={true} />;
    }
    return <Navigate replace={true} to="/" />;
  };
  const ClientProtectedRoute = ({ children }) => {
    if (user || user?.jwt || user?.user?.id) {
      /*    if (
        user?.user.type === "client" ||
        user?.user.type === "trainer" ||
        user?.user.type === "owner"
      ) {
      } */
      return children;
      // return <Navigate to={"/owner/client-list"} replace={true} />;
    }
    return <Navigate replace={true} to="/" />;
  };

  return (
    <>
      <div className="main-wrapper" onClick={mobileResponsive}>
        <Routes>
          {/* this part is just for testing purpose  */}
          {/*    <Route path={"/*"}>
            {[
              {
                id: 1,
                path: "dev/test-1",
                element: <TestPage />,
              },
            ].map((item) => (
              <Route key={item.id} path={item.path} element={item.element} />
            ))}
          </Route> */}

          <Route path={"/owner"} element={<SidebarLayout />}>
            {OwnerRoutingObjects.map((item) => (
              <Route
                key={item.id}
                path={item.path}
                element={
                  <OwnerProtectedRoute>{item.element}</OwnerProtectedRoute>
                }
              />
            ))}
          </Route>
          <Route path={"/client"} element={<SidebarLayout />}>
            {ClientRoutingObjects.map((item) => (
              <Route
                key={item.id}
                path={item.path}
                element={
                  <ClientProtectedRoute>{item.element}</ClientProtectedRoute>
                }
              />
            ))}
          </Route>

          <Route path={"/*"} element={<SidebarLayout />}>
            {routingObjects.map((item) => (
              <Route key={item.id} path={item.path} element={item.element} />
            ))}
          </Route>

          <Route path={"/*"} element={<ChatSidebarLayout />}>
            {ChatRoutingeObjects.map((item) => (
              <Route key={item.id} path={item.path} element={item.element} />
            ))}
          </Route>
          <Route path={"/*"} element={<ComponentSidebarLayout />}>
            {ComponentsRoutingeObjects.map((item) => (
              <Route key={item.id} path={item.path} element={item.element} />
            ))}
          </Route>
          <Route path={"/*"} element={<EmailSidebarLayout />}>
            {EmailRoutingeObjects.map((item) => (
              <Route key={item.id} path={item.path} element={item.element} />
            ))}
          </Route>
          <Route path={"/*"} element={<SettingsSidebarLayout />}>
            {SettingsRoutingeObjects.map((item) => (
              <Route key={item.id} path={item.path} element={item.element} />
            ))}
          </Route>
          <Route path={"/*"} element={<ProjectSidebarLayout />}>
            {ProjectRoutingeObjects.map((item) => (
              <Route key={item.id} path={item.path} element={item.element} />
            ))}
          </Route>

          <Route path={"/*"} element={<SidebarLayout />}>
            {AdministrationRoutingeObjects.map((item) => (
              <Route key={item.id} path={item.path} element={item.element} />
            ))}
          </Route>
          <Route path={"/*"} element={<SidebarLayout />}>
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default AppContainer;

// Customization
