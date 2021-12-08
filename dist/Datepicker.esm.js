/*
* @sum.cumo/vue-datepicker v3.2.0
* (c) 2018-2021 sum.cumo GmbH
* Released under the Apache-2.0 License.
*/
class Language {
  // eslint-disable-next-line max-params
  constructor(language, months, monthsAbbr, days, rtl = false, ymd = false, yearSuffix = '') {
    this.language = language;
    this.months = months;
    this.monthsAbbr = monthsAbbr;
    this.days = days;
    this.rtl = rtl;
    this.ymd = ymd;
    this.yearSuffix = yearSuffix;
  }
  /* eslint-disable no-underscore-dangle */


  get language() {
    return this._language;
  }

  set language(language) {
    if (typeof language !== 'string') {
      throw new TypeError('Language must be a string');
    }

    this._language = language;
  }

  get months() {
    return this._months;
  }

  set months(months) {
    if (months.length !== 12) {
      throw new RangeError(`There must be 12 months for ${this.language} language`);
    }

    this._months = months;
  }

  get monthsAbbr() {
    return this._monthsAbbr;
  }

  set monthsAbbr(monthsAbbr) {
    if (monthsAbbr.length !== 12) {
      throw new RangeError(`There must be 12 abbreviated months for ${this.language} language`);
    }

    this._monthsAbbr = monthsAbbr;
  }

  get days() {
    return this._days;
  }

  set days(days) {
    if (days.length !== 7) {
      throw new RangeError(`There must be 7 days for ${this.language} language`);
    }

    this._days = days;
  }

  getDaysStartingOn(firstDayOfWeek) {
    const firstDays = this._days.slice(firstDayOfWeek);

    const lastDays = this._days.slice(0, firstDayOfWeek);

    return firstDays.concat(lastDays);
  }

  getMonthByAbbrName(name) {
    const monthValue = this._monthsAbbr.findIndex(month => month === name) + 1;
    return monthValue < 10 ? `0${monthValue}` : `${monthValue}`;
  }

  getMonthByName(name) {
    const monthValue = this._months.findIndex(month => month === name) + 1;
    return monthValue < 10 ? `0${monthValue}` : `${monthValue}`;
  }

}

var en = new Language('English', ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);

var calendarSlots = ['beforeCalendarHeaderDay', 'calendarFooterDay', 'beforeCalendarHeaderMonth', 'calendarFooterMonth', 'beforeCalendarHeaderYear', 'calendarFooterYear', 'nextIntervalBtn', 'prevIntervalBtn'];

const getParsedDate = ({
  formatStr,
  dateStr,
  translation
}) => {
  const splitter = formatStr.match(/-|\/|\s|\./) || ['-'];
  const df = formatStr.split(splitter[0]);
  const ds = dateStr.split(splitter[0]);
  const ymd = [new Date().getFullYear(), '01', '01'];

  for (let i = 0; i < df.length; i += 1) {
    if (/yyyy/i.test(df[i])) {
      ymd[0] = ds[i];
    } else if (/mmmm/i.test(df[i])) {
      ymd[1] = translation.getMonthByName(ds[i]);
    } else if (/mmm/i.test(df[i])) {
      ymd[1] = translation.getMonthByAbbrName(ds[i]);
    } else if (/mm/i.test(df[i])) {
      ymd[1] = ds[i];
    } else if (/m/i.test(df[i])) {
      ymd[1] = ds[i];
    } else if (/dd/i.test(df[i])) {
      ymd[2] = ds[i];
    } else if (/d/i.test(df[i])) {
      const tmp = ds[i].replace(/st|rd|nd|th/g, '');
      ymd[2] = tmp < 10 ? `0${tmp}` : `${tmp}`;
    }
  }

  return ymd;
};

const utils = {
  /**
   * @type {Boolean}
   */
  useUtc: false,

  /**
   * Returns the full year, using UTC or not
   * @param {Date} date
   */
  getFullYear(date) {
    return this.useUtc ? date.getUTCFullYear() : date.getFullYear();
  },

  /**
   * Returns the month, using UTC or not
   * @param {Date} date
   */
  getMonth(date) {
    return this.useUtc ? date.getUTCMonth() : date.getMonth();
  },

  /**
   * Returns the number of days in the month, using UTC or not
   * @param {Date} date
   */
  getDaysInMonth(date) {
    return this.daysInMonth(this.getFullYear(date), this.getMonth(date));
  },

  /**
   * Returns the date, using UTC or not
   * @param {Date} date
   */
  getDate(date) {
    return this.useUtc ? date.getUTCDate() : date.getDate();
  },

  /**
   * Returns the day, using UTC or not
   * @param {Date} date
   */
  getDay(date) {
    return this.useUtc ? date.getUTCDay() : date.getDay();
  },

  /**
   * Returns the hours, using UTC or not
   * @param {Date} date
   */
  getHours(date) {
    return this.useUtc ? date.getUTCHours() : date.getHours();
  },

  /**
   * Returns the minutes, using UTC or not
   * @param {Date} date
   */
  getMinutes(date) {
    return this.useUtc ? date.getUTCMinutes() : date.getMinutes();
  },

  /**
   * Sets the full year, using UTC or not
   * @param {Date} date
   * @param {String, Number} value
   */
  setFullYear(date, value) {
    return this.useUtc ? date.setUTCFullYear(value) : date.setFullYear(value);
  },

  /**
   * Sets the month, using UTC or not
   * @param {Date} date
   * @param {String, Number} value
   */
  setMonth(date, value) {
    return this.useUtc ? date.setUTCMonth(value) : date.setMonth(value);
  },

  /**
   * Sets the date, using UTC or not
   * @param {Date} date
   * @param {String, Number} value
   */
  setDate(date, value) {
    return this.useUtc ? date.setUTCDate(value) : date.setDate(value);
  },

  /**
   * Check if date1 is equivalent to date2, without comparing the time
   * @see https://stackoverflow.com/a/6202196/4455925
   * @param {Date} date1
   * @param {Date} date2
   */
  compareDates(date1, date2) {
    const d1 = new Date(date1.valueOf());
    const d2 = new Date(date2.valueOf());
    this.resetDateTime(d1);
    this.resetDateTime(d2);
    return d1.valueOf() === d2.valueOf();
  },

  /**
   * Validates a date object
   * @param {Date} date - an object instantiated with the new Date constructor
   * @return {Boolean}
   */
  isValidDate(date) {
    if (Object.prototype.toString.call(date) !== '[object Date]') {
      return false;
    }

    return !Number.isNaN(date.valueOf());
  },

  /**
   * Return abbreviated week day name
   * @param {Date} date
   * @param {Array} days
   * @return {String}
   */
  getDayNameAbbr(date, days) {
    if (typeof date !== 'object') {
      throw TypeError('Invalid Type');
    }

    return days[this.getDay(date)];
  },

  /**
   * Return day number from abbreviated week day name
   * @param {String} abbr
   * @return {Number}
   */
  getDayFromAbbr(abbr) {
    for (let i = 0; i < en.days.length; i += 1) {
      if (abbr.toLowerCase() === en.days[i].toLowerCase()) {
        return i;
      }
    }

    throw TypeError('Invalid week day');
  },

  /**
   * Return name of the month
   * @param {Number|Date} month
   * @param {Array} months
   * @return {String}
   */
  getMonthName(month, months) {
    if (!months) {
      throw Error('missing 2nd parameter Months array');
    }

    if (typeof month === 'object') {
      return months[this.getMonth(month)];
    }

    if (typeof month === 'number') {
      return months[month];
    }

    throw TypeError('Invalid type');
  },

  /**
   * Return an abbreviated version of the month
   * @param {Number|Date} month
   * @param {Array} monthsAbbr
   * @return {String}
   */
  getMonthNameAbbr(month, monthsAbbr) {
    if (!monthsAbbr) {
      throw Error('missing 2nd paramter Months array');
    }

    if (typeof month === 'object') {
      return monthsAbbr[this.getMonth(month)];
    }

    if (typeof month === 'number') {
      return monthsAbbr[month];
    }

    throw TypeError('Invalid type');
  },

  /**
   * Alternative get total number of days in month
   * @param {Number} year
   * @param {Number} month
   * @return {Number}
   */
  // eslint-disable-next-line complexity
  daysInMonth(year, month) {
    if (/8|3|5|10/.test(month)) {
      return 30;
    }

    if (month === 1) {
      return !(year % 4) && year % 100 || !(year % 400) ? 29 : 28;
    }

    return 31;
  },

  /**
   * Get nth suffix for date
   * @param {Number} day
   * @return {String}
   */
  // eslint-disable-next-line complexity
  getNthSuffix(day) {
    switch (day) {
      case 1:
      case 21:
      case 31:
        return 'st';

      case 2:
      case 22:
        return 'nd';

      case 3:
      case 23:
        return 'rd';

      default:
        return 'th';
    }
  },

  /**
   * Formats date object
   * @param {Date} date
   * @param {String} formatStr
   * @param {Object} translation
   * @return {String}
   */
  formatDate(date, formatStr, translation = en) {
    const year = this.getFullYear(date);
    const month = this.getMonth(date) + 1;
    const day = this.getDate(date);
    const matches = {
      dd: `0${day}`.slice(-2),
      d: day,
      yyyy: year,
      yy: String(year).slice(2),
      MMMM: this.getMonthName(this.getMonth(date), translation.months),
      MMM: this.getMonthNameAbbr(this.getMonth(date), translation.monthsAbbr),
      MM: `0${month}`.slice(-2),
      M: month,
      o: this.getNthSuffix(this.getDate(date)),
      E: this.getDayNameAbbr(date, translation.days)
    };
    const REGEX_FORMAT = /y{4}|y{2}|M{1,4}(?![aäe])|d{1,2}|o{1}|E{1}(?![eéi])/g;
    return formatStr.replace(REGEX_FORMAT, match => matches[match] || match);
  },

  /**
   * makes date parseable
   * to use with international dates
   * @param {String} dateStr
   * @param {String|Function} formatStr
   * @param {Object} translation
   * @param {Function} parser
   * @return {Date | String}
   */
  // eslint-disable-next-line max-params,complexity,max-statements
  parseDate(dateStr, formatStr, translation = en, parser = null) {
    if (!(dateStr && formatStr)) {
      return dateStr;
    }

    if (typeof formatStr === 'function') {
      if (!parser || typeof parser !== 'function') {
        throw new Error('Parser need to be a function if you are using a custom formatter');
      }

      return parser(dateStr);
    }

    const ymd = getParsedDate({
      formatStr,
      dateStr,
      translation
    });
    const dat = `${ymd.join('-')}${this.getTime()}`;

    if (Number.isNaN(Date.parse(dat))) {
      return dateStr;
    }

    return dat;
  },

  getTime() {
    const time = 'T00:00:00';

    if (this.useUtc) {
      return `${time}Z`;
    }

    return time;
  },

  /**
   * Creates an array of dates for each day in between two dates.
   * @param {Date} start
   * @param {Date} end
   * @return {Array}
   */
  createDateArray(start, end) {
    const dates = [];
    let startTemp = start;

    while (startTemp <= end) {
      dates.push(new Date(startTemp));
      startTemp = this.setDate(new Date(startTemp), this.getDate(new Date(startTemp)) + 1);
    }

    return dates;
  },

  /**
   * Remove hours/minutes/seconds/milliseconds from a date object
   * @param {Date} date
   * @return {Date}
   */
  resetDateTime(date) {
    return new Date(this.useUtc ? date.setUTCHours(0, 0, 0, 0) : date.setHours(0, 0, 0, 0));
  },

  /**
   * Return a new date object with hours/minutes/seconds/milliseconds removed
   * @return {Date}
   */
  getNewDateObject(date) {
    return date ? this.resetDateTime(new Date(date)) : this.resetDateTime(new Date());
  }

};
var makeDateUtils = (useUtc => ({ ...utils,
  useUtc
}));

