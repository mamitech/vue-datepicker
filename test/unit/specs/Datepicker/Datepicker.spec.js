import { mount, shallowMount } from '@vue/test-utils'
import { addDays } from 'date-fns'
import { he } from '~/locale'
import DateInput from '~/components/DateInput.vue'
import Datepicker from '~/components/Datepicker.vue'

describe('Datepicker unmounted', () => {
  it('has a mounted hook', () => {
    expect(typeof Datepicker.mounted).toEqual('function')
  })

  it('sets the correct default data', () => {
    expect(typeof Datepicker.data).toEqual('function')
    const defaultData = Datepicker.data()
    const defaultProps = Datepicker.props
    expect(defaultData.selectedDate).toEqual(null)
    expect(defaultData.view).toEqual('')
    expect(defaultData.calendarHeight).toEqual(0)

    expect(typeof defaultProps.fixedPosition.validator).toEqual('function')
    expect(defaultProps.fixedPosition.validator('bottom')).toBeTruthy()
    expect(defaultProps.fixedPosition.validator(true)).toBeFalsy()
  })
})

describe('Datepicker mounted', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Datepicker)
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('should emit blur', () => {
    const input = wrapper.find('input')
    input.trigger('blur')
    expect(wrapper.emitted().blur).toBeTruthy()
  })

  it('should emit focus', () => {
    const input = wrapper.find('input')
    input.trigger('focus')
    expect(wrapper.emitted().focus).toBeTruthy()
  })

  it('should toggle when the input field is clicked', async () => {
    const input = wrapper.find('input')
    await input.trigger('click')

    expect(wrapper.vm.isOpen).toBeTruthy()

    await input.trigger('click')
    expect(wrapper.vm.isOpen).toBeFalsy()
  })

  it('should open on focusing the input when showCalendarOnFocus = true', async () => {
    await wrapper.setProps({
      showCalendarOnFocus: true,
    })
    const input = wrapper.find('input')

    await input.trigger('focus')

    expect(wrapper.vm.isOpen).toBeTruthy()
  })

  it('should toggle via the calendar button', async () => {
    await wrapper.setProps({
      calendarButton: true,
    })

    const calendarButton = wrapper.find('.vdp-datepicker__calendar-button')
    await calendarButton.trigger('click')
    expect(wrapper.vm.isOpen).toBeTruthy()

    await calendarButton.trigger('click')
    expect(wrapper.vm.isOpen).toBeFalsy()
  })

  it('should toggle via the calendar button when showCalendarOnFocus = true', async () => {
    await wrapper.setProps({
      calendarButton: true,
      showCalendarOnFocus: true,
    })

    const calendarButton = wrapper.find('.vdp-datepicker__calendar-button')

    await calendarButton.trigger('click')
    expect(wrapper.vm.isOpen).toBeTruthy()

    await calendarButton.trigger('click')
    expect(wrapper.vm.isOpen).toBeFalsy()
  })

  it('should close via the calendar button, despite input being focused', async () => {
    await wrapper.setProps({
      calendarButton: true,
      showCalendarOnFocus: true,
    })

    const input = wrapper.find('input')
    const calendarButton = wrapper.find('span.vdp-datepicker__calendar-button')

    await input.trigger('focus')
    expect(wrapper.vm.isOpen).toBeTruthy()

    await input.trigger('blur')
    await calendarButton.trigger('click')
    expect(wrapper.vm.isOpen).toBeFalsy()
  })

  it('resets the date correctly when typeable', async () => {
    wrapper.setProps({
      typeable: true,
    })

    const input = wrapper.find('input')
    await input.trigger('click')
    await input.setValue('1 Jan 2000')
    await input.trigger('keydown.enter')
    expect(wrapper.vm.selectedDate).toEqual(new Date(2000, 0, 1))

    await wrapper.setProps({
      value: new Date(2016, 1, 15),
    })

    expect(wrapper.vm.selectedDate).toEqual(new Date(2016, 1, 15))
  })
})

