import { gql } from 'apollo-server-express'
import { find, remove } from 'lodash'

const peoples = [
    {
        id: "1",
        firstName: "Bill",
        lastName: "Gates",
    },
    {
        id: "2",
        firstName: "Steve",
        lastName: "Jobs",
    },
    {
        id: "3",
        firstName: "Linux",
        lastName: "Torvalds",
    },
];

const cars = [
    {
      id: "1",
      year: "2019",
      make: "Toyota",
      model: "Corolla",
      price: "40000",
      personId: "1",
    },
    {
      id: "2",
      year: "2018",
      make: "Lexus",
      model: "LX 600",
      price: "13000",
      personId: "1",
    },
    {
      id: "3",
      year: "2017",
      make: "Honda",
      model: "Civic",
      price: "20000",
      personId: "1",
    },
    {
      id: "4",
      year: "2019",
      make: "Acura ",
      model: "MDX",
      price: "60000",
      personId: "2",
    },
    {
      id: "5",
      year: "2018",
      make: "Ford",
      model: "Focus",
      price: "35000",
      personId: "2",
    },
    {
      id: "6",
      year: "2017",
      make: "Honda",
      model: "Pilot",
      price: "45000",
      personId: "2",
    },
    {
      id: "7",
      year: "2019",
      make: "Volkswagen",
      model: "Golf",
      price: "40000",
      personId: "3",
    },
    {
      id: "8",
      year: "2018",
      make: "Kia",
      model: "Sorento",
      price: "45000",
      personId: "3",
    },
    {
      id: "9",
      year: "2017",
      make: "Volvo",
      model: "XC40",
      price: "55000",
      personId: "3",
    },
  ];
  

const typeDefs = `
  type People {
    id: String!
    firstName: String
    lastName: String
  }
  type Car {
    id: String!
    year: String
    make: String
    model: String
    price: String
    personId: String
  }
  type Mutation {
   addPeople(id: String!, firstName: String!, lastName: String!): People
   updatePeople(id: String!, firstName: String, lastName: String): People
   removePeople(id: String!): People
   addCar(
    id: String!
    year: String!
    make: String!
    model: String!
    price: String!
    personId: String!
  ): Car
  updateCar(
    id: String!
    year: String!
    make: String!
    model: String!
    price: String!
    personId: String!
  ): Car
  removeCar(id: String!): Car
  }
  type Query {
    people(id: String!): People
    peoples: [People]
    car(id: String!): Car
    cars: [Car]
  }
`

const resolvers = {
    Query: {
        peoples: () => peoples,
        people: (root, { id }) => {
            return find(peoples, { id });
        },
        cars: () => cars,
        car: (root, args) => {
            return find(cars, { id: args.id });
        },
    },
    Mutation: {
        addPeople: (root, { id, firstName, lastName }) => {
            const newPeople = {
                id,
                firstName,
                lastName,
            };

            peoples.push(newPeople);

            return newPeople;
        },
        updatePeople: (root, { id, firstName, lastName }) => {
            const people = find(peoples, { id });

            if (!people) {
                throw new Error(`Couldn't find person with id ${id}`);
            }

            people.firstName = firstName;
            people.lastName = lastName;

            return people;
        },
        removePeople: (root, { id }) => {
            const removedPeoples = find(peoples, { id });

            if (!removedPeoples) {
                throw new Error(`Couldn't find Person with id ${id}`);
            }

            remove(peoples, (c) => {
                return c.id === removedPeoples.id;
            });

            return removedPeoples;
        },
        addCar: (root, args) => {
            const newCar = {
                id: args.id,
                year: args.year,
                make: args.make,
                model: args.model,
                price: args.price,
                personId: args.personId,
            };

            cars.push(newCar);

            return newCar;
        },
        updateCar: (root, args) => {
            const car = find(cars, { id: args.id });

            if (!car) {
                throw new Error(`Couldn't find car with id ${args.id}`);
            }

            car.make = args.make;
            car.model = args.model;
            car.year = args.year;
            car.personId = args.personId;
            car.price = args.price;

            return car;
        },
        removeCar: (root, args) => {
            const removedCars = find(cars, { id: args.id });

            if (!removedCars) {
                throw new Error(`Couldn't find car with id ${args.id}`);
            }

            remove(cars, (c) => {
                return c.id === removedCars.id;
            });

            return removedCars;
        },
    }
}

export { typeDefs, resolvers }