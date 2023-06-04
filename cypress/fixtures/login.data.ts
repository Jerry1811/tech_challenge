import { faker } from "@faker-js/faker";

export const displayName = () => {
  return faker.internet.displayName();
};
