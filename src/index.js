class Sprite extends karas.Component {
  componentDidMount() {
    let { nw, nh, delay = 0, duration = 1000, iterations = 1, fill } = this.props;
    let total = nw * nh, count = 0, times = 0;
    let sr = this.shadowRoot;
    function cb(diff) {
      if(delay > 0) {
        delay -= diff;
      }
      if(delay > 0) {
        return;
      }
      count += diff + delay;
      delay = 0;
      if(count >= duration) {
        times++;
        if(times >= iterations) {
          sr.removeFrameAnimate(cb);
          if(fill !== 'forwards') {
            sr.updateStyle({
              visibility: 'hidden',
            });
          }
          return;
        }
        count = 0;
      }
      let i = Math.floor(count * total / duration);
      sr.updateStyle({
        backgroundPositionX: i % nw / (nw - 1) * 100 + '%',
        backgroundPositionY: Math.floor(i / nw) / (nh - 1) * 100 + '%',
        visibility: 'visible',
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
      visibility: 'hidden',
    }}/>;
  }
}

export default Sprite;
