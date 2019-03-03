<template>
  <div class="Index">
     <div class="row mb-5">
				<ul class="col-2">
					<div class="list-group">
						<router-link tag='li' to="/datashow" class="nav-link" >
							<a class="list-group-item list-group-item-action" @click="clicks(1)">数据监测</a>
						</router-link>
						<router-link tag='li' to="/kdcfdata" class="nav-link">
							<a class="list-group-item list-group-item-action" @click="clicks(2)">口袋车服</a>
						</router-link>
						<router-link tag='li' to="/suning" class="nav-link">
							<a class="list-group-item list-group-item-action" @click="clicks(3)">苏宁</a>
						</router-link>
					
					</div>
				</ul>
				<div class="col-10" id="col">
					<router-view></router-view>
				</div>
	  </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
//    titleArr:['数据监测','口袋车服','苏宁']
    }
  },
  methods:{
  	clicks(){
  		console.log(111111111111)
  	}
  }
}
</script>

<style scoped>
	ul{
		
	}
	li{
		list-style: none;
	}
  #col{
  	padding-top:10px;
    padding-bottom: 80px;
    margin-left: -50px;
    /*overflow:auto*/
  }
  .list-group{
  	margin-top: 20px;
  }
  .nav-link{
  	    margin-top: -12px;
        width: 160px;
  }
  .router-link-active a{
  	background: #f60;
  	color: #fff;
  }  
</style>
