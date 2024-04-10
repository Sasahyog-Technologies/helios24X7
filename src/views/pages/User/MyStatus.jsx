import request from "../../../sdk/functions";
import { useQuery } from "@tanstack/react-query";

const subscriptionValidator = (data) => {
  if (data.length < 1) {
    return {
      status: "expired",
      endsIn: false,
    };
  }

  const lindex = data[data.length - 1];
  const lsubscription = data.at(lindex);
  const daysUntillEndCount = daysLeftUntilEnd(lsubscription?.attributes?.end);

  if (daysUntillEndCount <= 7) {
    return {
      status: "close",
      endsIn: daysUntillEndCount,
    };
  } else {
    return {
      staus: "active",
      endsIn: false,
    };
  }
};

const MyStatus = ({ userId }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["my-status", userId],
    queryFn: async () => {
      if (userId) {
        const data = await request.findMany("subscription", {
          filters: {
            user: userId,
            type: "gym-subscription",
            end: {
              $gte: new Date()?.toISOString(),
            },
          },
          sort: "id:desc",
        });
        return subscriptionValidator(data?.data);
      }
      return null;
    },
  });
  if (isLoading) {
    return null;
  }

  return (
    <div className="mb-3">
      {data.status === "expired" && (
        <div className="s-alert rounded">
          <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>{" "}
          <div>
            <p className="s-alert-title">Plan Expired!</p>
            Contact Gym to purchase membership
          </div>
        </div>
      )}

      {data.status === "close" && (
        <div className="s2-alert rounded">
          <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>{" "}
          <div>
            <p className="s2-alert-title">Need Attention!</p>
            Your Gym Membership will expire{" "}
            {data?.endsIn > 1 ? `in ${data?.endsIn} days` : "tommorrow"}.
          </div>
        </div>
      )}
    </div>
  );
};

export default MyStatus;

function daysLeftUntilEnd(dateString) {
  // Convert the dateString to a Date object
  const endDate = new Date(dateString);

  // Get today's date
  const today = new Date();

  // Calculate the difference in milliseconds between the two dates
  const differenceInMilliseconds = endDate - today;

  // Convert milliseconds to days
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

  // Round the difference to the nearest whole number and return
  return Math.round(differenceInDays);
}