var script = {
  props: {
    autofocus: {
      type: Boolean,
      default: false
    },
    bootstrapStyling: {
      type: Boolean,
      default: false
    },
    clearButton: {
      type: Boolean,
      default: false
    },
    clearButtonIcon: {
      type: String,
      default: ''
    },
    calendarButton: {
      type: Boolean,
      default: false
    },
    calendarButtonIcon: {
      type: String,
      default: ''
    },
    calendarButtonIconContent: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    format: {
      type: [String, Function],
      default: 'dd MMM yyyy'
    },
    id: {
      type: String,
      default: null
    },
    inline: {
      type: Boolean,
      default: false
    },
    inputClass: {
      type: [String, Object, Array],
      default: null
    },
    maxlength: {
      type: [Number, String],
      default: null
    },
    name: {
      type: String,
      default: null
    },
    openDate: {
      type: [String, Date, Number],
      default: null,
      validator: val => val === null || val instanceof Date || typeof val === 'string' || typeof val === 'number'
    },
    parser: {
      type: Function,
      default: null
    },
    pattern: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    refName: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    showCalendarOnButtonClick: {
      type: Boolean,
      default: false
    },
    showCalendarOnFocus: {
      type: Boolean,
      default: false
    },
    tabindex: {
      type: [Number, String],
      default: null
    },
    typeable: {
      type: Boolean,
      default: false
    },
    useUtc: {
      type: Boolean,
      default: false
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__ = script;

/* template */

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    {},
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$1 = {
  name: 'DateInput',
  mixins: [__vue_component__],
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    resetTypedDate: {
      type: [Date],
      default: null
    },
    selectedDate: {
      type: Date,
      default: null
    },
    translation: {
      type: Object,

      default() {
        return {};
      }

    }
  },

  data() {
    return {
      input: null,
      isFocusedUsed: false,
      isBlurred: false,
      typedDate: '',
      utils: makeDateUtils(this.useUtc)
    };
  },

  computed: {
    computedInputClass() {
      if (this.bootstrapStyling) {
        if (typeof this.inputClass === 'string') {
          return [this.inputClass, 'form-control'].join(' ');
        }

        return {
          'form-control': true,
          ...this.inputClass
        };
      }

      return this.inputClass;
    },

    formattedDate() {
      return typeof this.format === 'function' ? this.format(new Date(this.selectedDate)) : this.utils.formatDate(new Date(this.selectedDate), this.format, this.translation);
    },

    formattedValue() {
      if (!this.selectedDate) {
        return null;
      }

      if (this.typedDate.length) {
        return this.typedDate;
      }

      return this.formattedDate;
    }

  },
  watch: {
    resetTypedDate() {
      this.typedDate = '';
    }

  },

  mounted() {
    this.input = this.$el.querySelector('input');
  },

  methods: {
    /**
     * emit a clearDate event
     */
    clearDate() {
      this.$emit('clear-date');
    },

    /**
     * submit typedDate and emit a blur event
     */
    handleInputBlur() {
      this.isBlurred = this.isOpen;

      if (this.typeable) {
        this.submitTypedDate();
      }

      this.$emit('blur');
      this.$emit('close');
      this.isFocusedUsed = false;
    },

    handleInputClick() {
      const isFocusedUsed = this.showCalendarOnFocus && !this.isFocusedUsed;

      if (!this.showCalendarOnButtonClick && !isFocusedUsed) {
        this.toggle();
      }

      if (this.showCalendarOnFocus) {
        this.isFocusedUsed = true;
      }
    },

    handleInputFocus() {
      if (this.showCalendarOnFocus) {
        this.$emit('open');
      }

      this.isBlurred = false;
      this.$emit('focus');
    },

    handleKeydownEnter() {
      if (this.typeable) {
        this.submitTypedDate();
      }

      this.$emit('close');
    },

    parseDate(value) {
      return this.utils.parseDate(value, this.format, this.translation, this.parser);
    },

    /**
     * Attempt to parse a typed date
     */
    parseTypedDate() {
      if (this.typeable) {
        const parsableDate = this.parseDate(this.input.value);
        const parsedDate = Date.parse(parsableDate);

        if (!Number.isNaN(parsedDate)) {
          this.typedDate = this.input.value;
          this.$emit('typed-date', new Date(parsedDate));
        }
      }
    },

    /**
     * Submits a typed date if it's valid
     */
    submitTypedDate() {
      const parsableDate = this.parseDate(this.input.value);
      const parsedDate = Date.parse(parsableDate);

      if (Number.isNaN(parsedDate)) {
        this.clearDate();
      } else {
        this.input.value = this.formattedDate;
        this.typedDate = '';
        this.$emit('typed-date', parsedDate);
      }
    },

    toggle() {
      if (!this.isOpen && this.isBlurred) {
        this.isBlurred = false;
        return;
      }

      this.$emit(this.isOpen ? 'close' : 'open');
    }

  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: { "input-group": _vm.bootstrapStyling } },
    [
      _vm._t("beforeDateInput"),
      _vm._v(" "),
      _vm.calendarButton
        ? _c(
            "span",
            {
              staticClass: "vdp-datepicker__calendar-button",
              class: {
                "input-group-prepend": _vm.bootstrapStyling,
                "calendar-btn-disabled": _vm.disabled
              },
              on: { click: _vm.toggle }
            },
            [
              _c(
                "span",
                { class: { "input-group-text": _vm.bootstrapStyling } },
                [
                  _vm._t("calendarBtn", [
                    _c("i", { class: _vm.calendarButtonIcon }, [
                      _vm._v(
                        "\n          " +
                          _vm._s(_vm.calendarButtonIconContent) +
                          "\n          "
                      ),
                      !_vm.calendarButtonIcon
                        ? _c("span", [_vm._v("…")])
                        : _vm._e()
                    ])
                  ])
                ],
                2
              )
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _c("input", {
        ref: _vm.refName,
        class: _vm.computedInputClass,
        attrs: {
          id: _vm.id,
          autocomplete: "off",
          autofocus: _vm.autofocus,
          "clear-button": _vm.clearButton,
          disabled: _vm.disabled,
          maxlength: _vm.maxlength,
          name: _vm.name,
          pattern: _vm.pattern,
          placeholder: _vm.placeholder,
          readonly: !_vm.typeable,
          required: _vm.required,
          tabindex: _vm.tabindex,
          type: _vm.inline ? "hidden" : null
        },
        domProps: { value: _vm.formattedValue },
        on: {
          blur: _vm.handleInputBlur,
          click: _vm.handleInputClick,
          focus: _vm.handleInputFocus,
          keydown: [
            function($event) {
              if (
                !$event.type.indexOf("key") &&
                _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
              ) {
                return null
              }
              $event.preventDefault();
              return _vm.handleKeydownEnter($event)
            },
            function($event) {
              if (
                !$event.type.indexOf("key") &&
                _vm._k(
                  $event.keyCode,
                  "escape",
                  undefined,
                  $event.key,
                  undefined
                )
              ) {
                return null
              }
              $event.preventDefault();
              return _vm.$emit("close")
            }
          ],
          keyup: _vm.parseTypedDate
        }
      }),
      _vm._v(" "),
      _vm.clearButton && _vm.selectedDate
        ? _c(
            "span",
            {
              staticClass: "vdp-datepicker__clear-button",
              class: { "input-group-append": _vm.bootstrapStyling },
              on: {
                click: function($event) {
                  return _vm.clearDate()
                }
              }
            },
            [
              _c(
                "span",
                { class: { "input-group-text": _vm.bootstrapStyling } },
                [
                  _vm._t("clearBtn", [
                    _c("i", { class: _vm.clearButtonIcon }, [
                      !_vm.clearButtonIcon
                        ? _c("span", [_vm._v("×")])
                        : _vm._e()
                    ])
                  ])
                ],
                2
              )
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm._t("afterDateInput")
    ],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

const cellUtils = {
  configExists(obj) {
    return typeof obj !== 'undefined' && Object.keys(obj).length > 0;
  },

  isDefined(obj, prop) {
    return this.configExists(obj) && typeof obj[prop] !== 'undefined';
  },

  hasArray(obj, prop) {
    return this.isDefined(obj, prop) && obj[prop].length > 0;
  },

  hasDate(obj, prop) {
    return this.isDefined(obj, prop) && this.utils.isValidDate(obj[prop]);
  },

  dayMonthYear(obj, prop) {
    const {
      utils
    } = this;
    const hasDate = this.hasDate(obj, prop);

    if (!hasDate) {
      return {
        day: undefined,
        month: undefined,
        year: undefined
      };
    }

    const d = obj[prop];
    return {
      day: utils.getDate(d),
      month: utils.getMonth(d),
      year: utils.getFullYear(d)
    };
  }

};
var makeCellUtils = (utils => ({ ...cellUtils,
  utils
}));

/* eslint-disable no-underscore-dangle */
class DisabledDate {
  constructor(utils, disabledDates) {
    this._utils = utils;
    this._disabledDates = disabledDates;
  }

  get config() {
    const disabledDates = this._disabledDates;
    const utils = makeCellUtils(this._utils);
    return {
      exists: utils.configExists(disabledDates),
      to: utils.dayMonthYear(disabledDates, 'to'),
      from: utils.dayMonthYear(disabledDates, 'from'),
      has: {
        customPredictor: utils.isDefined(disabledDates, 'customPredictor'),
        daysOfMonth: utils.hasArray(disabledDates, 'daysOfMonth'),
        daysOfWeek: utils.hasArray(disabledDates, 'days'),
        from: utils.hasDate(disabledDates, 'from'),
        ranges: utils.hasArray(disabledDates, 'ranges'),
        specificDates: utils.hasArray(disabledDates, 'dates'),
        to: utils.hasDate(disabledDates, 'to')
      }
    };
  }

  daysInMonth(date) {
    const utils = this._utils;
    const month = utils.getMonth(date);
    const year = utils.getFullYear(date);
    return utils.daysInMonth(year, month);
  }

  isDateDisabledVia(date) {
    const disabledDates = this._disabledDates;
    const {
      has
    } = this.config;
    return {
      to: () => {
        return has.to && date < disabledDates.to;
      },
      from: () => {
        return has.from && date > disabledDates.from;
      },
      range: () => {
        if (!has.ranges) return false;
        const {
          ranges
        } = disabledDates;
        const u = makeCellUtils(this._utils);
        return ranges.some(thisRange => {
          const hasFrom = u.isDefined(thisRange, 'from');
          const hasTo = u.isDefined(thisRange, 'to');
          return hasFrom && hasTo && date < thisRange.to && date > thisRange.from;
        });
      },
      customPredictor: () => {
        return has.customPredictor && disabledDates.customPredictor(date);
      },
      specificDate: () => {
        if (!has.specificDates) return false;
        return disabledDates.dates.some(d => {
          return this._utils.compareDates(date, d);
        });
      },
      daysOfWeek: () => {
        if (!has.daysOfWeek) return false;
        return disabledDates.days.indexOf(this._utils.getDay(date)) !== -1;
      },
      daysOfMonth: () => {
        if (!has.daysOfMonth) return false;
        return disabledDates.daysOfMonth.indexOf(this._utils.getDate(date)) !== -1;
      }
    };
  }

  isMonthDisabledVia(date) {
    const {
      from,
      has,
      to
    } = this.config;

    const month = this._utils.getMonth(date);

    const year = this._utils.getFullYear(date);

    return {
      to: () => {
        const isYearInPast = has.to && year < to.year;

        if (isYearInPast) {
          return true;
        }

        return has.to && month < to.month && year <= to.year;
      },
      from: () => {
        const isYearInFuture = has.from && year > from.year;

        if (isYearInFuture) {
          return true;
        }

        return has.from && month > from.month && year >= from.year;
      }
    };
  }

  isYearDisabledVia(date) {
    const {
      from,
      has,
      to
    } = this.config;

    const year = this._utils.getFullYear(date);

    return {
      to: () => {
        return has.to && year < to.year;
      },
      from: () => {
        return has.from && year > from.year;
      }
    };
  }
  /**
   * Checks if the given date should be disabled
   * @param {Date} date
   * @return {Boolean}
   */
  // eslint-disable-next-line complexity,max-statements


  isDateDisabled(date) {
    if (!this.config.exists) return false;
    const isDisabledVia = this.isDateDisabledVia(date);
    return isDisabledVia.to() || isDisabledVia.from() || isDisabledVia.range() || isDisabledVia.specificDate() || isDisabledVia.daysOfWeek() || isDisabledVia.daysOfMonth() || isDisabledVia.customPredictor();
  }
  /**
   * Checks if the given month should be disabled
   * @param {Date} date
   * @return {Boolean}
   */
  // eslint-disable-next-line complexity,max-statements


  isMonthDisabled(date) {
    const {
      config
    } = this;
    const isDisabledVia = this.isMonthDisabledVia(date);

    if (!config.exists) {
      return false;
    }

    if (isDisabledVia.to() || isDisabledVia.from()) {
      return true;
    } // now we have to check each day of the month


    for (let i = 1; i <= this.daysInMonth(date); i += 1) {
      const dayDate = new Date(date);
      dayDate.setDate(i); // if at least one day of this month is NOT disabled,
      // we can conclude that this month SHOULD be selectable

      if (!this.isDateDisabled(dayDate)) {
        return false;
      }
    }

    return true;
  }
  /**
   * Checks if the given year should be disabled
   * @param {Date} date
   * @return {Boolean}
   */
  // eslint-disable-next-line complexity,max-statements


  isYearDisabled(date) {
    const {
      config
    } = this;
    const isDisabledVia = this.isYearDisabledVia(date);

    if (!config.exists) {
      return false;
    }

    if (isDisabledVia.to() || isDisabledVia.from()) {
      return true;
    } // now we have to check each month of the year


    for (let i = 0; i < 12; i += 1) {
      const monthDate = new Date(date);
      monthDate.setMonth(i); // if at least one month of this year is NOT disabled,
      // we can conclude that this year SHOULD be selectable

      if (!this.isMonthDisabled(monthDate)) {
        return false;
      }
    }

    return true;
  }

}

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$2 = {
  name: 'PickerHeader',
  props: {
    isNextDisabled: {
      type: Boolean,
      required: true
    },
    isPreviousDisabled: {
      type: Boolean,
      required: true
    },
    isRtl: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    /**
     * Is the left hand navigation button disabled?
     * @return {Boolean}
     */
    isLeftNavDisabled() {
      return this.isRtl ? this.isNextDisabled : this.isPreviousDisabled;
    },

    /**
     * Is the right hand navigation button disabled?
     * @return {Boolean}
     */
    isRightNavDisabled() {
      return this.isRtl ? this.isPreviousDisabled : this.isNextDisabled;
    }

  }
};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "header",
    [
      _c(
        "span",
        {
          staticClass: "prev",
          class: { disabled: _vm.isLeftNavDisabled },
          on: {
            click: function($event) {
              return _vm.$emit(_vm.isRtl ? "next" : "previous")
            }
          }
        },
        [
          _vm._t("prevIntervalBtn", [
            _c("span", { staticClass: "default" }, [_vm._v("<")])
          ])
        ],
        2
      ),
      _vm._v(" "),
      _vm._t("default"),
      _vm._v(" "),
      _c(
        "span",
        {
          staticClass: "next",
          class: { disabled: _vm.isRightNavDisabled },
          on: {
            click: function($event) {
              return _vm.$emit(_vm.isRtl ? "previous" : "next")
            }
          }
        },
        [
          _vm._t("nextIntervalBtn", [
            _c("span", { staticClass: "default" }, [_vm._v(">")])
          ])
        ],
        2
      )
    ],
    2
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$2 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    undefined,
    undefined,
    undefined
  );

var script$3 = {
  components: {
    PickerHeader: __vue_component__$2
  },
  inheritAttrs: false,
  props: {
    disabledDates: {
      type: Object,

      default() {
        return {};
      }

    },
    isRtl: {
      type: Boolean,
      default: false
    },
    isUpDisabled: {
      type: Boolean,
      default: false
    },
    pageDate: {
      type: Date,
      default: null
    },
    selectedDate: {
      type: Date,
      default: null
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    translation: {
      type: Object,

      default() {
        return {};
      }

    },
    useUtc: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      utils: makeDateUtils(this.useUtc)
    };
  },

  computed: {
    /**
     * A look-up object created from 'disabledDates' prop
     * @return {Object}
     */
    disabledConfig() {
      return new DisabledDate(this.utils, this.disabledDates).config;
    },

    /**
     * Returns the current page's full year as an integer.
     * @return {Number}
     */
    pageYear() {
      return this.utils.getFullYear(this.pageDate);
    }

  },
  methods: {
    /**
     * Changes the page up or down
     * @param {Number} incrementBy
     */
    changePage(incrementBy) {
      const date = this.pageDate;
      this.utils.setFullYear(date, this.utils.getFullYear(date) + incrementBy);
      this.$emit('page-change', date);
    },

    /**
     * Emits a 'select' or 'select-disabled' event
     * @param {Object} cell
     */
    select(cell) {
      if (cell.isDisabled) {
        this.$emit('select-disabled', cell);
      } else {
        this.$emit('select', cell);
      }
    },

    /**
     * Increment the current page
     */
    nextPage() {
      if (!this.isNextDisabled) {
        this.changePage(+1);
      }
    },

    /**
     * Decrement the page
     */
    previousPage() {
      if (!this.isPreviousDisabled) {
        this.changePage(-1);
      }
    }

  }
};

/* script */
const __vue_script__$3 = script$3;

/* template */

  /* style */
  const __vue_inject_styles__$3 = undefined;
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$3 = /*#__PURE__*/normalizeComponent(
    {},
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    undefined,
    undefined,
    undefined
  );

/* eslint-disable no-underscore-dangle */
class HighlightedDate {
  constructor(utils, disabledDates, highlighted) {
    this._utils = utils;
    this._disabledDates = disabledDates;
    this._highlighted = highlighted;
  }

  get config() {
    const highlightedDates = this._highlighted;
    const utils = makeCellUtils(this._utils);
    return {
      exists: utils.configExists(highlightedDates),
      to: utils.dayMonthYear(highlightedDates, 'to'),
      from: utils.dayMonthYear(highlightedDates, 'from'),
      has: {
        customPredictor: utils.isDefined(highlightedDates, 'customPredictor'),
        daysOfMonth: utils.hasArray(highlightedDates, 'daysOfMonth'),
        daysOfWeek: utils.hasArray(highlightedDates, 'days'),
        from: utils.hasDate(highlightedDates, 'from'),
        specificDates: utils.hasArray(highlightedDates, 'dates'),
        to: utils.hasDate(highlightedDates, 'to'),
        includeDisabled: utils.isDefined(highlightedDates, 'includeDisabled') && highlightedDates.includeDisabled
      }
    };
  }

  isDateDisabled(date) {
    const utils = this._utils;
    const disabledDates = this._disabledDates;
    return new DisabledDate(utils, disabledDates).isDateDisabled(date);
  }

  isHighlightingNotPossible(date) {
    const {
      config
    } = this;
    if (!config.exists) return false;
    return !config.has.includeDisabled && this.isDateDisabled(date);
  }

  isDateHighlightedVia(date) {
    const highlightedDates = this._highlighted;
    const {
      has
    } = this.config;
    return {
      to: () => {
        return has.to && date <= highlightedDates.to;
      },
      from: () => {
        return has.from && date >= highlightedDates.from;
      },
      customPredictor: () => {
        return has.customPredictor && highlightedDates.customPredictor(date);
      },
      specificDate: () => {
        if (!has.specificDates) return false;
        return highlightedDates.dates.some(d => {
          return this._utils.compareDates(date, d);
        });
      },
      daysOfWeek: () => {
        if (!has.daysOfWeek) return false;
        return highlightedDates.days.indexOf(this._utils.getDay(date)) !== -1;
      },
      daysOfMonth: () => {
        if (!has.daysOfMonth) return false;
        return highlightedDates.daysOfMonth.indexOf(this._utils.getDate(date)) !== -1;
      }
    };
  } // eslint-disable-next-line complexity,max-statements


  isDateHighlighted(date) {
    if (this.isHighlightingNotPossible(date)) return false;
    const isHighlightedVia = this.isDateHighlightedVia(date);
    return isHighlightedVia.to() && isHighlightedVia.from() || isHighlightedVia.specificDate() || isHighlightedVia.daysOfWeek() || isHighlightedVia.daysOfMonth() || isHighlightedVia.customPredictor();
  }

}

//
var script$4 = {
  name: 'PickerDay',
  mixins: [__vue_component__$3],
  props: {
    dayCellContent: {
      type: Function,
      default: day => day.date
    },
    highlighted: {
      type: Object,

      default() {
        return {};
      }

    },
    firstDayOfWeek: {
      type: String,
      default: 'sun'
    },
    showFullMonthName: {
      type: Boolean,
      default: false
    },
    showEdgeDates: {
      type: Boolean,
      default: true
    },
    useDateRange: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    /**
     * Sets an array with all days to show this month
     * @return {Array}
     */
    cells() {
      const days = [];
      const daysInCalendar = this.daysFromPrevMonth + this.daysInMonth + this.daysFromNextMonth;
      const dObj = this.firstCellDate();

      for (let i = 0; i < daysInCalendar; i += 1) {
        days.push(this.makeDay(i, dObj));
        this.utils.setDate(dObj, this.utils.getDate(dObj) + 1);
      }

      return days;
    },

    /**
     * Gets the name of the month the current page is on
     * @return {String}
     */
    currMonthName() {
      const monthName = this.showFullMonthName ? this.translation.months : this.translation.monthsAbbr;
      return this.utils.getMonthNameAbbr(this.pageMonth, monthName);
    },

    /**
     * Gets the name of the year that current page is on
     * @return {String}
     */
    currYearName() {
      const {
        yearSuffix
      } = this.translation;
      return `${this.pageYear}${yearSuffix}`;
    },

    /**
     * Returns an array of day names
     * @return {String[]}
     */
    daysOfWeek() {
      return this.translation.getDaysStartingOn(this.firstDayOfWeekNumber);
    },

    /**
     * Returns the number of days in this month
     * @return {String[]}
     */
    daysInMonth() {
      return this.utils.getDaysInMonth(this.pageDate);
    },

    /**
     * Calculates how many days to show from the previous month
     * @return {number}
     */
    daysFromPrevMonth() {
      const firstOfMonthDayNumber = this.utils.getDay(this.pageDate);
      return (7 - this.firstDayOfWeekNumber + firstOfMonthDayNumber) % 7;
    },

    /**
     * Calculates how many days to show from the next month
     * @return {number}
     */
    daysFromNextMonth() {
      const daysThisAndPrevMonth = this.daysFromPrevMonth + this.daysInMonth;
      return Math.ceil(daysThisAndPrevMonth / 7) * 7 - daysThisAndPrevMonth;
    },

    /**
     * Returns first-day-of-week as a number (Sunday is 0)
     * @return {Number}
     */
    firstDayOfWeekNumber() {
      return this.utils.getDayFromAbbr(this.firstDayOfWeek);
    },

    /**
     * A look-up object created from 'highlighted' prop
     * @return {Object}
     */
    highlightedConfig() {
      return new HighlightedDate(this.utils, this.disabledDates, this.highlighted).config;
    },

    /**
     * Is the next month disabled?
     * @return {Boolean}
     */
    isNextDisabled() {
      if (!this.disabledConfig.has.from) {
        return false;
      }

      return this.disabledConfig.from.month <= this.pageMonth && this.disabledConfig.from.year <= this.pageYear;
    },

    /**
     * Is the previous month disabled?
     * @return {Boolean}
     */
    isPreviousDisabled() {
      if (!this.disabledConfig.has.to) {
        return false;
      }

      return this.disabledConfig.to.month >= this.pageMonth && this.disabledConfig.to.year >= this.pageYear;
    },

    /**
     * Returns the current page's month as an integer.
     * @return {Number}
     */
    pageMonth() {
      return this.utils.getMonth(this.pageDate);
    },

    /**
     * Display the current page's month & year as the title.
     * @return {String}
     */
    pageTitleDay() {
      return this.translation.ymd ? `${this.currYearName} ${this.currMonthName}` : `${this.currMonthName} ${this.currYearName}`;
    },

    /**
     * The first day of the next page's month.
     * @return {Date}
     */
    firstOfNextMonth() {
      const d = new Date(this.pageDate);
      return new Date(this.utils.setMonth(d, this.utils.getMonth(d) + 1));
    },

    dayWrapperClasses() {
      return {
        'date-wrapper__cell-parent': true,
        'date-wrapper__cell-parent--range': this.useDateRange
      };
    }

  },
  methods: {
    /**
     * Changes the page up or down (overrides changePage in pickerMixin)
     * @param {Number} incrementBy
     */
    changePage(incrementBy) {
      const date = this.pageDate;
      this.utils.setMonth(date, this.utils.getMonth(date) + incrementBy);
      this.$emit('page-change', date);
    },

    /**
     * Set the class for a specific day
     * @param {Object} day
     * @return {Object}
     */
    dayClasses(day) {
      return {
        'selected': day.isSelected,
        'disabled': day.isDisabled,
        'highlighted': day.isHighlighted,
        'muted': day.isPreviousMonth || day.isNextMonth,
        'today': this.useDateRange ? false : day.isToday,
        'weekend': day.isWeekend,
        'sat': day.isSaturday,
        'sun': day.isSunday,
        'highlight-start': day.isHighlightStart,
        'highlight-end': day.isHighlightEnd
      };
    },

    /**
     * Whether a day is disabled
     * @param {Date} date to check if disabled
     * @return {Boolean}
     */
    isDisabledDate(date) {
      return new DisabledDate(this.utils, this.disabledDates).isDateDisabled(date);
    },

    /**
     * Whether a day is highlighted
     * (only if it is not disabled already except when highlighted.includeDisabled is true)
     * @param {Date} date to check if highlighted
     * @return {Boolean}
     */
    isHighlightedDate(date) {
      const dateWithoutTime = this.utils.resetDateTime(date);
      return new HighlightedDate(this.utils, this.disabledDates, this.highlighted).isDateHighlighted(dateWithoutTime);
    },

    /**
     * Whether a day is highlighted and it is the last date
     * in the highlighted range of dates
     * @param {Date} date end highlight
     * @return {Boolean}
     */
    isHighlightEnd(date) {
      const config = this.highlightedConfig;
      return this.isHighlightedDate(date) && config.to.year === this.utils.getFullYear(date) && config.to.month === this.utils.getMonth(date) && config.to.day === this.utils.getDate(date);
    },

    /**
     * Whether a day is highlighted and it is the first date
     * in the highlighted range of dates
     * @param {Date} date start highlight
     * @return {Boolean}
     */
    isHighlightStart(date) {
      const config = this.highlightedConfig;
      return this.isHighlightedDate(date) && config.from.year === this.utils.getFullYear(date) && config.from.month === this.utils.getMonth(date) && config.from.day === this.utils.getDate(date);
    },

    /**
     * Whether a day is selected
     * @param {Date} dObj to check if selected
     * @return {Boolean}
     */
    isSelectedDate(dObj) {
      return this.selectedDate && this.utils.compareDates(this.selectedDate, dObj);
    },

    /**
     * Defines the objects within the days array
     * @param  {id}  id
     * @param  {Date}  dObj
     * @return {Object}
     */
    // eslint-disable-next-line complexity
    makeDay(id, dObj) {
      const isNextMonth = dObj >= this.firstOfNextMonth;
      const isPreviousMonth = dObj < this.pageDate;
      const isSaturday = this.utils.getDay(dObj) === 6;
      const isSunday = this.utils.getDay(dObj) === 0;
      const showDate = this.showEdgeDates || !(isPreviousMonth || isNextMonth);
      return {
        date: showDate ? this.utils.getDate(dObj) : '',
        timestamp: dObj.valueOf(),
        isSelected: this.isSelectedDate(dObj),
        isDisabled: showDate ? this.isDisabledDate(dObj) : true,
        isHighlighted: this.isHighlightedDate(dObj),
        isHighlightStart: this.isHighlightStart(dObj),
        isHighlightEnd: this.isHighlightEnd(dObj),
        isToday: this.utils.compareDates(dObj, new Date()),
        isWeekend: isSaturday || isSunday,
        isSaturday,
        isSunday,
        isPreviousMonth,
        isNextMonth
      };
    },

    /**
     * Set up a new date object to the first day of the current 'page'
     * @return Date
     */
    firstCellDate() {
      const d = this.pageDate;
      const firstOfMonth = this.useUtc ? new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1)) : new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes());
      return new Date(firstOfMonth.setDate(firstOfMonth.getDate() - this.daysFromPrevMonth));
    },

    handleHighlightedDate(cell) {
      this.$emit('set-highlighted-date', cell);
    },

    handleResetHighlightedDate() {
      this.$emit('remove-highlighted-date');
    }

  }
};

/* script */
const __vue_script__$4 = script$4;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "picker-view" },
    [
      _vm._t("beforeCalendarHeaderDay"),
      _vm._v(" "),
      _vm.showHeader
        ? _c(
            "PickerHeader",
            {
              attrs: {
                "is-next-disabled": _vm.isNextDisabled,
                "is-previous-disabled": _vm.isPreviousDisabled,
                "is-rtl": _vm.isRtl
              },
              on: { next: _vm.nextPage, previous: _vm.previousPage }
            },
            [
              _c(
                "span",
                {
                  staticClass: "day__month_btn",
                  class: {
                    up: !_vm.isUpDisabled,
                    "up--disabled": _vm.useDateRange
                  },
                  on: {
                    click: function($event) {
                      return _vm.$emit("set-view", "month")
                    }
                  }
                },
                [_vm._v("\n      " + _vm._s(_vm.pageTitleDay) + "\n    ")]
              ),
              _vm._v(" "),
              _vm._t("nextIntervalBtn", null, { slot: "nextIntervalBtn" }),
              _vm._v(" "),
              _vm._t("prevIntervalBtn", null, { slot: "prevIntervalBtn" })
            ],
            2
          )
        : _vm._e(),
      _vm._v(" "),
      _c("div", { class: { "flex-rtl": _vm.isRtl } }, [
        _c(
          "div",
          { staticClass: "day-header-wrapper" },
          _vm._l(_vm.daysOfWeek, function(day) {
            return _c("span", { key: day, staticClass: "day-header" }, [
              _vm._v("\n        " + _vm._s(day) + "\n      ")
            ])
          }),
          0
        ),
        _vm._v(" "),
        _c(
          "div",
          { ref: "cells", staticClass: "date-wrapper" },
          _vm._l(_vm.cells, function(cell) {
            return _c(
              "div",
              { key: cell.timestamp, class: _vm.dayWrapperClasses },
              [
                _c(
                  "span",
                  {
                    staticClass: "cell day",
                    class: _vm.dayClasses(cell),
                    on: {
                      click: function($event) {
                        return _vm.select(cell)
                      },
                      mouseover: function($event) {
                        return _vm.handleHighlightedDate(cell)
                      },
                      mouseout: _vm.handleResetHighlightedDate
                    }
                  },
                  [
                    _vm._v(
                      "\n          " +
                        _vm._s(_vm.dayCellContent(cell)) +
                        "\n        "
                    )
                  ]
                )
              ]
            )
          }),
          0
        )
      ]),
      _vm._v(" "),
      _vm._t("calendarFooterDay")
    ],
    2
  )
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$4 = undefined;
  /* scoped */
  const __vue_scope_id__$4 = undefined;
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$4 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$5 = {
  name: 'PickerMonth',
  mixins: [__vue_component__$3],
  computed: {
    /**
     * Sets an array with all months to show this year
     * @return {Array}
     */
    cells() {
      const d = this.pageDate;
      const months = []; // set up a new date object to the beginning of the current 'page'

      const dObj = this.useUtc ? new Date(Date.UTC(d.getUTCFullYear(), 0, d.getUTCDate())) : new Date(d.getFullYear(), 0, d.getDate(), d.getHours(), d.getMinutes());

      for (let i = 0; i < 12; i += 1) {
        months.push({
          month: this.utils.getMonthName(i, this.translation.months),
          timestamp: dObj.valueOf(),
          isSelected: this.isSelectedMonth(dObj),
          isDisabled: this.isDisabledMonth(dObj)
        });
        this.utils.setMonth(dObj, this.utils.getMonth(dObj) + 1);
      }

      return months;
    },

    /**
     * Is the next year disabled?
     * @return {Boolean}
     */
    isNextDisabled() {
      if (!this.disabledConfig.has.from) {
        return false;
      }

      return this.disabledConfig.from.year <= this.pageYear;
    },

    /**
     * Is the previous year disabled?
     * @return {Boolean}
     */
    isPreviousDisabled() {
      if (!this.disabledConfig.has.to) {
        return false;
      }

      return this.disabledConfig.to.year >= this.pageYear;
    },

    /**
     * Display the current page's year as the title.
     * @return {String}
     */
    pageTitleMonth() {
      const {
        yearSuffix
      } = this.translation;
      return `${this.pageYear}${yearSuffix}`;
    }

  },
  methods: {
    /**
     * Whether a month is disabled
     * @param {Date} date
     * @return {Boolean}
     */
    isDisabledMonth(date) {
      return new DisabledDate(this.utils, this.disabledDates).isMonthDisabled(date);
    },

    /**
     * Whether the selected date is in this month
     * @param {Date} date
     * @return {Boolean}
     */
    isSelectedMonth(date) {
      const month = this.utils.getMonth(date);
      const year = this.utils.getFullYear(date);
      return this.selectedDate && year === this.utils.getFullYear(this.selectedDate) && month === this.utils.getMonth(this.selectedDate);
    }

  }
};

/* script */
const __vue_script__$5 = script$5;

/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "picker-view" },
    [
      _vm._t("beforeCalendarHeaderMonth"),
      _vm._v(" "),
      _vm.showHeader
        ? _c(
            "PickerHeader",
            {
              attrs: {
                "is-next-disabled": _vm.isNextDisabled,
                "is-previous-disabled": _vm.isPreviousDisabled,
                "is-rtl": _vm.isRtl
              },
              on: { next: _vm.nextPage, previous: _vm.previousPage }
            },
            [
              _c(
                "span",
                {
                  staticClass: "month__year_btn",
                  class: { up: !_vm.isUpDisabled },
                  on: {
                    click: function($event) {
                      return _vm.$emit("set-view", "year")
                    }
                  }
                },
                [_vm._v("\n      " + _vm._s(_vm.pageTitleMonth) + "\n    ")]
              ),
              _vm._v(" "),
              _vm._t("nextIntervalBtn", null, { slot: "nextIntervalBtn" }),
              _vm._v(" "),
              _vm._t("prevIntervalBtn", null, { slot: "prevIntervalBtn" })
            ],
            2
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        { ref: "cells", staticClass: "date-wrapper" },
        _vm._l(_vm.cells, function(cell) {
          return _c(
            "span",
            {
              key: cell.timestamp,
              staticClass: "cell month",
              class: { selected: cell.isSelected, disabled: cell.isDisabled },
              on: {
                click: function($event) {
                  return _vm.select(cell)
                }
              }
            },
            [_vm._v("\n      " + _vm._s(cell.month) + "\n    ")]
          )
        }),
        0
      ),
      _vm._v(" "),
      _vm._t("calendarFooterMonth")
    ],
    2
  )
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$5 = undefined;
  /* scoped */
  const __vue_scope_id__$5 = undefined;
  /* module identifier */
  const __vue_module_identifier__$5 = undefined;
  /* functional template */
  const __vue_is_functional_template__$5 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$5 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$6 = {
  name: 'PickerYear',
  mixins: [__vue_component__$3],
  props: {
    yearRange: {
      type: Number,
      default: 10
    }
  },
  computed: {
    /**
     * Sets an array with all years to show this decade (or yearRange)
     * @return {Array}
     */
    cells() {
      const d = this.pageDate;
      const years = [];
      const year = this.useUtc ? Math.floor(d.getUTCFullYear() / this.yearRange) * this.yearRange : Math.floor(d.getFullYear() / this.yearRange) * this.yearRange; // set up a new date object to the beginning of the current 'page'7

      const dObj = this.useUtc ? new Date(Date.UTC(year, d.getUTCMonth(), d.getUTCDate())) : new Date(year, d.getMonth(), d.getDate(), d.getHours(), d.getMinutes());

      for (let i = 0; i < this.yearRange; i += 1) {
        years.push({
          year: this.utils.getFullYear(dObj),
          timestamp: dObj.valueOf(),
          isSelected: this.isSelectedYear(dObj),
          isDisabled: this.isDisabledYear(dObj)
        });
        this.utils.setFullYear(dObj, this.utils.getFullYear(dObj) + 1);
      }

      return years;
    },

    /**
     * Is the next decade disabled?
     * @return {Boolean}
     */
    isNextDisabled() {
      if (!this.disabledConfig.has.from) {
        return false;
      }

      return this.disabledConfig.from.year <= this.pageDecadeEnd;
    },

    /**
     * Is the previous decade disabled?
     * @return {Boolean}
     */
    isPreviousDisabled() {
      if (!this.disabledConfig.has.to) {
        return false;
      }

      return this.disabledConfig.to.year >= this.pageDecadeStart;
    },

    /**
     * The year at which the current yearRange starts
     * @return {Number}
     */
    pageDecadeStart() {
      return Math.floor(this.pageYear / this.yearRange) * this.yearRange;
    },

    /**
     * The year at which the current yearRange ends
     * @return {Number}
     */
    pageDecadeEnd() {
      return this.pageDecadeStart + this.yearRange - 1;
    },

    /**
     * Display the current page's decade (or year range) as the title.
     * @return {String}
     */
    pageTitleYear() {
      const {
        yearSuffix
      } = this.translation;
      return `${this.pageDecadeStart} - ${this.pageDecadeEnd}${yearSuffix}`;
    }

  },
  methods: {
    /**
     * Whether a year is disabled
     * @param {Date} date
     * @return {Boolean}
     */
    isDisabledYear(date) {
      return new DisabledDate(this.utils, this.disabledDates).isYearDisabled(date);
    },

    /**
     * Whether the selected date is in this year
     * @param {Date} date
     * @return {Boolean}
     */
    isSelectedYear(date) {
      const year = this.utils.getFullYear(date);
      return this.selectedDate && year === this.utils.getFullYear(this.selectedDate);
    },

    /**
     * Increments the page (overrides nextPage in pickerMixin)
     */
    nextPage() {
      if (!this.isNextDisabled) {
        this.changePage(this.yearRange);
      }
    },

    /**
     * Decrements the page (overrides previousPage in pickerMixin)
     */
    previousPage() {
      if (!this.isPreviousDisabled) {
        this.changePage(-this.yearRange);
      }
    }

  }
};

