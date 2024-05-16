"use server";

import { isImageUnique } from "@/pages/create/is-image-unique";
import { saveImage } from "@/features/image-control";
import { createId, prisma } from "@/shared";
import { CompetenceSchema, competenceSchema } from "../schemas";

export async function competenceCreate(_prevState: any, formData: FormData) {
    const data = Object.fromEntries(formData.entries()) as CompetenceSchema;

    const check = competenceSchema.safeParse(data);
    if (!check.success)
        return {
            errors: check.error.flatten().fieldErrors,
        };

    const { title, description, slug } = data;

    const imageId = createId();
    const webPath = `competences/${imageId}`;

    const isImageUniqueCheck = await isImageUnique(webPath);
    if (!isImageUniqueCheck.success) return isImageUniqueCheck;

    try {
        const systemPath = await saveImage(
            formData.get("image") as File,
            imageId,
            "competences",
        );

        await prisma.competence.create({
            data: {
                title,
                description,
                slug,
                competenceCategory: {
                    connect: {
                        slug: formData.get("competenceCategory") as string,
                    },
                },
                image: {
                    create: { systemPath, webPath },
                },
            },
        });
    } catch (e) {
        if ((e as Error).cause instanceof File)
            return { errors: { image: [(e as Error).message] } };
        else return { errors: { database: [(e as Error).message] } };
    }

    return { message: "OK" };
}
