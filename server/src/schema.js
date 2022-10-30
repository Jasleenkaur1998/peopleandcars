import { find, remove } from "lodash";

const personList = [
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
type Person {
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
    addPerson(
        id: String!,
        firstName: String!,
        lastName: String!): Person

    addCar(
        id: String!
        year: String!
        make: String!
        model: String!
        price: String!
        personId: String!
    ): Car

  removePerson(id: String!): Person

  removeCar(id: String!): Car

  updatePerson(
    id: String!,
    firstName: String,
    lastName: String): Person

  updateCar(
    id: String!
    year: String!
    make: String!
    model: String!
    price: String!
    personId: String!
  ): Car
}

type Query {
    person(id: String!): Person
    personList: [Person]
    car(id: String!): Car
    cars: [Car]
}
`;

const typeResolvers = {
    Query: {
        personList: () => personList,
        person: (root, args) => {
            return find(personList, { id: args.id });
        },
        cars: () => cars,
        car: (root, args) => {
            return find(cars, { id: args.id });
        },
    },
    Mutation: {
        addPerson: (root, args) => {
            const addedPerson = {
                id: args.id,
                firstName: args.firstName,
                lastName: args.lastName,
            };

            personList.push(addedPerson);

            return addedPerson;
        },
        updatePerson: (root, args) => {
            const updatedPerson = find(personList, { id: args.id });

            if (!updatedPerson) {
                throw new Error(`Couldn't find person with id ${args.id}`);
            }

            updatedPerson.firstName = args.firstName;
            updatedPerson.lastName = args.lastName;

            return updatedPerson;
        },
        removePerson: (root, args) => {
            const removedpersonList = find(personList, { id: args.id });

            if (!removedpersonList) {
                throw new Error(`Couldn't find Person with id ${args.id}`);
            }

            remove(personList, (c) => {
                return c.id === removedpersonList.id;
            });

            return removedpersonList;
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

            addCar.push(newCar);

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
    },
};

export { typeDefs, typeResolvers };