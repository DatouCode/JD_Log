<Row style="float:left">
<Col span="8">
  <Menu @on-select="openLog" :open-names="['1']">
    <Submenu name="1">
      <template slot="title">
        <Icon type="ios-paper"/>
        日志管理
      </template>
      <MenuItem v-for="file in files" :name="file">{{ file }}</MenuItem>
    </Submenu>
  </Menu>
</Col>
</Row>
<div class="content">
<Tabs type="card" closable @on-tab-remove="handleTabRemove" :value="tabActive">
  <TabPane v-for="tab in tabs" :label="tab" :name="tab" style="white-space: pre-wrap">
    <Button type="warning" @click="clearLog(tab)">清空此日志</Button>
    {{ logs[tab] }}
  </TabPane>
</Tabs>
</div>
<script>
export default {
  data() {
    return {
      files: [],
      tabs: [],
      tabActive: '',
      logs: [],
      logIndex: 0
    }
  },
  methods: {
    handleTabRemove(name) {
      let index = this.tabs.indexOf(name);
      console.log('关闭', index, name)
      this.tabs.splice(index, 1)
      // delete this.logs[name]
      // console.log(this.tabs)
      // console.log(this.logs)
    },

    async openLog(name) {
      if (this.tabs.indexOf(name) === -1) {
        // 新打开日志文件
        this.tabs.push(name);
        await this.getLog(name);
      }
      // 切换到选择的日志标签
      this.tabActive = name;
    },
    async getLog(name) {
      await this.axios.get(`/api/getLog?name=${name}`).then(res => {
        this.logs[name] = res.data
        console.log('日志读取完成')
      })
    },
    clearLog(name) {
      console.log('清空：', name)
      this.axios.get(`/api/clearLog?name=${name}`).then(res => {
      })
    }
  },
  created() {
    this.axios.get('/api/').then(res => {
      this.files = res.data;
    })
  }
}
</script>