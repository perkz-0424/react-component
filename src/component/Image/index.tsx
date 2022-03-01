import * as React from "react";
import {useState, memo} from "react";
import styles from "./styles.less";
import {Modal, Upload} from "antd";
import {getBase64} from "@/common/assect/util";
import {fail} from "@/common/assect/message";
import "antd/es/modal/style/css";
import "antd/es/upload/style/css";

const Image = (props: {
  fileList: any[],
  onChange: (e: { fileList: any[] }) => any,
  max?: number,
  title?: string,
  disabled?: boolean,
  imageSize?: number
}): React.ReactElement => {
  const {fileList, max, title, onChange, disabled, imageSize} = props;
  const [previewVisible, set_previewVisible] = useState(false);
  const [previewImage, set_previewImage] = useState("");
  const _size = imageSize ? imageSize : 10;
  const onPreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    set_previewImage(file.url || file.preview);
    set_previewVisible(true);
  };
  const imageChange = (data: any) => {
    const {fileList, file} = data;
    if (fileList.length) {
      const {type, size} = file;
      if (type === "image/png" || type === "image/jpeg" || !type) {
        if (size <= _size * 1024000) {
          onChange({fileList});
        } else {
          fail(`请选择小于${_size}Mb的图片`);
        }
      } else {
        fail("请选择png或jpg格式的图片");
      }
    } else {
      onChange({fileList: []});
    }
  };
  return <div
    className={styles.image}>
    {fileList ? (
      <Upload
        disabled={disabled}
        listType="picture-card"
        fileList={
          fileList.map((i: any) => ({
          ...i,
          response: i.name,
          status: "done"
        }))}
        onPreview={onPreview}
        onChange={imageChange}
      >
        {fileList.length >= (max ? max : 10) ? null : title ? title : "添加图片"}
      </Upload>
    ) : null}
    <Modal visible={previewVisible} footer={null} onCancel={() => set_previewVisible(false)}>
      <img alt=" " style={{width: "100%"}} src={previewImage}/>
    </Modal>
  </div>;
};

export default memo(Image);
