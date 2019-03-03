import axios from 'axios'

const instance = axios.create({
	baseURL :'https://www.imvango.com/vg_kdcf'   
})

//instance.defaults.headers.common['SOMETHING'] = 'SOMETHING';

export default instance
