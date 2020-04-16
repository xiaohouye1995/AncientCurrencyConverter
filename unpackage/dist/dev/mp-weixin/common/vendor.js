(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };




var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  interceptors: interceptors,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });




var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = {
            type: String,
            default: '' };

          vueProps['value'] = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin']['options']) {
      Object.assign(options, vueOptions['mp-weixin']['options']);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 17:
/*!********************************************************************************!*\
  !*** E:/xiaohouye/AncientChinaCurrencyConverter/static/json/CurrencyList.json ***!
  \********************************************************************************/
/*! exports provided: data, default */
/***/ (function(module) {

module.exports = {"data":[{"name":"中国","htmlsrc":"china","epoch":"2019","note":"人民币(元)","scale":1},{"name":"民国","htmlsrc":"minguo","epoch":"民国七年","note":"银元(元)","scale":1325.3},{"name":"清","htmlsrc":"qing","epoch":"乾隆二年","note":"白银(两)","scale":137.5},{"name":"明","htmlsrc":"ming","epoch":"万历三十六年","note":"铜钱(文)","scale":2.4},{"name":"元","htmlsrc":"yuan","epoch":"至顺元年","note":"中统钞(贯)","scale":110},{"name":"南宋","htmlsrc":"nansong","epoch":"靖康二年","note":"会子(文)","scale":2.2},{"name":"北宋","htmlsrc":"beisong","epoch":"英宗时期","note":"铜钱(文)","scale":0.58},{"name":"唐","htmlsrc":"tang","epoch":"盛唐时期","note":"铜钱(文)","scale":2.03},{"name":"东汉","htmlsrc":"donghan","epoch":"汉光武帝","note":"五铢钱(文)","scale":2.2},{"name":"西汉","htmlsrc":"xihan","epoch":"汉武帝","note":"五铢钱(文)","scale":1.1}]};

/***/ }),

/***/ 18:
/*!********************************************************************************!*\
  !*** E:/xiaohouye/AncientChinaCurrencyConverter/static/json sync ^\.\/.*\.js$ ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./beisong.js": 84,
	"./donghan.js": 86,
	"./douzi.js": 19,
	"./ming.js": 74,
	"./minguo.js": 20,
	"./nansong.js": 83,
	"./qing.js": 21,
	"./tang.js": 85,
	"./xihan.js": 87,
	"./yuan.js": 82
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 18;

/***/ }),

