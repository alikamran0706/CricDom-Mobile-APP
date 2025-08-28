import { gql } from "@apollo/client";

export const ADD_BUSINESS = gql`
    mutation CreateBusiness($data: BusinessInput!) {
        createBusiness(data: $data) {
          name
          slug
          description
          phone
          email
          website
          address
          state
          zip
          tags
          images {
            documentId
          }
          city {
            documentId
          }
          categories {
            documentId
          }
          users_permissions_user {
            documentId
          }
        }
    }
`

export const UPDATE_BUSINESS = gql`
  mutation UpdateBUSINESS($documentId: ID!, $data: BusinessInput!) {
    updateBusiness(documentId: $documentId, data: $data) {
      name
      slug
      description
      phone
      email
      website
      address
      state
      zip
      tags
      images {
        documentId
      }
      city {
        documentId
      }
      categories {
        documentId
      }
    }
  }
`

export const DELETE_BUSINESS = gql`
  mutation DeleteBusiness($documentId: ID!) {
  deleteBusiness(documentId: $documentId) {
    documentId
  }
}
`