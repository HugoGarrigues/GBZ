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
  UserOutlined,
  CalendarOutlined,
  BookOutlined,
  PlayCircleOutlined,
  ThunderboltOutlined,
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

// CSS pour masquer les éléments Refine indésirables
const globalStyles = `
  /* Masquer le breadcrumb et autres éléments qui décalent */
  .ant-breadcrumb,
  .refine-breadcrumb,
  [class*="breadcrumb"],
  .ant-layout-header .ant-breadcrumb,
  .ant-page-header,
  [data-testid="breadcrumb"],
  .css-dev-only-do-not-override-1me4733.ant-breadcrumb {
    display: none !important;
  }
  
  /* Masquer le footer Refine */
  .refine-footer,
  .ant-layout-footer,
  [class*="footer"] {
    display: none !important;
  }
  
  /* Ajuster l'espacement du contenu principal */
  .ant-layout-content {
    padding-top: 0 !important;
  }
  
  /* Masquer les éléments de télémétrie/branding */
  [class*="refine-"],
  [data-refine],
  .refine-telemetry {
    display: none !important;
  }
`;

// Injecter les styles globaux
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = globalStyles;
  document.head.appendChild(styleSheet);
}

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

// Configuration du thème personnalisé
const customTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    // Couleurs principales
    colorPrimary: '#6366f1', // Indigo moderne
    colorSuccess: '#10b981', // Emerald
    colorWarning: '#f59e0b', // Amber  
    colorError: '#ef4444', // Red
    colorInfo: '#3b82f6', // Blue
    
    // Background colors
    colorBgContainer: '#1f2937', // Gray-800
    colorBgElevated: '#374151', // Gray-700
    colorBgLayout: '#111827', // Gray-900
    
    // Text colors
    colorText: '#f9fafb', // Gray-50
    colorTextSecondary: '#d1d5db', // Gray-300
    
    // Border
    colorBorder: '#4b5563', // Gray-600
    colorBorderSecondary: '#374151', // Gray-700
    
    // Border radius
    borderRadius: 8,
    borderRadiusLG: 12,
    borderRadiusSM: 6,
    
    // Font
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 14,
    fontSizeLG: 16,
    
    // Spacing
    padding: 16,
    paddingLG: 24,
    paddingSM: 12,
    
    // Box shadow
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    boxShadowSecondary: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
  components: {
    // Layout styling
    Layout: {
      headerBg: '#1f2937',
      siderBg: '#111827',
      bodyBg: '#0f172a',
      headerHeight: 64,
      headerPadding: '0 24px',
      footerBg: 'transparent',
      footerPadding: 0,
    },
    
    // Menu styling
    Menu: {
      darkItemBg: 'transparent',
      darkItemSelectedBg: 'rgba(99, 102, 241, 0.15)',
      darkItemHoverBg: 'rgba(99, 102, 241, 0.08)',
      darkItemColor: '#d1d5db',
      darkItemSelectedColor: '#6366f1',
      darkItemHoverColor: '#a5b4fc',
      itemBorderRadius: 8,
      itemMarginBlock: 4,
      itemMarginInline: 8,
    },
    
    // Card styling
    Card: {
      colorBgContainer: '#1f2937',
      colorBorderSecondary: '#374151',
      borderRadiusLG: 12,
      paddingLG: 24,
    },
    
    // Table styling
    Table: {
      colorBgContainer: '#1f2937',
      headerBg: '#374151',
      headerColor: '#f9fafb',
      borderColor: '#4b5563',
      rowHoverBg: 'rgba(99, 102, 241, 0.05)',
    },
    
    // Button styling
    Button: {
      borderRadius: 8,
      fontWeight: 500,
      primaryShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.3)',
    },
    
    // Input styling
    Input: {
      colorBgContainer: '#374151',
      colorBorder: '#4b5563',
      borderRadius: 8,
      paddingBlock: 8,
      paddingInline: 12,
    },
    
    // Form styling
    Form: {
      labelColor: '#f9fafb',
      labelFontSize: 14,
      labelFontWeight: 500,
      itemMarginBottom: 20,
    },
    
    // Modal styling
    Modal: {
      contentBg: '#1f2937',
      headerBg: '#374151',
      borderRadiusLG: 12,
    },
    
    // Notification styling
    Notification: {
      colorBgElevated: '#1f2937',
      borderRadiusLG: 8,
    },
  },
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={customTheme}>
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
                  icon: <DashboardOutlined />,
                },
              },
              {
                name: "Muscles",
                list: MuscleList,
                meta: {
                  label: "Muscles",
                  icon: <ThunderboltOutlined />,
                },
              },
              {
                name: "exercises",
                meta: {
                  label: "Exercices",
                  icon: <PlayCircleOutlined />,
                },
                list: ExerciseList,
              },
              {
                name: "programs",
                meta: {
                  label: "Programmes",
                  icon: <BookOutlined />,
                },
                list: ProgramList,
              },
              {
                name: "sessions",
                meta: {
                  label: "Séances",
                  icon: <CalendarOutlined />,
                },
                list: SessionList,
              },
              {
                name: "users",
                meta: {
                  label: "Utilisateurs",
                  icon: <UserOutlined />,
                },
                list: UserList,
              },
            ]}
            notificationProvider={useNotificationProvider}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              disableTelemetry: true,
              projectId: "fitness-app",
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
                    <ThemedLayoutV2
                      Title={({ collapsed }) => (
                        <div style={{ 
                          fontSize: collapsed ? '16px' : '20px', 
                          fontWeight: 'bold',
                          background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: collapsed ? 'center' : 'flex-start',
                          gap: '8px',
                          padding: '16px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden'
                        }}>
                          <ThunderboltOutlined style={{ color: '#6366f1', fontSize: collapsed ? '16px' : '20px' }} />
                          {!collapsed && 'GBZ'}
                        </div>
                      )}
                    >
                      <div style={{
                        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                        minHeight: '100vh',
                        padding: '24px',
                      }}>
                        <Outlet />
                      </div>
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
                    <div style={{
                      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #374151 100%)',
                      minHeight: '100vh',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <div style={{
                        background: 'rgba(31, 41, 55, 0.8)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '16px',
                        border: '1px solid #374151',
                        padding: '40px',
                        minWidth: '400px',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                      }}>
                        <div style={{
                          textAlign: 'center',
                          marginBottom: '32px',
                        }}>
                          <div style={{
                            fontSize: '28px',
                            fontWeight: 'bold',
                            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            marginBottom: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px'
                          }}>
                            <ThunderboltOutlined style={{ color: '#6366f1' }} />
                            GBZ
                          </div>
                          <p style={{ color: '#9ca3af', fontSize: '16px' }}>
                            Connectez-vous à votre espace
                          </p>
                        </div>
                        <AuthPage
                          type="login"
                          formProps={{
                            initialValues: {
                              email: "admin@example.com",
                              password: "adminpass",
                            },
                          }}
                        />
                      </div>
                    </div>
                  }
                />
                <Route 
                  path="/register" 
                  element={
                    <div style={{
                      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #374151 100%)',
                      minHeight: '100vh',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Register />
                    </div>
                  } 
                />
                <Route
                  path="/forgot-password"
                  element={
                    <div style={{
                      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #374151 100%)',
                      minHeight: '100vh',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <AuthPage type="forgotPassword" />
                    </div>
                  }
                />
                <Route
                  path="/update-password"
                  element={
                    <div style={{
                      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #374151 100%)',
                      minHeight: '100vh',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <AuthPage type="updatePassword" />
                    </div>
                  }
                />
              </Route>

              {/* Catch all */}
              <Route
                element={
                  <Authenticated key="catch-all">
                    <ThemedLayoutV2>
                      <div style={{
                        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                        minHeight: '100vh',
                        padding: '24px',
                      }}>
                        <Outlet />
                      </div>
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