/***/ 19:
/*!***********************************************************************!*\
  !*** E:/xiaohouye/AncientChinaCurrencyConverter/static/json/douzi.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p style=\"line-height: 1.5em;\">\n    <strong style=\"font-size: 20px;\">\u53E4\u4EE3\u4E00\u4E24\u94F6\u5B50\u5230\u5E95\u5408\u591A\u5C11\u4EBA\u6C11\u5E01\uFF1F</strong><br/>\n</p>\n<p>\n    <br/>\n</p>\n<p style=\"line-height: 1.5em;\">\n    \u4F5C\u8005\uFF1A\u8C46\u5B50\n</p>\n<p>\n    <br/>\n</p>\n<p style=\"margin-top: 0px; margin-bottom: 1.4em; color: rgb(26, 26, 26); font-family: -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Source Han Sans SC&quot;, &quot;Noto Sans CJK SC&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium; white-space: normal; background-color: rgb(255, 255, 255); line-height: 1.5em;\">\n    \u8FD9\u7C7B\u95EE\u9898\u5728\u5F88\u591A\u5730\u65B9\u770B\u5230\u591A\u6B21\uFF0C\u95EE\u9898\u4E0B\u591A\u6570\u56DE\u7B54\uFF0C\u8981\u4E48\u6298\u5408\u7C73\u4EF7\uFF0C\u8981\u4E48\u6298\u5408\u8D2D\u4E70\u529B\uFF0C\u8981\u4E48\u5C31\u7EA0\u7ED3\u9965\u8352\u5E74\u3002\n</p>\n<p style=\"margin-top: 1.4em; margin-bottom: 1.4em; color: rgb(26, 26, 26); font-family: -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Source Han Sans SC&quot;, &quot;Noto Sans CJK SC&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium; white-space: normal; background-color: rgb(255, 255, 255); line-height: 1.5em;\">\n    \u4E4B\u524D\u53C8\u6709\u95EE\u6C11\u56FD\u65F6\u671F\u4E00\u4E2A\u5927\u6D0B\u5927\u6982\u7B49\u4E8E\u73B0\u5728\u7684\u591A\u5C11\u94B1\uFF0C\u5E95\u4E0B\u7684\u56DE\u7B54\u4E5F\u662F\u6E05\u4E00\u8272\u7684\u6821\u957F\u9886\u591A\u5C11\u94B1\uFF0C\u6559\u80B2\u90E8\u957F\u9886\u591A\u5C11\u94B1\uFF0C\u53BF\u957F\u9886\u591A\u5C11\u94B1\uFF0C\u6559\u804C\u5DE5\u591A\u5C11\u94B1\u3002\u6211\u8BF4\u8FC7\uFF0C\u7528\u52A8\u8361\u4E0D\u5B9A\u7684\u7C73\u4EF7\u6765\u8861\u91CF\u94F6\u5B50\u7684\u4EF7\u503C\uFF0C\u6700\u540E\u5F97\u51FA\u7684\u7ED3\u8BBA\u662F\u8352\u8C2C\u7684\uFF0C\u4F60\u66F4\u4E0D\u80FD\u4EE5\u53E4\u4EE3\u8D2D\u7F6E\u623F\u4EA7\u3001\u7530\u5730\u7684\u82B1\u9500\u6765\u5BF9\u6BD4\u4EBA\u6C11\u5E01\uFF0C\u4E5F\u4E0D\u53EF\u8131\u79BB\u7FA4\u4F17\uFF0C\u53EA\u53C2\u7167\u4E0A\u5C42\u6536\u5165\u6765\u5B9A\u593A\uFF0C\u5426\u5219\u7ED3\u8BBA\u4E00\u5B9A\u6781\u5176\u8352\u8C2C\u3002\n</p>\n<p style=\"margin-top: 1.4em; margin-bottom: 1.4em; color: rgb(26, 26, 26); font-family: -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Source Han Sans SC&quot;, &quot;Noto Sans CJK SC&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium; white-space: normal; background-color: rgb(255, 255, 255); line-height: 1.5em;\">\n    \u8981\u8BF4\u4E00\u4E24\u94F6\u5B50\u3001\u4E00\u4E2A\u94F6\u5143\uFF0C\u5408\u73B0\u5728\u591A\u5C11\u94B1\uFF0C\u6709\u4E2A\u975E\u5E38\u7B80\u5355\u7C97\u66B4\uFF0C\u4F46\u662F\u975E\u5E38\u51C6\u786E\u3001\u975E\u5E38\u6709\u6548\u7684\u65B9\u5F0F\uFF1A\n</p>\n<p style=\"margin-top: 1.4em; margin-bottom: 1.4em; color: rgb(26, 26, 26); font-family: -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Source Han Sans SC&quot;, &quot;Noto Sans CJK SC&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium; white-space: normal; background-color: rgb(255, 255, 255); line-height: 1.5em;\">\n    <span style=\"font-weight: 600;\">\u5E95\u5C42\u5DE5\u4EBA\u3001\u767E\u59D3\u52C9\u5F3A\u7EF4\u6301\u6E29\u9971\u7684\u6708\u5165\uFF08\u94F6\u4E24\u3001\u6587\u94B1\u3001\u5E03\u5E1B\u3001\u94F6\u5143\uFF09=\u73B0\u5982\u4ECA\u5E95\u5C42\u5DE5\u4EBA\u3001\u767E\u59D3\u52C9\u5F3A\u7EF4\u6301\u6E29\u9971\u7684\u6708\u5165\uFF08\u4EBA\u6C11\u5E01\uFF09</span>\n</p>\n<p style=\"margin-top: 1.4em; margin-bottom: 1.4em; color: rgb(26, 26, 26); font-family: -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Source Han Sans SC&quot;, &quot;Noto Sans CJK SC&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium; white-space: normal; background-color: rgb(255, 255, 255); line-height: 1.5em;\">\n    \u8B6C\u5982\uFF1A\n</p>\n<p style=\"margin-top: 1.4em; margin-bottom: 1.4em; color: rgb(26, 26, 26); font-family: -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Source Han Sans SC&quot;, &quot;Noto Sans CJK SC&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium; white-space: normal; background-color: rgb(255, 255, 255); line-height: 1.5em;\">\n    \u6C11\u56FD\u521D\u5E74\uFF0C\u6E05\u534E\u5916\u6559\u72C4\u767B\u8FC8\u8C03\u67E5\u4E86\u5317\u4EAC\u6700\u666E\u901A\u5C45\u6C11\u7684\u6536\u5165\u3002\u5176\u4E2D\uFF0C1918\u5E74\uFF0C\u5317\u4EAC\u5C45\u6C11\u6700\u5E95\u5C42\u7684\u6536\u5165\u662F1.66\u94F6\u5143/\u6708\uFF0C\u5373\u6BCF\u4E2A\u6708\u624D\u5F97\u4E00\u5757\u516D\u3002\n</p>\n<p style=\"margin-top: 1.4em; margin-bottom: 1.4em; color: rgb(26, 26, 26); font-family: -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Source Han Sans SC&quot;, &quot;Noto Sans CJK SC&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium; white-space: normal; background-color: rgb(255, 255, 255); line-height: 1.5em;\">\n    \u6C11\u56FD\u521D\u5E74\uFF0C\u5317\u4EAC\u6700\u666E\u901A\u6700\u5E95\u5C42\u7684\u5458\u5DE5\uFF0C\u6709\u4F4F\u5904\uFF0C\u4F46\u751F\u6D3B\u5341\u5206\u8270\u96BE\uFF0C\u6708\u5165\u4E00\u5757\u516D\u89D2\uFF0C\u53731.6\u5143\u3002\n</p>\n<p style=\"margin-top: 1.4em; margin-bottom: 1.4em; color: rgb(26, 26, 26); font-family: -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Source Han Sans SC&quot;, &quot;Noto Sans CJK SC&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium; white-space: normal; background-color: rgb(255, 255, 255); line-height: 1.5em;\">\n    \u6C11\u56FD\u521D\u5E74\uFF0C\u5317\u4EAC\u6BB5\u516C\u9986\u4E2D\u7684\u4F63\u4EBA\u3001\u5728\u5DE5\u5730\u5E72\u6D3B\u7684\u5DE5\u4EBA\u3001\u996D\u5E97\u7684\u4F19\u8BA1\uFF0C\u6708\u5165\u7EA6\u54082\u4E2A\u5927\u6D0B\u3002\n</p>\n<p style=\"margin-top: 1.4em; margin-bottom: 1.4em; color: rgb(26, 26, 26); font-family: -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Source Han Sans SC&quot;, &quot;Noto Sans CJK SC&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium; white-space: normal; background-color: rgb(255, 255, 255); line-height: 1.5em;\">\n    \u90A3\u4E48\uFF0C\n</p>\n<p style=\"margin-top: 1.4em; margin-bottom: 1.4em; color: rgb(26, 26, 26); font-family: -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Source Han Sans SC&quot;, &quot;Noto Sans CJK SC&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium; white-space: normal; background-color: rgb(255, 255, 255); line-height: 1.5em;\">\n    \u53EF\u4EE5\u5F97\u51FA\u7ED3\u8BBA\uFF1A\n</p>\n<p style=\"margin-top: 1.4em; margin-bottom: 1.4em; color: rgb(26, 26, 26); font-family: -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Source Han Sans SC&quot;, &quot;Noto Sans CJK SC&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium; white-space: normal; background-color: rgb(255, 255, 255); line-height: 1.5em;\">\n    <span style=\"font-weight: 600;\">\u6C11\u56FD\u521D\u5E74\uFF0C2\u4E2A\u5927\u6D0B\u7EA6\u7B49\u4E8E\u73B0\u5982\u4ECA\u76843000\u5143\uFF0C\u53731\u4E2A\u5927\u6D0B\u7B49\u4E8E\u73B0\u5728\u76841500\u5143\u3002</span>\n</p>\n<p style=\"margin-top: 1.4em; margin-bottom: 1.4em; color: rgb(26, 26, 26); font-family: -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Source Han Sans SC&quot;, &quot;Noto Sans CJK SC&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium; white-space: normal; background-color: rgb(255, 255, 255); line-height: 1.5em;\">\n    \u8FD9\u65E2\u4E0D\u662F\u7C73\u4EF7\u6298\u5408\u51FA\u6765\u7684300\u5143\u4EBA\u6C11\u5E01\uFF0C\u4E5F\u4E0D\u662F\u8089\u4EF7\u6298\u5408\u51FA\u6765\u7684800\u5143\u4EBA\u6C11\u5E01\u3002\u56E0\u4E3A\u4ECE\u4E0A\u4E16\u7EAA\u672B\u671F\u5F00\u59CB\uFF0C\u519C\u4E1A\u8FDB\u5165\u673A\u68B0\u5316\uFF0C\u53C8\u62E5\u6709\u5316\u80A5\u7B49\u8D44\u6599\uFF0C\u4EF7\u503C\u53EF\u79F0\u4F4E\u5EC9\uFF0C\u4EA9\u4EA7\u5341\u500D\u4E8E\u53E4\u4EE3\uFF0C\u53C8\u4E0D\u4F3C\u53E4\u4EE3\u7C73\u4EF7\u817E\u8E0A\u3002\u5404\u79CD\u8089\u79BD\u3001\u8089\u732A\u517B\u6B96\uFF0C\u5728\u53E4\u4EE3\u4E5F\u4E0D\u80FD\u4E0E\u73B0\u5982\u4ECA\u7684\u62E5\u6709\u91CF\u5BF9\u6BD4\u3002\u5176\u4ED6\u8BF8\u5982\u80FD\u4E70\u9A74\u4F46\u4E70\u4E0D\u8D77\u7CAE\uFF0C\u80FD\u76D6\u5C4B\u4F46\u5403\u4E0D\u8D77\u8089\u7684\u4E8B\uFF0C\u5B9E\u5728\u592A\u591A\uFF0C\u4E0D\u4E00\u4E00\u5217\u4E3E\u3002\n</p>\n<p style=\"margin-top: 1.4em; margin-bottom: 1.4em; color: rgb(26, 26, 26); font-family: -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Source Han Sans SC&quot;, &quot;Noto Sans CJK SC&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium; white-space: normal; background-color: rgb(255, 255, 255); line-height: 1.5em;\">\n    \u56E0\u6B64\uFF0C\u6839\u636E\u5E95\u5C42\u4EBA\u6C11\uFF08\u90A3\u5565\u4EBA\u53E3\uFF09\u7684\u6536\u5165\u624D\u662F\u9760\u8C31\u7684\uFF0C\u4E5F\u80FD\u56DE\u5934\u8FC7\u6765\u68C0\u6D4B\u5F53\u65F6\u67D0\u6837\u4E1C\u897F\u7684\u8D35\u8D31\uFF0C\u800C\u4E0D\u662F\u7528\u5177\u4F53\u7684\u67D0\u6837\u4E1C\u897F\u53BB\u68C0\u6D4B\u5E95\u5C42\u6708\u5165\u3002\u4E8E\u662F\uFF0C\u4F60\u56DE\u5934\u518D\u53BB\u68C0\u6D4B\uFF0C\u53D1\u73B0\u5728\u6C11\u56FD\u521D\u671F\uFF0C2\u4E2A\u5927\u6D0B\u80FD\u7F6E\u529E\u4E00\u684C\u4E0A\u7B49\u5A5A\u5BB4\u3002\u800C\u73B0\u5982\u4ECA\uFF0C\u666E\u901A\u5A5A\u5BB4\u9152\u5E2D\u4E00\u4E24\u5343\uFF0C\u9AD8\u7EA7\u5A5A\u5BB4\u4E00\u684C3000\u5DE6\u53F3\u3002\u518D\u9A8C\u6C11\u56FD\u521D\u5E74\uFF0C800\u94F6\u5143\u4E70\u5317\u4EAC\u4E00\u5957\u623F\uFF0C\u5219\u54082017\u5E74\u7684\u4EBA\u6C11\u5E01120\u4E07\uFF0C\u5E76\u4E0D\u4FBF\u5B9C\uFF0C\u4F46\u548C\u73B0\u5982\u4ECA\u7684\u623F\u4EF7\u76F8\u6BD4\uFF0C\u771F\u662F\u4FBF\u5B9C\u5230\u59E5\u59E5\u5BB6\u4E86\u3002\u7531\u6B64\u63A8\u800C\u5E7F\u4E4B\uFF0C\u8D27\u5E01\u672A\u66FE\u52A8\u8361\u8FC7\u76841925\u5E74\u4E4B\u524D\u7684\u6C11\u56FD\uFF0C1\u5757\u5927\u6D0B\n</p>\n<p style=\"margin-top: 1.4em; margin-bottom: 1.4em; color: rgb(26, 26, 26); font-family: -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Source Han Sans SC&quot;, &quot;Noto Sans CJK SC&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium; white-space: normal; background-color: rgb(255, 255, 255); line-height: 1.5em;\">\n    =1930\u5E74\u76848\u4E2A\u5927\u6D0B\n</p>\n<p style=\"margin-top: 1.4em; margin-bottom: 1.4em; color: rgb(26, 26, 26); font-family: -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Source Han Sans SC&quot;, &quot;Noto Sans CJK SC&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium; white-space: normal; background-color: rgb(255, 255, 255); line-height: 1.5em;\">\n    =1980\u5E74\u768415\u5143\n</p>\n<p style=\"margin-top: 1.4em; margin-bottom: 1.4em; color: rgb(26, 26, 26); font-family: -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Source Han Sans SC&quot;, &quot;Noto Sans CJK SC&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium; white-space: normal; background-color: rgb(255, 255, 255); line-height: 1.5em;\">\n    =1990\u5E74\u768450\u5143\n</p>\n<p style=\"margin-top: 1.4em; margin-bottom: 1.4em; color: rgb(26, 26, 26); font-family: -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Source Han Sans SC&quot;, &quot;Noto Sans CJK SC&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium; white-space: normal; background-color: rgb(255, 255, 255); line-height: 1.5em;\">\n    =2000\u5E74\u7684350\u5143\n</p>\n<p style=\"margin-top: 1.4em; margin-bottom: 1.4em; color: rgb(26, 26, 26); font-family: -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Source Han Sans SC&quot;, &quot;Noto Sans CJK SC&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium; white-space: normal; background-color: rgb(255, 255, 255); line-height: 1.5em;\">\n    =2010\u5E74\u7684900\u5143\n</p>\n<p style=\"margin-top: 1.4em; margin-bottom: 1.4em; color: rgb(26, 26, 26); font-family: -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Source Han Sans SC&quot;, &quot;Noto Sans CJK SC&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium; white-space: normal; background-color: rgb(255, 255, 255); line-height: 1.5em;\">\n    =2017\u5E74\u76841500\u5143\n</p>\n<p style=\"margin-top: 1.4em; margin-bottom: 1.4em; color: rgb(26, 26, 26); font-family: -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Source Han Sans SC&quot;, &quot;Noto Sans CJK SC&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium; white-space: normal; background-color: rgb(255, 255, 255); line-height: 1.5em;\">\n    \uFF08\u5168\u90E8\u6839\u636E\u5E95\u5C42\u5458\u5DE5\u6E29\u9971\u5DE5\u8D44\u6362\u7B97\uFF09\n</p>\n<p class=\"ztext-empty-paragraph\" style=\"margin-top: -0.8em; margin-bottom: -0.8em; color: rgb(26, 26, 26); font-family: -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Source Han Sans SC&quot;, &quot;Noto Sans CJK SC&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium; white-space: normal; background-color: rgb(255, 255, 255);\">\n    <br/>\n</p>\n<p style=\"margin-top: 1.4em; margin-bottom: 1.4em; color: rgb(26, 26, 26); font-family: -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Source Han Sans SC&quot;, &quot;Noto Sans CJK SC&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium; white-space: normal; background-color: rgb(255, 255, 255); line-height: 1.5em;\">\n    \u6709\u4EBA\u95EE\uFF0C\u4E09\u56DB\u5341\u5E74\u6765\uFF0C\u6211\u56FD\u901A\u8D27\u81A8\u80C0\u4E86\u591A\u5C11\u500D\u3002\u7B54\u6848\u5F88\u660E\u663E\u4E86\uFF0C\u662F100\u500D\u30021980\u5E74\u7684\u4E00\u5757\u94B1\uFF0C\u7B49\u4E8E\u73B0\u5982\u4ECA\u7684\u4E00\u767E\u5757\u94B1\u3002\u8FD9\u4ECE\u4FA7\u9762\u8BC1\u660E\u4E86\u8D5A\u4E86\u94B1\u5B58\u94F6\u884C\u5230\u5E95\u8D2C\u4E0D\u8D2C\u503C\uFF0C\u56FD\u5BB6\u5370\u53D1\u8D27\u5E01\uFF0C\u5230\u5E95\u5BF9\u4F60\u4EE5\u524D\u5B58\u7684\u94B1\uFF0C\u7A00\u91CA\u5230\u4F55\u79CD\u7A0B\u5EA6\uFF1F\n</p>\n<p style=\"margin-top: 1.4em; margin-bottom: 1.4em; color: rgb(26, 26, 26); font-family: -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Source Han Sans SC&quot;, &quot;Noto Sans CJK SC&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium; white-space: normal; background-color: rgb(255, 255, 255); line-height: 1.5em;\">\n    \u8FD9\u90FD\u662F\u6839\u636E\u6700\u5E95\u5C42\u7684\u5DE5\u4EBA\u3001\u53BF\u6C11\u7684\u6708\u5165\u800C\u7B97\u51FA\u6765\u7684\uFF0C\u800C\u6708\u5165\u662F\u5F53\u65F6\u6C11\u4EF7\u7684\u76F4\u63A5\u53CD\u5E94\u3002\u5230\u73B0\u5728\uFF0C\u5E95\u5C42\u5DE5\u4EBA\u3001\u5FAD\u5F79\u3001\u4EC6\u4ECE\u3001\u670D\u52A1\u5458\uFF0C\u4E5F\u5360\u636E\u4EBA\u53E3\u7684\u7EDD\u5927\u591A\u6570\u3002\u7531\u6B64\uFF0C\u6211\u4EEC\u8FD8\u53EF\u4EE5\u770B\u53E4\u4EE3\u4EFB\u4F55\u65F6\u671F\u7684\u901A\u884C\u8D27\u5E01\u7B49\u4E8E\u73B0\u5982\u4ECA\u7684\u591A\u5C11\u4EBA\u6C11\u5E01\u3002\n</p>\n<p style=\"margin-top: 1.4em; margin-bottom: 1.4em; color: rgb(26, 26, 26); font-family: -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Source Han Sans SC&quot;, &quot;Noto Sans CJK SC&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium; white-space: normal; background-color: rgb(255, 255, 255); line-height: 1.5em;\">\n    \u6211\u66FE\u5199\u8FC7\u4E00\u7BC7\u56DE\u7B54\uFF0C\u4E13\u95E8\u5C31\u662F\u5BF9\u6BD4\u94F6\u4E24\u4E0E\u4EBA\u6C11\u5E01\uFF0C\u8B6C\u5982\u6E05\u4EE3\u67D0\u4E9B\u65F6\u671F\uFF0C\u53BF\u6C11\u5C0F\u5DE5\uFF0C\u6708\u94B1\u4E00\u4E24\u56DB\u94B1\uFF0C\u53C8\u6709\u624D\u5F97\u516B\u94B1\u7684\uFF0C\u800C\u4EAC\u57CE\u3001\u4E3B\u8981\u57CE\u5E02\u4EC6\u5F79\u3001\u6742\u5DE5\u3001\u670D\u52A1\u4EBA\u5458\uFF0C\u6708\u94B1\u4E8C\u4E24\u3002\u300A\u7EA2\u697C\u68A6\u300B\u91CC\u5F97\u529B\u4E2B\u9B1F\uFF0C\u4E5F\u662F\u8FD9\u4E2A\u6536\u5165\u3002\u53EF\u4EE5\u770B\u51FA\uFF0C\u660E\u6E05\u65F6\u671F\u7684\u4E00\u4E24\u94F6\u5B50\uFF0C\u5927\u7565\u7B49\u4E8E\u73B0\u5982\u4ECA\u591A\u6570\u5E95\u5C42\u4EBA\u6C11\u534A\u6708\u7684\u6536\u5165\u3002<span style=\"font-weight: 600;\">\u53E4\u4EBA\u6708\u5165\u4E8C\u4E24\u94F6\u5B50\uFF0C\u7B49\u4E8E1980\u5E74\u768430\u5757\u94B1\uFF0C2000\u5E74\u7684700\u5757\u94B1\uFF0C2017\u5E74\u76843000\u5757\u94B1\u3002</span>\u800C\u6C11\u95F4\u5E38\u7528\u6587\u94B1\u7ED3\u7B97\uFF0C\u4E00\u5343\u6587\u6298\u5408\u4E00\u4E24\u94F6\u5B50\uFF0C\u540E\u6587\u94B1\u8D2C\u503C\uFF0C\u4E00\u4E24\u94F6\u5B50\u5151\u4E00\u5343\u4E03\u516B\u767E\u6587\u90FD\u6709\uFF0C\u6C11\u95F4\u5DE5\u4F5C\u4EBA\u7FA4\u6536\u5165\u4E5F\u4E0A\u6DA8\uFF0C\u4F46\u5374\u662F\u771F\u7684\u4E0A\u6DA8\u5417\uFF1F\u4F9D\u7136\u8981\u6839\u636E\u5E95\u5C42\u6708\u5165\u6765\u786E\u5B9A\u7269\u4EF7\u8D35\u8D31\uFF0C\u800C\u4E0D\u662F\u6839\u636E\u67D0\u79CD\u4E1C\u897F\u4EF7\u683C\u6765\u786E\u5B9A\u6536\u5165\u591A\u5C11\u3002\n</p>\n<p style=\"margin-top: 1.4em; margin-bottom: 1.4em; color: rgb(26, 26, 26); font-family: -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Source Han Sans SC&quot;, &quot;Noto Sans CJK SC&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium; white-space: normal; background-color: rgb(255, 255, 255); line-height: 1.5em;\">\n    \u8B6C\u5982\uFF0C\u5EB7\u7199\u5E74\u95F4\uFF0C\u8089\u4EF7\u7EF4\u6301\u5728\u4E09\u5206\u94B1\uFF0C\u5373\u4E00\u65A4\uFF08590\u514B\uFF090.03\u4E24\u767D\u94F6\uFF0C\u6839\u636E\u5E95\u5C42\u4EBA\u6C11\u6708\u5165\u6362\u7B97\uFF0C\u8FD9\u5C31\u662F\u4E00\u65A4\u732A\u808938\u5757\u94B1\uFF0C\u73B0\u5728\u624D\u5341\u6765\u5757\uFF0C\u800C\u66F4\u5E95\u5C42\u7684\u6751\u6C11\uFF0C\u6708\u5165\u7B49\u4E8E\u73B0\u5982\u4ECA\u76841200\u5757\u5DE6\u53F3\u3002\u4F60\u77AC\u95F4\u5C31\u80FD\u660E\u767D\u53E4\u4EBA\u4E00\u5E74\u5230\u5934\u5403\u56DE\u8089\u591A\u4E0D\u5BB9\u6613\uFF0C\u4E3A\u5565\u90FD\u820D\u4E0D\u5F97\u4E70\u8089\u3002\u800C\u5207\u5207\u4E0D\u53EF\u6839\u636E\u4E00\u65A4\u732A\u8089\u4E09\u5206\u94F6\u94B1\u6765\u6362\u7B97\u6210\u73B0\u5728\u7684\u8089\u4EF7\uFF0C\u518D\u63A8\u51FA\u5F53\u65F6\u4EBA\u7684\u6536\u5165\u6C34\u5E73\u6298\u5408\u73B0\u5982\u4ECA\u591A\u5C11\u4EBA\u6C11\u5E01\uFF0C\u8FD9\u662F\u975E\u5E38\u8352\u8C2C\u7684\u3002\n</p>\n<p style=\"margin-top: 1.4em; margin-bottom: 1.4em; color: rgb(26, 26, 26); font-family: -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Source Han Sans SC&quot;, &quot;Noto Sans CJK SC&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium; white-space: normal; background-color: rgb(255, 255, 255); line-height: 1.5em;\">\n    \u76D0\u5728\u53E4\u4EE3\u5236\u4F5C\u3001\u8FD0\u8F93\u90FD\u6BD4\u73B0\u5728\u8D39\u52B2\uFF0C\u6BCF\u65A4\u4E94\u5206\u94B1\uFF0C\u4E5F\u5C31\u662F0.05\u4E24\uFF0C\u54082017\u5E74\u768475\u5757\u94B1\u3002\u8FD9\u79CD\u72B6\u51B5\u4E00\u76F4\u6301\u7EED\u5230\u6C11\u56FD\u521D\u5E74\uFF0C\u8FD9\u65F6\u518D\u770B\u300A\u9ED4\u5DDD\u6EC7\u65C5\u884C\u8BB0\u300B\uFF0C\u4F60\u5C31\u80FD\u660E\u767D\u4E3A\u5565\u5404\u5730\u8D2B\u82E6\u767E\u59D3\u6839\u672C\u5C31\u5403\u4E0D\u4E0A\u76D0\uFF0C\u6700\u591A\u53EA\u662F\u6CBE\u7740\u4E00\u70B9\u70B9\u5927\u76D0\u7C92\u5C1D\u4E00\u4E9B\u6ECB\u5473\u7684\u539F\u56E0\u4E86\u3002\u800C\u4F60\uFF0C\u7EDD\u4E0D\u53EF\u6839\u636E\u5F53\u65F6\u7684\u98DF\u76D0\u4EF7\u683C\uFF0C\u53CD\u63A8\u51FA\u5151\u7387\u3002\n</p>\n<p class=\"ztext-empty-paragraph\" style=\"margin-top: -0.8em; margin-bottom: -0.8em; color: rgb(26, 26, 26); font-family: -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Source Han Sans SC&quot;, &quot;Noto Sans CJK SC&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium; white-space: normal; background-color: rgb(255, 255, 255);\">\n    <br/>\n</p>\n<p style=\"margin-top: 1.4em; margin-bottom: 1.4em; color: rgb(26, 26, 26); font-family: -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Source Han Sans SC&quot;, &quot;Noto Sans CJK SC&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium; white-space: normal; background-color: rgb(255, 255, 255); line-height: 1.5em;\">\n    \u5317\u5B8B\u5E95\u5C42\u4E61\u91CE\u767E\u59D3\uFF0C\u65E5\u5165\u4E00\u767E\u6587\uFF0C\u6708\u5165\u4E09\u5343\u6587\uFF083\u8D2F\uFF09\uFF0C\u7B49\u4E8E2000\u5143\u4EBA\u6C11\u5E01\uFF0C\u4E00\u6587\u5408\u73B0\u5728\u7684\u516D\u3001\u4E03\u6BDB\u94B1\uFF0C\u4E5F\u662F\u5982\u6B64\u63A8\u5BFC\u3002\u4E0A\u5C42\u5B98\u5458\u4E09\u5206\u4E4B\u4E00\u53D1\u94B1\uFF0C\u4E09\u5206\u4E4B\u4E8C\u53D1\u4E1C\u897F\uFF0C\u4E5F\u662F\u65E0\u5948\u4E4B\u4E3E\u3002\u5317\u5B8B\u5F85\u9047\u4E2D\u7B49\u7684\u5F53\u5175\u7684\uFF0C\u5E73\u5747\u4E00\u5929\u80FD\u62FF130\u6587\uFF0C\u5230\u5357\u5B8B\u4E00\u5929\u80FD\u62FF500\u591A\u6587\uFF0C\u4E0D\u662F\u5DE5\u8D44\u6DA8\u4E86\uFF0C\u662F\u94B1\u6BDB\u4E86\u3002\n</p>\n<p style=\"margin-top: 1.4em; margin-bottom: 1.4em; color: rgb(26, 26, 26); font-family: -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Source Han Sans SC&quot;, &quot;Noto Sans CJK SC&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium; white-space: normal; background-color: rgb(255, 255, 255); line-height: 1.5em;\">\n    \u5317\u5B8B\u57CE\u91CC\u5C0F\u5403\uFF0C\u6BCF\u4EFD15\u6587\uFF0C\u4E5F\u5C31\u662F\u73B0\u5728\u768415\u5757\u94B1\u5DE6\u53F3\uFF0C\u8FD9\u662F\u9E21\u6742\u6C64\u7684\u4EF7\u683C\u3002\u800C\u852C\u83DC\u9020\u9F51\uFF0C\u6BCF\u789710\u6587\u3002\n</p>\n<p style=\"text-align: center; line-height: 1.5em;\">\n    <img src=\"https://pic2.zhimg.com/80/v2-b1fff09d1be1bba3f518acbcb807b4bd_720w.jpg\" class=\"content_image lazy\"/>\n</p>\n<p class=\"ztext-empty-paragraph\" style=\"margin-top: -0.8em; margin-bottom: -0.8em; color: rgb(26, 26, 26); font-family: -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Source Han Sans SC&quot;, &quot;Noto Sans CJK SC&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium; white-space: normal; background-color: rgb(255, 255, 255);\">\n    <br/>\n</p>\n<p style=\"margin-top: 1.4em; margin-bottom: 0px; color: rgb(26, 26, 26); font-family: -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Source Han Sans SC&quot;, &quot;Noto Sans CJK SC&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium; white-space: normal; background-color: rgb(255, 255, 255); line-height: 1.5em;\">\n    \u603B\u4E4B\uFF0C\u57FA\u4E8E\u5E95\u5C42\u4EBA\u6C11\u65E5\u5165\u6216\u6708\u5165\uFF0C\u8054\u7CFB\u73B0\u5982\u4ECA\u5E95\u5C42\u4EBA\u6C11\u65E5\u5165\u6216\u6708\u5165\uFF0C\u6765\u8BA4\u77E5\u53E4\u4EE3\uFF0C\u751A\u81F3\u8FD1\u4EE3\u7CAE\u98DF\u3001\u8089\u7C7B\u3001\u5403\u7A7F\u3001\u4F4F\u5BBF\u3001\u623F\u4EA7\u3001\u5A5A\u4E27\u3001\u96C7\u4F63\u7B49\u6240\u6709\u4EBA\u4EEC\u6240\u9700\u8D2D\u4E70\u3001\u51FA\u5356\u7269\u54C1\u7684\u4EF7\u683C\uFF0C\u624D\u662F\u6700\u5408\u7406\u7684\u3002\u5982\u6B64\u8BA1\u7B97\uFF0C\u5219\u8352\u5E74\u7CAE\u98DF\u4EF7\u683C\u7684\u817E\u8E0A\u3001\u6602\u8D35\uFF0C\u5219\u7ACB\u5373\u663E\u73B0\u3002\u767E\u59D3\u4E00\u5E74\u5230\u5934\u820D\u4E0D\u5F97\u5403\u4E00\u56DE\u8089\u7684\u5FC3\u6001\uFF0C\u4E5F\u80FD\u7ACB\u5373\u4F53\u4F1A\u5230\u3002\n</p>\n<p style=\"margin-top: 1.4em; margin-bottom: 0px; color: rgb(26, 26, 26); font-family: -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Source Han Sans SC&quot;, &quot;Noto Sans CJK SC&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium; white-space: normal; background-color: rgb(255, 255, 255); line-height: 1.5em;\">\n    <span style=\"color: #888;\">\u6CE8\uFF1A\u7B97\u6CD5\u5F15\u7528\u81EA\u77E5\u4E4E\u7528\u6237 @\u8C46\u5B50\uFF0C\u94FE\u63A5\u5730\u5740\uFF1Ahttps://zhuanlan.zhihu.com/p/32089267</span>\n</p>\n<p>\n    <br/>\n</p>";

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    vm.mpHost !== 'mp-toutiao' && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    vm.mpHost !== 'mp-toutiao' && initProvide(vm); // resolve provide after data/props
    vm.mpHost !== 'mp-toutiao' && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  vm.mpHost !== 'mp-toutiao' && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!************************************************************************!*\
  !*** E:/xiaohouye/AncientChinaCurrencyConverter/static/json/minguo.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p style=\"line-height: 1.5em;\">\n    <span style=\"font-size: 20px;\"><strong><span style=\"font-family: \u5FAE\u8F6F\u96C5\u9ED1, &quot;Microsoft YaHei&quot;;\">\u4E2D\u534E\u6C11\u56FD</span></strong></span><span style=\"font-size: 18px;\"><strong><span style=\"font-family: \u5FAE\u8F6F\u96C5\u9ED1, &quot;Microsoft YaHei&quot;;\"></span></strong><strong><span style=\"font-family: \u5FAE\u8F6F\u96C5\u9ED1, &quot;Microsoft YaHei&quot;;\"></span></strong></span>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"font-family: \u5FAE\u8F6F\u96C5\u9ED1, &quot;Microsoft YaHei&quot;; font-size: 18px;\">\u516C\u51431912\u5E74-1949\u5E74</span>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"font-family: \u5FAE\u8F6F\u96C5\u9ED1, &quot;Microsoft YaHei&quot;; font-size: 18px;\"><br/></span>\n</p>\n<p style=\"line-height: 1.5em; text-align: center;\">\n    <span style=\"font-family: \u5FAE\u8F6F\u96C5\u9ED1, &quot;Microsoft YaHei&quot;; font-size: 18px;\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E6%B0%91%E5%9B%BD%E5%9C%B0%E5%9B%BE.jpg\" width=\"250\"/></span>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"font-family: \u5FAE\u8F6F\u96C5\u9ED1, &quot;Microsoft YaHei&quot;; font-size: 18px;\"><br/></span>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"font-family: \u5FAE\u8F6F\u96C5\u9ED1, &quot;Microsoft YaHei&quot;; font-size: 18px;\">1911\u5E74\u8F9B\u4EA5\u9769\u547D\u7206\u53D1\u540E\uFF0C\u9769\u547D\u515A\u5728\u5357\u4EAC\u5EFA\u7ACB\u4E34\u65F6\u653F\u5E9C\uFF0C\u5404\u7701\u4EE3\u8868\u63A8\u4E3E\u5B59\u4E2D\u5C71\u4E3A\u4E34\u65F6\u5927\u603B\u7EDF\u30021912\u5E74\u5143\u6708\u6C11\u56FD\u6B63\u5F0F\u5EFA\u7ACB\uFF0C \u8881\u4E16\u51EF\u4E3A\u9996\u4EFB\u6C11\u56FD\u5927\u603B\u7EDF\u3002</span>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"font-family: \u5FAE\u8F6F\u96C5\u9ED1, &quot;Microsoft YaHei&quot;; font-size: 18px;\"><br/></span>\n</p>\n<p style=\"text-align: center; line-height: 1.5em;\">\n    <span style=\"font-family: \u5FAE\u8F6F\u96C5\u9ED1, &quot;Microsoft YaHei&quot;; font-size: 18px;\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E6%B0%91%E5%9B%BD%E4%BA%94%E8%89%B2%E6%97%97.jpg\" width=\"250\"/></span>\n</p>\n<p style=\"text-align: center; line-height: 1.5em;\">\n    <span style=\"font-family: \u5FAE\u8F6F\u96C5\u9ED1, &quot;Microsoft YaHei&quot;; color: rgb(165, 165, 165); font-size: 18px;\">\u4E2D\u534E\u6C11\u56FD\u56FD\u65D7\u4E94\u8272\u65D71912-1928</span>\n</p>\n<p style=\"text-align: center; line-height: 1.5em;\">\n    <span style=\"font-family: \u5FAE\u8F6F\u96C5\u9ED1, &quot;Microsoft YaHei&quot;; font-size: 18px;\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E6%B0%91%E5%9B%BD%E9%9D%92%E5%A4%A9%E7%99%BD%E6%97%A5%E6%97%97.jpg\" width=\"250\"/></span>\n</p>\n<p style=\"text-align: center; line-height: 1.5em;\">\n    <span style=\"font-family: \u5FAE\u8F6F\u96C5\u9ED1, &quot;Microsoft YaHei&quot;; color: rgb(165, 165, 165); font-size: 18px;\">\u4E2D\u534E\u6C11\u56FD\u56FD\u65D7\u9752\u5929\u767D\u65E5\u65D71929-1949</span>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <br/>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"font-size: 18px;\">\u4E3B\u8981\u6D41\u901A\u8D27\u5E01\uFF1A\u94F6\u5143</span>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"font-family: \u5FAE\u8F6F\u96C5\u9ED1, &quot;Microsoft YaHei&quot;; font-size: 18px;\"><br/></span>\n</p>\n<p style=\"text-align: center; line-height: 1.5em;\">\n    <span style=\"font-family: \u5FAE\u8F6F\u96C5\u9ED1, &quot;Microsoft YaHei&quot;; font-size: 18px;\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E6%B0%91%E5%9B%BD8%E5%B9%B4%E9%93%B6%E5%85%83.jpg\" width=\"250\"/></span>\n</p>\n<p style=\"text-align: center; line-height: 1.5em;\">\n    <span style=\"color: rgb(165, 165, 165); font-size: 18px;\">\u6C11\u56FD8\u5E74\u94F6\u5143</span>\n</p>\n<p style=\"text-align: center; line-height: 1.5em;\">\n    <span style=\"font-family: \u5FAE\u8F6F\u96C5\u9ED1, &quot;Microsoft YaHei&quot;; font-size: 18px;\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E6%B0%91%E5%9B%BD%E5%8D%81%E4%B8%A4%E9%BB%84%E9%87%91-%E5%A4%A7%E9%BB%84%E9%B1%BC.jpg\" width=\"250\"/></span>\n</p>\n<p style=\"text-align: center; line-height: 1.5em;\">\n    <span style=\"color: rgb(165, 165, 165); font-size: 18px;\">\u6C11\u56FD\u5341\u4E24\u9EC4\u91D1-\u5927\u9EC4\u9C7C</span>\n</p>\n<p style=\"text-align: center; line-height: 1.5em;\">\n    <span style=\"font-family: \u5FAE\u8F6F\u96C5\u9ED1, &quot;Microsoft YaHei&quot;; font-size: 18px;\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E6%B0%91%E5%9B%BD%E4%B8%80%E4%B8%A4%E9%BB%84%E9%87%91-%E5%B0%8F%E9%BB%84%E9%B1%BC.jpg\" width=\"250\"/></span>\n</p>\n<p style=\"text-align: center; line-height: 1.5em;\">\n    <span style=\"color: rgb(165, 165, 165); font-size: 18px;\">\u6C11\u56FD\u4E00\u4E24\u9EC4\u91D1-\u5C0F\u9EC4\u9C7C</span>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"color: rgb(165, 165, 165); font-size: 18px;\"><br/></span>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"font-family: \u5FAE\u8F6F\u96C5\u9ED1, &quot;Microsoft YaHei&quot;; font-size: 18px;\">\u5317\u6D0B\u653F\u5E9C\u4E8E1914\u5E74\u63A8\u51FA\u300A\u56FD\u5E01\u6761\u4F8B\u300B\uFF0C\u786E\u7ACB\u94F6\u672C\u4F4D\u8D27\u5E01\u5236\u5EA6\uFF0C\u5B9A\u56FD\u5E01\u201C\u58F9\u5706\u201D\u91CD\u5E93\u5E73\u4E03\u94B1\u4E8C\u5206\uFF0C\u542B\u7EAF\u94F6\u516B\u6210\u4E5D\uFF0C\u5373\u516D\u94B1\u56DB\u5206\uFF0C\uFF0823.9024808\u514B\uFF09\uFF0C\u7EA6\u7B49\u540C\u4E8E\u94F6\u5706\u58F9\u679A\uFF0C\u53C8\u5B9A\u5341\u5206\u4E4B\u4E00\u5143\u4E3A\u4E00\u89D2\uFF0C\u5341\u5206\u4E4B\u4E00\u89D2\u4E3A\u4E00\u5206\u3002\u56FD\u5E01\u7684\u58F9\u5706\u88AB\u94F8\u6210\u516B\u6210\u4E5D\u94F6\u3001\u4E00\u6210\u4E00\u94DC\u7684\u786C\u5E01\uFF0C\u4E0A\u6709\u8881\u4E16\u51EF\u5934\u50CF\uFF0C\u4FD7\u79F0\u201C\u8881\u5927\u5934\u201D\uFF1B\u5E76\u63A8\u51FA\u4EE5\u94F6\u94F8\u9020\u7684\u8F85\u5E01\u3002\u8881\u5927\u5934\u51FA\u73B0\u540E\uFF0C\u9010\u6E10\u53D6\u4EE3\u201C\u9F99\u6D0B\u201D\u3001\u201C\u9E70\u6D0B\u201D\u7B49\u65E7\u6709\u5916\u56FD\u94F6\u5706\uFF0C\u5728\u5168\u4E2D\u56FD\u6D41\u901A\u3002\u5341\u4E2A\u201C\u8881\u5927\u5934\u201D\u539A\u4E00\u5BF8\uFF0C\u662F\u4E3A\u201C\u5934\u5BF8\u201D\u4E4B\u8BED\u6E90\u3002</span>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"color: rgb(165, 165, 165); font-size: 18px;\"><br/></span>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"font-family: \u5FAE\u8F6F\u96C5\u9ED1, &quot;Microsoft YaHei&quot;; font-size: 18px;\">\u6CE8\uFF1A\u6C11\u56FD\u4E03\u5E74\u4E8C\u6708\uFF0C\u9EC4\u91D1\u5341\u4E24\u4EF7429\u5143\uFF08\u94F6\u5143\uFF09\u3002\u6765\u6E90\uFF1A\u300A\u6C11\u56FD\u7ECF\u6D4E\u53F2\u300Bp.517<br/></span>\n</p>\n<p>\n    <br/>\n</p>";

/***/ }),

