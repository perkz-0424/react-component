import * as React from "react";
import styles from "./styles.less";


interface IProps {
  W: number,
  H: number,
  src: string,
  maxMul: number,
  disableDoubleClick?: boolean,
  haveScale?: boolean,
  onMouseOver?: () => any,
  onMouseOut?: () => any,
}

let _scale_ = 1; //放大或缩小的倍数
const size = 15;//初始刻度尺寸
const _singleScale_ = 1.040645141;//单次缩放比1.008的5次方
const _devicePixelRatio_ = window.devicePixelRatio || 1;//设备px
const maxMules = [1.000000000, 2.048556233, 2.932053124, 4.032674037, 4.921601225, 6.006475703, 7.044178733, 7.938498160, 8.946359176, 10.08217687];//1.008为基准的1-10倍
const LazyPicture = ({W, H, src, maxMul, disableDoubleClick, haveScale, onMouseOut, onMouseOver}: IProps): React.ReactElement => {
  const canvasRef = React.useRef(null);
  const timingDevice: { keyframe: null | NodeJS.Timer, animation: null | NodeJS.Timer } = {
    keyframe: null,
    animation: null
  };//定时任务
  const _maxMul = maxMules[maxMul - 1] ? maxMules[maxMul - 1] : maxMules[7];//最大倍数
  const datumMove = {x: 0, y: 0};//移动基准（以上一个点为基准）
  const _disableDoubleClick_ = disableDoubleClick !== undefined ? disableDoubleClick : false;
  const [centerPoint] = React.useState({x: W / 2, y: H / 2});//画布的中心点
  const [img, set_img] = React.useState<null | HTMLImageElement>(null);// new Image()
  const [context, set_context] = React.useState<any>(null);// ctx
  const [imageWH, set_imageWH] = React.useState({w: 0, h: 0});//图的大小
  const [imageXY, set_imageXY] = React.useState({x: 0, y: 0});//图的位置
  const [doubleClicking, set_doubleClicking] = React.useState(false);//正在执行双击事件
  const [displayLine, set_displayLine] = React.useState(false);//是否出现画线

  //加载图片
  const upLoadImg = (src: string) => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      const {height, width} = image;
      const _ = height < width && width / height >= W / H;//边界
      const _dw = _ ? W : width * (H / height);
      const _dh = _ ? height * (W / width) : H;
      const canvas: any = canvasRef.current;
      const ctx = canvas["getContext"]("2d");
      canvas["setAttribute"]("width", String(_dw));
      canvas["setAttribute"]("height", String(_dh));
      const backingStoreRatio = ctx["webkitBackingStorePixelRatio"] || ctx["mozBackingStorePixelRatio"] || ctx["msBackingStorePixelRatio"] || ctx["oBackingStorePixelRatio"] || ctx["backingStorePixelRatio"] || 1;
      const ratio = _devicePixelRatio_ / backingStoreRatio;
      const canvasWidth = canvas["width"];
      const canvasHeight = canvas["height"];
      canvas.width = canvasWidth * ratio;
      canvas.height = canvasHeight * ratio;
      canvas["style"].width = `${canvasWidth}px`;
      canvas["style"].height = `${canvasHeight}px`;
      ctx.scale(ratio, ratio);
      ctx.drawImage(image, 0, 0, _dw, _dh);
      displayLine && drawRuler(ctx);
      set_img(image);
      set_context(ctx);
      set_imageWH({w: _dw, h: _dh});
      image.remove();
    };
  };

  //画图（图片、位置、大小、比列）
  const drawImage = (image: HTMLImageElement, x: number, y: number, w: number, h: number, sx: number, sy: number) => {
    context.scale(sx, sy);//比例
    context.drawImage(image, x, y, w, h);//绘制图形
  };

  //画标尺
  const drawRuler = (ctx: any, x = 0, y = 0) => {
    if (haveScale) {
      const {w, h} = imageWH;
      ctx.beginPath();//开始画
      //x轴
      for (let i = 0; i <= Math.floor((w / size) - 1); i++) {
        const px = (size + i * size) + x;//横坐标的位置
        const lx = 2 / _scale_;//横坐标的长度
        const offsetX = i < 9 ? 1.5 : 2.5;//偏移度
        ctx.font = `${6 / _scale_}px Microsoft YaHei`;
        ctx.fillText(`${i + 1}`, px - offsetX / _scale_, 10 / _scale_);//字的位置
        ctx.moveTo(px, 0);//起始点
        ctx.lineTo(px, lx);//结束点
        if (_scale_ >= 4) {
          for (let j = 1; j < 10; j++) {
            const min_px = px - ((size / 10) * j);//更小的刻度
            ctx.moveTo(min_px, 0);//起始点
            ctx.lineTo(min_px, lx / 1.5);//结束点
          }
        }
      }
      //y轴
      for (let i = 0; i <= Math.floor((h / size) - 1); i++) {
        const py = (size + i * size) + y;//纵坐标的位置
        const ly = 2 / _scale_;//纵坐标的长度
        const offsetY = 2.5;//偏移度
        ctx.font = `${6 / _scale_}px Microsoft YaHei`;
        ctx.fillText(`${i + 1}`, 6 / _scale_, py + offsetY / _scale_);//字的位置
        ctx.moveTo(0, py);
        ctx.lineTo(ly, py);
        if (_scale_ >= 4) {
          for (let j = 1; j < 10; j++) {
            const min_py = py - ((size / 10) * j);//更小的刻度
            ctx.moveTo(0, min_py);//起始点
            ctx.lineTo(ly / 1.5, min_py);//结束点
          }
        }
      }
      ctx.lineWidth = 0.5 / _scale_;//线宽
      ctx.strokeStyle = "rgba(0,0,0,1)";//描边颜色
      ctx.stroke();//开始描边
      ctx.save();//保存
    }
  };
  //画定位线
  const drawPositionLine = (ctx: any, point: { x: number, y: number }) => {
    if (haveScale) {
      const x = point.x / _scale_;
      const y = point.y / _scale_;
      ctx.setLineDash([2 / _scale_, 2 / _scale_]);//单个长和间隔长
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, 0);
      ctx.moveTo(x, y);
      ctx.lineTo(0, y);
      ctx.lineWidth = 0.6 / _scale_;
      ctx.strokeStyle = "rgba(0,0,0,0.7)";
      ctx.stroke();
      ctx.save();//保存
      drawPositionInfo(x, y);
    }
  };

  //定位数据信息
  //TODO:定位信息
  const drawPositionInfo = (x: number, y: number) => {

  };

  const clearCtx = () => {
    context && context.clearRect(0, 0, W, H);
  };

  //停止定时器
  const stopDoubleClick = () => {
    timingDevice.keyframe && clearInterval(timingDevice.keyframe);
    timingDevice.animation && clearTimeout(timingDevice.animation);
  };

  //双击
  const doubleClick = (e: any) => {
    e.preventDefault();
    if (!_disableDoubleClick_ && !doubleClicking && _scale_ < _maxMul) {
      set_doubleClicking(true);
      stopDoubleClick();
      const {offsetX, offsetY} = e.nativeEvent;
      enlargeAndMoveToCenter({x: offsetX, y: offsetY});
    }
  };

  //放大且当前坐标点向中心移
  const enlargeAndMoveToCenter = (point: { x: number, y: number }) => {
    if (_scale_ < _maxMul) {
      //每一帧移动的距离
      const dx = (point.x - centerPoint.x) / 30;
      const dy = (point.y - centerPoint.y) / 30;
      let x = imageXY.x;//图片的位置
      let y = imageXY.y;
      timingDevice.keyframe = setInterval(() => {
        _scale_ = _scale_ * 1.008 < _maxMul ? _scale_ * 1.008 : _maxMul;//发大的比例
        //根据靠左靠右靠上靠下点击分别计算出需要移动的距离个位置（上下左右四个临界值不一样）
        if (point.x < centerPoint.x) {//横向
          x = x - (dx / _scale_) > 0 ? x : x - (dx / _scale_);
        } else {
          x = imageWH.w / _scale_ - W > x - 4 ? imageWH.w / _scale_ - W : x - (dx / _scale_);
        }
        if (point.y < centerPoint.y) {//纵向
          y = y - (dy / _scale_) > 0 ? y : y - (dy / _scale_);
        } else {
          y = imageWH.h / _scale_ - H > y - 4 ? imageWH.h / _scale_ - H : y - (dy / _scale_);
        }
        clearCtx();
        drawImage(img as HTMLImageElement, x, y, imageWH.w, imageWH.h, 1.008, 1.008);//绘制图形
        displayLine && drawRuler(context, x, y);
        displayLine && drawPositionLine(context, point);
      }, 10);
      timingDevice.animation = setTimeout(() => {
        stopDoubleClick();
        set_imageXY({x, y});
        set_doubleClicking(false);
      }, 300);//0.3秒完成
    }
  };

  //滚轮事件
  const wheel = (e: any) => {
    if (!doubleClicking) {
      const {offsetX, offsetY} = e.nativeEvent;
      if (e.deltaY >= 0) {
        enlarge({x: offsetX, y: offsetY});//上滚放大
      } else {
        narrow({x: offsetX, y: offsetY});//下滚缩小
      }
    }
  };

  //放大
  const enlarge = (point: { x: number, y: number }) => {
    if (_scale_ < _maxMul) {
      clearCtx();
      _scale_ = _scale_ * _singleScale_ < _maxMul ? _scale_ * _singleScale_ : _maxMul;//发大的比例
      const x = imageXY.x - (point.x * (_singleScale_ - 1)) / _scale_;//图片的位置
      const y = imageXY.y - (point.y * (_singleScale_ - 1)) / _scale_;
      set_imageXY({x, y});
      drawImage(img as HTMLImageElement, x, y, imageWH.w, imageWH.h, _singleScale_, _singleScale_);
      displayLine && drawRuler(context, x, y);
      displayLine && drawPositionLine(context, point);
    }
  };

  //缩小
  const narrow = (point: { x: number, y: number }) => {
    if (_scale_ > 1) {
      clearCtx();
      //图片的位置
      let x = imageXY.x;
      let y = imageXY.y;
      //图片补全后的大小
      const pw = imageWH.w * _scale_;
      const ph = imageWH.h * _scale_;
      //每次缩小的距离
      const dx = pw - pw / _singleScale_;
      const dy = ph - ph / _singleScale_;
      //上下左右的间距(大于等于0)
      let left = -x > 0 ? -x : 0;
      let top = -y > 0 ? -y : 0;
      let right = pw - imageWH.w - left > 0 ? pw - imageWH.w - left : 0;
      let bottom = ph - imageWH.h - top > 0 ? ph - imageWH.h - top : 0;
      //只要有一边到0都为0
      if ((!left || !right || !top || !bottom) || _scale_ < _singleScale_) {
        set_imageXY({x, y});
        drawImage(img as HTMLImageElement, x, y, imageWH.w, imageWH.h, 1, 1);
        displayLine && drawRuler(context, x, y);
        displayLine && drawPositionLine(context, point);
      } else {
        //上和左每次各需要缩小的距离
        const dx_l = left + right !== 0 ? dx * (left / (left + right)) : 0;
        const dy_t = top + bottom !== 0 ? dy * (top / (top + bottom)) : 0;
        //新的图片位置
        _scale_ = _scale_ / _singleScale_ > 1 ? _scale_ / _singleScale_ : 1;
        x = x + dx_l / _scale_;
        y = y + dy_t / _scale_;
        set_imageXY({x, y});
        drawImage(img as HTMLImageElement, x, y, imageWH.w, imageWH.h, 1 / _singleScale_, 1 / _singleScale_);
        displayLine && drawRuler(context, x, y);
        displayLine && drawPositionLine(context, point);
      }
    }
  };

  //单击
  const mouseDown = (e: any) => {
    e.preventDefault();
    if (!doubleClicking) {
      const {clientX, clientY} = e.nativeEvent;
      Object.assign(datumMove, {x: clientX, y: clientY});
      window.addEventListener("mouseup", mouseUp, false);
      window.addEventListener("mousemove", mouseMove, false);
    }
  };
  //单机结束
  const mouseUp = (e: any) => {
    e.preventDefault();
    window.removeEventListener("mouseup", mouseUp, false);
    window.removeEventListener("mousemove", mouseMove, false);
  };

  //鼠标单机之后移动
  const mouseMove = (e: any) => {
    e.preventDefault();
    const {clientX, clientY, offsetX, offsetY} = e;
    //基准
    const datumX = datumMove.x;
    const datumY = datumMove.y;
    //移动的距离
    const dx = (clientX - datumX) / _scale_;//正值向右，负值向左
    const dy = (clientY - datumY) / _scale_;//正值向下，负值向上
    move(dx, dy, {x: offsetX, y: offsetY});
  };
  const move = (dx: number, dy: number, point: { x: number, y: number }) => {
    //位置
    let x = imageXY.x;
    let y = imageXY.y;
    //图片大小
    const pw = imageWH.w * _scale_;
    const ph = imageWH.h * _scale_;
    //图片于模型的差
    const dw = (imageWH.w - pw) / _scale_;
    const dh = (imageWH.h - ph) / _scale_;
    //重新定位
    x = x + dx <= 0 ? x + dx : 0;//左侧定位
    x = x <= dw ? dw : x;//右侧定位
    y = y + dy <= 0 ? y + dy : 0;//上侧定位
    y = y <= dh ? dh : y;//下侧定位
    clearCtx();
    drawImage(img as HTMLImageElement, x, y, imageWH.w, imageWH.h, 1, 1);
    displayLine && drawRuler(context, x, y);
    displayLine && drawPositionLine(context, point);
    set_imageXY({x, y});
  };


  const mouseOverOrMove = (e: any) => {
    if (context) {
      const {offsetX, offsetY} = e.nativeEvent;
      set_displayLine(true);
      clearCtx();
      drawImage(img as HTMLImageElement, imageXY.x, imageXY.y, imageWH.w, imageWH.h, 1, 1);
      drawRuler(context, imageXY.x, imageXY.y);
      drawPositionLine(context, {x: offsetX, y: offsetY});
    }
  };
  const mouseOut = () => {
    if (context) {
      set_displayLine(false);
      clearCtx();
      drawImage(img as HTMLImageElement, imageXY.x, imageXY.y, imageWH.w, imageWH.h, 1, 1);
    }
  };
  //离开
  const leaveLazyPicture = () => {
    _scale_ = 1;
    stopDoubleClick();
    window.removeEventListener("mouseup", mouseUp, false);
    window.removeEventListener("mousemove", mouseMove, false);
  };

  React.useEffect(() => {
    upLoadImg(src);
    return () => {
      leaveLazyPicture();
    };
  }, [src]);
  return <div className={styles.lazy_picture} style={{width: imageWH.w, height: imageWH.h}} onMouseOut={onMouseOut} onMouseOver={onMouseOver}>
    <div className={styles.lazy_picture_box}>
      <canvas
        ref={canvasRef}
        onWheel={wheel}
        onMouseOut={mouseOut}
        onMouseDown={mouseDown}
        onDoubleClick={doubleClick}
        onMouseOver={mouseOverOrMove}
        onMouseMove={mouseOverOrMove}
        className={styles.lazy_picture_cs}
      />
    </div>
  </div>;
};

export default LazyPicture;
