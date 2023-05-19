import jwtDecode from "jwt-decode";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  json,
  useLocation,
} from "react-router-dom";
import Dashboard from "./pages/dashboard";
import PresentationManagement from "./pages/presentationManagement/index.jsx";
import PresentationsForGrading from "./pages/presentationsForGrading/index.jsx";
import Team from "./pages/teamPage/index.jsx";
import Form from "./pages/form";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./pages/calendar";
import Fixbar from "./components/Fixbar";
import Signup from "./pages/SignupPage/Signup";
import Details from "./components/Details";
import CreateSections from "./pages/CreateSections";
import SectionPage from "./pages/sectionPage";
import AtrributePage from "./pages/atrributePage";
import CreateAtrributePage from "./pages/CreateAtrributes";
import GradingAtrributePage from "./pages/GradingAtrributePage";
import { useEffect } from "react";
import { useState } from "react";
import ProtectedRoutes from "./ProtectedRoutes";
// import DetailPage from "./pages/detailPage";
import Detail from "./components/Details";
import DetailPage from "./pages/DetailPages";
import Error404 from "./pages/Error404";
import LogIn from "./pages/logInPage";
import ProjectPresentation from "./pages/ResultPage/ResultPage";
import { useTheme } from "@mui/material";
import { OtpPage } from "./pages/OtpPage/OtpPage";
import { OtpVerify } from "./pages/OtpPage/OtpVerify";
import { ChangePassword } from "./pages/OtpPage/ChangePassword";

function AllRoutes() {
  const navigate = useNavigate();
  const [theme, colorMode] = useMode();
  const location = useLocation();
  console.log(location);
  const token = JSON.parse(localStorage.getItem("token"));
  const admin = token?.isAdmin;
  const theme2 = localStorage.getItem("mode");
  // console.log(theme2);
  // console.log(admin);

  return (
    <div
      style={{
        backgroundColor: theme2 == "light" ? "orange" : null,
      }}
    >
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/fpassword" element={<OtpPage />} />
            <Route path="/fpassword/otpverify" element={<OtpVerify />} />
            <Route
              path="/fpassword/otpverify/changepassword"
              element={<ChangePassword />}
            />
            <Route path="*" element={<Error404 />} />

            <Route path="/" element={<ProtectedRoutes Component={Fixbar} />}>
              <Route
                index
                element={<ProtectedRoutes Component={Dashboard} />}
              />
              <Route
                path="form"
                element={<ProtectedRoutes Component={Form} />}
              />

              <Route
                path="manage"
                element={<ProtectedRoutes Component={PresentationManagement} />}
              />

              <Route
                path="grading"
                element={
                  <ProtectedRoutes Component={PresentationsForGrading} />
                }
              />

              <Route
                path="grading/team/:id"
                element={<ProtectedRoutes Component={Team} />}
              />

              <Route
                path="grading/team/:id/:id/atrributes"
                element={<ProtectedRoutes Component={AtrributePage} />}
              />

              <Route
                path="grading/team/:id/create_atrribute/:id"
                element={<ProtectedRoutes Component={CreateAtrributePage} />}
              />
              <Route
                path="manage/detail/:id/create_atrribute/:id"
                element={<ProtectedRoutes Component={CreateAtrributePage} />}
              />

              <Route
                path="grading/team/:id/:id/atrributes/grade/:id"
                element={<ProtectedRoutes Component={GradingAtrributePage} />}
              />

              <Route
                path="manage/detail/:id/section"
                element={<ProtectedRoutes Component={SectionPage} />}
              />

              <Route
                path="manage/detail/:id/section/create&assign"
                element={<ProtectedRoutes Component={CreateSections} />}
              />

              <Route
                path="manage/detail/:id"
                element={<ProtectedRoutes Component={DetailPage} />}
              />

              <Route
                path="detail/:id"
                element={<ProtectedRoutes Component={Detail} />}
              />
              <Route
                path="calendar"
                element={<ProtectedRoutes Component={Calendar} />}
              />
              <Route
                path="result/:id"
                element={<ProtectedRoutes Component={ProjectPresentation} />}
              />
              <Route path="/fpassword" element={<OtpPage />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}

export default AllRoutes;
