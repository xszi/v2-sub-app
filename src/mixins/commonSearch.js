
export default {
  data() {
    return {
      platformType: ''
    }
  },
  mounted() {
    this.platformType = sessionStorage.getItem('platformType')
  },
  methods: {
    pageUpdate(pageInfo) {
      this.pageInfo = pageInfo
      this.getList()
    }

  }
}
