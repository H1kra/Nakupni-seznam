import Joi from "joi";

export const ListIdFromQuerySchema = Joi.object({
    ListId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/i)
        .required()
        .messages({
            "string.pattern.base": "Project ID must be a valid MongoDB ObjectId.",
            "any.required": "Project ID is required."
        })
});