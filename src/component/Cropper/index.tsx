import * as React from "react";
import styles from "./styles.less";
import {UploadOutlined, LoadingOutlined} from "@ant-design/icons";
import {randCode} from "@/common/assect/util";

interface IProps {
  W?: number,
  H?: number,
  aspectRatio?: number,
  src: string,
  onChange?: (newImg?: any) => any
  onOk?: (newImg?: any) => any
}

interface IMark {
  top: number,
  left: number,
  width: number,
  height: number
}

interface IRect {
  top: number,
  left: number,
  right: number,
  bottom: number,
}

interface IOption {
  x: number,
  y: number,
}

interface IState {
  W: number,
  H: number,
  dataURL: string,
  dh: number,
  dw: number,
  dx: number,
  dy: number,
  ctx: any,
  isCrop: boolean,
  isMoveMark: boolean,
  isMoveStretch: boolean,
  aspectRatio: number,
  markBorder: IMark,
  rect: IRect,
  r: number,
  newImg: string,
  startMark: IOption,
  startStretch: IOption,
  loading: boolean,
}

const id = randCode();

class Cropper extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      r: 1,
      W: 618, H: 300,//页面宽高
      dataURL: "",//文件的URL
      dh: 0, dw: 0, dx: 0, dy: 0,//图片的位置
      ctx: null,//当前画布
      isCrop: true,//是否裁剪图片
      isMoveMark: false,//是否开始移动mark
      isMoveStretch: false,//是否拖拽点
      aspectRatio: 1,//被选区域高宽比
      markBorder: {width: 0, height: 0, left: 0, top: 0,},//边框大小
      rect: {top: 0, right: 0, bottom: 0, left: 0,},//明亮的区域
      startMark: {x: 0, y: 0,},//移动mark初始基准值
      startStretch: {x: 0, y: 0,},//变形点点的初始基准值，
      newImg: "",
      loading: false
    };
  }

  /**
   * 读取上传的图片
   * @param{Object}e
   * **/
  upLoadImg = (e: any) => {
    this.setState({loading: true}, () => {
      const fileData = e.target && e.target.files && e.target.files[0] ? e.target.files[0] : null;
      const reader = new FileReader();
      if (fileData) {
        reader.readAsDataURL(fileData);
        reader.onload = () => {
          this.getImage(reader.result as string);//读取图片base64
        };
      }
    });
  };

  /**
   * 获取照片并绘制canvas图片
   * @param{string}dataURL
   * **/
  getImage = (dataURL: string) => {
    this.setState({
      dataURL,
    }, () => {
      const canvas = document.querySelector(`#${id}`) as HTMLCanvasElement;
      const image = new Image();
      const ctx: any = canvas.getContext("2d");
      const {H, W} = this.state;
      //设置宽高用于清空旧画布
      canvas.setAttribute("width", String(W));
      canvas.setAttribute("height", String(H));
      const devicePixelRatio = window.devicePixelRatio || 1;
      const backingStoreRatio = ctx["webkitBackingStorePixelRatio"] || ctx["mozBackingStorePixelRatio"] ||
        ctx["msBackingStorePixelRatio"] || ctx["oBackingStorePixelRatio"] || ctx["backingStorePixelRatio"] || 1;
      const ratio = devicePixelRatio / backingStoreRatio;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      canvas.width = canvasWidth * ratio;
      canvas.height = canvasHeight * ratio;
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;
      this.setState({r: ratio});
      ctx.scale(ratio, ratio);
      image.src = dataURL;
      image.onload = () => {
        //获取图片的宽高
        const height = image.height;
        const width = image.width;
        //调整图片的位置
        let dx = 0;
        let dy = 0;
        let dw, dh;
        if (height < width && width / height >= W / H) {
          dw = W;
          dh = height * (W / width);
          dy = (H - dh) / 2;
        } else {
          dh = H;
          dw = width * (H / height);
          dx = (W - dw) / 2;
        }
        ctx.drawImage(image, dx, dy, dw, dh);
        this.setState({
          dx, dy, dw, dh, ctx
        }, () => {
          //根据图片大小和形状初始化框选的区域
          const {dx, dy, dw, dh, aspectRatio} = this.state;
          const initBorder = (dh >= dw && (dh / dw) >= aspectRatio)
            ? {
              width: dw,
              height: dw * aspectRatio,
              left: dx - 1,
              top: (dh - dw * aspectRatio) / 2,
            } : {
              width: dh / aspectRatio,
              height: dh,
              left: dx + (dw - dh / aspectRatio) / 2,
              top: dy,
            };
          const initRect = {
            top: (dh - initBorder.height) / 2,
            right: initBorder.width + (dw - initBorder.width) / 2 - 1,
            bottom: initBorder.height + (dh - initBorder.height) / 2,
            left: (dw - initBorder.width) / 2,
          };
          this.setBorder(initBorder, initRect);
        });
      };
    });
  };
  /**
   * 初始化或改变边框、明亮区域
   * @param{Object}markBorder
   * @param{Object}rect
   * **/
  setBorder = (markBorder: IMark, rect: IRect) => {
    //设置显示区域的明亮大小
    this.setState({
      markBorder, rect,
    }, () => {
      const {markBorder, isCrop} = this.state;
      isCrop && this.cropPicture(markBorder);
    });
  };
  /**
   * 移动选框
   * **/
  markMouseDown = (e: any) => {
    e.preventDefault();
    //添加在全局的鼠标弹起事件
    window.onmouseup = () => {
      this.setState({
        isCrop: true,
        isMoveMark: false,
      }, () => {
        const {markBorder, rect} = this.state;
        this.setBorder(markBorder, rect);
        window.onmouseup = null;
        window.onmousemove = null;
      });
    };
    this.setState({
      startMark: {
        x: e.clientX,
        y: e.clientY,
      },
      isCrop: false,
      isMoveMark: true,
    }, () => {
      //添加全局的鼠标移动事件
      window.onmousemove = (e) => {
        e.preventDefault();
        const {isMoveMark, startMark, dx, dy, dw, dh, markBorder} = this.state;
        const movingDistance = {x: 0, y: 0,};//移动的距离
        if (isMoveMark) {
          movingDistance.x = this.getCriticalValue(
            e.clientX - startMark.x,
            (dx + dw) - (markBorder.left + markBorder.width),
            dx - markBorder.left,
          );//横向偏移临界值判断
          movingDistance.y = this.getCriticalValue(
            e.clientY - startMark.y,
            (dy + dh) - (markBorder.top + markBorder.height),
            dy - markBorder.top,
          );//纵向偏移临界值判断
          this.setState({
            startMark: {
              x: e.clientX,
              y: e.clientY,
            }
          }, () => {
            this.moveMark(movingDistance);
          });
        }
      };
    });
  };
  /**
   * @param{Object}movingDistance
   * **/
  moveMark = (movingDistance: IOption) => {
    const border = JSON.parse(JSON.stringify(this.state.markBorder));
    const rect = JSON.parse(JSON.stringify(this.state.rect));
    const {x, y} = movingDistance;//移动的差值
    //设置markBorder
    border.left = border.left + x;
    border.top = border.top + y;
    //设置明亮区域
    rect.left = rect.left + x;
    rect.right = rect.right + x;
    rect.top = rect.top + y;
    rect.bottom = rect.bottom + y;
    this.setBorder(border, rect);
  };
  /**
   * 变形点等比例变形
   * **/
  stretchMouseDown = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    const point = e.target.className.split(" ")[1];
    window.onmouseup = () => {
      this.setState({
        isMoveStretch: false,
        isCrop: true,
      }, () => {
        const {markBorder, rect} = this.state;
        this.setBorder(markBorder, rect);
        window.onmouseup = null;
        window.onmousemove = null;
      });
    };
    this.setState({
      startStretch: {
        x: e.clientX,
        y: e.clientY,
      },
      isCrop: false,
      isMoveStretch: true,
    }, () => {
      window.onmousemove = (e) => {
        e.preventDefault();
        const {isMoveStretch, startStretch} = this.state;
        if (isMoveStretch) {
          const nowStretch = {
            x: e.clientX,
            y: e.clientY,
          };
          this.moveStretch(startStretch, nowStretch, point);
        }
      };
    });
  };

  /**
   * @param{Object}startStretch
   * @param{Object}nowStretch
   * @param{string}point
   * **/
  moveStretch = (startStretch: IOption, nowStretch: IOption, point: string) => {
    const {dx, dy, dw, dh, markBorder} = this.state;
    const border = JSON.parse(JSON.stringify(this.state.markBorder));
    const rect = JSON.parse(JSON.stringify(this.state.rect));
    let y = 0;//真实差
    let dex = 0;//x的移动值和等比下的x值的差值
    if (point === "LT" || point === "RT") {
      y = this.getCriticalValue(nowStretch.y - startStretch.y, markBorder.height - 5, dy - markBorder.top);//y边界值
      dex = (border.height - y) / this.state.aspectRatio - border.width;
    } else if (point === "LB" || point === "RB") {
      y = this.getCriticalValue(nowStretch.y - startStretch.y, (dy + dh) - (markBorder.height + markBorder.top), -markBorder.height);
      dex = (border.height + y) / this.state.aspectRatio - border.width;
    }
    switch (point) {
      case "LT":
        //以y边为基准，实现等比例,x边界
        if (dex <= markBorder.left - dx && dex >= 5 - markBorder.width) {
          border.height = border.height - y;
          border.top = border.top + y;
          rect.top = rect.top + y;
          border.width = border.height / this.state.aspectRatio;
          border.left = border.left - dex;
          rect.left = rect.left - dex;
        }
        break;
      case "RT":
        if (dex <= (dx + dw) - (markBorder.left + markBorder.width) && dex >= -markBorder.width + 5) {
          border.height = border.height - y;
          border.top = border.top + y;
          rect.top = rect.top + y;
          border.width = border.height / this.state.aspectRatio;
          rect.right = rect.right + dex;
        }
        break;
      case "RB":
        if (dex >= 5 - markBorder.width && dex <= (dx + dw) - (markBorder.left + markBorder.width)) {
          border.height = border.height + y;
          rect.bottom = rect.bottom + y;
          border.width = border.height / this.state.aspectRatio;
          rect.right = rect.right + dex;
        }
        break;
      case "LB":
        if (dex >= 5 - markBorder.width && dex <= markBorder.left - dx) {
          border.height = border.height + y;
          rect.bottom = rect.bottom + y;
          border.width = border.height / this.state.aspectRatio;
          border.left = border.left - dex;
          rect.left = rect.left - dex;
        }
        break;
      default:
        break;
    }
    this.setState({
      startStretch: nowStretch,
    }, () => {
      this.setBorder(border, rect);
    });
  };

  /**
   * 边界值函数 target>=max return max, target <=min return min, return target
   * @param{number}target
   * @param{number}max
   * @param{number}min
   * @return{number}
   * **/
  getCriticalValue = (target: number, max: number, min: number) => {
    if (target <= min) {
      return min;
    } else if (target >= max) {
      return max;
    } else {
      return target;
    }
  };

  /**
   * 裁剪图片
   * @param{Object}markBorder
   * **/
  cropPicture = (markBorder: {
    left: number,
    top: number,
    width: number,
    height: number
  }) => {
    const r = this.state.r;
    const data = this.state.ctx.getImageData(markBorder.left * r, markBorder.top * r, markBorder.width * r, markBorder.height * r);
    const cs = document.createElement("canvas");
    const ct: any = cs.getContext("2d");
    cs.width = markBorder.width * r;
    cs.height = markBorder.height * r;
    ct.putImageData(data, 0, 0, 0, 0, markBorder.width * r, markBorder.height * r);
    const newImg = cs.toDataURL("image/png");
    this.setNewImg(newImg);
    cs.remove();
  };

  /**
   * 导出图片
   * **/
  setNewImg = (newImg: any) => {
    this.setState({newImg, loading: false});
    this.props.onChange && this.props.onChange(newImg);
  };

  onOk = () => {
    this.props.onOk && this.props.onOk(this.state.newImg);
  };

  componentDidMount() {
    this.setState({
      W: this.props.W ? this.props.W : 618,
      H: this.props.H ? this.props.H : 300,
      aspectRatio: this.props.aspectRatio ? this.props.aspectRatio : 1,
      loading: true,
    }, () => {
      this.getImage(this.props.src);
    });
  }

  render(): React.ReactNode {
    const {
      dh, dw, dx, dy,
      markBorder,
      dataURL,
      rect,
      H, W, loading
    } = this.state;
    const point = [
      {position: "LT", left: -3, top: -3},
      {position: "T", left: markBorder.width / 2 - 3, top: -3},
      {position: "RT", left: markBorder.width - 4, top: -3},
      {position: "R", left: markBorder.width - 4, top: markBorder.height / 2 - 3},
      {position: "RB", left: markBorder.width - 4, top: markBorder.height - 4},
      {position: "B", left: markBorder.width / 2 - 3, top: markBorder.height - 4},
      {position: "LB", left: -3, top: markBorder.height - 4},
      {position: "L", left: -3, top: markBorder.height / 2 - 3},
    ];
    return <div className={styles.cropper}>
      <div className={styles.cropper_body} style={{width: `${W}px`, height: `${H}px`}}>
        {loading ? <div className={styles.loading}>
          <LoadingOutlined/>
        </div> : <></>}
        <canvas id={id}/>
        <div className={styles.baffle}/>
        {loading ? <></> : <img
          className={styles.head_picture}
          src={dataURL}
          alt="img"
          style={{
            clip: `rect(${rect.top}px,${rect.right}px,${rect.bottom}px,${rect.left}px)`,
            width: `${dw}px`,
            height: `${dh}px`,
            left: `${dx}px`,
            top: `${dy}px`,
          }}
        />}
        {loading ? <></> : <div
          className={styles.mark}
          onMouseDown={this.markMouseDown}
          style={{
            width: `${markBorder.width}px`,
            height: `${markBorder.height}px`,
            left: `${markBorder.left}px`,
            top: `${markBorder.top}px`,
          }}
        >
          {point.map((item: { position: string, left: number, top: number }, index: number) => <div
            className={`${styles.stretch} ${item.position} ${styles[item.position]}`}
            onMouseDown={this.stretchMouseDown}
            key={index}
            style={{
              left: `${item.left}px`,
              top: `${item.top}px`,
            }}
          />)
          }
        </div>
        }
      </div>
      <div className={styles.reselect_img}>
        <label htmlFor="UL_image">
          <input type="file" name="UL_image" id="UL_image" accept=".png, .jpg, .jpeg, .gif, .bnp" multiple
                 style={{display: "none"}} onChange={this.upLoadImg}/>
          <span className={styles.reselect_btn}><UploadOutlined/><span style={{marginLeft: "4px"}}>重新选择</span></span>
        </label>
        <span className={styles.reselect_btn} style={{marginLeft: "4px"}} onClick={this.onOk}>确定</span>
      </div>
    </div>;
  }
}

export default (props: IProps) => <div key={props.src} style={{width: `${props.W}px`, height: "auto"}}>
  <Cropper {...props}/></div>;
