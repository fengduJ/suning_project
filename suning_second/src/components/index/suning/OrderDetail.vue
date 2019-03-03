<template>
	<div class="rapper">
		<div class="property">
			<input type="text" style="display: none" name="handle">
			<p>客户属性</p>
			<table class="tables" border="1" cellspacing="0">
				<tr>
					<td class="blank">姓名</td>
					<td><input type="text" name="name" class="name" v-model="name" maxlength="10" placeholder="请输入" required></td>
					<td>性别</td>
					<td>
						<select name="sex" class="sex" v-model="sex">
							<option value="男">男</option>
							<option value="女">女</option>
						</select>
					</td>
					<td>手机号</td>
					<td><input type="text" name="tel" class="tel" v-model="tel" placeholder="请输入" maxlength="11" pattern="1[0-9]{10}" required></td>
				</tr>
				<tr>
					<td>证件类型</td>
					<td>
						<select name="cardType" class="cardType" @change="changeCardtype">
							<option v-if="state=='add'" v-for="item in cardtypeList">{{item.name}}</option>
							<option v-if="state=='upd'">{{cardType}}</option>
						</select>
					</td>
					<td>证件号</td>
					<td><input type="text" name="cardNo" v-model="cardNo" class="cardNo" placeholder="请输入" maxlength="18" pattern="(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)"></td>
					<td>Email</td>
					<td><input type="text" name="email" v-model="email" class="email" placeholder="请输入" pattern="[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+"></td>
				</tr>
				<tr>
					<td>联系地址</td>
					<td colspan="5"><input type="text" name="address" v-model="address" class="address" placeholder="请输入" maxlength="30"></td>
				</tr>
			</table>
		</div>
		<div class="property" style="margin-top: 15px;">
			<p>车辆属性</p>
			<table class="tables" border="1" cellspacing="0">
				<tr>
					<td>品牌</td>
					<td><input type="text" name="brand" class="brand" placeholder="请输入" v-model="brand"></td>
					<td>车系</td>
					<td><input type="text" name="carseries" class="carseries" placeholder="请输入" v-model="carseries"></td>
					<td>车型</td>
					<td><input type="text" name="cartype" class="cartype" placeholder="请输入" v-model="cartype"></td>
				</tr>
				<tr>
					<td>车架号（VIN码）</td>
					<td><input type="text" name="vin" class="vin" v-model="vin" placeholder="请输入" maxlength="17" pattern="[0-9ABCDEFGHJKLMNPRSTUVWXYZabcdefghgklmnprstuvwxyz]{17}"></td>
					<td>发动机号</td>
					<td><input type="text" name="engineNo" class="engineNo" v-model="engineNo" placeholder="请输入"></td>
					
					<td>注册日期</td>
					<td class="example-container" style="position: relative;">
						<v-datepickers v-model="registTime" id="registTime" style="position: absolute;left: 100px;bottom:2px;"></v-datepickers>
					</td>
				</tr>
				<tr>
					<td>购车日期（发票日期）</td>
					<td style="position: relative;">
						<v-datepickers v-model="buyCarTime" id="buyCarTime" style="position: absolute;left: 100px;bottom:2px;"></v-datepickers>
					</td>
					<td>当前公里数</td>
					<td><input type="text" name="curMillage" class="curMillage" v-model="curMillage" placeholder="只能输入数字" pattern="[0-9]*"></td>
					<td>车价</td>
					<td><input type="text" name="carPrice" class="carPrice" v-model="carPrice" placeholder="请输入"></td>
				</tr>
			</table>
		</div>
		<div class="property" style="margin-top: 15px;">
			<p>服务信息</p>
			<table class="tables" border="1" cellspacing="0">
				<tr>
					<td>服务范围</td>
					<td>
						<!--<input type="text" name="serviceRange" placeholder="请输入">-->
						<select name="serviceRange" class="serviceRange" @change="changeRange">
							<option v-for="item in servelimitList" v-if="state=='add'">{{item.name}}</option>
							<option v-if="state=='upd'">{{serviceRange}}</option>
						</select>
					</td>
					<td>赔偿限额</td>
					<td>
						<select name="compensation" class="compensation" @change="changeCompensation">
							<option v-for="item in serverangeList" v-if="state=='add'">{{item.name}}</option>
							<option v-if="state=='upd'">{{compensation}}</option>

						</select>
					</td>
					<td>服务期限</td>
					<td>
						<!--<input type="text" name="serviceTime" placeholder="请输入">-->
						<select name="serviceTime" class="serviceTime" @change="changeServicetime">
							<option v-for="item in serviceTimeList" v-if="state=='add'">{{item.name}}</option>
							<option v-if="state=='upd'">{{serviceTime}}</option>
						</select>
					</td>
				</tr>
				<tr>
					<td>车龄</td>
					<td><input type="text" name="carAge" class="carAge" v-model="carAge" readonly="readonly"></td>
					<td>当前质保情况</td>
					<td><input type="text" name="" class="current" readonly="readonly"></td>
					<td>当前质保里程数</td>
					<td><input type="text" name="" class="current" pattern="[0-9]*" readonly="readonly"></td>
				</tr>
				<tr>
					<td>当前质保到期日</td>
					<td><input type="text" name="" id="time_3" class="current" readonly="readonly"></td>
					<td colspan="4" class="blank"></td>
				</tr>
				<tr>
					<td rowspan="2">延保部件</td>
					<td colspan="5" style="text-align: left">
						<span v-for="(item,i) in parts1"> 
								<label :for="item.id" @change="checkstates1($event,i)">
									<input type="checkbox"  :id="item.id" :checked="item.state">{{item.name}}
								</label>
							</span>
						<!--<input type="checkbox" value="发动机" name="aa" id="1"><label for="1">发动机</label>
							<input type="checkbox" value="变速箱" name="aa" id="2"><label for="2">变速箱</label>
							<input type="checkbox" value="驱动系统" name="aa" id="3"><label for="3">驱动系统</label>
							<input type="checkbox" value="转向系统" name="aa" id="4"><label for="4">转向系统</label>
							<input type="checkbox" value="制动系统" name="aa" id="5"><label for="5">制动系统</label>
							<input type="checkbox" value="悬挂系统" name="aa" id="6"><label for="6">悬挂系统</label>
							<input type="checkbox" value="空调系统" name="aa" id="7"><label for="7">空调系统</label>-->
					</td>
				</tr>
				<tr>
					<td colspan="5" class="blank" style="text-align: left">
						<span v-for="(item,i) in parts2"> 
								<label :for="item.id" @change="checkstates2($event,i)">
									<input type="checkbox"  :id="item.id" :checked="item.state">{{item.name}}
								</label>
							</span>
					</td>
					<input type="text" name="extensionParts" style="display: none">
				</tr>
			</table>
		</div>
		<div class="property" style="margin-top: 15px;">
			<p>合同生效方式</p>
			<table class="tables" border="1" cellspacing="0">
				<tr>
					<td>合同生效方式</td>
					<td>
						<!--<input type="text" name="effectType" class="effectType" placeholder="请输入">-->
						<select name="effectType">
							<option>{{effectType}}</option>
						</select>
					</td>
					<td>生效日</td>
					<td><input type="text" name="beginTime" class="beginTime" v-model="beginTime" id="time_4" readonly="readonly"></td>
					<td>失效日</td>
					<td><input type="text" name="endTime" id="time_5" class="endTime" v-model="endTime" readonly="readonly"></td>
				</tr>
				<tr>
					<td>初始公里</td>
					<td><input type="text" class="beginMillage" name="beginMillage" placeholder="请输入" v-model="beginMillage"></td>
					<td colspan="4" class="blank"></td>
				</tr>
				<tr>
					<td>备注</td>
					<td colspan="5"><input type="text" name="remark" class="remark" v-model="remark" placeholder="请输入"></td>
				</tr>
				<tr>
					<td>合同附件</td>
					<td colspan="5"></td>
				</tr>
			</table>
		</div>
		<div class="property" style="margin-top: 15px;">
			<p>录入价格</p>
			<table class="tables" border="1" cellspacing="0">
				<tr>
					<td>签约价格</td>
					<td><input type="text" name="contractPrice" class="contractPrice" v-model="contractPrice" placeholder="请输入"></td>
					<td>合同上是否显示售价</td>
					<td>
						<select name="isShowPrice" class="isShowPrice" @change="changeIsShowPrice">
							<option v-if="state=='add'" v-for="item in isShowPriceArr">{{item}}</option>
							<option v-if="state=='upd'">{{isShowPrice}}</option>

						</select>
					</td>
					<td></td>
					<td></td>
				</tr>
			</table>
		</div>
		<div class="property" style="margin-top: 15px;">
			<p>附件清单</p>
			<div class="line">
				<div>
					<a class="image1" target="_blank">
						<img class="img1" src="" alt="">
					</a>
					<p>二手车发票</p>
				</div>
				<div>
					<a class="image2" target="_blank">
						<img class="img2" src="" alt="">
					</a>
					<p>当前里程数</p>
				</div>
				<div>
					<a class="image3" target="_blank">
						<img class="img3" src="" alt="">
					</a>
					<p>车主身份证正面</p>
				</div>
				<div>
					<a class="image4" target="_blank">
						<img class="img4" src="" alt="">
					</a>
					<p>车辆检测报告</p>
				</div>
				<div>
					<a class="image5" target="_blank">
						<img class="img5" src="" alt="">
					</a>
					<p>车辆行驶证</p>
				</div>
			</div>
		</div>
		<div class="property" style="margin-top: 15px;">
			<p>延保单属性</p>
			<table class="tables" border="1" cellspacing="0">
				<tr>
					<td>延保单单号</td>
					<td><input type="text" name="orderNo" class="orderNo" :value="orderNo" readonly="readonly"></td>
					<td>经销商</td>
					<td><input type="text" name="dealer" class="dealer" :value="dealer" readonly="readonly"></td>
					<td>产品名称</td>
					<td><input type="text" name="productName" class="productName" :value="productName" readonly="readonly"></td>
				</tr>
				<tr>
					<td>编码</td>
					<td><input type="text" name="productNo" class="productNo" :value="productNo" readonly="readonly"></td>
					<td>状态</td>
					<td><input type="text" name="orderState" class="orderState" placeholder="请输入" :value="orderState" readonly="readonly"></td>
					<td>订单号</td>
					<td><input type="text" name="orderNoSource" class="orderNoSource" v-model="orderNoSource" placeholder="请输入" required></td>
				</tr>
			</table>
		</div>
		<div class="submitBtn">
			<input id="submit" type="submit" value="提交" @click="submit">
			<input type="button" class="goback" value="返回" @click="back">
		</div>

		<div class="toast" v-show="toastShow">
			{{toastText}}
		</div>
		<iframe id="frame" name="iframe" style="display:none;"></iframe>

	</div>