describe('Datepicker shallowMounted', () => {
  let wrapper
  let date
  beforeEach(() => {
    date = new Date(2016, 1, 15)
    wrapper = shallowMount(Datepicker, {
      propsData: {
        format: 'yyyy-MM-dd',
        value: date,
      },
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('correctly sets the value when created', () => {
    expect(wrapper.vm.value).toEqual(date)
  })

  it('correctly sets the value from method', () => {
    const newDate = new Date(2016, 9, 15)
    expect(typeof wrapper.vm.setValue).toEqual('function')
    wrapper.vm.setValue(newDate)
    expect(wrapper.vm.selectedDate).toEqual(newDate)
    const now = new Date()
    wrapper.vm.setValue()
    expect(wrapper.vm.selectedDate).toEqual(null)
    const pageDate = new Date(wrapper.vm.pageDate)
    expect(pageDate.getFullYear()).toEqual(now.getFullYear())
    expect(pageDate.getMonth()).toEqual(now.getMonth())
    expect(pageDate.getDate()).toEqual(1)
  })

  it('sets the date', () => {
    const dateTemp = new Date(2016, 9, 9)
    const wrapperTemp = shallowMount(Datepicker, {
      propsData: {
        format: 'yyyy-MM-dd',
      },
    })
    wrapperTemp.vm.setDate(dateTemp.valueOf())
    expect(wrapperTemp.vm.selectedDate.valueOf()).toEqual(dateTemp.valueOf())
  })

  it('clears the date', () => {
    const dateTemp = new Date(2016, 9, 9)
    const wrapperTemp = shallowMount(Datepicker)
    wrapperTemp.vm.setDate(dateTemp.valueOf())
    wrapperTemp.vm.clearDate()
    expect(wrapperTemp.vm.selectedDate).toEqual(null)
  })

  it('should set pageTimestamp to be now', () => {
    const data = Datepicker.data()
    const d = new Date(data.pageTimestamp)
    expect(d.getFullYear()).toEqual(new Date().getFullYear())
    expect(d.getMonth()).toEqual(new Date().getMonth())
    expect(d.getDate()).toEqual(1)
  })

  it('should open and close the calendar', () => {
    wrapper.vm.close()
    expect(wrapper.vm.isOpen).toEqual(false)

    wrapper.vm.setView('month')
    expect(wrapper.vm.isOpen).toEqual(true)

    wrapper.vm.close()
    expect(wrapper.vm.isOpen).toEqual(false)

    wrapper.vm.setView('year')
    expect(wrapper.vm.isOpen).toEqual(true)

    wrapper.vm.close()
    expect(wrapper.vm.isOpen).toEqual(false)

    wrapper.vm.setView('day')
    expect(wrapper.vm.isOpen).toEqual(true)

    wrapper.vm.close()
    expect(wrapper.vm.isOpen).toEqual(false)

    wrapper.vm.setView('nonsense')
    expect(wrapper.vm.isOpen).toEqual(false)
  })

  it('should emit `selected-disabled` on selecting a disabled cell', () => {
    wrapper.vm.handleSelectDisabled({ isDisabled: true })
    expect(wrapper.emitted('selected-disabled')).toBeTruthy()
  })

  it('can select a day', () => {
    const dateTemp = new Date(2016, 9, 1)
    wrapper.vm.setView('day')
    wrapper.vm.handleSelect({ timestamp: dateTemp.valueOf() })
    expect(wrapper.vm.pageTimestamp).toEqual(dateTemp.valueOf())
    expect(wrapper.vm.selectedDate.getMonth()).toEqual(9)
    expect(wrapper.emitted().selected).toBeTruthy()
  })

  it('can select a month', () => {
    const dateTemp = new Date(2016, 9, 9)
    wrapper.vm.setView('month')
    wrapper.vm.handleSelect({ timestamp: dateTemp.valueOf() })
    expect(wrapper.emitted('changed-month')).toBeTruthy()
    expect(wrapper.emitted('changed-month')[0][0].timestamp).toEqual(
      dateTemp.valueOf(),
    )
    expect(new Date(wrapper.vm.pageTimestamp).getMonth()).toEqual(
      dateTemp.getMonth(),
    )
    expect(wrapper.vm.picker).toEqual('PickerDay')
  })

  it('can select a year', () => {
    const dateTemp = new Date(2018, 9, 9)
    wrapper.vm.setView('year')
    wrapper.vm.handleSelect({ timestamp: dateTemp.valueOf() })
    expect(wrapper.emitted('changed-year')).toBeTruthy()
    expect(wrapper.emitted('changed-year')[0][0].timestamp).toEqual(
      dateTemp.valueOf(),
    )
    expect(new Date(wrapper.vm.pageTimestamp).getFullYear()).toEqual(
      dateTemp.getFullYear(),
    )
    expect(wrapper.vm.picker).toEqual('PickerMonth')
  })

  it('resets the default page date', () => {
    const wrapperTemp = shallowMount(Datepicker)
    const today = new Date()
    expect(wrapperTemp.vm.pageDate.getFullYear()).toEqual(today.getFullYear())
    expect(wrapperTemp.vm.pageDate.getMonth()).toEqual(today.getMonth())
    expect(wrapperTemp.vm.pageDate.getDate()).toEqual(1)
    wrapperTemp.vm.resetDefaultPageDate()
    expect(wrapperTemp.vm.pageDate.getFullYear()).toEqual(today.getFullYear())
    expect(wrapperTemp.vm.pageDate.getMonth()).toEqual(today.getMonth())
    expect(wrapperTemp.vm.pageDate.getDate()).toEqual(1)
  })

  it('does not set the default page date if a date is selected', () => {
    const wrapperTemp = shallowMount(Datepicker)
    const today = new Date()
    const pastDate = new Date(2018, 3, 20)
    expect(wrapperTemp.vm.pageDate.getFullYear()).toEqual(today.getFullYear())
    expect(wrapperTemp.vm.pageDate.getMonth()).toEqual(today.getMonth())
    expect(wrapperTemp.vm.pageDate.getDate()).toEqual(1)
    wrapperTemp.vm.setDate(pastDate.valueOf())
    wrapperTemp.vm.resetDefaultPageDate()
    expect(wrapperTemp.vm.pageDate.getFullYear()).toEqual(
      pastDate.getFullYear(),
    )
    expect(wrapperTemp.vm.pageDate.getMonth()).toEqual(pastDate.getMonth())
    expect(wrapperTemp.vm.pageDate.getDate()).toEqual(1)
  })

  it('sets the date on typedDate event', () => {
    const wrapperTemp = shallowMount(Datepicker)
    const today = new Date()
    wrapperTemp.vm.handleTypedDate(today)
    expect(wrapperTemp.vm.selectedDate).toEqual(today)
  })

  it('watches value', async () => {
    const wrapperTemp = shallowMount(Datepicker, {
      propsData: {
        value: '2018-01-01',
      },
    })
    const spy = jest.spyOn(wrapperTemp.vm, 'setValue')
    wrapperTemp.setProps({ value: '2018-04-26' })
    await wrapperTemp.vm.$nextTick()
    expect(spy).toHaveBeenCalled()
  })

  it('watches openDate', async () => {
    const wrapperTemp = shallowMount(Datepicker, {
      propsData: {
        openDate: new Date(2018, 0, 1),
      },
    })
    const spy = jest.spyOn(wrapperTemp.vm, 'setPageDate')
    wrapperTemp.setProps({ openDate: new Date(2018, 3, 26) })
    await wrapperTemp.vm.$nextTick()
    expect(spy).toHaveBeenCalled()
  })

  it('watches initialView', async () => {
    const wrapperTemp = shallowMount(Datepicker, {
      propsData: {
        initialView: 'day',
      },
    })
    const spy = jest.spyOn(wrapperTemp.vm, 'setInitialView')

    await wrapperTemp.setProps({ initialView: 'month' })

    expect(spy).toHaveBeenCalled()
  })

  it('derives `picker` from the current `view`', async () => {
    await wrapper.setProps({
      initialView: 'day',
    })

    expect(wrapper.vm.picker).toBe('PickerDay')
    await wrapper.setProps({ initialView: 'month' })

    expect(wrapper.vm.picker).toBe('PickerMonth')
  })

  it('sets picker classes correctly', async () => {
    await wrapper.setProps({
      calendarClass: 'my-calendar-class',
      inline: true,
    })

    await wrapper.vm.$nextTick()
    const datepicker = wrapper.find('.vdp-datepicker__calendar')

    expect(datepicker.element.className).toContain('vdp-datepicker__calendar')
    expect(datepicker.element.className).toContain('my-calendar-class')
    expect(datepicker.element.className).toContain('inline')
    expect(datepicker.element.className).not.toContain('rtl')

    await wrapper.setProps({
      appendToBody: true,
      language: he,
    })

    expect(datepicker.element.className).toContain('rtl')
  })

  it('should emit changed-month/year/decade', async () => {
    const pageDate = new Date(2016, 2, 1)
    await wrapper.vm.setView('day')
    await wrapper.vm.handlePageChange(pageDate)

    expect(wrapper.emitted('changed-month')).toBeTruthy()

    await wrapper.vm.setView('month')
    await wrapper.vm.handlePageChange(pageDate)
    expect(wrapper.emitted('changed-year')).toBeTruthy()

    await wrapper.vm.setView('year')
    await wrapper.vm.handlePageChange(pageDate)
    expect(wrapper.emitted('changed-decade')).toBeTruthy()
  })

  it('should clear date on default date disabled', async () => {
    const someDate = new Date('2021-01-15')
    const wrapperTemp = shallowMount(Datepicker, {
      propsData: {
        value: someDate,
        disabledDates: {
          customPredictor(customPredictorDate) {
            if (customPredictorDate < addDays(someDate, 4)) {
              return true
            }
            return false
          },
        },
      },
    })
    await wrapperTemp.vm.$nextTick()
    expect(wrapperTemp.vm.selectedDate).toEqual(null)
    expect(wrapperTemp.emitted().input).toBeTruthy()
  })
})

describe('Datepicker.vue set by string', () => {
  let wrapper
  it('can parse a string date', () => {
    wrapper = shallowMount(Datepicker, {
      propsData: {
        format: 'yyyy MM dd',
        value: '2016-02-20',
      },
    })
    const date = new Date('2016-02-20')
    expect(wrapper.vm.selectedDate.getFullYear()).toEqual(date.getFullYear())
    expect(wrapper.vm.selectedDate.getMonth()).toEqual(date.getMonth())
    expect(wrapper.vm.selectedDate.getDate()).toEqual(date.getDate())
  })

  it('should nullify malformed value', () => {
    wrapper = shallowMount(Datepicker, {
      propsData: {
        value: 'today',
      },
    })
    expect(wrapper.vm.selectedDate).toBeNull()
  })
})

describe('Datepicker.vue set by timestamp', () => {
  let wrapper
  it('can parse unix timestamp', () => {
    wrapper = shallowMount(Datepicker, {
      propsData: {
        format: 'yyyy MM dd',
        value: new Date(Date.UTC(2018, 0, 29)).valueOf(),
      },
    })
    expect(wrapper.vm.selectedDate.getUTCFullYear()).toEqual(2018)
    expect(wrapper.vm.selectedDate.getUTCMonth()).toEqual(0)
    expect(wrapper.vm.selectedDate.getUTCDate()).toEqual(29)
  })
})

describe('Datepicker.vue using UTC', () => {
  let wrapper
  it('correctly sets the value using UTC', async () => {
    const timezoneOffset = new Date().getTimezoneOffset() / 60

    // this is ambiguous because localzone differs by one day than UTC
    const ambiguousHour = 25 - timezoneOffset
    const ambiguousDate = new Date(2018, 3, 15, ambiguousHour)
    const ambiguousYear = ambiguousDate.getUTCFullYear()
    const ambiguousMonth = `0${ambiguousDate.getUTCMonth() + 1}`.slice(-2)
    const ambiguousDay = `0${ambiguousDate.getUTCDate()}`.slice(-2)
    const UTCString = `${ambiguousYear} ${ambiguousMonth} ${ambiguousDay}`

    // It's important to use the `mount` helper here
    wrapper = mount(Datepicker, {
      propsData: {
        format: 'yyyy MM dd',
        value: ambiguousDate,
        useUtc: true, // This should fail if `useUtc=false`
      },
    })
    // It's important to assert the input rendered output
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(DateInput).vm.formattedValue).toEqual(
      UTCString,
    )
  })
})

describe('Datepicker.vue inline', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Datepicker, {
      propsData: {
        inline: true,
      },
    })
  })

  afterEach(() => {
    wrapper.vm.$destroy()
  })

  it('should show calendar as already open', () => {
    expect(wrapper.vm.isOpen).toEqual(true)
    expect(wrapper.vm.isInline).toEqual(true)
  })

  it('should not close the calendar when date is selected', () => {
    const date = new Date()
    wrapper.vm.handleSelect({ timestamp: date.valueOf() })
    expect(wrapper.vm.isOpen).toEqual(true)
    document.body.click()
    expect(wrapper.vm.isOpen).toEqual(true)
  })
})

