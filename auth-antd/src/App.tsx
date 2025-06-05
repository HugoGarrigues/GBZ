import React from "react";
import {
  Refine,
  Authenticated,
} from "@refinedev/core";
import {
  useNotificationProvider,
  ThemedLayoutV2,
  ErrorComponent,
  AuthPage,
} from "@refinedev/antd";
import {
  DashboardOutlined,
} from "@ant-design/icons";

import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
  NavigateToResource,
  CatchAllNavigate,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { App as AntdApp, ConfigProvider } from "antd";
import { theme } from "antd";

import "@refinedev/antd/dist/reset.css";

import { MuscleList } from "./pages/muscles/list";
import { ExerciseList } from "./pages/exercises/list";
import { ProgramList } from "./pages/programs/list";
import { SessionList } from "./pages/sessions/list";
import { UserList } from "./pages/users/list";
import { UserShow } from "./pages/users/show";

import { DashboardPage } from "../src/pages/dashboard";

import { authProvider } from "./providers/AuthProvider";
import Register from "./pages/Register";

const API_URL = "http://localhost:3000/";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <AntdApp>
          <Refine
            authProvider={authProvider}
            dataProvider={dataProvider(API_URL)}
            routerProvider={routerProvider}
            resources={[
              {
                name: "dashboard",
                list: "/",
                meta: {
                  label: "Dashboard",
                },
              },
              {
                name: "Muscles",
                list: MuscleList,
              },
              {
                name: "exercises",
                meta: {
                  label: "Exercices",
                },
                list: ExerciseList,
              },
              {
                name: "programs",
                meta: {
                  label: "Programmes",
                },
                list: ProgramList,
              },
              {
                name: "sessions",
                meta: {
                  label: "Séances",
                },
                list: SessionList,
              },
              {
                name: "users",
                meta: {
                  label: "Utilisateurs",
                },
                list: UserList,
              },
            ]}
            notificationProvider={useNotificationProvider}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              {/* Authenticated Routes */}
              <Route
                element={
                  <Authenticated
                    key="authenticated-routes"
                    fallback={<CatchAllNavigate to="/login" />}
                  >
                    <ThemedLayoutV2>
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route index element={<DashboardPage />} />
                <Route path="/muscles" element={<MuscleList />} />
                <Route path="/exercises" element={<ExerciseList />} />
                <Route path="/programs" element={<ProgramList />} />
                <Route path="/sessions" element={<SessionList />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/users/:id/show" element={<UserShow />} />
              </Route>

              {/* Public Auth Pages */}
              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <NavigateToResource resource="dashboard" />
                  </Authenticated>
                }
              >
                <Route
                  path="/login"
                  element={
                    <AuthPage
                      type="login"
                      formProps={{
                        initialValues: {
                          email: "admin@example.com",
                          password: "adminpass",
                        },
                      }}
                    />
                  }
                />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/forgot-password"
                  element={<AuthPage type="forgotPassword" />}
                />
                <Route
                  path="/update-password"
                  element={<AuthPage type="updatePassword" />}
                />
              </Route>

              {/* Catch all */}
              <Route
                element={
                  <Authenticated key="catch-all">
                    <ThemedLayoutV2>
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