</template>
<script>
//	import MyAjax from "../../../assets/MyAjax.js";
	import axios from '../../../axios_auth';
	import Datapickers from '../../../assets/Date_Pickers/datePickers.vue';
	export default {
		name: 'OrdernoDetail',
		data() {
			return {
				cardtypeList: [
				     {
						value: '',
						name: '--请选择--'
					},
					{
						value: '身份证',
						name: '身份证'
					},
					{
						value: '护照',
						name: '护照'
					},
					{
						value: '企业营业执照',
						name: '企业营业执照'
					},
				],
				servelimitList: [{
						value: '',
						name: '--请选择--'
					},
					{
						value: '一大系统',
						name: '一大系统'
					},
					{
						value: '二大系统',
						name: '二大系统'
					},
					{
						value: '三大系统',
						name: '三大系统'
					},
					{
						value: '六大系统',
						name: '六大系统'
					},
					{
						value: '十大系统',
						name: '十大系统'
					},
				],
				serverangeList: [{
						value: '',
						name: '--请选择--'
					},
					{
						value: '5000',
						name: '5000'
					},
					{
						value: '10000',
						name: '10000'
					},
					{
						value: '20000',
						name: '20000'
					},
					{
						value: '40000',
						name: '40000'
					},
					{
						value: '60000',
						name: '60000'
					},
					{
						value: '80000',
						name: '80000'
					},
					{
						value: '100000',
						name: '100000'
					},
				],
				serviceTimeList: [{
						value: '',
						name: '--请选择--'
					},
					{
						value: '一年或2万公里',
						name: '一年或2万公里'
					}
				],
				parts1: [{
						name: '发动机',
						id: '0',
						state: false
					},
					{
						name: '变速箱',
						id: '1',
						state: false
					},
					{
						name: '驱动系统',
						id: '2',
						state: false
					},
					{
						name: '转向系统',
						id: '3',
						state: false
					},
					{
						name: '制动系统',
						id: '4',
						state: false
					},
					{
						name: '悬挂系统',
						id: '5',
						state: false
					},
					{
						name: '空调系统',
						id: '6',
						state: false
					},
				],

				parts2: [{
						name: '燃油系统',
						id: '7',
						state: false
					},
					{
						name: '冷却系统',
						id: '8',
						state: false
					},
					{
						name: '电器系统',
						id: '9',
						state: false
					},
				],
				checkedItem1: [], // 选中状态[{}](部件)
				checkedItem2: [],
				cc1: [], // 选中状态['',''](部件)
				cc2: [],
				state: '', // 区分快速下单 、查订单号进页面的
				orderState: '待激活',
				isShowPriceArr: ['是', '否'],
				toastShow: false, //提示框
				toastText: '',
				// 表单
				extensionParts: '', //部件
				address: '',
				beginMillage: '',
				beginTime: '',
				brand: '',
				buyCarTime: '',
				carAge: '',
				carPrice: '',
				cardNo: '',
				carseries: '',
				cartype: '',
				cardType: '',
				compensation: '',
				contractPrice: '',
				dealer: '万高电销售',
				effectType: '审核后生效',
				email: '',
				endMillage: '',
				endTime: '',
				engineNo: '',
				isShowPrice: '是',
				name: '',
				orderNo: '',
				orderNoSource: '',
				productName: '惠心选',
				productNo: '',
				registTime: '',
				remark: '',
				serviceRange: '',
				serviceTime: '',
				sex: '男',
				tel: '',
				vin: '',
				curMillage: '',

			}
		},
		mounted() {
//			console.log(this.$route.params.classid)
			let orderNo = this.$route.params.classid
			if(orderNo =='' || orderNo ==null || orderNo =='undefined') {
				this.state = 'add';
			} else {
				this.state = 'upd';
				this.orderNo = orderNo;
				this.detail(this.orderNo, this.state);
			}

		},
		methods: {
			detail(x, y) {
				axios.post('/selOrderByOrderNoorder.action?orderNo=' + x + '&handle=' + y)
				    .then((res)=>{
				 //  进入页面  带出 保修部件
					res.data.forEach(item => {
						let extensionPart = item.extensionParts.split(',');
						let s1 = [];
						let s2 = [];
						for(let item of this.parts1) {
							s1.push(item.name);
						};
						for(let item of this.parts2) {
							s2.push(item.name);
						};
						for(let i = 0; i < s1.length; i++) {
							if(extensionPart.indexOf(s1[i]) > -1) {
								this.parts1[i].state = true;
							}
						};
						for(let i = 0; i < s2.length; i++) {
							if(extensionPart.indexOf(s2[i]) > -1) {
								this.parts2[i].state = true;
							}
						};
						// console.log(this.parts1);
						// console.log(this.parts2);

						switch(item.orderState) {
							case('0'):
								this.orderState = '待激活';
								break;
							case('1'):
								this.orderState = '未审核';
								break;
							case('2'):
								this.orderState = '审核通过';
								break;
							case('3'):
								this.orderState = '审核驳回';
								break;
						}
						$('.image1').attr('href', item.secendHandCarPic);
						$('.image2').attr('href', item.millagePic);
						$('.image3').attr('href', item.cardFacePic);
						$('.image4').attr('href', item.checkedPic);
						$('.image5').attr('href', item.drivePic);
						$('.img1').attr('src', item.secendHandCarPic);
						$('.img2').attr('src', item.millagePic);
						$('.img3').attr('src', item.cardFacePic);
						$('.img4').attr('src', item.checkedPic);
						$('.img5').attr('src', item.drivePic);
						this.address = item.address;
						this.beginMillage = item.beginMillage;
						this.beginTime = item.beginTime;
						this.brand = item.brand;
						//	this.buyCarTime = item.buyCarTime;
						this.carAge = item.carAge;
						this.carPrice = item.carPrice;
						this.cardNo = item.cardNo;
						this.carseries = item.carseries;
						this.cartype = item.cartype;
						this.cardType = item.cardType;
						this.compensation = item.compensation;
						this.contractPrice = item.contractPrice;
						this.dealer = item.dealer;
						this.effectType = item.effectType;
						this.email = item.email;
						this.endMillage = item.endMillage;
						this.endTime = item.endTime;
						this.engineNo = item.engineNo;
						this.isShowPrice = item.isShowPrice;
						this.name = item.name;
						this.orderNo = item.orderNo;
						this.orderNoSource = item.orderNoSource;
						this.productName = item.productName;
						this.productNo = item.productNo;
						//this.registTime = item.registTime;
						this.remark = item.remark;
						this.serviceRange = item.serviceRange;
						this.serviceTime = item.serviceTime;
						this.sex = item.sex;
						this.tel = item.tel;
						this.vin = item.vin;
						this.curMillage = item.curMillage;
						$('#buyCarTime').find('input').val(item.buyCarTime);
						$('#registTime').find('input').val(item.registTime);
					  })
				    }).catch((error)=>{
				    	console.log(error)
				    })

				localStorage.removeItem('orderNo')
			},
			back() {
				this.$router.push('/suning')
			},
			submit() {
//				console.log('111111');
				this.buyCarTime = $('#buyCarTime').find('input').val();
				this.registTime = $('#registTime').find('input').val();
				this.extensionParts = this.cc1 + ',' + this.cc2;
				let datas = {
					address: this.address,
					beginMillage: this.beginMillage,
					beginTime: this.beginTime,
					brand: this.brand,
					buyCarTime: this.buyCarTime,
					carAge: this.carAge,
					carPrice: this.carPrice,
					cardNo: this.cardNo,
					carseries: this.carseries,
					cartype: this.cartype,
					cardType: this.cardType,
					compensation: this.compensation,
					contractPrice: this.contractPrice,
					dealer: this.dealer,
					effectType: this.effectType,
					email: this.email,
					endMillage: this.endMillage,
					endTime: this.endTime,
					engineNo: this.engineNo,
					isShowPrice: this.isShowPrice,
					name: this.name,
					orderNo: this.orderNo,
					orderNoSource: this.orderNoSource,
					productName: this.productName,
					productNo: this.productNo,
					registTime: this.registTime,
					remark: this.remark,
					serviceRange: this.serviceRange,
					serviceTime: this.serviceTime,
					sex: this.sex,
					tel: this.tel,
					vin: this.vin,
					curMillage: this.curMillage,
					extensionParts: this.extensionParts
				}
////				console.log(datas);
//				let url = "https://www.imvango.com/vg_kdcf/addKdcfOrderorder.action?=address" + datas.address +
//					'&beginMillage=' + datas.beginMillage +
//					'&beginTime=' + datas.beginTime +
//					'&brand=' + datas.brand +
//					'&buyCarTime=' + datas.buyCarTime +
//					'&carAge=' + datas.carAge +
//					'&carPrice=' + datas.carPrice +
//					'&cardNo=' + datas.cardNo +
//					'&carseries=' + datas.carseries +
//					'&cartype=' + datas.cartype +
//					'&cardType=' + datas.cardType +
//					'&compensation=' + datas.compensation +
//					'&contractPrice=' + datas.contractPrice +
//					'&dealer=' + datas.dealer +
//					'&effectType=' + datas.effectType +
//					'&email=' + datas.email +
//					'&endMillage=' + datas.endMillage +
//					'&endTime=' + datas.endTime +
//					'&engineNo=' + datas.engineNo +
//					'&cardType=' + datas.cardType +
//					'&isShowPrice=' + datas.isShowPrice +
//					'&name=' + datas.name +
//					'&orderNo=' + datas.orderNo +
//					'&orderNoSource=' + datas.orderNoSource +
//					'&productName=' + datas.productName +
//					'&productNo=' + datas.productNo +
//					'&registTime=' + datas.registTime +
//					'&remark=' + datas.remark +
//					'&serviceRange=' + datas.serviceRange +
//					'&serviceTime=' + datas.serviceTime +
//					'&sex=' + datas.sex +
//					'&tel=' + datas.tel +
//					'&vin=' + datas.vin +
//					'&curMillage=' + datas.curMillage +
//					'&extensionParts=' + datas.extensionParts +
//					'&handle=' + 'add';
//				MyAjax.fetch(url, (data) => {
////					console.log(data);
//					if(data[0].state == 'success') {
//						this.$router.push('/suning');
//						this.toast('添加成功')
//					}
//
//				}, (err) => {
//					console.log(err)
//				});
				
				axios.post('/addKdcfOrderorder.action?=address'+datas.address +
					'&beginMillage=' + datas.beginMillage +
					'&beginTime=' + datas.beginTime +
					'&brand=' + datas.brand +
					'&buyCarTime=' + datas.buyCarTime +
					'&carAge=' + datas.carAge +
					'&carPrice=' + datas.carPrice +
					'&cardNo=' + datas.cardNo +
					'&carseries=' + datas.carseries +
					'&cartype=' + datas.cartype +
					'&cardType=' + datas.cardType +
					'&compensation=' + datas.compensation +
					'&contractPrice=' + datas.contractPrice +
					'&dealer=' + datas.dealer +
					'&effectType=' + datas.effectType +
					'&email=' + datas.email +
					'&endMillage=' + datas.endMillage +
					'&endTime=' + datas.endTime +
					'&engineNo=' + datas.engineNo +
					'&cardType=' + datas.cardType +
					'&isShowPrice=' + datas.isShowPrice +
					'&name=' + datas.name +
					'&orderNo=' + datas.orderNo +
					'&orderNoSource=' + datas.orderNoSource +
					'&productName=' + datas.productName +
					'&productNo=' + datas.productNo +
					'&registTime=' + datas.registTime +
					'&remark=' + datas.remark +
					'&serviceRange=' + datas.serviceRange +
					'&serviceTime=' + datas.serviceTime +
					'&sex=' + datas.sex +
					'&tel=' + datas.tel +
					'&vin=' + datas.vin +
					'&curMillage=' + datas.curMillage +
					'&extensionParts=' + datas.extensionParts +
					'&handle=' + 'add')
				.then((res) =>{
					  if(res.data[0].state == 'success') {
							this.$router.push('/suning');
							this.toast('添加成功')
					  }
				}).catch((error)=>{
					  console.log(error)
				})
			},
			changeCardtype(e) {
				this.cardType = e.target.value;
			},
			changeRange(e) {
				this.serviceRange = e.target.value;
			},
			changeCompensation(e) {
				this.compensation = e.target.value;
			},
			changeServicetime(e) {
				this.serviceTime = e.target.value;
			},
			changeIsShowPrice(e) {
				this.isShowPrice = e.target.value;
			},
			checkstates1(event, i) {
				//				console.log(event);
				if(event.target.checked == true) {
					this.parts1[i].state = true;
				} else {
					this.parts1[i].state = false;
				}
				this.checkedItem1 = this.parts1.filter((v) => v.state == true);
				let ss = [];
				for(let i = 0; i < this.checkedItem1.length; i++) {
					ss.push(this.checkedItem1[i].name);
				}
				this.cc1 = ss.toString();
			},
			checkstates2(event, i) {
				//				console.log(event);
				if(event.target.checked == true) {
					this.parts2[i].state = true;
				} else {
					this.parts2[i].state = false;
				}
				this.checkedItem2 = this.parts2.filter((v) => v.state == true);
				let ss = [];
				for(let i = 0; i < this.checkedItem2.length; i++) {
					ss.push(this.checkedItem2[i].name);
				}
				this.cc2 = ss.toString();
			},
			//提示框
			toast: function(str) {
				let that = this;
				that.toastText = str;
				that.toastShow = true;
				setTimeout(function() {
					that.toastShow = false
				}, 2000)
			}

		},
		components: {
			'v-datepickers': Datapickers,
		}

	}
