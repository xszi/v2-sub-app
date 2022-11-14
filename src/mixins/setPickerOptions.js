import { pickerOptions } from '@/utils/dict'
export default {
  data() {
    return {
      mxFirstDate: null,
      mxPickerOptions: {
        ...pickerOptions
      }
    }
  },
  created() {
    this.mxPickerOptions.onPick = (time) => {
      this.mxFirstDate = !time.maxDate ? time.minDate.getTime() : null
    }
    this.mxPickerOptions.disabledDate = (time) => {
      if (!this.mxFirstDate) return false
      const nowDate = new Date(new Date().toLocaleDateString()).getTime()
      return this.mxFirstDate >= nowDate ? false : time.getTime() < nowDate
    }
  }
}