/***/ 21:
/*!**********************************************************************!*\
  !*** E:/xiaohouye/AncientChinaCurrencyConverter/static/json/qing.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n    <span style=\"font-size: 20px;\"><strong>\u6E05\u671D</strong></span><span style=\"font-size: 18px;\"></span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\">\u516C\u51431636\u5E74-1912\u5E74</span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"font-size: 18px;\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E6%B8%85%E6%9C%9D%E5%9C%B0%E5%9B%BE.jpg\" width=\"250\"/></span>\n</p>\n<p>\n    <br/>\n</p>\n<p>\n    <span style=\"font-size: 18px;\">\u6E05\u671D\u662F\u4E2D\u56FD\u5386\u53F2\u4E0A\u6700\u540E\u4E00\u4E2A\u5C01\u5EFA\u738B\u671D\uFF0C\u5171\u4F20\u5341\u4E8C\u5E1D&nbsp; \uFF0C\u7EDF\u6CBB\u8005\u4E3A\u6EE1\u6D32\u7231\u65B0\u89C9\u7F57\u6C0F\u3002\u4ECE\u52AA\u5C14\u54C8\u8D64\u5EFA\u7ACB\u540E\u91D1\u8D77\uFF0C\u603B\u8BA1296\u5E74\u3002\u4ECE\u7687\u592A\u6781\u6539\u56FD\u53F7\u4E3A\u6E05\u8D77\uFF0C\u56FD\u795A276\u5E74\u3002\u4ECE\u6E05\u5175\u5165\u5173\uFF0C\u5EFA\u7ACB\u5168\u56FD\u6027\u653F\u6743\u7B97\u8D77\u4E3A268\u5E74\u30021616\u5E74\uFF0C\u5EFA\u5DDE\u5973\u771F\u9996\u9886\u52AA\u5C14\u54C8\u8D64\u5EFA\u7ACB\u540E\u91D1\u3002 1636\u5E74\uFF0C\u7687\u592A\u6781\u6539\u56FD\u53F7\u4E3A\u5927\u6E05\uFF0C\u5B9A\u90FD\u5317\u4EAC\u3002</span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"font-size: 18px;\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E6%B8%85%E6%9C%9D%E5%9B%BD%E6%97%97.jpg\" width=\"250\"/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"color: rgb(165, 165, 165); font-size: 18px;\">\u5927\u6E05\u56FD\u65D7\u9EC4\u5E95\u84DD\u9F99\u620F\u7EA2\u73E0\u56FE1889-1912</span>\n</p>\n<p>\n    <span style=\"color: rgb(165, 165, 165); font-size: 18px;\"><br/></span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\">\u4E3B\u8981\u6D41\u901A\u8D27\u5E01\uFF1A\u767D\u94F6\u3001\u94DC\u94B1</span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p style=\"text-align: center;\">\n    <img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E6%B8%85%E5%85%89%E7%BB%AA%E4%BA%94%E5%8D%81%E4%B8%A4%E9%93%B6%E9%94%AD.jpg\" width=\"250\"/>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"color: rgb(165, 165, 165); font-size: 18px;\">\u6E05\u5149\u7EEA\u4E94\u5341\u4E24\u94F6\u952D</span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"color: rgb(165, 165, 165); font-size: 18px;\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E6%B8%85%E4%BB%A3%E7%9B%B4%E9%9A%B6%E5%8D%81%E4%B8%A4.jpg\" width=\"250\"/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"color: rgb(165, 165, 165); font-size: 18px;\">\u6E05\u4EE3\u76F4\u96B6\u5341\u4E24</span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"color: rgb(165, 165, 165); font-size: 18px;\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E6%B8%85%E4%BB%A3%E4%BA%94%E4%B8%A4.jpg\" width=\"250\"/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"color: rgb(165, 165, 165); font-size: 18px;\">\u6E05\u4E94\u4E24<br/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"color: rgb(165, 165, 165); font-size: 18px;\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E6%B8%85%E4%BB%A3%E7%A2%8E%E9%93%B6.jpg\" width=\"250\"/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"color: rgb(165, 165, 165); font-size: 18px;\">\u6E05\u788E\u94F6</span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"color: rgb(165, 165, 165); font-size: 18px;\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E6%B8%85%E4%B9%BE%E9%9A%86%E9%80%9A%E5%AE%9D.jpg\" width=\"250\"/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"color: rgb(165, 165, 165); font-size: 18px;\">\u6E05\u4E7E\u9686\u901A\u5B9D</span>\n</p>\n<p>\n    <span style=\"color: rgb(165, 165, 165); font-size: 18px;\"><br/></span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\">\u6E05\u671D\u8D27\u5E01\u5927\u4F53\u4E0A\u91C7\u767D\u94F6\u4E0E\u94DC\u94B1\u5E76\u7528\u7684\u94F6\u94DC\u53CC\u672C\u4F4D\u5236\uFF0C\u5927\u6570\u7528\u94F6\uFF0C\u5C0F\u6570\u7528\u94B1\uFF0C\u4F46\u94F6\u7684\u5730\u4F4D\u66F4\u89C1\u91CD\u8981\u3002\u5176\u5F62\u5F0F\u5927\u4F53\u53EF\u5206\u4E3A\u56DB\u79CD\uFF1A\u7B2C\u4E00\u662F\u5143\u5B9D\uFF0C\u901A\u79F0\u5B9D\u94F6\uFF0C\u56E0\u5176\u4E3A\u9A6C\u8E44\u5F62\uFF0C\u4E5F\u79F0\u9A6C\u8E44\u94F6\uFF0C\u5176\u91CD\u4E94\u5341\u4E24\uFF1B\u7B2C\u4E8C\u79CD\u53EB\u4E2D\u952D\u6216\u5C0F\u5143\u5B9D\uFF0C\u591A\u9524\u5F62\uFF0C\u4E5F\u6709\u9A6C\u8E44\u5F62\uFF0C\u91CD\u7EA6\u5341\u4E24\uFF1B\u7B2C\u4E09\u79CD\u662F\u5C0F\u951E\u3001\u951E\u5B50\u6216\u79F0\u5C0F\u952D\uFF0C\u591A\u4E3A\u9992\u5934\u72B6\uFF0C\u91CD\u4E00\u3001\u4E8C\u4E24\u5230\u4E09\u3001\u4E94\u4E24\uFF1B\u7B2C\u56DB\u79CD\u662F\u788E\u94F6\uFF0C\u5373\u6563\u788E\u7684\u94F6\u5B50\uFF0C\u91CD\u91CF\u4E0D\u5230\u4E00\u4E24\u3002</span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"font-size: 18px;\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E4%B8%AD%E5%9B%BD%E5%8E%86%E4%BB%A3%E9%93%9C%E9%92%B1.jpg\" width=\"250\"/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"color: rgb(127, 127, 127); font-size: 16px;\">\u4E2D\u56FD\u5386\u4EE3\u94DC\u94B1</span><span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p>\n    <span style=\"color: rgb(127, 127, 127); font-size: 16px;\"><br/></span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\">\u4E00\u679A\u94DC\u5236\u94F8\u5E01\uFF08\u65B9\u5B54\u94B1\uFF09\u4E3A\u4E00\u6587\uFF0C\u4E00\u5343\u6587\u7528\u7EF3\u5B50\u4ECE\u4E2D\u95F4\u7684\u5B54\u91CC\u7A7F\u8D77\u6765\uFF0C\u79F0\u4E3A\u4E00\u8D2F\u6216\u4E00\u540A\u3002\u91D1\u3001\u94F6\u3001\u94B1\uFF08\u6587\uFF09\u95F4\u6BD4\u4EF7\u5404\u671D\u4EE3\u90FD\u6709\u4E0D\u540C\uFF0C\u4F46\u5927\u4F53\u4E0A\u4E3A1\u4E24\u9EC4\u91D1=10\u4E24\u767D\u94F6=10\u8D2F=10000\u6587\u3002</span>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"color: rgb(165, 165, 165); font-size: 18px;\"><br/></span>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"font-family: \u5FAE\u8F6F\u96C5\u9ED1, &quot;Microsoft YaHei&quot;; font-size: 18px;\">\u6CE8\uFF1A\u4E7E\u9686\u4E8C\u5E74\uFF0C\u4EAC\u57CE\uFF0C\u767D\u94F6\u4E00\u4E24\u4EF7800\u6587\u3002\u6765\u6E90\uFF1A\u300A\u4E2D\u56FD\u5386\u4EE3\u7269\u4EF7\u95EE\u9898\u8003\u8FF0\u300Bp.12<br/></span>\n</p>\n<p>\n    <br/>\n</p>";

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 37:
/*!*********************************************************************************************!*\
  !*** E:/xiaohouye/AncientChinaCurrencyConverter/components/jyf-parser/libs/MpHtmlParser.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          将 html 解析为适用于小程序 rich-text 的 DOM 结构
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          github：https://github.com/jin-yufeng/Parser
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          docs：https://jin-yufeng.github.io/Parser
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          author：JinYufeng
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          update：2020/04/13
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */
var cfg = __webpack_require__(/*! ./config.js */ 38),
blankChar = cfg.blankChar,
CssHandler = __webpack_require__(/*! ./CssHandler.js */ 39),_wx$getSystemInfoSync =



