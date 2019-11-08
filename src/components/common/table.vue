<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>
            <div class="table-select">
              <select name="" id="">
                <option value="1">不限</option>
                <option value="2">陆运</option>
                <option value="3">空运</option>
              </select>
            </div>
          </th>
          <th>发货地—到货地</th>
          <th>发货日期</th>
          <th>货物类型</th>
          <th>总量</th>
          <th>企业认证</th>
          <th>操作</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows">
          <td>{{ row.column1 }}</td>
          <td>{{ row.column2 }}</td>
          <td>{{ row.column3 }}</td>
          <td>{{ row.column4 }}</td>
          <td>{{ row.column5 }}</td>
          <td>{{ row.column6 }}</td>
          <td>
            <div class="action-btn">
              <a href="">{{ row.column7 }}</a>
            </div>
          </td>
          <td>{{ row.column8 }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  export default {
    name: 'c-table',
    data () {
      return {
        rows: [
          {
            column1: '空运',
            column2: '上海市-直辖市—重庆市-直辖市',
            column3: '2018-02-10±2',
            column4: '针剂',
            column5: '200±10',
            column6: '已认证',
            column7: '详情',
            column8: '竞价成功',
          },
          {
            column1: '空运',
            column2: '上海市-直辖市—重庆市-直辖市',
            column3: '2018-02-10±2',
            column4: '针剂',
            column5: '200±10',
            column6: '已认证',
            column7: '详情',
            column8: '撮合成功',
          },
          {
            column1: '空运',
            column2: '上海市-直辖市—重庆市-直辖市',
            column3: '2018-02-10±2',
            column4: '针剂',
            column5: '200±10',
            column6: '已认证',
            column7: '详情',
            column8: '撮合成功',
          },
          {
            column1: '空运',
            column2: '上海市-直辖市—重庆市-直辖市',
            column3: '2018-02-10±2',
            column4: '针剂',
            column5: '200±10',
            column6: '已认证',
            column7: '详情',
            column8: '撮合成功',
          },
          {
            column1: '空运',
            column2: '上海市-直辖市—重庆市-直辖市',
            column3: '2018-02-10±2',
            column4: '针剂',
            column5: '200±10',
            column6: '已认证',
            column7: '详情',
            column8: '撮合成功',
          },
          {
            column1: '空运',
            column2: '上海市-直辖市—重庆市-直辖市',
            column3: '2018-02-10±2',
            column4: '针剂',
            column5: '200±10',
            column6: '已认证',
            column7: '详情',
            column8: '撮合成功',
          },
          {
            column1: '空运',
            column2: '上海市-直辖市—重庆市-直辖市',
            column3: '2018-02-10±2',
            column4: '针剂',
            column5: '200±10',
            column6: '已认证',
            column7: '详情',
            column8: '撮合成功',
          },
          {
            column1: '空运',
            column2: '上海市-直辖市—重庆市-直辖市',
            column3: '2018-02-10±2',
            column4: '针剂',
            column5: '200±10',
            column6: '已认证',
            column7: '详情',
            column8: '撮合成功',
          }
        ]
      }
    }
  }
</script>
<style scoped>
  .table{
    width: 1066px;
    border-spacing: 0;
    text-align: center;
  }
  .table thead tr{
    height: 60px;
    line-height: 60px;
    background: #1f5378;
  }
  .table thead tr th{
    font-size: 16px;
    color: #fff;
  }
  .table tbody tr{
    height: 50px;
    line-height: 50px;
    background: #F4F6F8;
  }
  .table tbody tr:nth-child(2n){
    background: #fff;
  }
  .table-select select{
    width: 80px;
    height: 26px;
    border-radius: 0;
  }
  .action-btn a{
    display: inline-block;
    height: 28px;
    line-height: 28px;
    color: #333;
    padding: 0 20px;
    border: 1px solid #777777;
  }
</style>
