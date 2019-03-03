<template>
      <nav>
      	<p class="totalTitle">
      		<div>共有<span style="margin:0 4px;color: #428bca;">{{total}}</span>数据</div>
      	</p>
			<ul class="pagination" style="margin-left: 20px;margin-top: 14px;">
				<li id="lis" :class="{'disabled': current == 1}">
					<a href="javascript:;" @click="setCurrent(current - 1)"> « </a>
				</li>
				<li id="lis" :class="{'disabled': current == 1}">
					<a href="javascript:;" @click="setCurrent(1)"> 首页 </a>
				</li>
				<li id="lis" v-for="p in grouplist" :class="{'active': current == p.val}" >
					<a href="javascript:;" @click="setCurrent(p.val)"> {{ p.text }} </a>
				</li>
				<li id="lis" :class="{'disabled': current == page}">
					<a href="javascript:;" @click="setCurrent(page)"> 尾页 </a>
				</li>
				<li id="lis" :class="{'disabled': current == page}">
					<a href="javascript:;" @click="setCurrent(current + 1)"> »</a>
				</li>
			</ul>
		</nav>
</template>
<script>
	export default {
	data() {
		return {
			current: this.currentPage,
		}
	},
	props: {
		total: { // 数据总条数
			type: Number,
			default: 0
		},
		display: { // 每页显示条数
			type: Number,
			default: 10
		},
		currentPage: { // 当前页码
			type: Number,
			default: 1
		},
		pagegroup: { // 分页条数
			type: Number,
			default: 5,
			coerce: function(v) {
				v = v > 0 ? v : 5;
				return v % 2 === 1 ? v : v + 1;
			}
		}
	},
	computed: {
		page: function() { // 总页数
			return Math.ceil(this.total / this.display);
		},
		grouplist: function() { // 获取分页页码
			var len = this.page,
				temp = [],
				list = [],
				count = Math.floor(this.pagegroup / 2),
				center = this.current;
			if(len <= this.pagegroup) {
				while(len--) {
					temp.push({
						text: this.page - len,
						val: this.page - len
					});
				};
				return temp;
			}
			while(len--) {
				temp.push(this.page - len);
			};
			var idx = temp.indexOf(center);
			(idx < count) && (center = center + count - idx);
			(this.current > this.page - count) && (center = this.page - count);
			temp = temp.splice(center - count - 1, this.pagegroup);
			do {
				var t = temp.shift();
				list.push({
					text: t,
					val: t
				});
			} while (temp.length);
			if(this.page > this.pagegroup) {
				(this.current > count + 1) && list.unshift({
					text: '...',
					val: list[0].val - 1
				});
				(this.current < this.page - count) && list.push({
					text: '...',
					val: list[list.length - 1].val + 1
				});
			}
			return list;
		}
	},
	methods: {
		setCurrent: function(idx) {
			if(this.current != idx && idx > 0 && idx < this.page + 1) {
				this.current = idx;
				this.$emit('pagechange', this.current);
			}
		}
	}
}
</script>
<style scoped>
  nav{
  	min-width: 400px;
  	display: flex;
  	align-items: center;
  	
  }
  nav .totalTitle{
  	height: 34px;
  	line-height: 34px;
  	display: flex;
  	align-items: center;
  	
  }
  .pagination{
  	  	border-radius: 5px;
  }
   .pagination #lis{
	   	width: 40px;
	   	border: 1px solid #ccc;
	   	text-align: center;
	   	height: 36px;
	   	line-height: 36px;
	   	border-right: 0;
   } 
   .pagination #lis:last-child{
   	border-right: 1px solid #ccc;
   }
  .pagination #lis a{
  	font-size: 14px;
  	display: inline-block;
  	 width: 100%;
   	 height: 100%;
  }
   .disabled{
   	 cursor: not-allowed
   }
   .active{
   	background:#428bca ;
   }
   .active a{
   	 color: #fff;
   
   	
   }
   .disabled a{
   	 color: #999;
   	 	 cursor: not-allowed;
   }
</style>