wx.getSystemInfoSync(),screenWidth = _wx$getSystemInfoSync.screenWidth,system = _wx$getSystemInfoSync.system;
































var emoji; // emoji 补丁包 https://jin-yufeng.github.io/Parser/#/instructions?id=emoji
var MpHtmlParser = /*#__PURE__*/function () {"use strict";
  function MpHtmlParser(data) {var _this = this;var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};_classCallCheck(this, MpHtmlParser);_defineProperty(this, "getName",



































































































































































































































































































































































































































    function (val) {return _this.xml ? val : val.toLowerCase();});_defineProperty(this, "isClose",








    function () {return _this.data[_this.i] == '>' || _this.data[_this.i] == '/' && _this.data[_this.i + 1] == '>';});_defineProperty(this, "section",
    function () {return _this.data.substring(_this.start, _this.i);});_defineProperty(this, "siblings",
    function () {return _this.STACK.length ? _this.STACK[_this.STACK.length - 1].children : _this.DOM;});this.attrs = {};this.compress = options.compress;this.CssHandler = new CssHandler(options.tagStyle, screenWidth);this.data = data;this.domain = options.domain;this.DOM = [];this.i = this.start = this.audioNum = this.imgNum = this.videoNum = 0;this.protocol = this.domain && this.domain.includes('://') ? this.domain.split('://')[0] : '';this.state = this.Text;this.STACK = [];this.useAnchor = options.useAnchor;this.xml = options.xml;}_createClass(MpHtmlParser, [{ key: "parse", value: function parse() {if (emoji) this.data = emoji.parseEmoji(this.data);for (var c; c = this.data[this.i]; this.i++) {this.state(c);}if (this.state == this.Text) this.setText();while (this.STACK.length) {this.popNode(this.STACK.pop());}if (this.DOM.length) {this.DOM[0].PoweredBy = 'Parser';if (this.title) this.DOM[0].title = this.title;}return this.DOM;} // 设置属性
  }, { key: "setAttr", value: function setAttr() {var name = this.getName(this.attrName);if (cfg.trustAttrs[name]) {if (!this.attrVal) {if (cfg.boolAttrs[name]) this.attrs[name] = 'T';} else if (name == 'src') this.attrs[name] = this.getUrl(this.attrVal.replace(/&amp;/g, '&'));else this.attrs[name] = this.attrVal;}this.attrVal = '';while (blankChar[this.data[this.i]]) {this.i++;}if (this.isClose()) this.setNode();else {this.start = this.i;this.state = this.AttrName;}} // 设置文本节点
  }, { key: "setText", value: function setText() {var back,text = this.section();if (!text) return;text = cfg.onText && cfg.onText(text, function () {return back = true;}) || text;if (back) {this.data = this.data.substr(0, this.start) + text + this.data.substr(this.i);var _j = this.start + text.length;for (this.i = this.start; this.i < _j; this.i++) {this.state(this.data[this.i]);}return;}if (!this.pre) {// 合并空白符
        var tmp = [];for (var _i = text.length, c; c = text[--_i];) {if (!blankChar[c] || !blankChar[tmp[0]] && (c = ' ')) tmp.unshift(c);}text = tmp.join('');if (text == ' ') return;} // 处理实体
      var siblings = this.siblings(),i = -1,j,en;while (1) {if ((i = text.indexOf('&', i + 1)) == -1) break;if ((j = text.indexOf(';', i + 2)) == -1) break;if (text[i + 1] == '#') {en = parseInt((text[i + 2] == 'x' ? '0' : '') + text.substring(i + 2, j));if (!isNaN(en)) text = text.substr(0, i) + String.fromCharCode(en) + text.substring(j + 1);} else {en = text.substring(i + 1, j);if (en == 'nbsp') text = text.substr(0, i) + '\xA0' + text.substr(j + 1); // 解决 &nbsp; 失效
          else if (en != 'lt' && en != 'gt' && en != 'amp' && en != 'ensp' && en != 'emsp' && en != 'quot' && en != 'apos') {i && siblings.push({ type: 'text', text: text.substr(0, i) });siblings.push({ type: 'text', text: "&".concat(en, ";"), en: 1 });text = text.substr(j + 1);i = -1;}}}text && siblings.push({ type: 'text', text: text });} // 设置元素节点
  }, { key: "setNode", value: function setNode() {var node = { name: this.tagName.toLowerCase(), attrs: this.attrs },close = cfg.selfClosingTags[node.name] || this.xml && this.data[this.i] == '/';this.attrs = {};if (!cfg.ignoreTags[node.name]) {this.matchAttr(node);if (!close) {node.children = [];if (node.name == 'pre' && cfg.highlight) {this.remove(node);this.pre = node.pre = true;}this.siblings().push(node);this.STACK.push(node);} else if (!cfg.filter || cfg.filter(node, this) != false) this.siblings().push(node);} else {if (!close) this.remove(node);else if (node.name == 'source') {var parent = this.STACK[this.STACK.length - 1],attrs = node.attrs;if (parent && attrs.src) if (parent.name == 'video' || parent.name == 'audio') parent.attrs.source.push(attrs.src);else {var i,media = attrs.media;if (parent.name == 'picture' && !parent.attrs.src && !(attrs.src.indexOf('.webp') && system.includes('iOS')) && (!media || media.includes('px') && ((i = media.indexOf('min-width')) != -1 && (i = media.indexOf(':', i + 8)) != -1 && screenWidth > parseInt(media.substr(i + 1)) || (i = media.indexOf('max-width')) != -1 && (i = media.indexOf(':', i + 8)) != -1 && screenWidth < parseInt(media.substr(i + 1))))) parent.attrs.src = attrs.src;}} else if (node.name == 'base' && !this.domain) this.domain = node.attrs.href;}if (this.data[this.i] == '/') this.i++;this.start = this.i + 1;this.state = this.Text;} // 移除标签
  }, { key: "remove", value: function remove(node) {var name = node.name,j = this.i;while (1) {if ((this.i = this.data.indexOf('</', this.i + 1)) == -1) {if (name == 'pre' || name == 'svg') this.i = j;else this.i = this.data.length;return;}this.start = this.i += 2;while (!blankChar[this.data[this.i]] && !this.isClose()) {this.i++;}if (this.getName(this.section()) == name) {// 代码块高亮
          if (name == 'pre') {this.data = this.data.substr(0, j + 1) + cfg.highlight(this.data.substring(j + 1, this.i - 5), node.attrs) + this.data.substr(this.i - 5);return this.i = j;} else if (name == 'style') this.CssHandler.getStyle(this.data.substring(j + 1, this.i - 7));else if (name == 'title') this.title = this.data.substring(j + 1, this.i - 7);if ((this.i = this.data.indexOf('>', this.i)) == -1) this.i = this.data.length; // 处理 svg
          if (name == 'svg') {var src = this.data.substring(j, this.i + 1);if (!node.attrs.xmlns) src = ' xmlns="http://www.w3.org/2000/svg"' + src;var i = j;while (this.data[j] != '<') {j--;}src = this.data.substring(j, i) + src;var parent = this.STACK[this.STACK.length - 1];if (node.attrs.width == '100%' && parent && (parent.attrs.style || '').includes('inline')) parent.attrs.style = 'width:300px;max-width:100%;' + parent.attrs.style;this.siblings().push({ name: 'img', attrs: { src: 'data:image/svg+xml;utf8,' + src.replace(/#/g, '%23'), ignore: 'T' } });}return;}}} // 处理属性
  }, { key: "matchAttr", value: function matchAttr(node) {var attrs = node.attrs,style = this.CssHandler.match(node.name, attrs, node) + (attrs.style || ''),styleObj = {};if (attrs.id) {if (this.compress & 1) attrs.id = void 0;else if (this.useAnchor) this.bubble();}if (this.compress & 2 && attrs.class) attrs.class = void 0;switch (node.name) {case 'img':if (attrs['data-src']) {attrs.src = attrs.src || attrs['data-src'];attrs['data-src'] = void 0;}if (attrs.src && !attrs.ignore) {if (this.bubble()) attrs.i = (this.imgNum++).toString();else attrs.ignore = 'T';}break;case 'a':case 'ad':this.bubble();break;case 'font':if (attrs.color) {styleObj['color'] = attrs.color;attrs.color = void 0;}if (attrs.face) {styleObj['font-family'] = attrs.face;attrs.face = void 0;}if (attrs.size) {var size = parseInt(attrs.size);if (size < 1) size = 1;else if (size > 7) size = 7;var map = ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'];styleObj['font-size'] = map[size - 1];attrs.size = void 0;}break;case 'video':case 'audio':if (!attrs.id) attrs.id = node.name + ++this["".concat(node.name, "Num")];else this["".concat(node.name, "Num")]++;if (node.name == 'video') {if (attrs.width) {style = "width:".concat(parseFloat(attrs.width) + (attrs.width.includes('%') ? '%' : 'px'), ";").concat(style);attrs.width = void 0;}if (attrs.height) {style = "height:".concat(parseFloat(attrs.height) + (attrs.height.includes('%') ? '%' : 'px'), ";").concat(style);attrs.height = void 0;}if (this.videoNum > 3) node.lazyLoad = true;}attrs.source = [];if (attrs.src) attrs.source.push(attrs.src);if (!attrs.controls && !attrs.autoplay) console.warn("\u5B58\u5728\u6CA1\u6709 controls \u5C5E\u6027\u7684 ".concat(node.name, " \u6807\u7B7E\uFF0C\u53EF\u80FD\u5BFC\u81F4\u65E0\u6CD5\u64AD\u653E"), node);this.bubble();break;case 'td':case 'th':if (attrs.colspan || attrs.rowspan) for (var k = this.STACK.length, item; item = this.STACK[--k];) {if (item.name == 'table') {item.c = void 0;break;}}}if (attrs.align) {styleObj['text-align'] = attrs.align;attrs.align = void 0;} // 压缩 style
      var styles = style.replace(/&quot;/g, '"').replace(/&amp;/g, '&').split(';');style = '';for (var i = 0, len = styles.length; i < len; i++) {var info = styles[i].split(':');if (info.length < 2) continue;var _key = info[0].trim().toLowerCase(),_value = info.slice(1).join(':').trim();if (_value.includes('-webkit') || _value.includes('-moz') || _value.includes('-ms') || _value.includes('-o') || _value.includes('safe')) style += ";".concat(_key, ":").concat(_value);else if (!styleObj[_key] || _value.includes('import') || !styleObj[_key].includes('import')) styleObj[_key] = _value;}if (node.name == 'img' && parseInt(styleObj.width || attrs.width) > screenWidth) styleObj.height = 'auto';for (var key in styleObj) {var value = styleObj[key];if (key.includes('flex') || key == 'order' || key == 'self-align') node.c = 1; // 填充链接
        if (value.includes('url')) {var j = value.indexOf('(');if (j++ != -1) {while (value[j] == '"' || value[j] == "'" || blankChar[value[j]]) {j++;}value = value.substr(0, j) + this.getUrl(value.substr(j));}} // 转换 rpx
        else if (value.includes('rpx')) value = value.replace(/[0-9.]+\s*rpx/g, function ($) {return parseFloat($) * screenWidth / 750 + 'px';});else if (key == 'white-space' && value.includes('pre')) this.pre = node.pre = true;style += ";".concat(key, ":").concat(value);}style = style.substr(1);if (style) attrs.style = style;} // 节点出栈处理
  }, { key: "popNode", value: function popNode(node) {// 空白符处理
      if (node.pre) {node.pre = this.pre = void 0;for (var i = this.STACK.length; i--;) {if (this.STACK[i].pre) this.pre = true;}}if (node.name == 'head' || cfg.filter && cfg.filter(node, this) == false) return this.siblings().pop();var attrs = node.attrs; // 替换一些标签名
      if (node.name == 'picture') {node.name = 'img';if (!attrs.src && (node.children[0] || '').name == 'img') attrs.src = node.children[0].attrs.src;if (attrs.src && !attrs.ignore) attrs.i = (this.imgNum++).toString();return node.children = void 0;}if (cfg.blockTags[node.name]) node.name = 'div';else if (!cfg.trustTags[node.name]) node.name = 'span'; // 处理列表
      if (node.c) {if (node.name == 'ul') {var floor = 1;for (var _i2 = this.STACK.length; _i2--;) {if (this.STACK[_i2].name == 'ul') floor++;}if (floor != 1) for (var _i3 = node.children.length; _i3--;) {node.children[_i3].floor = floor;}} else if (node.name == 'ol') {for (var _i4 = 0, num = 1, child; child = node.children[_i4++];) {if (child.name == 'li') {child.type = 'ol';child.num = function (num, type) {if (type == 'a') return String.fromCharCode(97 + (num - 1) % 26);if (type == 'A') return String.fromCharCode(65 + (num - 1) % 26);if (type == 'i' || type == 'I') {num = (num - 1) % 99 + 1;var one = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],ten = ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],res = (ten[Math.floor(num / 10) - 1] || '') + (one[num % 10 - 1] || '');if (type == 'i') return res.toLowerCase();return res;}return num;}(num++, attrs.type) + '.';}}}} // 处理表格的边框
      if (node.name == 'table') {var padding = attrs.cellpadding,spacing = attrs.cellspacing,border = attrs.border;if (node.c) {this.bubble();if (!padding) padding = 2;if (!spacing) spacing = 2;}if (border) attrs.style = "border:".concat(border, "px solid gray;").concat(attrs.style || '');if (spacing) attrs.style = "border-spacing:".concat(spacing, "px;").concat(attrs.style || '');if (border || padding) (function f(ns) {for (var i = 0, n; n = ns[i]; i++) {if (n.name == 'th' || n.name == 'td') {if (border) n.attrs.style = "border:".concat(border, "px solid gray;").concat(n.attrs.style);if (padding) n.attrs.style = "padding:".concat(padding, "px;").concat(n.attrs.style);} else f(n.children || []);}})(node.children);}this.CssHandler.pop && this.CssHandler.pop(node); // 自动压缩
      if (node.name == 'div' && !Object.keys(attrs).length) {var siblings = this.siblings();if (node.children.length == 1 && node.children[0].name == 'div') siblings[siblings.length - 1] = node.children[0];}} // 工具函数
  }, { key: "bubble", value: function bubble() {for (var i = this.STACK.length, item; item = this.STACK[--i];) {if (cfg.richOnlyTags[item.name]) {if (item.name == 'table' && !Object.hasOwnProperty.call(item, 'c')) item.c = 1;return false;}item.c = 1;}return true;} }, { key: "getUrl", value: function getUrl(url) {if (url[0] == '/') {if (url[1] == '/') url = this.protocol + ':' + url;else if (this.domain) url = this.domain + url;} else if (this.domain && url.indexOf('data:') != 0 && !url.includes('://')) url = this.domain + '/' + url;return url;} }, { key: "Text", // 状态机
    value: function Text(c) {if (c == '<') {var next = this.data[this.i + 1],isLetter = function isLetter(c) {return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z';};if (isLetter(next)) {this.setText();this.start = this.i + 1;this.state = this.TagName;} else if (next == '/') {this.setText();if (isLetter(this.data[++this.i + 1])) {this.start = this.i + 1;this.state = this.EndTag;} else this.Comment();} else if (next == '!') {this.setText();this.Comment();}}
    } }, { key: "Comment", value: function Comment()
    {
      var key;
      if (this.data.substring(this.i + 2, this.i + 4) == '--') key = '-->';else
      if (this.data.substring(this.i + 2, this.i + 9) == '[CDATA[') key = ']]>';else
      key = '>';
      if ((this.i = this.data.indexOf(key, this.i + 2)) == -1) this.i = this.data.length;else
      this.i += key.length - 1;
      this.start = this.i + 1;
      this.state = this.Text;
    } }, { key: "TagName", value: function TagName(
    c) {
      if (blankChar[c]) {
        this.tagName = this.section();
        while (blankChar[this.data[this.i]]) {this.i++;}
        if (this.isClose()) this.setNode();else
        {
          this.start = this.i;
          this.state = this.AttrName;
        }
      } else if (this.isClose()) {
        this.tagName = this.section();
        this.setNode();
      }
    } }, { key: "AttrName", value: function AttrName(
    c) {
      var blank = blankChar[c];
      if (blank) {
        this.attrName = this.section();
        c = this.data[this.i];
      }
      if (c == '=') {
        if (!blank) this.attrName = this.section();
        while (blankChar[this.data[++this.i]]) {;}
        this.start = this.i--;
        this.state = this.AttrValue;
      } else if (blank) this.setAttr();else
      if (this.isClose()) {
        this.attrName = this.section();
        this.setAttr();
      }
    } }, { key: "AttrValue", value: function AttrValue(
    c) {
      if (c == '"' || c == "'") {
        this.start++;
        if ((this.i = this.data.indexOf(c, this.i + 1)) == -1) return this.i = this.data.length;
        this.attrVal = this.section();
        this.i++;
      } else {
        for (; !blankChar[this.data[this.i]] && !this.isClose(); this.i++) {;}
        this.attrVal = this.section();
      }
      this.setAttr();
    } }, { key: "EndTag", value: function EndTag(
    c) {
      if (blankChar[c] || c == '>' || c == '/') {
        var name = this.getName(this.section());
        for (var i = this.STACK.length; i--;) {
          if (this.STACK[i].name == name) break;}
        if (i != -1) {
          var node;
          while ((node = this.STACK.pop()).name != name) {;}
          this.popNode(node);
        } else if (name == 'p' || name == 'br')
        this.siblings().push({
          name: name,
          attrs: {} });

        this.i = this.data.indexOf('>', this.i);
        this.start = this.i + 1;
        if (this.i == -1) this.i = this.data.length;else
        this.state = this.Text;
      }
    } }]);return MpHtmlParser;}();

module.exports = MpHtmlParser;

/***/ }),

/***/ 38:
/*!***************************************************************************************!*\
  !*** E:/xiaohouye/AncientChinaCurrencyConverter/components/jyf-parser/libs/config.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* 配置文件 */

var canIUse = wx.canIUse('editor'); // 高基础库标识，用于兼容

module.exports = {
  // 过滤器函数
  filter: null,
  // 代码高亮函数
  highlight: null,
  // 文本处理函数
  onText: null,
  blankChar: makeMap(' ,\xA0,\t,\r,\n,\f'),
  // 块级标签，将被转为 div
  blockTags: makeMap('address,article,aside,body,caption,center,cite,footer,header,html,nav,section' + (

  canIUse ? '' :

  ',pre')),
  // 将被移除的标签
  ignoreTags: makeMap(
  'area,base,basefont,canvas,command,frame,input,isindex,keygen,link,map,meta,param,script,source,style,svg,textarea,title,track,use,wbr' + (

  canIUse ? ',rp' : '') +


  ',embed,iframe'),


  // 只能被 rich-text 显示的标签
  richOnlyTags: makeMap('a,colgroup,fieldset,legend,picture,table' + (

  canIUse ? ',bdi,bdo,caption,rt,ruby' : '')),


  // 自闭合的标签
  selfClosingTags: makeMap(
  'area,base,basefont,br,col,circle,ellipse,embed,frame,hr,img,input,isindex,keygen,line,link,meta,param,path,polygon,rect,source,track,use,wbr'),

  // 信任的属性
  trustAttrs: makeMap(
  'align,alt,app-id,author,autoplay,border,cellpadding,cellspacing,class,color,colspan,controls,data-src,dir,face,height,href,id,ignore,loop,media,muted,name,path,poster,rowspan,size,span,src,start,style,type,unit-id,width,xmlns'),

  // bool 型的属性
  boolAttrs: makeMap('autoplay,controls,ignore,loop,muted'),
  // 信任的标签
  trustTags: makeMap(
  'a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,ul,video' + (

  canIUse ? ',bdi,bdo,caption,pre,rt,ruby' : '')),





  // 默认的标签样式
  userAgentStyles: {
    address: 'font-style:italic',
    big: 'display:inline;font-size:1.2em',
    blockquote: 'background-color:#f6f6f6;border-left:3px solid #dbdbdb;color:#6c6c6c;padding:5px 0 5px 10px',
    caption: 'display:table-caption;text-align:center',
    center: 'text-align:center',
    cite: 'font-style:italic',
    dd: 'margin-left:40px',
    img: 'max-width:100%',
    mark: 'background-color:yellow',
    picture: 'max-width:100%',
    pre: 'font-family:monospace;white-space:pre;overflow:scroll',
    s: 'text-decoration:line-through',
    small: 'display:inline;font-size:0.8em',
    u: 'text-decoration:underline' } };



function makeMap(str) {
  var map = {},
  list = str.split(',');
  for (var i = list.length; i--;) {
    map[list[i]] = true;}
  return map;
}

/***/ }),

/***/ 39:
/*!*******************************************************************************************!*\
  !*** E:/xiaohouye/AncientChinaCurrencyConverter/components/jyf-parser/libs/CssHandler.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          解析和匹配 Css 的选择器
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          github：https://github.com/jin-yufeng/Parser
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          docs：https://jin-yufeng.github.io/Parser
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          author：JinYufeng
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          update：2020/03/15
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */
var cfg = __webpack_require__(/*! ./config.js */ 38);var
CssHandler = /*#__PURE__*/function () {"use strict";
  function CssHandler(tagStyle) {var _this = this;_classCallCheck(this, CssHandler);_defineProperty(this, "getStyle",





    function (data) {return _this.styles = new CssParser(data, _this.styles).parse();});var styles = Object.assign({}, cfg.userAgentStyles);for (var item in tagStyle) {styles[item] = (styles[item] ? styles[item] + ';' : '') + tagStyle[item];}this.styles = styles;}_createClass(CssHandler, [{ key: "match", value: function match(
    name, attrs) {
      var tmp,matched = (tmp = this.styles[name]) ? tmp + ';' : '';
      if (attrs.class) {
        var items = attrs.class.split(' ');
        for (var i = 0, item; item = items[i]; i++) {
          if (tmp = this.styles['.' + item])
          matched += tmp + ';';}
      }
      if (tmp = this.styles['#' + attrs.id])
      matched += tmp + ';';
      return matched;
    } }]);return CssHandler;}();

module.exports = CssHandler;var
CssParser = /*#__PURE__*/function () {"use strict";
  function CssParser(data, init) {var _this2 = this;_classCallCheck(this, CssParser);_defineProperty(this, "section",












    function () {return _this2.data.substring(_this2.start, _this2.i);});_defineProperty(this, "isLetter",
    function (c) {return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z';});this.data = data;this.floor = 0;this.i = 0;this.list = [];this.res = init;this.state = this.Space;}_createClass(CssParser, [{ key: "parse", value: function parse() {for (var c; c = this.data[this.i]; this.i++) {this.state(c);}return this.res;} }, { key: "Space",
    // 状态机
    value: function Space(c) {
      if (c == '.' || c == '#' || this.isLetter(c)) {
        this.start = this.i;
        this.state = this.Name;
      } else if (c == '/' && this.data[this.i + 1] == '*')
      this.Comment();else
      if (!cfg.blankChar[c] && c != ';')
      this.state = this.Ignore;
    } }, { key: "Comment", value: function Comment()
    {
      this.i = this.data.indexOf('*/', this.i) + 1;
      if (!this.i) this.i = this.data.length;
      this.state = this.Space;
    } }, { key: "Ignore", value: function Ignore(
    c) {
      if (c == '{') this.floor++;else
      if (c == '}' && ! --this.floor) this.state = this.Space;
    } }, { key: "Name", value: function Name(
    c) {
      if (cfg.blankChar[c]) {
        this.list.push(this.section());
        this.state = this.NameSpace;
      } else if (c == '{') {
        this.list.push(this.section());
        this.Content();
      } else if (c == ',') {
        this.list.push(this.section());
        this.Comma();
      } else if (!this.isLetter(c) && (c < '0' || c > '9') && c != '-' && c != '_')
      this.state = this.Ignore;
    } }, { key: "NameSpace", value: function NameSpace(
    c) {
      if (c == '{') this.Content();else
      if (c == ',') this.Comma();else
      if (!cfg.blankChar[c]) this.state = this.Ignore;
    } }, { key: "Comma", value: function Comma()
    {
      while (cfg.blankChar[this.data[++this.i]]) {;}
      if (this.data[this.i] == '{') this.Content();else
      {
        this.start = this.i--;
        this.state = this.Name;
      }
    } }, { key: "Content", value: function Content()
    {
      this.start = ++this.i;
      if ((this.i = this.data.indexOf('}', this.i)) == -1) this.i = this.data.length;
      var content = this.section();
      for (var i = 0, item; item = this.list[i++];) {
        if (this.res[item]) this.res[item] += ';' + content;else
        this.res[item] = content;}
      this.list = [];
      this.state = this.Space;
    } }]);return CssParser;}();

/***/ }),

/***/ 4:
/*!*************************************************************!*\
  !*** E:/xiaohouye/AncientChinaCurrencyConverter/pages.json ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 70:
/*!********************************************************************************!*\
  !*** E:/xiaohouye/AncientChinaCurrencyConverter/components/uni-icons/icons.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  'contact': "\uE100",
  'person': "\uE101",
  'personadd': "\uE102",
  'contact-filled': "\uE130",
  'person-filled': "\uE131",
  'personadd-filled': "\uE132",
  'phone': "\uE200",
  'email': "\uE201",
  'chatbubble': "\uE202",
  'chatboxes': "\uE203",
  'phone-filled': "\uE230",
  'email-filled': "\uE231",
  'chatbubble-filled': "\uE232",
  'chatboxes-filled': "\uE233",
  'weibo': "\uE260",
  'weixin': "\uE261",
  'pengyouquan': "\uE262",
  'chat': "\uE263",
  'qq': "\uE264",
  'videocam': "\uE300",
  'camera': "\uE301",
  'mic': "\uE302",
  'location': "\uE303",
  'mic-filled': "\uE332",
  'speech': "\uE332",
  'location-filled': "\uE333",
  'micoff': "\uE360",
  'image': "\uE363",
  'map': "\uE364",
  'compose': "\uE400",
  'trash': "\uE401",
  'upload': "\uE402",
  'download': "\uE403",
  'close': "\uE404",
  'redo': "\uE405",
  'undo': "\uE406",
  'refresh': "\uE407",
  'star': "\uE408",
  'plus': "\uE409",
  'minus': "\uE410",
  'circle': "\uE411",
  'checkbox': "\uE411",
  'close-filled': "\uE434",
  'clear': "\uE434",
  'refresh-filled': "\uE437",
  'star-filled': "\uE438",
  'plus-filled': "\uE439",
  'minus-filled': "\uE440",
  'circle-filled': "\uE441",
  'checkbox-filled': "\uE442",
  'closeempty': "\uE460",
  'refreshempty': "\uE461",
  'reload': "\uE462",
  'starhalf': "\uE463",
  'spinner': "\uE464",
  'spinner-cycle': "\uE465",
  'search': "\uE466",
  'plusempty': "\uE468",
  'forward': "\uE470",
  'back': "\uE471",
  'left-nav': "\uE471",
  'checkmarkempty': "\uE472",
  'home': "\uE500",
  'navigate': "\uE501",
  'gear': "\uE502",
  'paperplane': "\uE503",
  'info': "\uE504",
  'help': "\uE505",
  'locked': "\uE506",
  'more': "\uE507",
  'flag': "\uE508",
  'home-filled': "\uE530",
  'gear-filled': "\uE532",
  'info-filled': "\uE534",
  'help-filled': "\uE535",
  'more-filled': "\uE537",
  'settings': "\uE560",
  'list': "\uE562",
  'bars': "\uE563",
  'loop': "\uE565",
  'paperclip': "\uE567",
  'eye': "\uE568",
  'arrowup': "\uE580",
  'arrowdown': "\uE581",
  'arrowleft': "\uE582",
  'arrowright': "\uE583",
  'arrowthinup': "\uE584",
  'arrowthindown': "\uE585",
  'arrowthinleft': "\uE586",
  'arrowthinright': "\uE587",
  'pulldown': "\uE588",
  'closefill': "\uE589",
  'sound': "\uE590",
  'scan': "\uE612" };exports.default = _default;

/***/ }),

/***/ 74:
/*!**********************************************************************!*\
  !*** E:/xiaohouye/AncientChinaCurrencyConverter/static/json/ming.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n    <strong><span style=\"font-size: 20px;\">\u660E\u671D</span></strong>\n</p>\n<p>\n    <span style=\"font-size: 18px;\">\u516C\u51431368\u5E74-1644\u5E74</span>\n</p>\n<p>\n    <br/>\n</p>\n<p style=\"text-align: center;\">\n    <img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E6%98%8E%E6%9C%9D%E5%9C%B0%E5%9B%BE.jpg\" width=\"250\"/>\n</p>\n<p>\n    <br/>\n</p>\n<p>\n    <span style=\"font-size: 18px;\">\u660E\u671D\u5386\u7ECF\u5341\u4E8C\u4E16\u3001\u5341\u516D\u4F4D\u7687\u5E1D\uFF0C\u56FD\u795A\u4E8C\u767E\u4E03\u5341\u516D\u5E74\u3002\u5F00\u56FD\u7687\u5E1D\u4E3A\u660E\u592A\u7956\u6731\u5143\u748B\uFF0C\u521D\u671F\u5EFA\u90FD\u5357\u4EAC\uFF0C\u660E\u6210\u7956\u6731\u68E3\u65F6\u671F\u5B9A\u90FD\u5317\u4EAC\u3002</span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\">\u4E3B\u8981\u6D41\u901A\u8D27\u5E01\uFF1A\u767D\u94F6\u3001\u94DC\u94B1</span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"font-size: 18px;\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E6%98%8E%E5%98%89%E9%9D%96%E4%B8%89%E5%8D%81%E5%85%AD%E5%B9%B4%E5%86%85%E6%88%B7%E9%83%A8%E6%8B%BE%E4%B8%A4%E9%87%91%E9%94%AD.jpg\" width=\"250\"/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"color: rgb(127, 127, 127);\">\u660E\u5609\u9756\u4E09\u5341\u516D\u5E74\u5185\u6237\u90E8\u5341\u4E24\u91D1\u952D</span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"font-size: 18px;\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E6%98%8E%E4%B8%87%E5%8E%86%E4%BA%94%E5%8D%81%E4%B8%A4.jpg\" width=\"250\"/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"color: rgb(127, 127, 127);\">\u660E\u4E07\u5386\u4E94\u5341\u4E24\u94F6\u952D</span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"color: rgb(127, 127, 127);\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E6%98%8E%E4%B8%87%E5%8E%86%E9%80%9A%E5%AE%9D2.jpg\" width=\"250\"/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"color: rgb(127, 127, 127);\">\u660E\u4E07\u5386\u901A\u5B9D</span>\n</p>\n<p>\n    <span style=\"color: rgb(127, 127, 127);\"><br/></span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\">\u660E\u4EE3\u4EE5\u767D\u94F6\u4F5C\u4E3A\u6CD5\u5B9A\u7684\u6D41\u901A\u8D27\u5E01\uFF0C\u4E00\u822C\u4EA4\u6613\u5927\u6570\u7528\u94F6\uFF0C\u5C0F\u6570\u7528\u94B1\uFF0C\u767D\u94F6\u548C\u94DC\u94B1\u7EC4\u6210\u4E86\u8D27\u5E01\u4E3B\u4F53\u3002\u56E0\u907F\u8BB3\u7687\u5E1D\u6731\u5143\u748B\u4E4B&quot;\u5143&quot;\u5B57\uFF0C\u660E\u4EE3\u6240\u6709\u94B1\u5E01\u7EDF\u79F0\u901A\u5B9D\uFF0C\u5FCC\u7528\u5143\u5B9D\u3002</span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"font-size: 18px;\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E4%B8%AD%E5%9B%BD%E5%8E%86%E4%BB%A3%E9%93%9C%E9%92%B1.jpg\" width=\"250\"/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"color: rgb(127, 127, 127); font-size: 16px;\">\u4E2D\u56FD\u5386\u4EE3\u94DC\u94B1</span><span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p>\n    <span style=\"color: rgb(127, 127, 127); font-size: 16px;\"><br/></span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\">\u4E00\u679A\u94DC\u5236\u94F8\u5E01\uFF08\u65B9\u5B54\u94B1\uFF09\u4E3A\u4E00\u6587\uFF0C\u4E00\u5343\u6587\u7528\u7EF3\u5B50\u4ECE\u4E2D\u95F4\u7684\u5B54\u91CC\u7A7F\u8D77\u6765\uFF0C\u79F0\u4E3A\u4E00\u8D2F\u6216\u4E00\u540A\u3002\u91D1\u3001\u94F6\u3001\u94B1\uFF08\u6587\uFF09\u95F4\u6BD4\u4EF7\u5404\u671D\u4EE3\u90FD\u6709\u4E0D\u540C\uFF0C\u4F46\u5927\u4F53\u4E0A\u4E3A1\u4E24\u9EC4\u91D1=10\u4E24\u767D\u94F6=10\u8D2F=10000\u6587\u3002</span>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"color: rgb(165, 165, 165); font-size: 18px;\"><br/></span>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"font-family: \u5FAE\u8F6F\u96C5\u9ED1, &quot;Microsoft YaHei&quot;; font-size: 18px;\">\u6CE8\uFF1A\u4E07\u5386\u4E2D\u540E\u671F\uFF0C\u9EC4\u91D1\u4E00\u4E24\u4EF77-8\u4E24\u767D\u94F6\u3001700-800\u6587\uFF0C\u6765\u6E90\uFF1A\u300A\u660E\u795E\u5B97\u5B9E\u5F55\u300B\u5377\u4E00\u4E03\u4E09\uFF1B\u65E5\u77E5\u5F55\u5377\u4E00\u4E00\u300A\u9EC4\u91D1\u300B<br/></span>\n</p>\n<p>\n    <br/>\n</p>";

/***/ }),