/* script */
const __vue_script__$6 = script$6;

/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "picker-view" },
    [
      _vm._t("beforeCalendarHeaderYear"),
      _vm._v(" "),
      _vm.showHeader
        ? _c(
            "PickerHeader",
            {
              attrs: {
                "is-next-disabled": _vm.isNextDisabled,
                "is-previous-disabled": _vm.isPreviousDisabled,
                "is-rtl": _vm.isRtl
              },
              on: { next: _vm.nextPage, previous: _vm.previousPage }
            },
            [
              _c("span", [
                _vm._v("\n      " + _vm._s(_vm.pageTitleYear) + "\n    ")
              ]),
              _vm._v(" "),
              _vm._t("nextIntervalBtn", null, { slot: "nextIntervalBtn" }),
              _vm._v(" "),
              _vm._t("prevIntervalBtn", null, { slot: "prevIntervalBtn" })
            ],
            2
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        { ref: "cells", staticClass: "date-wrapper" },
        _vm._l(_vm.cells, function(cell) {
          return _c(
            "span",
            {
              key: cell.timestamp,
              staticClass: "cell year",
              class: { selected: cell.isSelected, disabled: cell.isDisabled },
              on: {
                click: function($event) {
                  return _vm.select(cell)
                }
              }
            },
            [_vm._v("\n      " + _vm._s(cell.year) + "\n    ")]
          )
        }),
        0
      ),
      _vm._v(" "),
      _vm._t("calendarFooterYear")
    ],
    2
  )
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  const __vue_inject_styles__$6 = undefined;
  /* scoped */
  const __vue_scope_id__$6 = undefined;
  /* module identifier */
  const __vue_module_identifier__$6 = undefined;
  /* functional template */
  const __vue_is_functional_template__$6 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$6 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    false,
    undefined,
    undefined,
    undefined
  );

