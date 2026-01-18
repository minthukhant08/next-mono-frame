import api from '@/api'
import routes from '@/api/users/routes'
import { toQueryString } from '@/utils'

export default {
    getAll: ({ params, config } : getRequestObject) => 
        api.get<HTTPResponse<unknown>>(routes.all + toQueryString(params), { ...config }),
}