/***/ 82:
/*!**********************************************************************!*\
  !*** E:/xiaohouye/AncientChinaCurrencyConverter/static/json/yuan.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n    <strong><span style=\"font-size: 20px;\">\u5143\u671D</span></strong>\n</p>\n<p>\n    <span style=\"font-size: 18px;\">\u516C\u51431271\u5E74-1368\u5E74</span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"font-size: 18px;\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E5%85%83%E6%9C%9D%E5%9C%B0%E5%9B%BE.jpg\" width=\"250\"/></span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\">\u5143\u671D\u662F\u4E2D\u56FD\u5386\u53F2\u4E0A\u9996\u6B21\u7531\u5C11\u6570\u6C11\u65CF\u5EFA\u7ACB\u7684\u5927\u4E00\u7EDF\u738B\u671D\uFF0C\u7EDF\u6CBB\u8005\u4E3A\u8499\u53E4\u5B5B\u513F\u53EA\u65A4\u6C0F\u3002\u5B9A\u90FD\u5927\u90FD\uFF08\u4ECA\u5317\u4EAC\uFF09\uFF0C\u4F20\u4E94\u4E16\u5341\u4E00\u5E1D\uFF0C\u4ECE1206\u5E74\u6210\u5409\u601D\u6C57\u5EFA\u7ACB\u8499\u53E4\u653F\u6743\u59CB\u4E3A162\u5E74\uFF0C\u4ECE\u5FFD\u5FC5\u70C8\u5B9A\u56FD\u53F7\u5143\u5F00\u59CB\u5386\u65F698\u5E74\u3002\u5143\u671D\u9000\u51FA\u4E2D\u539F\u540E\u7684\u5317\u5143\u653F\u6743\u4E00\u76F4\u6301\u7EED\u52301402\u5E74\u3002</span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\">\u4E3B\u8981\u6D41\u901A\u8D27\u5E01\uFF1A\u5B9D\u949E\u3001\u4E2D\u7EDF\u949E</span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"font-size: 18px;\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E5%85%83%E6%9C%9D%E4%B8%AD%E7%BB%9F%E5%85%83%E5%AE%9D%E4%BA%A4%E9%92%9E.jpg\" width=\"250\"/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"color: rgb(127, 127, 127);\">\u5143\u671D\u4E2D\u7EDF\u5143\u5B9D\u4EA4\u949E-\u6B63\u9762</span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"color: rgb(127, 127, 127);\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E5%85%83%E6%9C%9D%E4%B8%AD%E7%BB%9F%E5%85%83%E5%AE%9D%E4%BA%A4%E9%92%9E-%E5%8F%8D%E9%9D%A2.jpg\" width=\"250\"/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"color: rgb(127, 127, 127);\">\u5143\u671D\u4E2D\u7EDF\u5143\u5B9D\u4EA4\u949E-\u53CD\u9762</span>\n</p>\n<p>\n    <span style=\"color: rgb(127, 127, 127);\"><br/></span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\">\u5143\u671D\u4E3A\u4E86\u52A0\u5F3A\u5BF9\u7ECF\u6D4E\u7684\u7EDF\u5236\uFF0C\u4EE5\u4F7F\u7528\u7EB8\u5E01\u4E3A\u4E3B\uFF0C\u94F8\u9020\u94B1\u5E01\u6BD4\u5176\u4ED6\u671D\u4EE3\u4E3A\u5C11\u3002\u4ECE\u5143\u4E16\u7956\u5FFD\u5FC5\u70C8\u5F00\u59CB\uFF0C\u53D1\u884C\u8FC7\u201C\u4E2D\u7EDF\u949E\u201D\u3001\u201C\u81F3\u5143\u949E\u201D\u548C\u201C\u81F3\u6B63\u949E\u201D\uFF0C\u8FD9\u4E9B\u5747\u4EE5\u5F53\u65F6\u7684\u5E74\u53F7\uFF08\u4E2D\u7EDF\u3001\u81F3\u5143\u3001\u81F3\u6B63\uFF09\u6765\u547D\u540D\uFF0C\u5176\u4E2D\u5E01\u503C\u6700\u7A33\u5B9A\u7684\u662F\u4E2D\u7EDF\u949E\uFF0C\u800C\u6D41\u901A\u65F6\u95F4\u6700\u957F\u7684\u662F\u81F3\u5143\u949E\u3002</span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"font-size: 18px;\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E4%B8%AD%E5%9B%BD%E5%8E%86%E4%BB%A3%E9%93%9C%E9%92%B1.jpg\" width=\"250\"/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"color: rgb(127, 127, 127); font-size: 16px;\">\u4E2D\u56FD\u5386\u4EE3\u94DC\u94B1</span><span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p>\n    <span style=\"color: rgb(127, 127, 127); font-size: 16px;\"><br/></span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\">\u4E00\u679A\u94DC\u5236\u94F8\u5E01\uFF08\u65B9\u5B54\u94B1\uFF09\u4E3A\u4E00\u6587\uFF0C\u4E00\u5343\u6587\u7528\u7EF3\u5B50\u4ECE\u4E2D\u95F4\u7684\u5B54\u91CC\u7A7F\u8D77\u6765\uFF0C\u79F0\u4E3A\u4E00\u8D2F\u6216\u4E00\u540A\u3002\u91D1\u3001\u94F6\u3001\u94B1\uFF08\u6587\uFF09\u95F4\u6BD4\u4EF7\u5404\u671D\u4EE3\u90FD\u6709\u4E0D\u540C\uFF0C\u4F46\u5927\u4F53\u4E0A\u4E3A1\u4E24\u9EC4\u91D1=10\u4E24\u767D\u94F6=10\u8D2F=10000\u6587\u3002</span>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"color: rgb(165, 165, 165); font-size: 18px;\"><br/></span>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"font-family: \u5FAE\u8F6F\u96C5\u9ED1, &quot;Microsoft YaHei&quot;; font-size: 18px;\">\u6CE8\uFF1A\u9EC4\u91D1\u4E00\u4E24\u4EF710\u4E24\u767D\u94F6\uFF0C\u6765\u6E90\uFF1A\u636E\u300A\u5143\u53F2\xB7\u98DF\u8D27\u5FD7\u300B\u8F7D\u91D1\u6BCF\u4E24\u6362\u81F3\u5143\u94F6\u949E10\u4E24\u3001\u94F61\u4E24\u6298\u6210\u3002<br/></span>\n</p>";

/***/ }),

