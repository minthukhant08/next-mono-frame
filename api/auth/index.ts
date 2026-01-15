import api from '@/api'
import routes from '@/api/auth/routes'
import { loginSchema } from "@/schemas/auth";
import { z } from 'zod';


export default {
    login: (data : z.infer<typeof loginSchema>) =>  api.post<HTTPResponse<LoginResponse>>(routes.login, data),
}