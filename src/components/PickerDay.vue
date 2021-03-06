<template>
  <div class="picker-view">
    <slot name="beforeCalendarHeaderDay" />
    <PickerHeader
      v-if="showHeader"
      :is-next-disabled="isNextDisabled"
      :is-previous-disabled="isPreviousDisabled"
      :is-rtl="isRtl"
      @next="nextPage"
      @previous="previousPage"
    >
      <span
        :class="{ up: !isUpDisabled }"
        class="day__month_btn"
        @click="$emit('set-view', 'month')"
      >
        {{ pageTitleDay }}
      </span>
      <slot slot="nextIntervalBtn" name="nextIntervalBtn" />
      <slot slot="prevIntervalBtn" name="prevIntervalBtn" />
    </PickerHeader>
    <div :class="{ 'flex-rtl': isRtl }">
      <div class="day-header-wrapper">
        <span v-for="day in daysOfWeek" :key="day" class="day-header">
          {{ day }}
        </span>
      </div>
      <div ref="cells" class="date-wrapper">
        <span
          v-for="cell in cells"
          :key="cell.timestamp"
          class="cell day"
          :class="dayClasses(cell)"
          @click="select(cell)"
        >
          {{ dayCellContent(cell) }}
        </span>
      </div>
    </div>
    <slot name="calendarFooterDay" />
  </div>
</template>

<script>
import pickerMixin from '~/mixins/pickerMixin.vue'
import DisabledDate from '~/utils/DisabledDate'
import HighlightedDate from '~/utils/HighlightedDate'

