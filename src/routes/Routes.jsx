import { createBrowserRouter } from "react-router-dom";
const routeModules = import.meta.glob("../pages/**/*Routes.jsx", {
  eager: true,
});
let allRoutes = [];

for (const path in routeModules) {
  const mod = routeModules[path];
  if (Array.isArray(mod.default)) {
    allRoutes.push(...mod.default);
  } else {
    const routes = Object.values(mod).find((val) => Array.isArray(val));
    if (routes) {
      allRoutes.push(...routes);
    }
  }
}
export const routes = createBrowserRouter(allRoutes);