/* eslint no-param-reassign: 0 */

/**
 * get the hidden element width, height
 * @param {HTMLElement} element dom
 */
function getPopupElementSize(element) {
  const originalDisplay = element.style.display;
  const originalVisibility = element.style.visibility;
  element.style.display = 'block';
  element.style.visibility = 'hidden';
  const styles = window.getComputedStyle(element);
  const width = element.offsetWidth + parseInt(styles.marginLeft, 10) + parseInt(styles.marginRight, 10);
  const height = element.offsetHeight + parseInt(styles.marginTop, 10) + parseInt(styles.marginBottom, 10);
  element.style.display = originalDisplay;
  element.style.visibility = originalVisibility;
  return {
    width,
    height
  };
}
/**
 * get the popup position
 * @param {Element} el element
 * @param {Element} elRelative relative element
 * @param {Number} targetWidth target element's width
 * @param {Number} targetHeight target element's height
 * @param {Boolean} appendToBody
 * @param {String} fixedPosition
 * @param {Boolean} rtl
 */
// eslint-disable-next-line complexity,max-statements

function getRelativePosition({
  el,
  elRelative,
  targetWidth,
  targetHeight,
  appendToBody,
  fixedPosition,
  rtl
}) {
  let left = 0;
  let top = 0;
  let offsetX = 0;
  let offsetY = 0;
  const relativeRect = elRelative.getBoundingClientRect();
  const documentWidth = document.documentElement.clientWidth;
  const documentHeight = document.documentElement.clientHeight;

  if (appendToBody) {
    offsetX = window.pageXOffset + relativeRect.left;
    offsetY = window.pageYOffset + relativeRect.top;
  }

  const calendarBounding = el.getBoundingClientRect();
  const outOfBoundsRight = calendarBounding.right > window.innerWidth;
  const outOfBoundsBottom = calendarBounding.bottom > window.innerHeight;
  const fixedPositionRight = fixedPosition && fixedPosition.indexOf('right') !== -1;
  const fixedPositionTop = fixedPosition && fixedPosition.indexOf('top') !== -1;

  const setLeft = () => {
    left = offsetX;
  };

  const setRight = () => {
    left = offsetX + relativeRect.width - targetWidth;
  };

  const setBottom = () => {
    top = offsetY + relativeRect.height;
  };

  const setTop = () => {
    top = offsetY - targetHeight;
  };

  if (fixedPosition === '') {
    if (outOfBoundsRight || rtl) {
      setRight();
    } else {
      setLeft();
    }

    if (outOfBoundsBottom) {
      setTop();
    } else {
      setBottom();
    }

    const hasRelativWidth = documentWidth - relativeRect.left < targetWidth && relativeRect.right < targetWidth;
    const hasRelativHeight = relativeRect.top <= targetHeight && documentHeight - relativeRect.bottom <= targetHeight;

    if (hasRelativWidth) {
      left = offsetX - relativeRect.left + 1;
    }

    if (hasRelativHeight) {
      top = offsetY + documentHeight - relativeRect.top - targetHeight;
    }
  } else {
    if (fixedPositionRight) {
      setRight();
    } else {
      setLeft();
    }

    if (fixedPositionTop) {
      setTop();
    } else {
      setBottom();
    }
  }

  return {
    left: `${left}px`,
    top: `${top}px`
  };
}