</script>

<style>
	.demo-description {
		clear: both;
		padding: 12px;
		font-size: 1.3em;
		line-height: 1.4em;
	}
	
	.ui-draggable,
	.ui-droppable {
		background-position: top;
	}
	
	* {
		margin: 0;
		padding: 0;
	}
	
	.rapper {
		width: 80%;
		margin: 20px auto
	}
	
	.property>p {
		font-size: 18px;
		font-weight: 600;
	}
	
	.tables {
		color: #222;
		font-size: 14px;
		border-color: #e1e1e1;
	}
	
	.tables th,
	.tables td {
		height: 40px;
	}
	
	.tables th:nth-child(odd),
	.tables td:nth-child(odd) {
		background: #f4f4f4;
		width: 150px;
		text-align: right;
	}
	
	.tables th:nth-child(even),
	.tables td:nth-child(even) {
		width: 180px;
	}
	
	.blank {
		background: #fff!important;
	}
	
	.line {
		width: 1004px;
		height: 150px;
		border: 1px solid #e1e1e1;
		display: flex;
		flex-direction: row;
	}
	
	.line>div {
		width: 190px;
		height: 140px;
		margin: 10px 10px 0 0;
	}
	
	a[class*='image'] {
		display: block;
		width: 100%;
		height: 80%;
	}
	
	img[class*='img'] {
		display: block;
		margin: auto;
	}
	
	.line>div:last-child {
		margin-right: 0
	}
	
	.line>div>p {
		font-size: 16px;
		text-align: center;
	}
	
	.line>div:first-child {
		margin-left: 7px
	}
	
	.submitBtn {
		position: fixed;
		top: 5px;
		right: 145px;
	}
	
	.submitBtn input {
		width: 100px;
		height: 35px;
		border-radius: 10px;
		border: none;
		background: #6cd970;
		color: #fff;
		font-size: 16px;
	}
	
	input,
	select {
		outline: none;
	}
	
	input[type='text'] {
		border: none;
		height: 26px;
		padding-left: 5px;
	}
	
	select {
		width: 100%;
		text-align-last: center;
		height: 100%;
		border: none;
		font-size: 14px;
	}
	
	label {
		margin-right: 15px;
	}
	
	.beginTime,
	.orderState,
	.productNo,
	.productName,
	.dealer,
	.orderNo,
	.endTime,
	.carAge,
	.current {
		background: #f4f4f4;
	}
	
	.goback {
		background: #f87d7d!important;
	}
	
	.toast {
		position: fixed;
		z-index: 2000;
		left: 50%;
		top: 45%;
		transition: all .5s;
		-webkit-transform: translateX(-50%) translateY(-50%);
		-moz-transform: translateX(-50%) translateY(-50%);
		-ms-transform: translateX(-50%) translateY(-50%);
		-o-transform: translateX(-50%) translateY(-50%);
		transform: translateX(-50%) translateY(-50%);
		text-align: center;
		border-radius: 8px;
		color: #FFF;
		background: rgba(17, 17, 17, 0.7);
		height: 60px;
		line-height: 60px;
		font-size: 18px;
		padding: 0 15px;
		min-width: 130px;
		max-width: 180px;
	}
</style>