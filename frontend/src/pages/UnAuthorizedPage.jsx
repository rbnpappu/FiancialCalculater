import { Link } from "react-router-dom";

const UnAuthorizedPage = () => {
  return (
    <div className="flex shadow-lg justify-center items-center h-screen m-2">
      <div className="flex flex-col justify-center items-center">
        <div className="bg-[#dae9e4] w-[40%] flex items-center justify-center rounded-[1rem] shadow-md p-[1rem]">
          You are not authorized to access this resource. This action requires
          valid authentication credentials, which were not provided or are
          invalid. Please ensure that you are logged in and that your request
          includes a valid authorization token. If you believe this is an error,
          contact the system administrator or support team for further
          assistance. Unauthorized access attempts are logged and may be subject
          to security review to ensure the safety and integrity of our system.
        </div>
        <div className="flex items-center justify-center mb-4">
          <Link to="/login">login</Link>
        </div>
      </div>
    </div>
  );
};

export default UnAuthorizedPage;
