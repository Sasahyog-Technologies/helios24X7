const sidebarOwnerData = {
  tittle: "Owner",
  showAsTab: false,
  separateRoute: false,
  menu: [
    {
      menuValue: "Analytics",
      hasSubRoute: false,
      showSubRoute: false,
      route: "/admin-dashboard",
      icon: "la la-chart-bar",
    },
    {
      menuValue: "Clients",
      hasSubRoute: false,
      showSubRoute: false,
      route: "/owner/client-list",
      icon: "la la-users",
    },
    {
      menuValue: "Trainers",
      hasSubRoute: false,
      showSubRoute: false,
      route: "/owner/trainer-list",
      icon: "la la-user-tie",
    },
    {
      menuValue: "Plans",
      hasSubRoute: false,
      showSubRoute: false,
      route: "/owner/plans-list",
      icon: "la la-database",
    },
    {
      menuValue: "Events",
      hasSubRoute: false,
      showSubRoute: false,
      route: "/owner/event-list",
      icon: "la la-calendar-alt",
    },
    {
      menuValue: "Personal Training",
      hasSubRoute: false,
      showSubRoute: false,
      route: "/owner/ptp-list",
      icon: "la la-clone",
    },
    {
      menuValue: "Subscriptions",
      hasSubRoute: false,
      showSubRoute: false,
      route: "/owner/membership-list",
      icon: "la la-sync",
    },
    {
      menuValue: "Payments",
      hasSubRoute: false,
      showSubRoute: false,
      route: "/owner/payment-list",
      icon: "la la-wallet",
    },
    {
      menuValue: "Invoices",
      hasSubRoute: false,
      showSubRoute: false,
      route: "/owner/invoice-list",
      icon: "la la-file-alt",
    },

    {
      menuValue: "Walkins",
      hasSubRoute: false,
      showSubRoute: false,
      route: "/owner/walkins-list",
      icon: "la la-walking",
    },
  ],
};
const sidebarUserData = {
  tittle: "User",
  showAsTab: false,
  separateRoute: false,
  menu: [
    {
      menuValue: "My Profile",
      hasSubRoute: false,
      showSubRoute: false,
      route: "/client/my-profile",
      icon: "la la-user",
    },
    {
      menuValue: "My Payments",
      hasSubRoute: false,
      showSubRoute: false,
      route: "/client/my-payments",
      icon: "la la-wallet",
    },
    {
      menuValue: "Events & Sessions",
      hasSubRoute: false,
      showSubRoute: false,
      route: "/client/events",
      icon: "la la-calendar-alt",
    },
  ],
};
const sidebarTrainerData = {
  tittle: "Trainer",
  showAsTab: false,
  separateRoute: false,
  menu: [
    {
      menuValue: "My Profile",
      hasSubRoute: false,
      showSubRoute: false,
      route: "/trainer/my-profile",
      icon: "la la-user-tie",
    },
    {
      menuValue: "My Trainnes",
      hasSubRoute: false,
      showSubRoute: false,
      route: "/trainer/my-trainees",
      icon: "la la-users",
    },
  ],
};

const sidebarDefaultData = {
  tittle: "Profile",
  showAsTab: false,
  separateRoute: false,
  menu: [
    {
      menuValue: "My Profile",
      hasSubRoute: false,
      showSubRoute: false,
      route: "/client/my-profile",
      //icon: "la la-users",
    },
  ],
};

export {
  sidebarOwnerData,
  sidebarUserData,
  sidebarTrainerData,
  sidebarDefaultData,
};
