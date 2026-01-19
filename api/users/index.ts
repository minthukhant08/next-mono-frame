import api from '@/api'
import routes from '@/api/users/routes'
import { toQueryString } from '@/utils'
import { UserReponse } from '@/controllers/api/user/types'
export default {
	getAll: ({ params, config }: getRequestObject) =>
		api.get<HTTPResponse<UserReponse[]|null>>(
			routes.resource + toQueryString(params),
			{ ...config },
		),
}
