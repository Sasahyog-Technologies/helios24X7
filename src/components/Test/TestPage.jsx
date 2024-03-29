import request from "../../sdk/functions";

import { useQuery } from "@tanstack/react-query";

// 1. list of subscription  gym-subc/ trainer-subs
// 2. active susbscription
// 3. kon sa client kon se trainer ke sath connecte hai

const createPTP = async (userId, trainerId) => {
  const subscription = await request.create("subscription", {
    data: {
      user: userId,
      type: "trainer-subscription",
    },
  });
  const response = await request.create("ppt", {
    data: {
      trainee: userId,
      trainer: trainerId,
      subscription: subscription.data.id,
    },
  });

  const user = await request.update("users", {
    ppt: response.data.id,
  });
};

function calculateEndDate(startDate, durationInMonths) {
  console.log(startDate);
  if (typeof startDate === "string") {
    startDate = new Date(startDate);
  }
  const t = new Date(startDate);
  const p = new Date();
  p.setMonth(t.getMonth() + parseInt(durationInMonths));
  return p.toISOString();
}

const extendSubscrition = async (activePlanEndDate, duration, userId) => {
  if (!activePlanEndDate) return null;
  const endDate = calculateEndDate(activePlanEndDate, duration);
  await request.create("subscription", {
    data: {
      user: userId,
      end: endDate,
      start: activePlanEndDate,
      type: "gym-subscription",
    },
  });
};

const TestPage = () => {
  // here we are getting user's subsciption ()
  const { data, isLoading } = useQuery({
    queryKey: "this is anythinhg",
    queryFn: () =>
      request.findMany("subscription", {
        filters: {
          user: 75,
          type: "gym-subscription",
          end: {
            $gte: new Date().toISOString(),
          },
        },
        sort: "id:desc",
      }),
  });

  // const { data, isLoading } = useQuery({
  //   queryKey: "this is anythinhg",
  //   queryFn: () =>
  //     request.findMany("ptp", {
  //       populate: "*",
  //       trainee: "54",
  //     }),
  // });

  return (
    <div>
      {JSON.stringify(data)}
      <br />
      {JSON.stringify(new Date().toISOString())}

      <button
        onClick={() =>
          extendSubscrition(data?.data?.at(0).attributes.end, 1, 75)
        }
      >
        create ppt
      </button>
    </div>
  );
};

export default TestPage;