/***/ 83:
/*!*************************************************************************!*\
  !*** E:/xiaohouye/AncientChinaCurrencyConverter/static/json/nansong.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n    <span style=\"font-size: 20px;\"><strong>\u5357\u5B8B</strong></span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\">\u516C\u51431127\u5E74-1276\u5E74</span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"font-size: 18px;\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E5%AE%8B%E5%8D%97%E5%AE%8B%E5%9C%B0%E5%9B%BE.jpg\" width=\"250\"/></span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\">\u516C\u51431127\u5E74\uFF0C\u9756\u5EB7\u4E4B\u53D8\u540E\uFF0C\u5B8B\u9AD8\u5B97\u8D75\u6784\u5B9A\u90FD\u4E8E\u5357\u4EAC\u5E94\u5929\u5E9C\uFF08\u4ECA\u6CB3\u5357\u5546\u4E18\uFF09\u5EFA\u5E99\u79F0\u5E1D\uFF0C\u56FD\u53F7\u4ECD\u4E3A\u5B8B\uFF0C\u53F2\u79F0\u5357\u5B8B\u3002\u516C\u51431138\u5E74\uFF0C\u5B8B\u5BA4\u8FC1\u90FD\u4E34\u5B89\u5E9C\uFF08\u4ECA\u6D59\u6C5F\u676D\u5DDE\uFF09\u3002\u5171\u4F20\u4E94\u4E16\u4E5D\u5E1D\uFF0C\u4EAB\u56FD\u4E00\u767E\u56DB\u5341\u4E5D\u5E74\u3002</span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\">\u4E3B\u8981\u6D41\u901A\u8D27\u5E01\uFF1A\u4EA4\u5B50\u3001\u4F1A\u5B50</span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"font-size: 18px;\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E5%AE%8B%E5%8D%97%E5%AE%8B%E4%BC%9A%E5%AD%90.jpg\" width=\"250\"/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"color: rgb(127, 127, 127);\">\u5357\u5B8B\u4F1A\u5B50</span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"color: rgb(127, 127, 127);\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E5%AE%8B%E5%8D%97%E5%AE%8B%E4%BA%A4%E5%AD%90.jpg\" width=\"250\"/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"color: rgb(127, 127, 127);\">\u5357\u5B8B\u4EA4\u5B50<br/></span>\n</p>\n<p>\n    <span style=\"color: rgb(127, 127, 127);\"><br/></span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\">\u5357\u5B8B\u65F6\u671F\uFF0C\u7EB8\u5E01\u5927\u91CF\u6D41\u901A\uFF0C\u9010\u6E10\u4EE3\u66FF\u94DC\u94B1\u6210\u4E3A\u4E3B\u8981\u4EA4\u6362\u624B\u6BB5\u3002\u5357\u5B8B\u7684\u7EB8\u5E01\u5206\u4E3A\u201C\u4EA4\u5B50\u201D\u548C\u201C\u4F1A\u5B50\u201D\u3002\u4EA4\u5B50\u4E3B\u8981\u5728\u56DB\u5DDD\u5730\u533A\u4F7F\u7528\uFF0C\u4F1A\u5B50\u5219\u5206\u4E3A\u201C\u4E1C\u5357\u4F1A\u5B50\u201D\u3001\u201C\u4E24\u6DEE\u4F1A\u5B50\u201D\u548C\u201C\u6E56\u5317\u4F1A\u5B50\u201D\u4E09\u79CD\u3002\u4E0D\u8FC7\uFF0C\u5357\u5B8B\u540E\u671F\u56E0\u4E3A\u5927\u91CF\u53D1\u884C\u7EB8\u5E01\uFF0C\u9020\u6210\u8D27\u5E01\u8D2C\u503C\uFF0C\u7269\u4EF7\u98DE\u6DA8\u3002</span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"font-size: 18px;\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E4%B8%AD%E5%9B%BD%E5%8E%86%E4%BB%A3%E9%93%9C%E9%92%B1.jpg\" width=\"250\"/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"color: rgb(127, 127, 127); font-size: 16px;\">\u4E2D\u56FD\u5386\u4EE3\u94DC\u94B1</span><span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p>\n    <span style=\"color: rgb(127, 127, 127); font-size: 16px;\"><br/></span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\">\u4E00\u679A\u94DC\u5236\u94F8\u5E01\uFF08\u65B9\u5B54\u94B1\uFF09\u4E3A\u4E00\u6587\uFF0C\u4E00\u5343\u6587\u7528\u7EF3\u5B50\u4ECE\u4E2D\u95F4\u7684\u5B54\u91CC\u7A7F\u8D77\u6765\uFF0C\u79F0\u4E3A\u4E00\u8D2F\u6216\u4E00\u540A\u3002\u91D1\u3001\u94F6\u3001\u94B1\uFF08\u6587\uFF09\u95F4\u6BD4\u4EF7\u5404\u671D\u4EE3\u90FD\u6709\u4E0D\u540C\uFF0C\u4F46\u5927\u4F53\u4E0A\u4E3A1\u4E24\u9EC4\u91D1=10\u4E24\u767D\u94F6=10\u8D2F=10000\u6587\u3002</span>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"color: rgb(165, 165, 165); font-size: 18px;\"><br/></span>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"font-family: \u5FAE\u8F6F\u96C5\u9ED1, &quot;Microsoft YaHei&quot;; font-size: 18px;\">\u6CE8\uFF1A\u9756\u5EB7\u4E8C\u5E74\uFF0C\u6C74\u4EAC\uFF0C\u9EC4\u91D11\u4E24\u4EF712.8\u4E24\u767D\u94F6\u300132000\u6587\u94B1\u3002\u6765\u6E90\uFF1A\u300A\u4E2D\u56FD\u5386\u4EE3\u7269\u4EF7\u95EE\u9898\u8003\u8FF0\u300Bp.6<br/></span>\n</p>\n<p>\n    <br/>\n</p>";

/***/ }),

