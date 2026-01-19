'use client'
import { Button } from '@/components/ui/button'
import { updateDataByTag } from '@/utils/actions'

export default function FetchAllUserButton({ tag }: { tag: string }) {
	return <Button onClick={() => updateDataByTag(tag)}>Get</Button>
}
