import request from "../../sdk/functions";

import { useQuery } from "@tanstack/react-query";

// 1. list of subscription  gym-subc/ trainer-subs
// 2. active susbscription
// 3. kon sa client kon se trainer ke sath connecte hai

const createPPT = async (userId, trainerId) => {
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

const TestPage = () => {
  // here we are getting user's subsciption ()
  // const { data, isLoading } = useQuery({
  //   queryKey: "this is anythinhg",
  //   queryFn: () =>
  //     request.findMany("subscription", {
  //       filters: {
  //         user: 54,
  //         type: "gym-subscription",
  //         end: {
  //           $gte: new Date().toISOString(),
  //         },
  //       },
  //     }),
  // });

  const { data, isLoading } = useQuery({
    queryKey: "this is anythinhg",
    queryFn: () =>
      request.findMany("ppt", {
        populate: "*",
        trainee: "54",
      }),
  });

  return (
    <div>
      {JSON.stringify(data)}
      <br />
      {JSON.stringify(new Date().toISOString())}

      {/* <button onClick={() => createPPT(54, 53)}>create ppt</button> */}
    </div>
  );
};

export default TestPage;
