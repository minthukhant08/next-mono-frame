import api from '@/api'
import routes from '@/api/users/routes'
import { toQueryString } from '@/utils'
import { UserReponse } from '@/controllers/api/user'
export default {
    getAll: ({ params, config } : getRequestObject) => 
        api.get<HTTPResponse<UserReponse[]>>(routes.all + toQueryString(params), { ...config }),
}