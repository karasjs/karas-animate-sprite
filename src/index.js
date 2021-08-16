import karas from 'karas';
import { version } from '../package.json';

class Sprite extends karas.Component {
  constructor(props) {
    super(props);
    this.count = 0;
    this.times = 0;
    this.playbackRate = props.playbackRate || 1;
  }

  componentDidMount() {
    let { nw, nh, delay = 0, duration = 1000, iterations = 1, fill, autoPlay } = this.props;
    let total = nw * nh;
    let sr = this.shadowRoot;
    let cb = this.cb = diff => {
      this.count += diff * this.playbackRate;
      if(this.times === 0 && this.count < delay) {
        return;
      }
      let time = this.times ? this.count : (this.count - delay);
      if(time >= duration) {
        this.times++;
        if(this.times >= iterations) {
          sr.removeFrameAnimate(cb);
          let backgroundPosition = ['forwards', 'both'].indexOf(fill) > -1 ? '100% 100%' : '1000% 1000%';
          sr.updateStyle({
            backgroundPosition,
          });
          return;
        }
        this.count = time - duration;
      }
      let i = Math.floor(time * total / duration);
      sr.updateStyle({
        backgroundPositionX: i % nw / (nw - 1) * 100 + '%',
        backgroundPositionY: Math.floor(i / nw) / (nh - 1) * 100 + '%',
      });
    };
    if(autoPlay !== false) {
      sr.frameAnimate(cb);
    }
  }

  play() {
    this.count = 0;
    this.times = 0;
    this.resume();
  }

  pause() {
    this.shadowRoot.removeFrameAnimate(this.cb);
  }

  resume() {
    this.shadowRoot.frameAnimate(this.cb);
  }

  render() {
    let nw = this.props.nw, nh = this.props.nh, fill = this.props.fill;
    let backgroundPosition = ['backwards', 'both'].indexOf(fill) > -1 ? '0 0' : '1000% 1000%';
    return <div style={{
      backgroundRepeat: 'no-repeat',
      backgroundPosition,
      backgroundSize: `${nw * 100}% ${nh * 100}%`,
    }}/>;
  }
}

Sprite.version = version;

export default Sprite;
