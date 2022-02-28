import * as React from "react";
import styles from "./styles.less";
import {connect} from "react-redux";
import {IReactComponent} from "@/definitions/type";
import ImageComponent from "@/component/Image";
import Content from "@/component/Content";

const {mapState, mapDispatch} = require("@/store/image/action").default;

interface IProps extends ReturnType<typeof mapDispatch>, ReturnType<typeof mapState> {
  fileList: any[]
}

const Image: IReactComponent<IProps> = (props): React.ReactElement => {

  return <div className={styles.image}>
    <Content title="图片上传" message="图片上传"/>
    <ImageComponent
      fileList={props.fileList}
      onChange={props.setFileList}
    />
  </div>;
};

export default connect(mapState, mapDispatch)(Image);
