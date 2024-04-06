const sidebarOwnerData = {
  tittle: "Owner",
  showAsTab: false,
  separateRoute: false,
  menu: [
    {
      menuValue: "Clients",
      hasSubRoute: false,
      showSubRoute: false,
      route: "/owner/client-list",
      icon: "la la-users",
    },
    {
      menuValue: "Trainer",
      hasSubRoute: false,
      showSubRoute: false,
      route: "/owner/trainer-list",
      icon: "la la-users",
    },
    {
      menuValue: "Plans",
      hasSubRoute: false,
      showSubRoute: false,
      route: "/owner/plans-list",
      icon: "la la-users",
    },
    {
      menuValue: "Events",
      hasSubRoute: false,
      showSubRoute: false,
      route: "/owner/event-list",
      icon: "la la-users",
    },
    {
      menuValue: "Personal Training Program",
      hasSubRoute: false,
      showSubRoute: false,
      route: "/owner/ptp-list",
      icon: "la la-users",
    },
    {
      menuValue: "Subscriptions",
      hasSubRoute: false,
      showSubRoute: false,
      route: "/owner/membership-list",
      icon: "la la-users",
    },
    {
      menuValue: "Payments",
      hasSubRoute: false,
      showSubRoute: false,
      route: "/owner/payment-list",
      icon: "la la-users",
    },
    {
      menuValue: "Invoices",
      hasSubRoute: false,
      showSubRoute: false,
      route: "/owner/invoice-list",
      icon: "la la-users",
    },
    {
      menuValue: "Personal Trainings",
      hasSubRoute: false,
      showSubRoute: false,
      route: "/owner/invoice-list",
      icon: "la la-users",
    },
    {
      menuValue: "Walkins",
      hasSubRoute: false,
      showSubRoute: false,
      route: "/owner/invoice-list",
      icon: "la la-users",
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
      icon: "la la-users",
    },
    {
      menuValue: "My Payments",
      hasSubRoute: false,
      showSubRoute: false,
      route: "/client/my-payments",
      icon: "la la-users",
    },
    {
      menuValue: "Events & Sessions",
      hasSubRoute: false,
      showSubRoute: false,
      route: "/client/events",
      icon: "la la-users",
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
      route: "/client/my-profile",
      icon: "la la-users",
    },
    {
      menuValue: "My Trainnes",
      hasSubRoute: false,
      showSubRoute: false,
      route: "/owner/payment-list",
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
