import karas from 'karas';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

var version = "0.3.1";

var Sprite = /*#__PURE__*/function (_karas$Component) {
  _inherits(Sprite, _karas$Component);

  var _super = _createSuper(Sprite);

  function Sprite(props) {
    var _this;

    _classCallCheck(this, Sprite);

    _this = _super.call(this, props);
    _this.count = 0;
    _this.times = 0;
    _this.playbackRate = props.playbackRate || 1;
    return _this;
  }

  _createClass(Sprite, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$props = this.props,
          nw = _this$props.nw,
          nh = _this$props.nh,
          _this$props$delay = _this$props.delay,
          delay = _this$props$delay === void 0 ? 0 : _this$props$delay,
          _this$props$duration = _this$props.duration,
          duration = _this$props$duration === void 0 ? 1000 : _this$props$duration,
          _this$props$iteration = _this$props.iterations,
          iterations = _this$props$iteration === void 0 ? 1 : _this$props$iteration,
          fill = _this$props.fill,
          autoPlay = _this$props.autoPlay;
      var total = nw * nh;
      var sr = this.shadowRoot;

      var cb = this.cb = function (diff) {
        _this2.count += diff * _this2.playbackRate;

        if (_this2.times === 0 && _this2.count < delay) {
          return;
        }

        var time = _this2.times ? _this2.count : _this2.count - delay;

        if (time >= duration) {
          _this2.times++;

          if (_this2.times >= iterations) {
            sr.removeFrameAnimate(cb);
            var backgroundPosition = ['forwards', 'both'].indexOf(fill) > -1 ? '100% 100%' : '1000% 1000%';
            sr.updateStyle({
              backgroundPosition: backgroundPosition
            });
            return;
          }

          _this2.count = time - duration;
        }

        var i = Math.floor(time * total / duration);
        sr.updateStyle({
          backgroundPositionX: i % nw / (nw - 1) * 100 + '%',
          backgroundPositionY: Math.floor(i / nw) / (nh - 1) * 100 + '%'
        });
      };

      if (autoPlay !== false) {
        sr.frameAnimate(cb);
      }
    }
  }, {
    key: "play",
    value: function play() {
      this.count = 0;
      this.times = 0;
      this.resume();
    }
  }, {
    key: "pause",
    value: function pause() {
      this.shadowRoot.removeFrameAnimate(this.cb);
    }
  }, {
    key: "resume",
    value: function resume() {
      this.shadowRoot.frameAnimate(this.cb);
    }
  }, {
    key: "render",
    value: function render() {
      var nw = this.props.nw,
          nh = this.props.nh,
          fill = this.props.fill;
      var backgroundPosition = ['backwards', 'both'].indexOf(fill) > -1 ? '0 0' : '1000% 1000%';
      return karas.createElement("div", {
        style: {
          backgroundRepeat: 'no-repeat',
          backgroundPosition: backgroundPosition,
          backgroundSize: "".concat(nw * 100, "% ").concat(nh * 100, "%")
        }
      });
    }
  }]);

  return Sprite;
}(karas.Component);

Sprite.version = version;

export default Sprite;
//# sourceMappingURL=index.es.js.map
