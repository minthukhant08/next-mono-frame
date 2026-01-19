import userApi from '@/api/users'
import FetchAllUserButton from '@/templates/all-user-button'

export default async function Dashboard() {
	const res = await userApi.getAll({
		params: { search: '', offset: 0, limit: 100 },
		config: { cache: 'no-cache', next: { tags: ['dashboard-user-list'] } },
	})
	if (res.ok) {
		res.data
	}
	console.log(res.data && res.data[0].id)
	return (
		<div>
			Dashbaord
			<FetchAllUserButton tag="dashboard-user-list" />
		</div>
	)
}
