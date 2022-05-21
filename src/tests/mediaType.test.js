const res = require("./../storeAsyncActions/account")
import { defineMediatype } from './../storeAsyncActions/account';

test("defines media type of movie", () => {
  const media = {
    number_of_seasons: undefined,
    first_air_date: undefined
  }
  expect(defineMediatype(media)).toBe("movie")
})