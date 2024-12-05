import Router, { route } from "preact-router";
import { useEffect } from "preact/hooks";
import "./assets/styles/index.scss";
import { msalInstance } from "./main.tsx";

import Login from "./components/modules/auth/login";
import ForgotPassword from "./components/modules/auth/forgot-password";
import ResetPassword from "./components/modules/auth/reset-password";
import Overview from "./components/modules/overview";
import AppLayout from "./components/ui/layout";
import Activities from "./components/modules/activities";
import Roles from "./components/modules/roles";
import Locations from "./components/modules/locations";
import Users from "./components/modules/users";
import CreateRole from "./components/modules/roles/create-role";
import CreateLocation from "./components/modules/locations/create-location";
import CreatePermit from "./components/modules/permit/create-permit/index.tsx";
// import PermitManagement from "./components/modules/permit/permit-management.tsx";
import PermitToWorkDetails from "./components/modules/permit/details/index.tsx";
import ApprovePermit from "./components/modules/permit/permit-management.tsx/approve/index.tsx";
import PermitRenewal from "./components/modules/permit/permit-management.tsx/permit-renewal.tsx";
import PermitOnsiteComments from "./components/modules/permit/permit-management.tsx/onsite-comments.tsx";
import { UserProvider, useUserContext } from "./context/user.context.tsx";
import { ToastBar } from "./components/ui/toast.tsx";
import PermitRenewals from "./components/modules/permit/permit-renewals/index.tsx";
import PermitRenewalsDetails from "./components/modules/permit/permit-renewals/details/index.tsx";
import WorkCompletions from "./components/modules/permit/work-completions/index.tsx";
import WorkCompletionDetails from "./components/modules/permit/work-completions/details/index.tsx";
import WorkSuspensions from "./components/modules/permit/work-suspensions/index.tsx";
import WorkContinuationDetails from "./components/modules/permit/work-suspensions/continuation-details/index.tsx";
import Analytics from "./components/modules/analytics/index.tsx";
import EditLocation from "./components/modules/locations/edit-location.tsx";
import EditUser from "./components/modules/users/edit-user.tsx";
import CreateExternalUser from "./components/modules/users/create-external-user.tsx";
import CreateInternalUser from "./components/modules/users/create-internal-user.tsx";
import CreateCompany from "./components/modules/users/company/create-company.tsx";
import CompanyDetails from "./components/modules/users/company/company-details.tsx";
import Drafts from "./components/modules/drafts/index.tsx";

import CreateWork from "./components/modules/locations/create-work.tsx";
import EditRole from "./components/modules/roles/edit-role.tsx";

import { IDProvider } from "./context/id.context.tsx";
import Workflows from "./components/modules/permit/permit-management.tsx";
import PermitManagementDetails from "./components/modules/permit/permit-management.tsx/permit-management.tsx";
import EditCompany from "./components/modules/users/company/edit-company.tsx";
import ActivitiesFlow from "./components/modules/permit/permit-management.tsx/permit-activities-flow.tsx";
import ProcessPermitsIndex from "./components/modules/permit/permit-management.tsx/activities/index.tsx";
import ProcessIssuingPermit from "./components/modules/permit/permit-management.tsx/activities/process-permit/index.tsx";
import Monitoring from "./components/modules/permit/permit-monitoring/index.tsx";

import MonitoringDetailsIndex from "./components/modules/permit/permit-monitoring/monitoring-details-index.tsx";
import RevalidatePermitIndex from "./components/modules/permit/permit-revalidation/index.tsx";
import RevalidatePerfAuth from "./components/modules/permit/permit-revalidation/perf-auth-revalidation.tsx";
import RevalidateSafetyOfficer from "./components/modules/permit/permit-revalidation/safety-officer-revalidation.tsx";
import RevalidateIssuingSupervisor from "./components/modules/permit/permit-revalidation/issuing-supervisor-revalidation.tsx";
import ClosurePermitIndex from "./components/modules/permit/permit-closure/index.tsx";
import ClosurePerfAuth from "./components/modules/permit/permit-closure/perf-auth-closure.tsx";
import ClosureSafetyOfficer from "./components/modules/permit/permit-closure/safety-officer-closure.tsx";
import ClosureIssuingSupervisor from "./components/modules/permit/permit-closure/issuing-supervisor-closure.tsx";
import Storage from "./components/modules/permit/permit-storage/index.tsx";
import StorageDetails from "./components/modules/permit/permit-storage/storage-details.tsx";
import OnsiteCommentsView from "./components/modules/permit/permit-management.tsx/activities/process-permit/onsite-comments.tsx";
import ProcessHsePermit from "./components/modules/permit/permit-management.tsx/activities/process-permit/hse-auth-process.tsx";
import ProcessAuthorizingPermit from "./components/modules/permit/permit-management.tsx/activities/process-permit/authorizing-process.tsx";
import ProcessPerfSupervisorPermit from "./components/modules/permit/permit-management.tsx/activities/process-permit/perf-supervisor-process.tsx";
import ProcessSafetyOfficerPermit from "./components/modules/permit/permit-management.tsx/activities/process-permit/safety-officer-process.tsx";
import ProcessIssuSupervisorPermit from "./components/modules/permit/permit-management.tsx/activities/process-permit/issu-supervisor-process.tsx";
import { PermitDetailsProvider } from "./context/permit-details.context.tsx";
import { MsalProvider } from "@azure/msal-react";

