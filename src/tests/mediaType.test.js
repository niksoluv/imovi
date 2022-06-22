const res = require("./../storeAsyncActions/account")
import { defineMediatype } from './../storeAsyncActions/account';

test("defines media type of movie", () => {
  const media = {
    number_of_seasons: undefined,
    first_air_date: undefined
  }
  expect(defineMediatype(media)).toBe("movie")
})

test("defines media type of movie", () => {
  const media = {
    number_of_seasons: undefined,
    first_air_date: '22-02-2222'
  }
  expect(defineMediatype(media)).toBe("tv")
})

test("defines media type of movie", () => {
  const media = {
    number_of_seasons: 1,
    first_air_date: undefined
  }
  expect(defineMediatype(media)).toBe("tv")
})

test("defines media type of tv", () => {
  const media = {
    number_of_seasons: 1,
    first_air_date: '22-02-2222'
  }
  expect(defineMediatype(media)).toBe("tv")
})