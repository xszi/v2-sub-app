import { authorizeStatusList } from '@/utils/dict'
const authStatusOptions = [
  { text: '全部', value: '' },
  ...authorizeStatusList
]
const slientForm = {
  subject: [{
    type: 'text',
    prop: 'agentSubjectName',
    label: '名称/姓名',
    placeholder: '请输入主体名称'
  },
  {
    type: 'text',
    prop: 'certNo',
    label: '证件号码',
    placeholder: '请输入主体证件号'
  },
  {
    type: 'daterange',
    label: '创建日期',
    prop: 'createDate',
    dateFormate: 'yyyy-MM-dd',
    startProp: 'createBeginTime',
    endProp: 'createEndTime'
  },
  {
    type: 'text',
    prop: 'businessBaleName',
    label: '委托授权产品',
    placeholder: '请输入委托授权关联业务产品'
  }
    /* {
         type: 'text',
         prop: 'pName2',
         label: '静默授权产品',
         placeholder: '请输入静默授权关联业务产品'
     }*/
  ],
  delegate: [{
    type: 'text',
    prop: 'code',
    label: '委托授权编号'
  },
  {
    type: 'text',
    prop: 'agentSubjectName',
    label: '授权对象'
  },
  {
    type: 'select',
    prop: 'authorizeType',
    label: '授权方式',
    optionList: [{
      text: '全部',
      value: null
    },
    {
      text: '在线授权',
      value: [1]
    }, {
      text: '线下授权',
      value: [2]
    }
    ]
  },
  {
    type: 'text',
    prop: 'businessBaleName',
    label: '关联业务产品',
    placeholder: '请输入委托授权关联业务产品'
  },
  {
    type: 'daterange',
    label: '创建日期',
    prop: 'createTime',
    dateFormate: 'yyyy-MM-dd',
    startProp: 'createBeginTime',
    endProp: 'createEndTime'
  },
  {
    type: 'daterange',
    label: '授权起始日期',
    prop: 'startTime',
    dateFormate: 'yyyy-MM-dd',
    startProp: 'termStartBeginTime',
    endProp: 'termStartEndTime'
  },
  {
    type: 'daterange',
    label: '授权截止日期',
    prop: 'endTime',
    dateFormate: 'yyyy-MM-dd',
    startProp: 'termEndBeginTime',
    endProp: 'termEndEndTime'
  },
  {
    type: 'select',
    prop: 'authorizeStatus',
    label: '授权状态',
    optionList: authStatusOptions
  }
  ],
  slient: [{
    type: 'text',
    prop: 'uploader',
    label: '上传人'
  },

  {
    type: 'text',
    prop: 'selectProducts',
    label: '关联业务产品'
  },
  {
    type: 'daterange',
    label: '创建日期',
    prop: 'createTime',
    dateFormate: 'yyyy-MM-dd',
    startProp: 'startCreatedTime',
    endProp: 'endCreatedTime'
  },
  {
    type: 'daterange',
    label: '授权起始日期',
    prop: 'startTime',
    dateFormate: 'yyyy-MM-dd',
    startProp: 'startTermStartTime',
    endProp: 'endTermStartTime'
  },
  {
    type: 'daterange',
    label: '授权截止日期',
    prop: 'endTime',
    dateFormate: 'yyyy-MM-dd',
    startProp: 'startTermEndTime',
    endProp: 'endTermEndTime'
  },
  {
    type: 'select',
    prop: 'status',
    label: '授权状态',
    optionList: authStatusOptions
  }
  ]

}

export {
  slientForm
}
