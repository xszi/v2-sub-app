const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  stepMap: state => state.createRecord.stepMap,
  dialogLoading: state => state.createRecord.dialogLoading,
  fullLoading: state => state.createRecord.fullLoading,
  showStep: state => state.createRecord.showStep,
  haveVar: state => state.createRecord.haveVar,
  isNotary: state => state.createRecord.isNotary,
  needPageStep: state => state.createRecord.needPageStep,
  orderCode: state => state.createRecord.orderCode,
  ajaxCount: state => state.createRecord.ajaxCount,
  currentStepInfo: state => state.createRecord.currentStepInfo,
  legalServiceInfo: state => state.createRecord.legalServiceInfo,
  coordinateDisabled: state => state.createRecord.coordinateDisabled,
  identityMaterials: state => state.createRecord.identityMaterials,
  uploading: state => state.createRecord.uploading,
  isCreateTransActor: state => state.party.isCreateTransActor,
  isCreateSpouse: state => state.party.isCreateSpouse
}
export default getters