function App() {
  return (
    <Router>
      <Login path="/login" />
      <ForgotPassword path="/forgot-password" />
      <ResetPassword path="/reset-password" />

      <AuthGuard default>
        <Router>
          <CreatePermit path="/permit/create" />

          <ApprovePermit path="/permit-management/ptw/approve/:id" />
          <PermitRenewal path="/permit-management/ptw/renew/:id" />
          <PermitOnsiteComments path="/permit-management/ptw/add-comment/:id" />

          <ProcessIssuingPermit path="/activities-process" />
          <ProcessHsePermit path="/activities-process/hse" />
          <ProcessAuthorizingPermit path="/activities-process/auth" />
          <ProcessPerfSupervisorPermit path="/activities-process/perf-supervisor" />
          <ProcessSafetyOfficerPermit path="/activities-process/safety-officer" />
          <ProcessIssuSupervisorPermit path="/activities-process/issu-supervisor" />

          <RevalidatePerfAuth path="/revalidate-perf-auth" />
          <RevalidateSafetyOfficer path="/revalidate-safety-officer" />
          <RevalidateIssuingSupervisor path="/revalidate-issuing-supervisor" />

          <ClosurePerfAuth path="/closure-perf-auth" />
          <ClosureSafetyOfficer path="/closure-safety-officer" />
          <ClosureIssuingSupervisor path="/closure-issuing-supervisor" />

          <OnsiteCommentsView path="/add-onsite-comments" />
          <AppLayout default>
            <Router>
              <Overview path="/" />
              <Activities path="/auditories" />

              <Analytics path="/analytics" />

              <Roles path="/roles" />
              <CreateRole path="/roles/create" />
              <EditRole path="/roles/edit" />

              <Locations path="/locations" />

              {/* Create Location Area */}
              <CreateLocation path="/locations/create/location-area" />

              <CreateLocation path="/locations/create/location-area" />

              <CreateWork path="/locations/create/work-area" />

              <EditLocation path="/locations/edit" />

              <Users path="/users" />

              {/* Company Paths */}
              <CreateCompany path="/users/create-company" />
              <CompanyDetails path="/users/company/details" />

              {/* Create User Paths */}
              <CreateExternalUser path="/users/create-external" />
              <CreateInternalUser path="/users/create-internal" />

              {/* Edit User Paths */}
              <EditUser path="/users/edit" />
              <EditCompany path="/users/edit-company" />

              {/* Permit Management Paths */}

              <Workflows path="/permit-workflows" />
              <ActivitiesFlow path="/permit-activities" />
              <Monitoring path="/permit-monitoring" />
              <Storage path="/permit-storage" />

              <MonitoringDetailsIndex path="/monitoring-details" />

              <PermitManagementDetails path="/permit-management" />
              <StorageDetails path="/permit-storage/details" />

              <ProcessPermitsIndex path="process-permits" />
              <RevalidatePermitIndex path="/revalidate-permit" />
              <ClosurePermitIndex path="/permit-closure" />

              <PermitToWorkDetails path="/permit-management/ptw/:id" />

              <PermitRenewals path="/permit-renewals" />
              <PermitRenewalsDetails path="/permit-renewals/ptw/:id" />

              <WorkCompletions path="/permit-completions" />
              <WorkCompletionDetails path="/permit-completions/:id" />

              <WorkSuspensions path="/permit-suspensions" />
              <WorkContinuationDetails path="/permit-suspensions/continuation/:id" />

              <Drafts path="/permit-drafts" />

              {/* <Profile path="/profile" /> */}
            </Router>
          </AppLayout>
        </Router>
      </AuthGuard>
    </Router>
  );
}

export default function Module({}: any) {
  return (
    <MsalProvider instance={msalInstance}>
      <UserProvider>
        <IDProvider>
          <PermitDetailsProvider>
            <App />
            <ToastBar />
          </PermitDetailsProvider>
        </IDProvider>
      </UserProvider>
    </MsalProvider>
  );
}

function AuthGuard({ children }: any) {
  const { isAuthenticated } = useUserContext();

  useEffect(() => {
    if (!isAuthenticated) route("/login");
  }, []);

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
