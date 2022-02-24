import * as React from "react";
import * as ReactDOM from "react-dom";
import CreateRouter from "@/routers/CreateRouter";
import routers from "@/routers";
import globalStore from "@/store";
import {Provider} from "react-redux";


const App = () => {
  return (
    <React.Fragment>
      <Provider store={globalStore}>
        <CreateRouter routers={routers}/>
      </Provider>
    </React.Fragment>
  );
};

ReactDOM.render(<App/>, document.getElementById("root") as HTMLDivElement);
