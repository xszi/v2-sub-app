<template>
  <section class="fx-var-input-component">
    <!--1：输入框-->
    <el-input
      v-if="varItem.formType === 1"
      v-model.trim="varItem.varValueJson.value"
      :size="size"
      style="width: 100%"
      maxlength="70"
      show-word-limit
      :placeholder="getPlaceHolderText(varItem)"
    />
    <!--2：文本域-->
    <el-input
      v-if="varItem.formType === 2"
      v-model.trim="varItem.varValueJson.value"
      :rows="2"
      type="textarea"
      :size="size"
      maxlength="500"
      show-word-limit
      :placeholder="getPlaceHolderText(varItem)"
    />
    <!--3：数字输入框-->

    <el-input-number
      v-if="varItem.formType === 3"
      v-model.trim="varItem.varValueJson.value"
      :max="maxAmount"
      :min="0"
      :controls="false"
      :size="size"
      :placeholder="getPlaceHolderText(varItem)"
      style="width: 100%"
    />
    <!--4：日期选择框-->
    <el-date-picker
      v-if="varItem.formType === 4"
      v-model="varItem.varValueJson.value"
      type="date"
      :size="size"
      :placeholder="getPlaceHolderText(varItem)"
      :value-format="varItem.fromCompParamJson.format || 'yyyy-MM-dd'"
      style="width: 100%"
    />
    <!--5：选择器-->
    <el-select
      v-if="varItem.formType === 5"
      v-model="varItem.varValueJson.value"
      :size="size"
      style="width: 100%"
      :placeholder="getPlaceHolderText(varItem)"
    >
      <el-option
        v-for="item in varItem.fromCompParamJson.options"
        :key="item.opCode"
        :label="item.opName"
        :value="item.opCode"
      />
    </el-select>
    <!--6：单选器-->
    <el-radio-group v-if="varItem.formType === 6" v-model="varItem.varValueJson.value" :size="size" style="width: 100%">
      <el-radio v-for="r in varItem.fromCompParamJson.options" :key="r.opCode" :label="r.opCode" style="white-space: inherit;line-height: 36px">{{ r.opName }}</el-radio>
    </el-radio-group>
    <!--7：复选框-->
    <el-checkbox-group v-if="varItem.formType === 7" v-model="varItem.varValueJson.value" :size="size" class="checkbox-7-group">
      <el-checkbox v-for="c in varItem.fromCompParamJson.options" :key="c.opCode" :label="c.opCode">{{ c.opName }}</el-checkbox>
    </el-checkbox-group>
    <!--8：图片, 13上传文件-->
    <div v-if="[8, 13].includes(varItem.formType)" class="var-img-wrap">
      <div v-for="(file, index) in varItem.varValueJson.value" :key="file.fileId" style="position:relative; margin: 0 10px 8px 0">
        <fx-file-item :file="file" width="46px" height="50px" />
        <i v-if="editVar || isPreCheckVarFLag === 1" class="el-icon-error file-delete" @click="fileDelete(index)" />
      </div>
      <fx-upload width="50px" height="50px" :ext-list="varItem.fromCompParamJson.formats || []" :is-pre-check-var-flag="isPreCheckVarFLag" @success="uploadSuccess" />
    </div>
    <!--9：时间日期选择器-->
    <el-date-picker
      v-if="varItem.formType === 9"
      v-model="varItem.varValueJson.value"
      type="datetime"
      :size="size"
      :placeholder="getPlaceHolderText(varItem)"
      :value-format="varItem.fromCompParamJson.format || 'yyyy-MM-dd HH:mm:ss'"
    />
    <!--10：金额-->
    <!--   style="width: 49%;margin-right: 2%" -->
    <template v-if="varItem.formType === 10">
      <el-input-number
        v-model.trim="varItem.varValueJson.value"
        :max="maxAmount"
        :min="0"
        :controls="false"
        :size="size"
        :placeholder="getPlaceHolderText(varItem)"
        style="width: 100%"
        @blur="inputBlur"
      />
      <!-- <el-select :key="varItem.varValueJson.unit" v-model="varItem.varValueJson.unit" :size="size" style="width: 49%">
        <el-option
          v-for="item in varItem.fromCompParamJson.options"
          :key="item.opCode"
          :label="item.opName"
          :value="item.opCode"
        />
      </el-select> -->
    </template>
    <!--11：期限-->
    <template v-if="varItem.formType === 11">
      <el-date-picker
        v-model="limitTime"
        type="daterange"
        :size="size"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :placeholder="getPlaceHolderText(varItem)"
        :value-format="varItem.fromCompParamJson.format || 'yyyy-MM-dd'"
        style="margin-right: 12px"
        @change="changeDateRang"
      />
      <!-- <el-checkbox v-model="varItem.varValueJson.forever" @change="changeDateValue">永久</el-checkbox> -->
    </template>
    <!--12：条款-->

  </section>
