<template>
	<div class="suningCon">
		<div class="headers">
			<h3 class="title">订单号列表</h3>
			<ul class="states">
				<li v-for="(item,index) in barList" :class='{"styles":clicked == index}'  @click="selectState($event,index) ">{{item}}</li>
				<input type="button" value="快速下单" class="goto" @click="fastOrder">
			</ul>
			
		</div>
		<div class="bs-example" data-example-id="condensed-table">
			<table class="table table-condensed  table-hover">
				<thead>
					<tr>
						<th v-for="item in theadList">{{item}}</th>
					</tr>
				</thead>
				<tbody class="SNtbody">
					<!--页面的跳转没采用"事件的方法"-->
					<router-link tag="tr" id="trStyle" v-for="(item,index) in orderLists" :to="{name:'orderdetail',params:{classid:item.orderNo}}">
						<td v-fontSize14>{{item.orderNo}}</td>
						<td v-fontSize14>{{item.orderNoSource}}</td>
						<td v-fontSize14>{{item.name}}</td>
						<td v-fontSize14>{{item.tel}}</td>
						<td v-fontSize14>{{item.vin}}</td>
						<td v-fontSize14>{{item.effectType}}</td>
						<td v-fontSize14>{{item.beginTime}}</td>
						<td v-fontSize14>{{item.endTime}}</td>
						<td v-fontSize14>{{item.productName}}</td>
						<td v-fontSize14>{{item.orderState}}</td>
					</router-link>
				</tbody>
			</table>
		</div>
		<div class="toast" v-show="toastShow">
		  {{toastText}}
		</div>

		<v-pagination :total="total" :current-page='current' @pagechange="pagechange" id='paginationstyle'></v-pagination>
		
	</div>
</template>
<script>
//	import MyAjax from "../../../assets/MyAjax.js";
    import axios from '../../../axios_auth';
	import Pagination from '../../pagination/Pagination.vue';
	export default {
		name: 'Suning',
		data() {
			return {
				barList: ['待激活', '未审核', '审核退回', '审核通过'],
				theadList:['延保单号','苏宁订单号','姓名','手机号','车架号','合同生效方式','合同生效日','合同失效日','产品名称','状态'],
				orderLists: [],
				sosPaymoney: '',
				orderState: 0,
				page: 1,
				
				//分页
		        total: 0,     // 记录总条数
		        display: 10,   // 每页显示条数
		        current: 1,   // 当前的页数
		        
		        clicked:0,   //表头样式
		        
		         toastShow: false, //提示框
                 toastText: '',
			}
		},
		mounted() {
			// 苏宁订单数据  初始化   
			this.orderState = '0';
			this.page = '1';
			this.showdata(this.orderState,this.page);
//			this.titleList = ['延保单号', '苏宁订单号', '姓名', '手机号', '车架号', '车架号', '合同生效方式', '合同生效日', '合同失效日', '产品名称', '状态'];
		},
		methods:{
			selectState:function(event,index){
				this.clicked = index;
				let orderState = event.target.textContent;
				if(orderState =='待激活'){
				   
					this.orderState ='0';
					this.showdata(this.orderState,1);
				}else if(orderState =='未审核'){
					this.orderState ='1';
					this.showdata(this.orderState,1);
				}else if(orderState =='审核退回'){
					this.orderState ='2';
					this.showdata(this.orderState,1);
				}else{
					this.orderState ='3';
					this.showdata(this.orderState,1);
				}
			},
			showdata:function(x,y){
				// x: 状态('待激活')     y:当前的页数
				axios.post('/selAllOrderorder.action?orderState=' + x + '&page=' + y)
				    .then((res)=>{
				    	this.orderLists = res.data[0].list;
						this.total = res.data[0].total;
						if(res.data[0].list.length == 0){
	                        this.toast('暂无数据')
						}
				    }).catch((error)=>{
				    	consoel.log(error)
				    })
			},

			//快速下单
			fastOrder:function(){
				this.$router.push('/orderdetail');
			},
			//尾部的分页
			pagechange: function(currentPage) {
//				console.log(currentPage);
				this.showdata(this.orderState,currentPage)   //currentPage :当前页数

			},
			//提示框
			toast:function (str) {
			    let that = this;
			    that.toastText = str;
			    that.toastShow = true;
			    setTimeout(function(){
				      that.toastShow = false
				    }, 2000)
			  }
		},
		watch: {

		},
		components: {
		      'v-pagination': Pagination
		    }
	}
</script>
<style>
	*{
	   padding: 0;
	   margin: 0;	
	}
	ul li {
		list-style: none;
	}
	.suningCon{
		width: 1200px;
		height: 500px;
	}
	.headers {
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.headers .title {
		margin-left: 10px;
	}
	
	.headers .states {
		display: flex;
		height: 36px;
		margin-right: 140px;
		font-size: 15px;
	}
	
	.headers .states li {
		width: 70px;
		height: 100%;
		line-height: 36px;
		text-align: center;
		border: 1px solid #CCCCCC;
		border-right: 0;
	}
	
	.headers .states li:nth-child(4) {
		border-right: 1px solid #CCCCCC;
	}
	
	.table thead {
		border: 1px solid #EEEEEE;
	}
	
	.table thead th{
		border: none;
	}
	.SNtbody #trStyle{
		height: 36px;
	}
	.SNtbody tr td{
		text-align: start;
	}
	
	.styles{
		color: #fff;
		background: #f66;
	}
	#paginationstyle{
		position: absolute;
		bottom: -70px;
		right: 100px;
	}
	.goto {
		height: 36px;
		border: none;
		border: 1px solid #CCCCCC;
		color: #333;
		line-height: 36px;
		text-align: center;
		margin-right: 30px;
		background: #fff;
		width: 70px;
		margin-left: 40px;
		/*position: absolute;
		top: 5px;
		right: 30px;*/
	}
	.toast {
        position: fixed;
        z-index: 2000;
        left: 50%;
        top:45%;
        transition:all .5s;
        -webkit-transform: translateX(-50%) translateY(-50%);
           -moz-transform: translateX(-50%) translateY(-50%);
            -ms-transform: translateX(-50%) translateY(-50%);
             -o-transform: translateX(-50%) translateY(-50%);
                transform: translateX(-50%) translateY(-50%);
        text-align: center;
        border-radius: 8px;
        color:#FFF;
        background: rgba(17, 17, 17, 0.7);
        height: 60px;
        line-height: 60px;
        font-size: 18px;
        padding: 0 15px;
        min-width: 130px;
        max-width: 180px;
        }

	
</style>