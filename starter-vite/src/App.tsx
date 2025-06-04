import { Refine, Authenticated } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowMuscle } from "./pages/muscles/show";
import { EditMuscle } from "./pages/muscles/edit";
import { ListMuscle } from "./pages/muscles/list";
import { CreateMuscle } from "./pages/muscles/create";

import { Header } from "./components/header";

import { Login } from "./pages/login";

function App() {
  return (
    <Refine dataProvider={dataProvider} authProvider={authProvider}>
      <Authenticated key="protected" fallback={<Login />}>
        {/* <ShowProduct /> */}
        {/* <EditProduct /> */}
        <Header />
        <ListMuscle />
        {/* <CreateProduct /> */}
      </Authenticated>
    </Refine>
  );
}

export default App;