</template>
<script>
import $fileApi from '@/api/huaweiObs'
import FxUpload from '@/components/fxUpload'
import FxFileItem from '@/components/fxFileItem'
import { maxAmount } from '@/constant/global.js'
export default {
  name: 'FxVarInputComponent',
  components: { FxUpload, FxFileItem },
  props: {
    varItem: { type: Object, default: () => ({}) },
    size: { type: String, default: 'small' }
  },
  data() {
    return {
      curFile: {},
      maxAmount,
      fileVisible: false
    }
  },
  computed: {
    limitTime: {
      set: function(v) {
        if (!v) {
          this.$set(this.varItem.varValueJson, 'start', '')
          this.$set(this.varItem.varValueJson, 'end', '')
        } else {
          this.$set(this.varItem.varValueJson, 'start', v[0])
          this.$set(this.varItem.varValueJson, 'end', v[1])
        }
      },
      get() {
        const { start, end } = this.varItem.varValueJson
        return [start, end]
      }

    }
  },
  watch: {
    varItem: {
      handler(v) {
        if (v.formType === 8) {
          this.getAllImgUrl()
        }
        if ([3, 10].includes(v.formType) && !v.varValueJson.value && v.varValueJson.value !== 0) {
          this.$set(this.varItem.varValueJson, 'value', undefined)
        }
      },
      immediate: true
    }
  },
  methods: {
    getPlaceHolderText(varItem) {
      // 变量有提示显示placeHolder 显示变量 否则出现提示
      let inputSelectFix = ''
      let placeHolderText = ''
      if ([1, 2].includes(varItem.formType)) {
        inputSelectFix = `请输入${varItem.varName}`
      } else if ([3, 10].includes(varItem.formType)) {
        inputSelectFix = `请输入${varItem.varName}(数字类型)`
      } else {
        inputSelectFix = `请选择${varItem.varName}`
      }
      placeHolderText = varItem.prompt && varItem.prompt !== '' ? varItem.prompt : inputSelectFix
      return placeHolderText
    },
    inputBlur() {
      const val = this.varItem.varValueJson.value + ''
      const arr = val.split('.')
      if (arr.length > 1 && arr[1].length > 2) {
        this.$set(this.varItem.varValueJson, 'value', Number(val).toFixed(2))
      }
    },
    async uploadSuccess(file) {
      try {
        const pointIndex = file.name.lastIndexOf('.')
        const format = pointIndex > -1 ? file.name.slice(pointIndex + 1) : ''
        const item = { fileName: file.name, format, fileId: file.fileId }
        this.varItem.varValueJson.value.push(item)
      } catch (e) {
        console.error(e)
      }
    },
    fileDelete(index) {
      this.varItem.varValueJson.value.splice(index, 1)
    },
    /** 选中永久则清空期限 */
    changeDateValue(val) {
      if (val) {
        this.varItem.varValueJson.start = ''
        this.varItem.varValueJson.end = ''
      }
    },
    changeDateRang(val) {
      if (val) {
        this.varItem.varValueJson.forever = false
      }
    },
    async getAllImgUrl() {
      try {
        const idList = this.varItem.varValueJson.value.map(d => d.fileId)
        const res = await $fileApi.batchGetDownloadPath(idList)
        if (res !== 0) return
        const arr = res.data
        this.varItem.varValueJson.value.forEach((file, index) => {
          Object.defineProperty(file, 'filePath', { value: arr[index].path })
        })
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
<style lang="scss">
.fx-var-input-component {
  .el-input-number .el-input__inner {
    text-align: left;
  }
  .var-img-wrap {
    display: flex;
    flex-wrap: wrap;
  }
  .file-delete {
    cursor: pointer;
    position: absolute;
    top: -6px;
    right: -6px;
    z-index: 1000;
    color: red;
    background-color: #fff;
    border-radius: 50%;
  }
  .checkbox-7-group .el-checkbox {
    display: flex;
    padding: 10px 0px 0;
    .el-checkbox__input {
      flex-shrink: 0;
    }
    .el-checkbox__label {
      word-break: break-word;
      white-space: normal;
    }
  }
}
</style>
