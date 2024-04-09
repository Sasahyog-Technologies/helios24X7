import request from "../../sdk/functions";
import { useQuery } from "@tanstack/react-query";
import { useSessionStorage } from "@mantine/hooks";

const SystemAlert = () => {
  const [storage, setStorage] = useSessionStorage({
    key: "event",
    defaultValue: {
      event: true,
    },
  });
  const { data, isLoading } = useQuery({
    queryKey: ["alerts"],
    queryFn: async () => {
      const alerts = await request.findMany("alert", {
        filters: {
          end: {
            $gte: new Date(),
          },
        },
      });
      return alerts?.data?.at(0);
    },
    staleTime: 50000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (!data || isLoading || storage.event === false) {
    return null;
  }

  return (
    <div className="text-white bg-primary p-2 rounded d-flex gap-2 justify-content-between align-items-center mb-3">
      <div className="d-flex gap-3 h-full align-items-center">
        <i className="la la-bell text-lg" />
        <p className="text-md m-0">{data?.attributes?.title}</p>

        {data?.attributes?.link && (
          <a className="text-white" href={data?.attributes?.link}>
            <i className="la la-arrow-right text-md" />
          </a>
        )}
      </div>
      <button
        onClick={() => {
          setStorage({ event: false });
        }}
        className="bg-transparent btn"
      >
        <i className="la la-window-close text-md text-white"></i>
      </button>
    </div>
  );
};

export default SystemAlert;
