import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
query GetProducts {
  getProducts {
    _id
    name
    category
    cost
    description
    file
  }
}
`