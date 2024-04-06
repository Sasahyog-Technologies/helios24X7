import Breadcrumbs from "../../../components/Breadcrumbs";
import TableAvatar from "../Employees/TableAvatar";

const AttendenceClient = () => {
  return (
    <>
  <div className="tab-content">
        <div
          id="client_attendance"
          className="pro-overview tab-pane fade show active"
        >
        
          <div className="row">
            <div className="col-lg-12">
              <div className="table-responsive">
                <TableAvatar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AttendenceClient;