/***/ 84:
/*!*************************************************************************!*\
  !*** E:/xiaohouye/AncientChinaCurrencyConverter/static/json/beisong.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n    <strong><span style=\"font-size: 18px;\">\u5317\u5B8B</span></strong>\n</p>\n<p>\n    <span style=\"font-size: 18px;\">\u516C\u5143960\u5E74-1127\u5E74</span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"font-size: 18px;\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E5%AE%8B%E5%8C%97%E5%AE%8B%E5%9C%B0%E5%9B%BE.jpg\" width=\"250\"/></span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\">\u5317\u5B8B\u662F\u4E2D\u56FD\u5386\u53F2\u4E0A\u7EE7\u4E94\u4EE3\u5341\u56FD\u4E4B\u540E\u7684\u671D\u4EE3\uFF0C\u4F20\u4E5D\u4F4D\u7687\u5E1D\uFF0C\u4EAB\u56FD167\u5E74\u3002\u5F00\u56FD\u7687\u5E1D\u5B8B\u592A\u7956\u8D75\u5321\u80E4\uFF0C\u5B9A\u90FD\u4E1C\u4EAC\u5F00\u5C01\u5E9C\uFF08\u6CB3\u5357\u5F00\u5C01\uFF09</span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\">\u4E3B\u8981\u6D41\u901A\u8D27\u5E01\uFF1A\u9EC4\u91D1\u3001\u767D\u94F6\u3001\u94DC\u94B1</span>\n</p>\n<p>\n    <br/>\n</p>\n<p style=\"text-align: center;\">\n    <img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E5%AE%8B%E5%8C%97%E5%AE%8B%E4%BA%94%E5%8D%81%E4%B8%A4%E9%93%B6%E9%94%AD.jpg\" width=\"250\"/>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"color: rgb(127, 127, 127);\">\u5317\u5B8B\u4E94\u5341\u4E24\u94F6\u952D</span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"color: rgb(127, 127, 127);\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E5%AE%8B%E5%8C%97%E5%AE%8B%E9%9D%96%E5%BA%B7%E6%AC%BE%E5%AE%98%E5%88%B6%E5%8D%81%E4%B8%A4%E9%87%91%E9%94%AD.jpg\" width=\"250\"/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"color: rgb(127, 127, 127);\">\u5317\u5B8B\u9756\u5EB7\u6B3E\u5B98\u5236\u5341\u4E24\u91D1\u952D</span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"color: rgb(127, 127, 127);\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E5%AE%8B%E5%8C%97%E5%AE%8B%E9%93%9C%E9%92%B1.jpg\" width=\"250\"/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"color: rgb(127, 127, 127);\">\u5317\u5B8B\u94DC\u94B1</span>\n</p>\n<p>\n    <span style=\"color: rgb(127, 127, 127);\"><br/></span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\">\u5B8B\u4EE3\u5546\u4E1A\u7E41\u76DB\uFF0C\u901A\u884C\u7684\u8D27\u5E01\u6709\u94DC\u94B1\u3001\u767D\u94F6\u4E0E\u9EC4\u91D1\u3002\u9EC4\u91D1\u662F\u7528\u4EE5\u4FDD\u503C\u3001\u8DE8\u6D32\u8D38\u6613\u7684\u6700\u4F73\u9996\u9009\uFF0C\u767D\u94F6\u662F\u4F5C\u4E3A\u4E2D\u8FDC\u8DDD\u79BB\u4EA4\u6613\u901A\u8D27\uFF0C\u94DC\u94B1\u5219\u662F\u4F5C\u4E3A\u96F6\u94B1\u4E8E\u5728\u5730\u5E02\u96C6\u3001\u505A\u5C0F\u989D\u4EA4\u6613\u4F7F\u7528\u3002</span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"font-size: 18px;\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E4%B8%AD%E5%9B%BD%E5%8E%86%E4%BB%A3%E9%93%9C%E9%92%B1.jpg\" width=\"250\"/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"color: rgb(127, 127, 127); font-size: 16px;\">\u4E2D\u56FD\u5386\u4EE3\u94DC\u94B1</span><span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p>\n    <span style=\"color: rgb(127, 127, 127); font-size: 16px;\"><br/></span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\">\u4E00\u679A\u94DC\u5236\u94F8\u5E01\uFF08\u65B9\u5B54\u94B1\uFF09\u4E3A\u4E00\u6587\uFF0C\u4E00\u5343\u6587\u7528\u7EF3\u5B50\u4ECE\u4E2D\u95F4\u7684\u5B54\u91CC\u7A7F\u8D77\u6765\uFF0C\u79F0\u4E3A\u4E00\u8D2F\u6216\u4E00\u540A\u3002\u91D1\u3001\u94F6\u3001\u94B1\uFF08\u6587\uFF09\u95F4\u6BD4\u4EF7\u5404\u671D\u4EE3\u90FD\u6709\u4E0D\u540C\uFF0C\u4F46\u5927\u4F53\u4E0A\u4E3A1\u4E24\u9EC4\u91D1=10\u4E24\u767D\u94F6=10\u8D2F=10000\u6587\u3002</span>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"color: rgb(165, 165, 165); font-size: 18px;\"><br/></span>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"font-family: \u5FAE\u8F6F\u96C5\u9ED1, &quot;Microsoft YaHei&quot;; font-size: 18px;\">\u6CE8\uFF1A\u5317\u5B8B\u771F\u5B97\u5927\u4E2D\u7965\u7B26\u516B\u5E74\uFF0C\u6C74\u4EAC\uFF0C\u9EC4\u91D11\u4E24\u4EF76.3\u4E24\u767D\u94F6\u300110000\u6587\u94B1\u3002\u6765\u6E90\uFF1A\u300A\u4E2D\u56FD\u5386\u4EE3\u7269\u4EF7\u95EE\u9898\u8003\u8FF0\u300Bp.5<br/></span>\n</p>";

/***/ }),

