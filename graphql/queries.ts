import { gql } from "@apollo/client";

export const GET_TREATMENT_CENTERS = gql`
  query GetTreatmentCenters($type: String, $location: String) {
    treatmentCenters(type: $type, location: $location) {
      id
      name
      location
      type
      rating
      address
      phone
    }
  }
`;

export const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      image
      centerCount
    }
  }
`;
