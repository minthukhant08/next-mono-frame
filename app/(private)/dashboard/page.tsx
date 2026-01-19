import userApi from '@/api/users'

export default async function Dashboard() {
	const res = await userApi.getAll({
		params: { search: '', offset: 0, limit: 100 },
		config: { cache: 'no-cache', next: { tags: ['test tag'] } },
	})
	if (res.ok) {
		res.data
	}
	console.log(res.data && res.data[0].id)
	return <div>Dashboard</div>
}