/***/ 85:
/*!**********************************************************************!*\
  !*** E:/xiaohouye/AncientChinaCurrencyConverter/static/json/tang.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p style=\"line-height: 1.5em;\">\n    <strong><span style=\"font-size: 18px;\">\u5510\u671D</span></strong>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"font-size: 18px;\">\u516C\u5143618\u5E74-907\u5E74</span>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p style=\"text-align: center; line-height: 1.5em;\">\n    <span style=\"font-size: 18px;\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E5%94%90%E6%9C%9D%E5%9C%B0%E5%9B%BE.jpg\" width=\"250\"/></span>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"font-size: 18px;\">\u5510\u671D\u662F\u7EE7\u968B\u671D\u4E4B\u540E\u7684\u5927\u4E00\u7EDF\u4E2D\u539F\u738B\u671D\uFF0C\u5171\u5386\u4E8C\u5341\u4E00\u5E1D\uFF0C\u4EAB\u56FD\u4E8C\u767E\u516B\u5341\u4E5D\u5E74\u3002617\u5E74\u5510\u9AD8\u7956\u674E\u6E0A\u4E8E\u664B\u9633\u8D77\u5175\uFF0C\u6B21\u5E74\u79F0\u5E1D\u5EFA\u7ACB\u5510\u671D\uFF0C\u4EE5\u957F\u5B89\u4E3A\u4EAC\u5E08\u3002</span>\n</p>\n<p>\n    <br/>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"font-size: 18px;\">\u4E3B\u8981\u6D41\u901A\u8D27\u5E01\uFF1A\u94DC\u94B1\u3001\u5E1B</span>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p style=\"text-align: center; line-height: 1.5em;\">\n    <span style=\"font-size: 18px;\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E5%94%90%E5%BC%80%E5%85%83%E9%80%9A%E5%AE%9D.jpg\" width=\"250\"/></span>\n</p>\n<p style=\"text-align: center; line-height: 1.5em;\">\n    <span style=\"color: rgb(127, 127, 127);\">\u5510\u5F00\u5143\u901A\u5B9D</span>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"color: rgb(127, 127, 127);\"><br/></span>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"font-size: 18px;\">\u5510\u6B66\u5FB7\u56DB\u5E74\uFF08621\u5E74\uFF09\u4E03\u6708\uFF0C\u201C\u5E9F\u4E94\u94E2\u94B1\uFF0C\u884C\u5F00\u5143\u901A\u5B9D\u94B1\uFF0C\u5F84\u516B\u5206\uFF0C\u91CD\u4E8C\u94E2\u56DB\u7D6B\uFF0C\u79EF\u5341\u6587\u91CD\u4E00\u4E24\uFF0C\u4E00\u5343\u6587\u91CD\u516D\u65A4\u56DB\u4E24\u201D\uFF0C\u786E\u7ACB\u56FD\u5BB6\u94F8\u5E01\u7684\u6CD5\u5E01\u5730\u4F4D\u3002\u4E0E\u6B64\u540C\u65F6\uFF0C\u53C8\u7EE7\u627F\u9B4F\u664B\u5357\u5317\u671D\u65F6\u671F\u4EE5\u7EE2\u5E1B\u4E3A\u8D27\u5E01\u7684\u4F20\u7EDF\uFF0C\u5B9E\u884C\u201C\u94B1\u5E1B\u517C\u884C\u201D\u7684\u8D27\u5E01\u5236\u5EA6\u2014\u2014\u94B1\u5373\u94DC\u94B1\uFF0C\u5E1B\u5219\u662F\u4E1D\u7EC7\u54C1\u7684\u603B\u79F0\uFF0C\u5305\u62EC\u9526\u3001\u7EE3\u3001\u7EEB\u3001\u7F57\u3001\u7EE2\u3001\u7D41\u3001\u7EEE\u3001\u7F23\u3001\u4337\u7B49\uFF0C\u5B9E\u9645\u4E0A\u662F\u4E00\u79CD\u4EE5\u5B9E\u7269\u8D27\u5E01\u548C\u91D1\u5C5E\u8D27\u5E01\u517C\u800C\u884C\u4E4B\u7684\u591A\u5143\u7684\u8D27\u5E01\u5236\u5EA6\u3002</span>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p style=\"line-height: 1.5em;text-align: center;\">\n    <span style=\"font-size: 18px;\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E4%B8%AD%E5%9B%BD%E5%8E%86%E4%BB%A3%E9%93%9C%E9%92%B1.jpg\" width=\"250\"/></span>\n</p>\n<p style=\"line-height: 1.5em;text-align: center;\">\n    <span style=\"color: rgb(127, 127, 127); font-size: 16px;\">\u4E2D\u56FD\u5386\u4EE3\u94DC\u94B1</span><span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"color: rgb(127, 127, 127); font-size: 16px;\"><br/></span>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"font-size: 18px;\">\u4E00\u679A\u94DC\u5236\u94F8\u5E01\uFF08\u65B9\u5B54\u94B1\uFF09\u4E3A\u4E00\u6587\uFF0C\u4E00\u5343\u6587\u7528\u7EF3\u5B50\u4ECE\u4E2D\u95F4\u7684\u5B54\u91CC\u7A7F\u8D77\u6765\uFF0C\u79F0\u4E3A\u4E00\u8D2F\u6216\u4E00\u540A\u3002\u91D1\u3001\u94F6\u3001\u94B1\uFF08\u6587\uFF09\u95F4\u6BD4\u4EF7\u5404\u671D\u4EE3\u90FD\u6709\u4E0D\u540C\uFF0C\u4F46\u5927\u4F53\u4E0A\u4E3A1\u4E24\u9EC4\u91D1=10\u4E24\u767D\u94F6=10\u8D2F=10000\u6587\u3002</span>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"color: rgb(165, 165, 165); font-size: 18px;\"><br/></span>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"font-family: \u5FAE\u8F6F\u96C5\u9ED1, &quot;Microsoft YaHei&quot;; font-size: 18px;\">\u6CE8\uFF1A\u968B\u5510\u65F6\uFF0C\u9EC4\u91D11\u4E24\u4EF76250\u6587\u94B1\u3002\u6765\u6E90\uFF1A\u300A\u590F\u4FAF\u9633\u7B97\u7ECF\u300B\u5377\u4E0B<br/></span>\n</p>";

/***/ }),

/***/ 86:
/*!*************************************************************************!*\
  !*** E:/xiaohouye/AncientChinaCurrencyConverter/static/json/donghan.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n    <strong><span style=\"font-size: 20px;\">\u4E1C\u6C49</span></strong>\n</p>\n<p>\n    <span style=\"font-size: 18px;\">\u516C\u514325\u5E74-220\u5E74</span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"font-size: 18px;\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E6%B1%89%E4%B8%9C%E6%B1%89%E5%9C%B0%E5%9B%BE.jpg\" width=\"250\"/></span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\">\u65B0\u671D\u672B\u5E74\u7206\u53D1\u7EFF\u6797\u8D64\u7709\u8D77\u4E49\uFF0C\u6C49\u5149\u6B66\u5E1D\u5218\u79C0\u8D81\u52BF\u800C\u8D77\u3002\u516C\u514325\u5E74\uFF0C\u5218\u79C0\u79F0\u5E1D\uFF0C\u5B9A\u90FD\u96D2\u9633\uFF08\u4ECA\u6CB3\u5357\u6D1B\u9633\uFF09\uFF0C\u5EF6\u7EED\u201C\u6C49\u201D\u7684\u56FD\u53F7\uFF0C\u53F2\u79F0\u5149\u6B66\u4E2D\u5174\u3002\u4F20\u516B\u4E16\u5171\u5341\u56DB\u5E1D\uFF0C\u4EAB\u56FD\u4E00\u767E\u4E5D\u5341\u4E94\u5E74\uFF0C\u4E0E\u897F\u6C49\u7EDF\u79F0\u6C49\u671D\u3002</span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\">\u4E3B\u8981\u6D41\u901A\u8D27\u5E01\uFF1A\u4E94\u94E2\u94B1</span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"font-size: 18px;\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E6%B1%89%E9%87%91%E4%BA%94%E9%93%A2%E9%92%B1.jpg\" width=\"250\"/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"color: rgb(127, 127, 127);\">\u6C49\u91D1\u4E94\u94E2\u94B1</span>\n</p>\n<p>\n    <span style=\"color: rgb(127, 127, 127);\"><br/></span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\">\u4E94\u94E2\u662F\u4E00\u79CD\u4E2D\u56FD\u53E4\u94DC\u5E01\uFF0C\u94B1\u91CD\u4E94\u94E2\uFF0C\u4E0A\u6709\u201C\u4E94\u94E2\u201D\u4E8C\u5B57\uFF0C\u6545\u540D\u3002\u521D\u94F8\u4E8E\u897F\u6C49\u6C49\u6B66\u5E1D\u5143\u72E9\u4E94\u5E74\uFF08\u516C\u5143\u524D118\u5E74\uFF09\uFF0C\u4E1C\u6C49\u3001\u8700\u6C49\u3001\u9B4F\u3001\u664B\u3001\u5357\u9F50\u3001\u6881\u3001\u9648\u3001\u5317\u9B4F\u548C\u968B\u90FD\u6709\u94F8\u9020\uFF0C\u91CD\u91CF\u5F62\u5236\u5927\u5C0F\u4E0D\u4E00\u3002\u5510\u671D\u6B66\u5FB7\u56DB\u5E74\uFF08\u516C\u5143621\u5E74\uFF09\u5E9F\u6B62\u3002\u4F46\u65E7\u4E94\u94E2\u4ECD\u7136\u5728\u6C11\u95F4\u6D41\u901A\u3002\u4E94\u94E2\u8DE8\u5EA6\u5927\u3001\u662F\u4E2D\u56FD\u5386\u53F2\u4E0A\u6570\u91CF\u6700\u591A\u3001\u6D41\u901A\u65F6\u95F4\u6700\u4E45\u7684\u94B1\u5E01\u3002</span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"font-size: 18px;\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E4%B8%AD%E5%9B%BD%E5%8E%86%E4%BB%A3%E9%93%9C%E9%92%B1.jpg\" width=\"250\"/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"color: rgb(127, 127, 127); font-size: 16px;\">\u4E2D\u56FD\u5386\u4EE3\u94DC\u94B1</span><span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p>\n    <span style=\"color: rgb(127, 127, 127); font-size: 16px;\"><br/></span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\">\u4E00\u679A\u94DC\u5236\u94F8\u5E01\uFF08\u65B9\u5B54\u94B1\uFF09\u4E3A\u4E00\u6587\uFF0C\u4E00\u5343\u6587\u7528\u7EF3\u5B50\u4ECE\u4E2D\u95F4\u7684\u5B54\u91CC\u7A7F\u8D77\u6765\uFF0C\u79F0\u4E3A\u4E00\u8D2F\u6216\u4E00\u540A\u3002\u91D1\u3001\u94F6\u3001\u94B1\uFF08\u6587\uFF09\u95F4\u6BD4\u4EF7\u5404\u671D\u4EE3\u90FD\u6709\u4E0D\u540C\uFF0C\u4F46\u5927\u4F53\u4E0A\u4E3A1\u4E24\u9EC4\u91D1=10\u4E24\u767D\u94F6=10\u8D2F=10000\u6587\u3002</span>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"color: rgb(165, 165, 165); font-size: 18px;\"><br/></span>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"font-family: \u5FAE\u8F6F\u96C5\u9ED1, &quot;Microsoft YaHei&quot;; font-size: 18px;\">\u6CE8\uFF1A\u9B4F\u664B\u65F6\uFF0C\u9EC4\u91D11\u4E24\u4EF76250\u94B1\u3002\u6765\u6E90\uFF1A\u300A\u5B59\u5B50\u7B97\u7ECF\u300B\u5377\u4E0B<br/></span>\n</p>";

/***/ }),

/***/ 87:
/*!***********************************************************************!*\
  !*** E:/xiaohouye/AncientChinaCurrencyConverter/static/json/xihan.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n    <span style=\"font-size: 20px;\"><strong>\u897F\u6C49</strong></span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\">\u516C\u5143\u524D202\u5E74-\u516C\u51438\u5E74</span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"font-size: 18px;\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E6%B1%89%E8%A5%BF%E6%B1%89%E5%9C%B0%E5%9B%BE.jpg\" width=\"250\"/></span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\">\u79E6\u672B\u5929\u4E0B\u63ED\u7AFF\u800C\u8D77\uFF0C\u7ECF\u8FC7\u695A\u6C49\u4E4B\u4E89\uFF0C\u5218\u90A6\u51FB\u8D25\u9879\u7FBD\uFF0C\u516C\u5143\u524D202\u5E74\u6C49\u9AD8\u7956\u5218\u90A6\u5728\u5C71\u4E1C\u5B9A\u9676\u79F0\u5E1D\uFF0C\u56FD\u53F7\u6C49\uFF0C\u6682\u90FD\u6D1B\u9633\uFF0C\u4E09\u4E2A\u6708\u540E\u5B9A\u90FD\u957F\u5B89\u3002\u5171\u5386\u5341\u4E8C\u5E1D \uFF0C\u4EAB\u56FD\u4E8C\u767E\u4E00\u5341\u5E74\uFF0C\u53C8\u79F0\u4E3A\u897F\u6C49\u3002</span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\">\u4E3B\u8981\u6D41\u901A\u8D27\u5E01\uFF1A\u4E94\u94E2\u94B1</span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"font-size: 18px;\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E6%B1%89%E8%A5%BF%E6%B1%89%E6%B1%89%E6%AD%A6%E5%B8%9D%E4%BA%94%E9%93%A2.jpg\" width=\"250\"/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"color: rgb(127, 127, 127);\">\u897F\u6C49\u6C49\u6B66\u5E1D\u4E94\u94E2</span>\n</p>\n<p>\n    <span style=\"color: rgb(127, 127, 127);\"><br/></span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\">\u4E94\u94E2\u662F\u4E00\u79CD\u4E2D\u56FD\u53E4\u94DC\u5E01\uFF0C\u94B1\u91CD\u4E94\u94E2\uFF0C\u4E0A\u6709\u201C\u4E94\u94E2\u201D\u4E8C\u5B57\uFF0C\u6545\u540D\u3002\u521D\u94F8\u4E8E\u897F\u6C49\u6C49\u6B66\u5E1D\u5143\u72E9\u4E94\u5E74\uFF08\u516C\u5143\u524D118\u5E74\uFF09\uFF0C\u4E1C\u6C49\u3001\u8700\u6C49\u3001\u9B4F\u3001\u664B\u3001\u5357\u9F50\u3001\u6881\u3001\u9648\u3001\u5317\u9B4F\u548C\u968B\u90FD\u6709\u94F8\u9020\uFF0C\u91CD\u91CF\u5F62\u5236\u5927\u5C0F\u4E0D\u4E00\u3002\u5510\u671D\u6B66\u5FB7\u56DB\u5E74\uFF08\u516C\u5143621\u5E74\uFF09\u5E9F\u6B62\u3002\u4F46\u65E7\u4E94\u94E2\u4ECD\u7136\u5728\u6C11\u95F4\u6D41\u901A\u3002\u4E94\u94E2\u8DE8\u5EA6\u5927\u3001\u662F\u4E2D\u56FD\u5386\u53F2\u4E0A\u6570\u91CF\u6700\u591A\u3001\u6D41\u901A\u65F6\u95F4\u6700\u4E45\u7684\u94B1\u5E01\u3002</span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"font-size: 18px;\"><img src=\"https://ancientcurrencyconverter-1256354221.cos.ap-shanghai.myqcloud.com/img/%E4%B8%AD%E5%9B%BD%E5%8E%86%E4%BB%A3%E9%93%9C%E9%92%B1.jpg\" width=\"250\"/></span>\n</p>\n<p style=\"text-align: center;\">\n    <span style=\"color: rgb(127, 127, 127); font-size: 16px;\">\u4E2D\u56FD\u5386\u4EE3\u94DC\u94B1</span><span style=\"font-size: 18px;\"><br/></span>\n</p>\n<p>\n    <span style=\"color: rgb(127, 127, 127); font-size: 16px;\"><br/></span>\n</p>\n<p>\n    <span style=\"font-size: 18px;\">\u4E00\u679A\u94DC\u5236\u94F8\u5E01\uFF08\u65B9\u5B54\u94B1\uFF09\u4E3A\u4E00\u6587\uFF0C\u4E00\u5343\u6587\u7528\u7EF3\u5B50\u4ECE\u4E2D\u95F4\u7684\u5B54\u91CC\u7A7F\u8D77\u6765\uFF0C\u79F0\u4E3A\u4E00\u8D2F\u6216\u4E00\u540A\u3002\u91D1\u3001\u94F6\u3001\u94B1\uFF08\u6587\uFF09\u95F4\u6BD4\u4EF7\u5404\u671D\u4EE3\u90FD\u6709\u4E0D\u540C\uFF0C\u4F46\u5927\u4F53\u4E0A\u4E3A1\u4E24\u9EC4\u91D1=10\u4E24\u767D\u94F6=10\u8D2F=10000\u6587\u3002</span>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"color: rgb(165, 165, 165); font-size: 18px;\"><br/></span>\n</p>\n<p style=\"line-height: 1.5em;\">\n    <span style=\"font-family: \u5FAE\u8F6F\u96C5\u9ED1, &quot;Microsoft YaHei&quot;; font-size: 18px;\">\u6CE8\uFF1A\u897F\u6C49\u65F6\uFF0C\u9EC4\u91D11\u4E24\u4EF7615\u94B1\u3002\u6765\u6E90\uFF1A\u300A\u4E5D\u7AE0\u7B97\u672F\u300B\u5377\u516D\u3001\u4E03<br/></span>\n</p>";

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map