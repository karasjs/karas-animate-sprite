import { version } from '../package.json';

class Sprite extends karas.Component {
  componentDidMount() {
    let { nw, nh, delay = 0, duration = 1000, iterations = 1, fill } = this.props;
    let total = nw * nh, count = 0, times = 0;
    let sr = this.shadowRoot;
    function cb(diff) {
      count += diff;
      if(times === 0 && count < delay) {
        return;
      }
      let time = times ? count : (count - delay);
      if(time >= duration) {
        times++;
        if(times >= iterations) {
          sr.removeFrameAnimate(cb);
          if(fill !== 'forwards') {
            sr.updateStyle({
              backgroundPositionX: 0,
              backgroundPositionY: 0,
            });
          }
          return;
        }
        count = time - duration;
      }
      let i = Math.floor(time * total / duration);
      sr.updateStyle({
        backgroundPositionX: i % nw / (nw - 1) * 100 + '%',
        backgroundPositionY: Math.floor(i / nw) / (nh - 1) * 100 + '%',
      });
    }
    sr.frameAnimate(cb);
  }

  render() {
    let nw = this.props.nw, nh = this.props.nh;
    return <div style={{
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '0 0',
      backgroundSize: `${nw * 100}% ${nh * 100}%`,
    }}/>;
  }
}

Sprite.version = version;

export default Sprite;
