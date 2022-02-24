import {getOssToken, postFileToOss} from "@/service/global";
import {getBinary} from "@/common/assect/util";

async function creatFile(files: any) {
  const file = files.file.preview
    ? files.file.preview
    : await getBinary(files.file.originFileObj);
  const formData = new FormData();
  formData.append("OSSAccessKeyId", files.OSSAccessKeyId);
  formData.append("Policy", files.Policy);
  formData.append("Signature", files.Signature);
  formData.append("Key", files.key);
  formData.append("Callback", files.Callback);
  formData.append("File", file);
  return formData;
}

const separationOfOldAndNew = (array = []) => {
  const newArray: any = [];
  const oldArray: any = [];
  array.forEach((i: any) => {
    if (i.uid.split("_")[0] === "done" || i.url) {
      oldArray.push(i.url);
    } else {
      newArray.push(i);
    }
  });
  return {newArray, oldArray};
};

export default function uploadFileToOss(files = []) {
  const {newArray, oldArray} = separationOfOldAndNew(files);
  return new Promise((o) => {
    if (newArray.length) {
      Promise.all(newArray.map((f: any) => {
          return new Promise((resolve) => {
            getOssToken()
              .then(async ({data}: any) => {
                const p = await creatFile({
                  ...data,
                  file: f,
                  key: `${data.Key}${new Date().getTime()}/${f.name}`,
                });
                postFileToOss(data["Host"], p).then((res: any) =>
                  resolve({
                    ...res.data,
                    host: data["Host"],
                  })).catch(resolve);
              }).catch(resolve);
          });
        }),
      )
        .then((resArray) => {
          const values: any = [];
          if (resArray.length) {
            resArray.forEach((resItem: any) => {
              if (resItem &&
                resItem["host"] &&
                resItem["Data"] &&
                resItem["Data"]["FileName"]) {
                values.push(
                  `https://${resItem["host"]}/${resItem["Data"]["FileName"]}`,
                );
              }
            });
          }
          return o([...oldArray, ...values]);
        })
        .catch(() => {
          return o([...oldArray]);
        });
    } else {
      return o([...oldArray]);
    }
  });
}

export const getFile = (src: string) => src ? [{uid: "done", name: `${src.split("/").pop()}`, status: "done", url: `${src}`}] : [];