export default {
  name: 'PickerDay',
  mixins: [pickerMixin],
  props: {
    dayCellContent: {
      type: Function,
      default: (day) => day.date,
    },
    highlighted: {
      type: Object,
      default() {
        return {}
      },
    },
    firstDayOfWeek: {
      type: String,
      default: 'sun',
    },
    showFullMonthName: {
      type: Boolean,
      default: false,
    },
    showEdgeDates: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    /**
     * Sets an array with all days to show this month
     * @return {Array}
     */
    cells() {
      const days = []
      const daysInCalendar =
        this.daysFromPrevMonth + this.daysInMonth + this.daysFromNextMonth
      const dObj = this.firstCellDate()

      for (let i = 0; i < daysInCalendar; i += 1) {
        days.push(this.makeDay(i, dObj))
        this.utils.setDate(dObj, this.utils.getDate(dObj) + 1)
      }

      return days
    },
    /**
     * Gets the name of the month the current page is on
     * @return {String}
     */
    currMonthName() {
      const monthName = this.showFullMonthName
        ? this.translation.months
        : this.translation.monthsAbbr

      return this.utils.getMonthNameAbbr(this.pageMonth, monthName)
    },
    /**
     * Gets the name of the year that current page is on
     * @return {String}
     */
    currYearName() {
      const { yearSuffix } = this.translation
      return `${this.pageYear}${yearSuffix}`
    },
    /**
     * Returns an array of day names
     * @return {String[]}
     */
    daysOfWeek() {
      return this.translation.getDaysStartingOn(this.firstDayOfWeekNumber)
    },
    /**
     * Returns the number of days in this month
     * @return {String[]}
     */
    daysInMonth() {
      return this.utils.getDaysInMonth(this.pageDate)
    },
    /**
     * Calculates how many days to show from the previous month
     * @return {number}
     */
    daysFromPrevMonth() {
      const firstOfMonthDayNumber = this.utils.getDay(this.pageDate)
      return (7 - this.firstDayOfWeekNumber + firstOfMonthDayNumber) % 7
    },
    /**
     * Calculates how many days to show from the next month
     * @return {number}
     */
    daysFromNextMonth() {
      const daysThisAndPrevMonth = this.daysFromPrevMonth + this.daysInMonth
      return Math.ceil(daysThisAndPrevMonth / 7) * 7 - daysThisAndPrevMonth
    },
    /**
     * Returns first-day-of-week as a number (Sunday is 0)
     * @return {Number}
     */
    firstDayOfWeekNumber() {
      return this.utils.getDayFromAbbr(this.firstDayOfWeek)
    },
    /**
     * A look-up object created from 'highlighted' prop
     * @return {Object}
     */
    highlightedConfig() {
      return new HighlightedDate(
        this.utils,
        this.disabledDates,
        this.highlighted,
      ).config
    },
    /**
     * Is the next month disabled?
     * @return {Boolean}
     */
    isNextDisabled() {
      if (!this.disabledConfig.has.from) {
        return false
      }
      return (
        this.disabledConfig.from.month <= this.pageMonth &&
        this.disabledConfig.from.year <= this.pageYear
      )
    },
    /**
     * Is the previous month disabled?
     * @return {Boolean}
     */
    isPreviousDisabled() {
      if (!this.disabledConfig.has.to) {
        return false
      }
      return (
        this.disabledConfig.to.month >= this.pageMonth &&
        this.disabledConfig.to.year >= this.pageYear
      )
    },
    /**
     * Returns the current page's month as an integer.
     * @return {Number}
     */
    pageMonth() {
      return this.utils.getMonth(this.pageDate)
    },
    /**
     * Display the current page's month & year as the title.
     * @return {String}
     */
    pageTitleDay() {
      return this.translation.ymd
        ? `${this.currYearName} ${this.currMonthName}`
        : `${this.currMonthName} ${this.currYearName}`
    },
    /**
     * The first day of the next page's month.
     * @return {Date}
     */
    firstOfNextMonth() {
      const d = new Date(this.pageDate)
      return new Date(this.utils.setMonth(d, this.utils.getMonth(d) + 1))
    },
  },
  methods: {
    /**
     * Changes the page up or down (overrides changePage in pickerMixin)
     * @param {Number} incrementBy
     */
    changePage(incrementBy) {
      const date = this.pageDate
      this.utils.setMonth(date, this.utils.getMonth(date) + incrementBy)

      this.$emit('page-change', date)
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
        'today': day.isToday,
        'weekend': day.isWeekend,
        'sat': day.isSaturday,
        'sun': day.isSunday,
        'highlight-start': day.isHighlightStart,
        'highlight-end': day.isHighlightEnd,
      }
    },
    /**
     * Whether a day is disabled
     * @param {Date} date to check if disabled
     * @return {Boolean}
     */
    isDisabledDate(date) {
      return new DisabledDate(this.utils, this.disabledDates).isDateDisabled(
        date,
      )
    },
    /**
     * Whether a day is highlighted
     * (only if it is not disabled already except when highlighted.includeDisabled is true)
     * @param {Date} date to check if highlighted
     * @return {Boolean}
     */
    isHighlightedDate(date) {
      const dateWithoutTime = this.utils.resetDateTime(date)

      return new HighlightedDate(
        this.utils,
        this.disabledDates,
        this.highlighted,
      ).isDateHighlighted(dateWithoutTime)
    },
    /**
     * Whether a day is highlighted and it is the last date
     * in the highlighted range of dates
     * @param {Date} date end highlight
     * @return {Boolean}
     */
    isHighlightEnd(date) {
      const config = this.highlightedConfig

      return (
        this.isHighlightedDate(date) &&
        config.to.year === this.utils.getFullYear(date) &&
        config.to.month === this.utils.getMonth(date) &&
        config.to.day === this.utils.getDate(date)
      )
    },
    /**
     * Whether a day is highlighted and it is the first date
     * in the highlighted range of dates
     * @param {Date} date start highlight
     * @return {Boolean}
     */
    isHighlightStart(date) {
      const config = this.highlightedConfig

      return (
        this.isHighlightedDate(date) &&
        config.from.year === this.utils.getFullYear(date) &&
        config.from.month === this.utils.getMonth(date) &&
        config.from.day === this.utils.getDate(date)
      )
    },
    /**
     * Whether a day is selected
     * @param {Date} dObj to check if selected
     * @return {Boolean}
     */
    isSelectedDate(dObj) {
      return (
        this.selectedDate && this.utils.compareDates(this.selectedDate, dObj)
      )
    },
    /**
     * Defines the objects within the days array
     * @param  {id}  id
     * @param  {Date}  dObj
     * @return {Object}
     */
    // eslint-disable-next-line complexity
    makeDay(id, dObj) {
      const isNextMonth = dObj >= this.firstOfNextMonth
      const isPreviousMonth = dObj < this.pageDate
      const isSaturday = this.utils.getDay(dObj) === 6
      const isSunday = this.utils.getDay(dObj) === 0
      const showDate = this.showEdgeDates || !(isPreviousMonth || isNextMonth)

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
        isNextMonth,
      }
    },
    /**
     * Set up a new date object to the first day of the current 'page'
     * @return Date
     */
    firstCellDate() {
      const d = this.pageDate

      const firstOfMonth = this.useUtc
        ? new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1))
        : new Date(
            d.getFullYear(),
            d.getMonth(),
            1,
            d.getHours(),
            d.getMinutes(),
          )

      return new Date(
        firstOfMonth.setDate(firstOfMonth.getDate() - this.daysFromPrevMonth),
      )
    },
  },
}
</script>
