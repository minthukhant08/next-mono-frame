'use server'

import { revalidateTag, updateTag } from 'next/cache'

export async function revalidateDataByTag(tag: string) {
	revalidateTag(tag, 'max')
}

export async function updateDataByTag(tag: string) {
	updateTag(tag)
}
