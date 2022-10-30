import { gql } from "@apollo/client";


// ********* PERSONS QUERIES STARTS *************
export const GET_PERSONS = gql`
  {
    personList {
      id
      firstName
      lastName
    }
  }
`;


export const UPDATE_PERSON = gql`
  mutation UpdatePerson($id: String!, $firstName: String!, $lastName: String!) {
    updatePerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

export const REMOVE_PERSON = gql`
  mutation RemovePerson($id: String!) {
    removePerson(id: $id) {
      id
      firstName
      lastName
    }
  }
`;

// ********* PERSONS QUERIES ENDS *************

// ********* CAR QUERIES STARTS *************


export const GET_CARS = gql`
  {
    cars {
      id
      make
      model
      year
      price
      personId
    }
  }
`;

export const ADD_CAR = gql`
  mutation AddCar(
    $id: String!
    $make: String!
    $model: String!
    $year: String!
    $price: String!
    $personId: String!
  ) {
    addCar(
      id: $id
      make: $make
      model: $model
      year: $year
      price: $price
      personId: $personId
    ) {
      id
      make
      model
      year
      price
      personId
    }
  }
`;

export const UPDATE_CAR = gql`
  mutation UpdateCar(
    $id: String!
    $make: String!
    $model: String!
    $year: String!
    $price: String!
    $personId: String!
  ) {
    updateCar(
      id: $id
      make: $make
      model: $model
      year: $year
      price: $price
      personId: $personId
    ) {
      id
      make
      model
      year
      price
      personId
    }
  }
`;

export const REMOVE_CAR = gql`
  mutation RemoveCar($id: String!) {
    removeCar(id: $id) {
      id
      make
      model
      year
      price
      personId
    }
  }
`;

// ********* CAR QUERIES ENDS *************
