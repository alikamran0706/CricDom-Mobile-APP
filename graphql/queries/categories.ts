import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query GetCategories(
    $filters: CategoryFiltersInput
    $pagination: PaginationArg
    $sort: [String]
    $status: PublicationStatus
  ) {
    categories(filters: $filters, pagination: $pagination, sort: $sort, status: $status) {
      documentId
      name
      slug
      type
      createdAt
      updatedAt
      publishedAt
    }
  }
`;

export const GET_ALL_CATEGORIES_BY_CITY = gql`
query Businesses($filters: BusinessFiltersInput) {
  businesses(filters: $filters) {
    categories {
      documentId
      name
      slug
    }
  }
}
`

export const SEARCH_CATEGORIES = gql`
  query SearchCategories($filters: CategoryFiltersInput, $pagination: PaginationArg) {
    categories(filters: $filters, pagination: $pagination) {
      id
      name
      slug
      is_popular
      meta_title
      meta_description
      banner {
        image {
          url
          alternativeText
          formats
        }
        description
      }
      cities {
        id
        name
        slug
        state
      }
    }
  }
`

export const GET_ALL_CATEGORIES = gql`
 query Categories {
  categories {
    name
    slug
    meta_title
    meta_keywords
    meta_description
    mp_meta_description
    mp_meta_title
    mp_content
    content
    banner {
      description
      heading
      image {
        name
        width
        height
        formats
        size
        url
        previewUrl
        alternativeText
      }
    }
  }
}
`;

export const GET_CATEGORY_BY_SLUG = gql`
  query CategoryBySlug($slug: String!) {
    categories(filters: { slug: { eq: $slug } }) {
      name
      slug
      meta_title
      meta_keywords
      meta_description
      mp_meta_description
      mp_meta_title
      mp_content
      content
      cities {
        documentId
        name
        slug
        state
        image {
          name
          width
          height
          formats
          size
          url
          previewUrl
          alternativeText
        }
      }
      banner {
        description
        heading
        image {
          name
          width
          height
          formats
          size
          url
          previewUrl
          alternativeText
        }
      }
    }
  }
`;