var script$7 = {
  name: 'Popup',
  props: {
    appendToBody: {
      type: Boolean,
      default: true
    },
    fixedPosition: {
      type: String,
      default: ''
    },
    inline: {
      type: Boolean,
      default: false
    },
    rtl: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      popupRect: null
    };
  },

  watch: {
    visible: {
      immediate: true,

      handler(val) {
        this.$nextTick(() => {
          if (val) {
            this.displayPopup();
          }
        });
      }

    }
  },

  mounted() {
    if (this.inline) {
      return;
    }

    if (this.appendToBody) {
      document.body.appendChild(this.$el);
    }
  },

  beforeDestroy() {
    if (this.inline) {
      return;
    }

    if (this.appendToBody && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  },

  methods: {
    setTopStyle() {
      if (this.appendToBody) {
        const relativeRect = this.$parent.$el.getBoundingClientRect();
        this.$el.style.top = `${relativeRect.bottom + window.scrollY}px`;
      }
    },

    displayPopup() {
      if (this.inline || !this.visible) return;
      this.setTopStyle();
      const popup = this.$el;
      const relativeElement = this.$parent.$el;

      if (!this.popupRect) {
        this.popupRect = getPopupElementSize(popup);
      }

      const {
        width,
        height
      } = this.popupRect;
      const {
        left,
        top
      } = getRelativePosition({
        el: popup,
        elRelative: relativeElement,
        targetWidth: width,
        targetHeight: height,
        appendToBody: this.appendToBody,
        fixedPosition: this.fixedPosition,
        rtl: this.rtl
      });
      this.$el.style.left = left;
      this.$el.style.top = top;
    }

  },

  render() {
    return this.$slots.default;
  }

};

