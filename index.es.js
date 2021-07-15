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

var version = "0.1.4";

var Sprite = /*#__PURE__*/function (_karas$Component) {
  _inherits(Sprite, _karas$Component);

  var _super = _createSuper(Sprite);

  function Sprite() {
    _classCallCheck(this, Sprite);

    return _super.apply(this, arguments);
  }

  _createClass(Sprite, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          nw = _this$props.nw,
          nh = _this$props.nh,
          _this$props$delay = _this$props.delay,
          delay = _this$props$delay === void 0 ? 0 : _this$props$delay,
          _this$props$duration = _this$props.duration,
          duration = _this$props$duration === void 0 ? 1000 : _this$props$duration,
          _this$props$iteration = _this$props.iterations,
          iterations = _this$props$iteration === void 0 ? 1 : _this$props$iteration,
          fill = _this$props.fill;
      var total = nw * nh,
          count = 0,
          times = 0;
      var sr = this.shadowRoot;

      function cb(diff) {
        count += diff;

        if (times === 0 && count < delay) {
          return;
        }

        var time = times ? count : count - delay;

        if (time >= duration) {
          times++;

          if (times >= iterations) {
            sr.removeFrameAnimate(cb);

            if (fill !== 'forwards') {
              sr.updateStyle({
                backgroundPositionX: 0,
                backgroundPositionY: 0
              });
            }

            return;
          }

          count = time - duration;
        }

        var i = Math.floor(time * total / duration);
        sr.updateStyle({
          backgroundPositionX: i % nw / (nw - 1) * 100 + '%',
          backgroundPositionY: Math.floor(i / nw) / (nh - 1) * 100 + '%'
        });
      }

      sr.frameAnimate(cb);
    }
  }, {
    key: "render",
    value: function render() {
      var nw = this.props.nw,
          nh = this.props.nh;
      return karas.createElement("div", {
        style: {
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '0 0',
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
