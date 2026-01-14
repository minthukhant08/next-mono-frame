import { ZodError } from "zod";

export const normalizeEmail = (
	email: String | undefined | null
): string | null => {
	return email?.toLowerCase().trim() || null
}

//try treetify later
export const transformZodErrors = (error: ZodError) => {
	const transformedErrors: Record<string, string[]> = {};
	for (const e of error.issues) {
		const fieldName = String(e.path[0]);
		if (!transformedErrors[fieldName]) {
			transformedErrors[fieldName] = [];
		}
		transformedErrors[fieldName].push(e.message);
	}
	return transformedErrors
}