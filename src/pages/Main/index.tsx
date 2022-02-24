import * as React from "react";
import {connect} from "react-redux";
import {IReactComponent} from "@/definitions/type";

const {mapState, mapDispatch} = require("@/store/main/action").default;

interface IProps extends ReturnType<typeof mapDispatch>, ReturnType<typeof mapState> {
}

const Main: IReactComponent<IProps> = (props) => <>{props.childrenRouter()}</>;
export default connect(mapState, mapDispatch)(Main);
