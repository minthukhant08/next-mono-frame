import settingRepo from '@/backend/repositories/setting'

export const getSetting = async (key: string, type: 'string' | 'number') => {
	const result = await settingRepo.getSettingValueByKey(key)

	if (!result) return 0

	switch (type) {
		case 'string':
			return result.value
		default:
			const parsedValue = parseInt(result.value)
			if (!isNaN(parsedValue)) {
				return parsedValue
			}
			return 0
	}
}

export default {
	getSetting,
}
