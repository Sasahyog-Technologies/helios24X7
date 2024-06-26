const paymentTypeOptions = [
  { value: "cash", label: "Cash" },
  { value: "debit-card", label: "Debit Card" },
  { value: "credit-card", label: "Credit Card" },
  { value: "bank-transfer", label: "Bank Transfer" },
  { value: "upi", label: "UPI" },
];

const durationOptions = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
  { value: "11", label: "11" },
  { value: "12", label: "12" },
  { value: "13", label: "13" },
  { value: "14", label: "14" },
  { value: "15", label: "15" },
  { value: "16", label: "16" },
  { value: "17", label: "17" },
  { value: "18", label: "18" },
  { value: "19", label: "19" },
  { value: "20", label: "20" },
  { value: "21", label: "21" },
  { value: "22", label: "22" },
  { value: "23", label: "23" },
  { value: "24", label: "24" },
];

const payementStatusOptions = [
  {
    value: "success",
    label: "Success",
  },
  {
    value: "failed",
    label: "Failed",
  },
  {
    value: "pending",
    label: "Pending",
  },
];

const subscriptionStatusOptions = [
  {
    value: "active",
    label: "Active",
  },
  {
    value: "expired",
    label: "Expired",
  },
  {
    value: "inactive",
    label: "Inactive",
  },
  {
    value: "cancelled",
    label: "Cancelled",
  },
]

const EventCategoryOptions = [
  {
    value: "session",
    label: "Session",
  },
  {
    value: "event",
    label: "Event",
  },
];
const SubscriptionTypeOptions = [
  {
    value: "gym-subscription",
    label: "GYM subscription",
  },
  {
    value: "trainer-subscription",
    label: "Trainer Subscription",
  },
  {
    value: "",
    label: "All",
  },
];



const AvatarImageSize = 100000;

export { paymentTypeOptions, durationOptions,payementStatusOptions,subscriptionStatusOptions,AvatarImageSize,EventCategoryOptions,SubscriptionTypeOptions};
