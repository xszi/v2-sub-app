export const pickerOptions = {
  shortcuts: [{
    text: '最近一个月',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      end.setTime(start.getTime() + 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      end.setTime(start.getTime() + 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近六个月',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      end.setTime(start.getTime() + 3600 * 1000 * 24 * 180)
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近一年',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      end.setTime(start.getTime() + 3600 * 1000 * 24 * 360)
      picker.$emit('pick', [start, end])
    }
  }
  ],
  disabledDate: time => {
    // if (this.pickerMinDate) {
    //     const day1 = 7 * 24 * 3600 * 1000 // 可选的时间范围不超过7天
    //     let maxTime = this.pickerMinDate + day1
    //     let minTime = this.pickerMinDate - day1
    //     console.log('return', time.getTime() > maxTime || time.getTime() < minTime) // 输出查看布尔值
    //     return time.getTime() > maxTime || time.getTime() < minTime
    // }
  }
}
export const mandateList = [
  { text: '半年', value: 1 },
  { text: '一年', value: 2 },
  { text: '两年', value: 3 },
  { text: '长期', value: 4 }
]
export const certTypeList = [
  { text: '居民身份证', value: 111 }
]
export const certTypeObj = {
  111: '居民身份证'
}

export const subjectSubTypeList = [
  { text: '大陆自然人', value: 10 }
]
export const subjectSubTypeObj = {
  10: '大陆自然人'
}
// 主体性别
export const genderDict = [{ code: 0, name: '女' }, { code: 1, name: '男' }]
// 授权方式 { text: '在线授权', value: 1 },
export const authorizeTypeList = [{ text: '线下授权', value: 2 }]
export const authorizeTypeObj = { 1: '在线授权', 2: '线下授权' }

// 用印类型
// { text: '法人印章', value: 2 }
export const signMethodList = [{ text: '企业公章', value: 1 }]
export const signMethodObj = { 1: '企业公章', 2: '法人印章' }

// 授权状态
export const authorizeStatusList = [
  { text: '不通过', value: 0 },
  { text: '审核中', value: 1 },
  { text: '待生效', value: 2 },
  { text: '生效中', value: 3 },
  { text: '即将过期', value: 4 },
  { text: '已失效', value: 5 }
]
export const authorizeStatusObj = {
  0: '不通过',
  1: '审核中',
  2: '待生效',
  3: '生效中',
  4: '即将过期',
  5: '已失效'
}
export const statusColorObj = {
  0: 'text-gray',
  1: 'text-blue',
  2: 'text-green-1',
  3: 'text-green',
  4: 'text-red',
  5: 'text-gray'
}

export const prefixObj = { 1: '新增', 2: '编辑', 3: '变更', 4: '展期' }

