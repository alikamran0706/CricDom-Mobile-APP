import { client } from "./client";
import { GET_ALL_CATEGORIES, GET_CATEGORY_BY_SLUG } from "./queries/categories";
//
// =======================
// CategoriesGraphqlAPI
// =======================
// Handles fetching categories and their details
//
export const CategoriesGraphqlAPI = {
    async getAll() {
        const { data } = await client.query({ query: GET_ALL_CATEGORIES });
        return data.categories;
    },

    async getBySlug(slug: string) {
        const { data } = await client.query({
            query: GET_CATEGORY_BY_SLUG,
            variables: { slug },
            fetchPolicy: 'no-cache',
        });
        return data.categories[0] || null;
    },
};