describe('Datepicker with initial-view', () => {
  let wrapper
  it('should open in Day view', () => {
    wrapper = shallowMount(Datepicker)
    wrapper.vm.open()
    expect(wrapper.vm.computedInitialView).toEqual('day')
    expect(wrapper.vm.picker).toEqual('PickerDay')
  })

  it('should open in Month view', () => {
    wrapper = shallowMount(Datepicker, {
      propsData: {
        initialView: 'month',
      },
    })
    wrapper.vm.open()
    expect(wrapper.vm.computedInitialView).toEqual('month')
    expect(wrapper.vm.picker).toEqual('PickerMonth')
  })

  it('should open in Year view', () => {
    wrapper = shallowMount(Datepicker, {
      propsData: {
        initialView: 'year',
      },
    })
    wrapper.vm.open()
    expect(wrapper.vm.computedInitialView).toEqual('year')
    expect(wrapper.vm.picker).toEqual('PickerYear')
  })

  it('should not open if the calendar is disabled', () => {
    wrapper = shallowMount(Datepicker, {
      propsData: {
        disabled: true,
      },
    })
    wrapper.vm.open()
    expect(wrapper.vm.isOpen).toBeFalsy()
  })
})

describe('Datepicker on body', () => {
  let wrapper
  it('should append popup to body', async () => {
    wrapper = mount(Datepicker, {
      propsData: {
        appendToBody: true,
      },
    })
    wrapper.vm.open()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$el.querySelector('.vdp-datepicker__calendar')).toBeNull()
    expect(document.querySelector('.vdp-datepicker__calendar')).toBeDefined()
    wrapper.vm.$destroy()
  })

  it('should remove popup on body on component removal', async () => {
    wrapper = mount(Datepicker, {
      propsData: {
        appendToBody: true,
      },
    })
    wrapper.vm.open()
    await wrapper.vm.$nextTick()
    wrapper.vm.$destroy()
    expect(document.querySelector('.vdp-datepicker__calendar')).toBeNull()
  })
})
