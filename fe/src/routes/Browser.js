import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClientRoutes, AdminRoutes } from "./Routes";

const Browser = () => {
  return (
    <BrowserRouter>
      <Routes>
        {ClientRoutes.map((route, index) => {
          const path = route.path || "";
          const Page = route.component || Fragment;
          const Layout = route.layout || Fragment;
          return (
            <Route
              key={index}
              path={path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}

        {AdminRoutes.map((route, index) => {
          const path = route.path || "";
          const Page = route.component || Fragment;
          const Layout = route.layout || Fragment;
          return (
            <Route
              key={index}
              path={path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default Browser;
