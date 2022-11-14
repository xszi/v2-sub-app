
import { getBrowserCache } from '@/utils/util'
export default {
  data() {
    return {
      platformType: ''
    }
  },
  mounted() {
    this.platformType = getBrowserCache('platformType')
  },
  methods: {
    pageUpdate(pageInfo) {
      this.pageInfo = pageInfo
      this.getList()
    }

  }
}