/* script */
const __vue_script__$7 = script$7;

/* template */

  /* style */
  const __vue_inject_styles__$7 = undefined;
  /* scoped */
  const __vue_scope_id__$7 = undefined;
  /* module identifier */
  const __vue_module_identifier__$7 = undefined;
  /* functional template */
  const __vue_is_functional_template__$7 = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$7 = /*#__PURE__*/normalizeComponent(
    {},
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$8 = {
  name: 'Datepicker',
  components: {
    DateInput: __vue_component__$1,
    PickerDay: __vue_component__$4,
    PickerMonth: __vue_component__$5,
    PickerYear: __vue_component__$6,
    Popup: __vue_component__$7
  },
  mixins: [__vue_component__],
  props: {
    appendToBody: {
      type: Boolean,
      default: false
    },
    calendarClass: {
      type: [String, Object, Array],
      default: ''
    },
    currentDateRangeType: {
      type: String,
      default: 'from',
      validator: val => {
        return ['from', 'to'].indexOf(val) >= 0;
      }
    },
    dayCellContent: {
      type: Function,
      default: day => day.date
    },
    disabledDates: {
      type: Object,

      default() {
        return {};
      }

    },
    firstDayOfWeek: {
      type: String,
      default: 'sun'
    },
    fixedPosition: {
      type: String,
      default: '',
      validator: val => {
        const possibleValues = ['', 'bottom', 'bottom-left', 'bottom-right', 'top', 'top-left', 'top-right'];
        return possibleValues.includes(val);
      }
    },
    fullMonthName: {
      type: Boolean,
      default: false
    },
    highlighted: {
      type: Object,

      default() {
        return {};
      }

    },
    initialView: {
      type: String,
      default: ''
    },
    inline: {
      type: Boolean,
      default: false
    },
    language: {
      type: Object,
      default: () => en
    },
    maximumView: {
      type: String,
      default: 'year'
    },
    minimumView: {
      type: String,
      default: 'day'
    },
    showEdgeDates: {
      type: Boolean,
      default: true
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    useDateRange: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Date, Number],
      default: '',
      validator: val => val === null || val instanceof Date || typeof val === 'string' || typeof val === 'number'
    },
    wrapperClass: {
      type: [String, Object, Array],
      default: ''
    },
    yearPickerRange: {
      type: Number,
      default: 10
    }
  },

  data() {
    const utils = makeDateUtils(this.useUtc);
    const startDate = utils.getNewDateObject(this.openDate || null);
    const pageTimestamp = utils.setDate(startDate, 1);
    return {
      calendarHeight: 0,
      calendarSlots,

      /*
       * Vue cannot observe changes to a Date Object so date must be stored as a timestamp
       * This represents the first day of the current viewing month
       * {Number}
       */
      from: {},
      fromMouseover: null,
      pageTimestamp,
      resetTypedDate: utils.getNewDateObject(),

      /*
       * Selected Date
       * {Date}
       */
      selectedDate: null,
      to: {},
      toMouseover: null,
      utils,
      view: ''
    };
  },

  computed: {
    allowedViews() {
      const views = ['day', 'month', 'year'];
      return views.filter(view => this.allowedToShowView(view));
    },

    computedInitialView() {
      return this.initialView || this.minimumView;
    },

    getFromTimestamp() {
      return this.from.timestamp || null;
    },

    getToTimestamp() {
      return this.to.timestamp || null;
    },

    highlightedDate() {
      if (!this.useDateRange) return this.highlighted;
      const {
        value: fromValue = this.fromMouseover
      } = this.from;
      const {
        value: toValue = this.toMouseover
      } = this.to;
      return {
        from: fromValue,
        to: toValue
      };
    },

    isEligibleToHighlightCell() {
      if (!this.useDateRange) return false;
      const enableFromHighlight = this.currentDateRangeType === 'from' && !this.getFromTimestamp;
      const enableToHighlight = this.currentDateRangeType === 'to' && !this.getToTimestamp;
      return enableFromHighlight || enableToHighlight;
    },

    isInline() {
      return !!this.inline || this.useDateRange;
    },

    isOpen() {
      return this.view !== '';
    },

    isRtl() {
      return this.translation.rtl;
    },

    isUpDisabled() {
      return !this.allowedToShowView(this.nextView.up);
    },

    nextView() {
      const isCurrentView = view => view === this.view;

      const viewIndex = this.allowedViews.findIndex(isCurrentView);

      const nextViewDown = index => {
        return index <= 0 ? undefined : this.allowedViews[index - 1];
      };

      const nextViewUp = index => {
        if (index < 0) {
          return undefined;
        }

        if (index === this.allowedViews.length - 1) {
          return 'decade';
        }

        return this.allowedViews[index + 1];
      };

      return {
        up: nextViewUp(viewIndex),
        down: nextViewDown(viewIndex)
      };
    },

    pageDate() {
      return new Date(this.pageTimestamp);
    },

    picker() {
      const view = this.view || this.computedInitialView;
      return `Picker${this.ucFirst(view)}`;
    },

    pickerClasses() {
      return [this.calendarClass, this.isInline && 'inline', this.isRtl && this.appendToBody && 'rtl'];
    },

    translation() {
      return this.language;
    }

  },
  watch: {
    initialView() {
      this.setInitialView();
    },

    openDate() {
      this.setPageDate();
    },

    value(value) {
      const parsedValue = this.parseValue(value);
      this.setValue(parsedValue);
    }

  },

  mounted() {
    this.init();
  },

  methods: {
    /**
     * Are we allowed to show a specific picker view?
     * @param {String} view
     * @return {Boolean}
     */
    allowedToShowView(view) {
      const views = ['day', 'month', 'year'];
      const minimumViewIndex = views.indexOf(this.minimumView);
      const maximumViewIndex = views.indexOf(this.maximumView);
      const viewIndex = views.indexOf(view);
      return viewIndex >= minimumViewIndex && viewIndex <= maximumViewIndex;
    },

    /**
     * Clear the selected date
     */
    clearDate() {
      this.selectedDate = null;
      this.setPageDate();
      this.$emit('selected', null);
      this.$emit('input', null);
      this.$emit('cleared');
    },

    /**
     * Close the calendar views
     */
    close() {
      if (!this.isInline) {
        this.view = '';
        this.$emit('closed');
      }
    },

    getDateRangeValue(cell) {
      const {
        timestamp
      } = cell;
      return {
        timestamp,
        value: new Date(timestamp)
      };
    },

    handleDateRange(selectedDate) {
      if (this.currentDateRangeType === 'from') {
        this.handleFromDateRange(selectedDate);
      } else {
        this.handleToDateRange(selectedDate);
      }
    },

    handleDateRangeCallback() {
      this.removeMouseoverHighlight();

      if (this.currentDateRangeType === 'from') {
        this.$emit('on-from-date-change');
      } else {
        this.$emit('on-to-date-change');
      }

      this.$emit('on-date-range-change', {
        from: this.getFromTimestamp,
        to: this.getToTimestamp
      });
    },

    handleDefaultSelect(cell) {
      if (this.allowedToShowView(this.nextView.down)) {
        this.setPageDate(new Date(cell.timestamp));
        this.$emit(`changed-${this.view}`, cell);
        this.setView(this.nextView.down);
        return;
      }

      this.resetTypedDate = this.utils.getNewDateObject();
      this.setDate(cell.timestamp);
      this.close();
    },

    handleFromDateRange(selectedDate) {
      const {
        timestamp
      } = selectedDate;

      if (!this.getToTimestamp) {
        this.setInitialDateRange({
          selectedDate,
          dateType: 'from'
        });
        return;
      }

      this.setValue(null);
      const isDateRangeValid = timestamp < this.getToTimestamp || timestamp === this.getToTimestamp;

      if (isDateRangeValid) {
        this.setFromDate(selectedDate);
      } else {
        this.handleInvalidDateRange({
          selectedDate,
          dateType: 'from'
        });
      }

      this.handleDateRangeCallback();
    },

    /**
     * Set the new pageDate and emit `changed-<view>` event
     */
    handlePageChange(pageDate) {
      this.setPageDate(pageDate);
      this.$emit(`changed-${this.nextView.up}`, pageDate);
    },

    /**
     * Emits a 'blur' event
     */
    handleInputBlur() {
      this.$emit('blur');
    },

    /**
     * Emits a 'focus' event
     */
    handleInputFocus() {
      this.$emit('focus');
    },

    handleInvalidDateRange({
      selectedDate,
      dateType
    }) {
      const {
        timestamp
      } = selectedDate;
      this.handleResetDateRange();
      this.setTemporaryValue(timestamp);

      if (dateType === 'from') {
        this.setFromDate(selectedDate);
      } else {
        this.setToDate(selectedDate);
      }
    },

    handleResetDateRange() {
      this.from = {};
      this.to = {};
      this.setValue(null);
      this.fromMouseover = null;
      this.toMouseover = null;
    },

    handleSelect(cell) {
      if (this.useDateRange) {
        this.handleDateRange(cell);
      } else {
        this.handleDefaultSelect(cell);
      }
    },

    /**
     * Emit a 'selected-disabled' event
     */
    handleSelectDisabled(cell) {
      this.$emit('selected-disabled', cell);
    },

    handleToDateRange(selectedDate) {
      const {
        timestamp
      } = selectedDate;

      if (!this.getFromTimestamp) {
        this.setInitialDateRange({
          selectedDate,
          dateType: 'to'
        });
        return;
      }

      this.setValue(null);
      const isDateRangeValid = timestamp > this.getFromTimestamp || timestamp === this.getFromTimestamp;

      if (isDateRangeValid) {
        this.setToDate(selectedDate);
      } else {
        this.handleInvalidDateRange({
          selectedDate,
          dateType: 'to'
        });
      }

      this.handleDateRangeCallback();
    },

    /**
     * Set the date from a 'typed-date' event
     */
    handleTypedDate(date) {
      this.setDate(date.valueOf());
    },

    /**
     * Initiate the component
     */

    /* eslint-disable */
    init() {
      if (this.value && !this.useDateRange) {
        let parsedValue = this.parseValue(this.value);
        const isDateDisabled = parsedValue && this.isDateDisabled(parsedValue);

        if (isDateDisabled) {
          parsedValue = null;
          this.$emit('input', parsedValue);
        }

        this.setValue(parsedValue);
      }

      if (this.isInline) {
        this.setInitialView();
      }
    },

    /* eslint-enable */

    /**
     * Returns true if a date is disabled
     * @param {Date} date
     */
    isDateDisabled(date) {
      return new DisabledDate(this.utils, this.disabledDates).isDateDisabled(date);
    },

    /**
     * Opens the calendar with the relevant view: 'day', 'month', or 'year'
     */
    open() {
      if (this.disabled || this.isInline) {
        return;
      }

      this.setInitialView();
      this.$emit('opened');
    },

    /**
     * Parse a datepicker value from string/number to date
     * @param {Date|String|Number|null} date
     */
    parseValue(date) {
      let dateTemp = date;

      if (typeof dateTemp === 'string' || typeof dateTemp === 'number') {
        const parsed = new Date(dateTemp);
        dateTemp = Number.isNaN(parsed.valueOf()) ? null : parsed;
      }

      return dateTemp;
    },

    removeMouseoverHighlight() {
      this.toMouseover = null;
      this.FromMouseover = null;
    },

    /**
     * Set the date, or go to the next view down
     */

    /**
     * Called in the event that the user navigates to date pages and
     * closes the picker without selecting a date.
     */
    resetDefaultPageDate() {
      if (this.selectedDate === null) {
        this.setPageDate();
        return;
      }

      this.setPageDate(this.selectedDate);
    },

    /**
     * Set the selected date
     * @param {Number} timestamp
     */
    setDate(timestamp) {
      const date = new Date(timestamp);
      this.selectedDate = date;
      this.setPageDate(date);
      this.$emit('selected', date);
      this.$emit('input', date);
    },

    setFromDate(cell) {
      this.from = this.getDateRangeValue(cell);
    },

    setInitialDateRange({
      selectedDate,
      dateType
    }) {
      const {
        timestamp
      } = selectedDate;
      this.setTemporaryValue(timestamp);

      if (dateType === 'from') {
        this.setFromDate(selectedDate);
      } else {
        this.setToDate(selectedDate);
      }

      this.handleDateRangeCallback();
    },

    setMouseoverHighlight(cell) {
      if (this.isEligibleToHighlightCell) {
        const {
          value
        } = this.getDateRangeValue(cell);

        if (this.currentDateRangeType === 'from') {
          this.fromMouseover = value;
        } else {
          this.toMouseover = value;
        }
      }
    },

    setTemporaryValue(timestamp) {
      const selectedDate = new Date(timestamp);
      const parsedValue = this.parseValue(selectedDate);
      this.setValue(parsedValue);
    },

    setToDate(cell) {
      this.to = this.getDateRangeValue(cell);
    },

    /**
     * Sets the initial picker page view: day, month or year
     */
    setInitialView() {
      const initialView = this.computedInitialView;

      if (!this.allowedToShowView(initialView)) {
        throw new Error(`initialView '${this.initialView}' cannot be rendered based on minimum '${this.minimumView}' and maximum '${this.maximumView}'`);
      }

      this.setView(initialView);
    },

    /**
     * Sets the date that the calendar should open on
     */
    setPageDate(date) {
      let dateTemp = date;

      if (!dateTemp) {
        if (this.openDate) {
          dateTemp = new Date(this.openDate);
        } else {
          dateTemp = new Date();
        }

        dateTemp = this.utils.resetDateTime(dateTemp);
      }

      this.pageTimestamp = this.utils.setDate(new Date(dateTemp), 1);
    },

    /**
     * Set the datepicker value
     * @param {Date|String|Number|null} date
     */
    setValue(date) {
      if (!date) {
        this.setPageDate();
        this.selectedDate = null;
        return;
      }

      this.selectedDate = date;
      this.setPageDate(date);
    },

    /**
     * Set the picker view
     */
    setView(view) {
      if (this.allowedToShowView(view)) {
        this.view = view;
      }
    },

    /**
     * Capitalizes the first letter
     */
    ucFirst(str) {
      return str[0].toUpperCase() + str.substring(1);
    }

  }
};

