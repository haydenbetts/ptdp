import * as React from 'react';
import styled from 'styled-components/macro';
import { Logos } from './Logos';
import { Title } from './components/Title';
import { Lead } from './components/Lead';
import { A } from 'app/components/A';
import Hero from './Hero';

const Newsletter = () => {

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="mt-4 text-lg text-gray-500">Our Goal</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900">Free Communication</h2>
        </div>
        <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
          We share the goals of <a className="underline mr-1" href="https://connectfamiliesnow.com/">#ConnectFamiliesNow,</a> a collective of national, state, and local organizations fighting to connect families with incarcerated loved ones by making communication free.
          </p>
        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-center">
          <div className="rounded-md shadow">
            <a onClick={() => window.open('https://connectfamiliesnow.com/ourcampaigns')} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-700 hover:bg-green-800 md:py-4 md:text-lg md:px-10 cursor-pointer">
              Join a campaign
              </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Masthead() {
  return (
    // <Wrapper>
    // </Wrapper>
    <div>
      < Hero />
      <Newsletter />
    </div>
  );
}

const Wrapper = styled.main`
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 320px;
`;
