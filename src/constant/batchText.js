const batchText = '批量业务发起，在进行批量发起前，请先下载该业务批量发起对应的Excel模板，在模板中录参，并将该Excel根据该Excel模板对应服务产品、公证事项、公证合同路径导入。一次业务批量发起，最多不得超过30笔订单'
const processStatusOptions = [{
  label: '全部',
  value: -1
},
{
  label: '预审',
  value: 10
},
{
  label: '申办',
  value: 20
},
{
  label: '受理',
  value: 30
}, {
  label: '完结',
  value: 40
}
]
const batchstepMap = [{
  title: '批量发起',
  value: 0
},
{
  title: '订单确认',
  value: 1
}, {
  title: '等待签署',
  value: 2
}
]
export {
  batchText,
  batchstepMap,
  processStatusOptions
}
