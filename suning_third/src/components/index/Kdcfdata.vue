<template>
	<div class="kdcfCon">
		<h4 class="headersKDCF">口袋车服数据详情</h4>
		<div class="bs-example" data-example-id="condensed-table">
			<table class="table table-condensed table-bordered ">
				<thead>
					<tr>
						<th v-for="item in titleList" style="text-align: center;">{{item}}</th>
					</tr>
				</thead>
				<tbody>
					<tr  v-for="(item,index) in datalists" @click="showStyle(index)" :class='{"styles":clicked == index}'>
						<td v-fontSize14>{{item.sosType}}</td>
						<td v-fontSize14>{{item.sosOrigin}}</td>
						<td v-fontSize14>{{item.sosFinish}}</td>
						<td v-fontSize14>{{item.sosTime}}</td>
						<td v-fontSize14>{{item.sosCartype}}</td>
						<td v-fontSize14>{{item.sosCarno}}</td>
						<td v-fontSize14>{{item.sosPerson}}</td>
						<td v-fontSize14>{{item.sosTel}}</td>
						<td v-fontSize14>{{item.sosPayTime}}</td>
						<td v-fontSize14>{{item.sosPayMoney}}</td>
						<td v-fontSize14 v-if="item.sosPayState=='success'">成功</td>
						<td v-fontSize14 v-else>失败</td>
					</tr>

				</tbody>
			</table>
		</div>

	</div>
</template>
<script>
//	import MyAjax from "../../assets/MyAjax.js";
	import axios from '../../axios_auth';
	export default {
		name: 'Kdcfdata',
		data() {
			return {
				titleList:['类型', '起点', '终点', '救援时间', '车辆', '车牌号', '救援联系人', '手机号', '下单时间', '支付金额', '状态'],
				datalists: [],
				sosPaymoney: '',
				clicked:0   //点击样式

			}
		},
		mounted() {
			//  口袋车服数据
			axios.post('/getAllSosdata.action')
			  .then((res)=>{
			  	  this.datalists = res.data;
			  }).catch((error)=>{
			  	  console.log(error)
			  })
			
		},
		methods:{
			//尾部的分页
			pagechange: function(currentPage) {
				console.log(currentPage);
				// ajax请求, 向后台发送 currentPage, 来获取对应的数据

			},
			showStyle:function(index){
				this.clicked = index;
			}
		}
	}
</script>
<style>
	.kdcfCon{
		min-width: 140%;
		max-width: 180%;
	}
    .kdcfCon .headersKDCF{
		margin-left: 10px;
		text-align: start;
		height: 44px;
		line-height: 44px;
	}
	.styles{
		color: #fff;
		background: #f66;
	}
</style>