/* script */
const __vue_script__$8 = script$8;
/* template */
var __vue_render__$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "vdp-datepicker",
      class: [_vm.wrapperClass, { rtl: _vm.isRtl }]
    },
    [
      _c(
        "DateInput",
        {
          attrs: {
            id: _vm.id,
            autofocus: _vm.autofocus,
            "bootstrap-styling": _vm.bootstrapStyling,
            "calendar-button": _vm.calendarButton,
            "calendar-button-icon": _vm.calendarButtonIcon,
            "calendar-button-icon-content": _vm.calendarButtonIconContent,
            "clear-button": _vm.clearButton,
            "clear-button-icon": _vm.clearButtonIcon,
            disabled: _vm.disabled,
            format: _vm.format,
            inline: _vm.isInline,
            "is-open": _vm.isOpen,
            "input-class": _vm.inputClass,
            maxlength: _vm.maxlength,
            name: _vm.name,
            parser: _vm.parser,
            pattern: _vm.pattern,
            placeholder: _vm.placeholder,
            "ref-name": _vm.refName,
            required: _vm.required,
            "reset-typed-date": _vm.resetTypedDate,
            "selected-date": _vm.selectedDate,
            "show-calendar-on-button-click": _vm.showCalendarOnButtonClick,
            "show-calendar-on-focus": _vm.showCalendarOnFocus,
            tabindex: _vm.tabindex,
            translation: _vm.translation,
            typeable: _vm.typeable,
            "use-utc": _vm.useUtc
          },
          on: {
            blur: _vm.handleInputBlur,
            "clear-date": _vm.clearDate,
            close: _vm.close,
            focus: _vm.handleInputFocus,
            open: _vm.open,
            "typed-date": _vm.handleTypedDate
          }
        },
        [
          _vm._t("beforeDateInput", null, { slot: "beforeDateInput" }),
          _vm._v(" "),
          _vm._t("afterDateInput", null, { slot: "afterDateInput" }),
          _vm._v(" "),
          _vm._t("clearBtn", null, { slot: "clearBtn" }),
          _vm._v(" "),
          _vm._t("calendarBtn", null, { slot: "calendarBtn" })
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "Popup",
        {
          ref: "popup",
          attrs: {
            "append-to-body": _vm.appendToBody,
            "fixed-position": _vm.fixedPosition,
            inline: _vm.isInline,
            rtl: _vm.isRtl,
            visible: _vm.isOpen
          }
        },
        [
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.isOpen,
                  expression: "isOpen"
                }
              ],
              ref: "datepicker",
              staticClass: "vdp-datepicker__calendar",
              class: _vm.pickerClasses,
              on: {
                mousedown: function($event) {
                  $event.preventDefault();
                }
              }
            },
            [
              _vm._t("beforeCalendarHeader"),
              _vm._v(" "),
              _c(
                _vm.picker,
                {
                  tag: "Component",
                  attrs: {
                    "day-cell-content": _vm.dayCellContent,
                    "disabled-dates": _vm.disabledDates,
                    "first-day-of-week": _vm.firstDayOfWeek,
                    highlighted: _vm.highlightedDate,
                    "use-date-range": _vm.useDateRange,
                    "is-rtl": _vm.isRtl,
                    "is-up-disabled": _vm.isUpDisabled,
                    "page-date": _vm.pageDate,
                    "selected-date": _vm.selectedDate,
                    "show-edge-dates": _vm.showEdgeDates,
                    "show-full-month-name": _vm.fullMonthName,
                    "show-header": _vm.showHeader,
                    translation: _vm.translation,
                    "use-utc": _vm.useUtc,
                    "year-range": _vm.yearPickerRange
                  },
                  on: {
                    "page-change": _vm.handlePageChange,
                    select: _vm.handleSelect,
                    "select-disabled": _vm.handleSelectDisabled,
                    "set-view": _vm.setView,
                    "set-highlighted-date": _vm.setMouseoverHighlight,
                    "remove-highlighted-date": _vm.removeMouseoverHighlight
                  }
                },
                [
                  _vm._l(_vm.calendarSlots, function(slotKey) {
                    return [_vm._t(slotKey, null, { slot: slotKey })]
                  })
                ],
                2
              ),
              _vm._v(" "),
              _vm._t("calendarFooter")
            ],
            2
          )
        ]
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  const __vue_inject_styles__$8 = undefined;
  /* scoped */
  const __vue_scope_id__$8 = undefined;
  /* module identifier */
  const __vue_module_identifier__$8 = undefined;
  /* functional template */
  const __vue_is_functional_template__$8 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$8 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    false,
    undefined,
    undefined,
    undefined
  );

export default __vue_component__$8;
//# sourceMappingURL=Datepicker.esm.js.map
