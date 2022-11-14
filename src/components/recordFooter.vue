<template>
  <div class="footer-btns">
    <el-button :disabled="nextDisabled" @click="goListPage">返回</el-button>
    <template v-if="isOrigin !== HAS_BACK_BTN">
      <template v-if="isOrigin=== HAS_ALL_BTN ">
        <!-- 预录订单没有保存草稿 及文书预览没有保存草稿 -->
        <el-button v-if="orderType !== 3" :disabled="nextDisabled" @click="operateStep(ORDER_VAR_TYPE.IS_SAVE_VAR)">保存草稿</el-button>
        <el-button v-if="orderType === 3" :disabled="nextDisabled" @click="operateStep(ORDER_VAR_TYPE.IS_SAVE_STEP)">保存</el-button>
        <el-button type="primary" :disabled="nextDisabled" @click="operateStep(ORDER_VAR_TYPE.IS_PRE_STEP)">上一步</el-button>
      </template>
      <el-button type="primary" :disabled="nextDisabled || isDisabled" @click="operateStep(ORDER_VAR_TYPE.IS_NEXT_STEP)">{{ isNext==='submit' ? '提交订单':'下一步' }}</el-button>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ORDER_VAR_TYPE, HAS_BACK_BTN, HAS_ALL_BTN } from '@/constant/createRecord'
import actions from '@/shared/actions'
// import { routeCache } from '@/utils/routeCache'
export default {
  props: {
    isOrigin: {
      type: Number,
      default: 1
    },
    isNext: {
      type: String,
      default: 'next'
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ORDER_VAR_TYPE,
      HAS_BACK_BTN,
      HAS_ALL_BTN
    }
  },
  computed: {
    ...mapState('createRecord', ['nextLoading', 'nextDisabled', 'orderType'])
  },
  beforeDestroy() {
    actions.setGlobalState({ jumpLink: '' })
  },
  methods: {
    goListPage() {
      // 补录订单返回
      this.$router.back()
    },
    operateStep(val) {
      this.$emit('operateStep', val)
    }
  }
}
</script>

<style scoped lang="scss">
.footer-btns{
    position: absolute;
    bottom:8px;
    left:50%;
    transform: translate(-50%,0);
    .el-button{
        height: 32px;
        padding:6px 16px;
    }
}

</style>
