'use client'

import React from 'react';
import { fetchCars } from "@/utils";
import { HomeProps } from "@/types";
import { fuels, yearsOfProduction } from "@/constants";
import { CarCard , ShowMore ,  SearchBar, CustomFilter, HeroSection } from "@/components";

export default function Home({ searchParams }: HomeProps) {
  const [allCars, setAllCars] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const cars = await fetchCars({
        manufacturer: searchParams.manufacturer || "",
        year: searchParams.year || 2022,
        fuel: searchParams.fuel || "",
        limit: searchParams.limit || 10,
        model: searchParams.model || "",
      });
      setAllCars(cars);
    }
    fetchData();
  }, [searchParams]);

  const isDataEmpty = !allCars?.length;

  if(!isDataEmpty) {
    return (
      <main className='overflow-hidden'>
        <HeroSection />

        <div className='mt-12 padding-x padding-y max-width' id='discover'>
          <div className='home__text-container'>
            <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
            <p>Explore our cars you might like</p>
          </div>

          <div className='home__filters'>
            <SearchBar />

            <div className='home__filter-container'>
              <CustomFilter title='fuel' options={fuels} />
              <CustomFilter title='year' options={yearsOfProduction} />
            </div>
          </div>

          {!isDataEmpty ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars?.map((car) => (
                <CarCard car={car} key={car} />
              ))}
            </div>

            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
            />
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
        </div>
      </main>
    );
  } else {
    return (
      <div className='flex space-x-2 justify-center items-center bg-white h-screen'>
        <div className='h-8 w-8 bg-primary-blue rounded-full animate-bounce [animation-delay:-0.3s]'></div>
        <div className='h-8 w-8 bg-primary-blue rounded-full animate-bounce [animation-delay:-0.15s]'></div>
        <div className='h-8 w-8 bg-primary-blue rounded-full animate-bounce'></div>
      </div>
    )
  }
}
