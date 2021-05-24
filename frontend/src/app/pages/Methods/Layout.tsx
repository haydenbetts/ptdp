/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import React from 'react';

const Link = ({ link, text }) => {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      className="cursor-pointer underline"
      onClick={e => {
        e.preventDefault();
        window.open(link);
      }}
    >
      {text}
    </a>
  );
};

export const Layout = () => {
  return (
    <div className="bg-white mb-16" style={{ minHeight: '70vh' }}>
      <div className="mx-auto py-12 px-4 max-w-4xl sm:px-6 lg:px-8 lg:py-12">
        <div className="grid grid-cols-1 gap-12 lg:gap-8 about-container">
          <div></div>
          <div>
            <div className="space-y-5 sm:space-y-4">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Methodology
              </h2>
              <div className="text-sm text-gray-500">
                All our data, and the code we use to collect it is open source.
                You can download our latest data{' '}
                <Link link={'https://github.com/PTDP/data'} text="here" />, and
                view the code used to collect and display it{' '}
                <Link link={'https://github.com/PTDP/ptdp'} text="here" />. Our
                methodology borrows heavily from that used by Pete Wagner and
                Alexi Jones of the Prison Policy Institute in{' '}
                <Link
                  link={
                    'https://www.prisonpolicy.org/phones/state_of_phone_justice.html'
                  }
                  text="The State of Phone Justice."
                />
              </div>
              <div className="text-sm text-gray-500">
                <span>
                  <div>
                    Our dataset includes prison telecom rate data scraped from
                    the online rate calculators of the leading telecom service
                    providers: ICS, Securus, and GTL. Before displaying this
                    data on PTDP's website, we clean, normalize, geotag, and
                    then join it with{' '}
                    <Link
                      link={
                        'https://hifld-geoplatform.opendata.arcgis.com/datasets/prison-boundaries/data?geometry=-136.415%2C26.672%2C116.710%2C66.198'
                      }
                      text="Homeland Infrastructure Foundation-Level Data provided by the Department of Homeland Security."
                    />
                  </div>
                  <div className="mt-2 font-bold">Scope</div>
                  <div className="mt-2">
                    For every US-based facility served by ICS, GTL, and Securus,
                    we aim to collect the following:
                    <div className="mt-2">
                      - The price of calls from a phone number that originates
                      <i> inside</i> of a facility's state for every phone
                      service (e.g. collect calling, prepaid calling, etc) that
                      a facility offers.
                    </div>
                    <div className="mt-2">
                      - The price of calls from a phone number that originates
                      <i> outside</i> of a facility's state for every phone
                      service that a facility offers.
                    </div>
                    <div className="mt-2">
                      For in-state calls, we use the governor's number as the
                      origin number, and for out-of-state calls, we use a
                      randomly selected governor's number from a different
                      state. We hold the randomly selected number constant over
                      time. For example, we will always use the Maryland
                      governor's number to check out-of-state rates in Alabama.
                    </div>
                    <div className="mt-2">
                      Note: Because our data is scraped from private entities,
                      it is updated and amended on a schedule we do not
                      control. Further, our data represents telecom rates as
                      those entities report them publicly, rather than what
                      rates are in practice.
                    </div>
                  </div>

                  <div className="mt-2 font-bold">Scraping</div>
                  <div className="mt-2">
                    The first step in pulling rate data from telecom providers
                    is to run automated web scrapers against the publicly
                    available rate calculators provided by each of the telecom
                    companies we include in our data set.
                  </div>
                  <div className="mt-2">
                    You can view the URLs of these rate calculators in the{' '}
                    <Link
                      link={
                        'https://github.com/PTDP/data/blob/main/data/rates.md'
                      }
                      text="CSV"
                    />
                    containing our latest data and the source code of our web
                    scrapers on github.
                  </div>
                  <div className="mt-2 font-bold">Automated Cleaning</div>
                  <div className="mt-2">
                    The raw scraped data that we save is full of incomplete
                    records. For example, we often encounter facilities that have
                    NULL rates reported. We discard these rates at this
                    point.
                  </div>
                  <div className="mt-2 font-bold">Normalizing</div>
                  <div className="mt-2">
                    In order to build a unified schema from disparate origin
                    sources, we need to transform the names of fields we
                    collect, and, in some cases, do some math to normalize
                    rates. In our database, a rate is calculated by adding the
                    price of the first minute, the price of an additional
                    minute, and the price of any associated taxes. You can find
                    the full transformation logic{' '}
                    <Link
                      link="https://github.com/PTDP/ptdp/tree/master/backend/src/api/controllers/etl/loaders"
                      text="here"
                    ></Link>
                    .
                  </div>
                  <div className="mt-2 font-bold">Geotagging</div>
                  <div className="mt-2">
                    The rate calculators provided by telecom companies provide
                    the name of facilities stored, and their states, but not
                    detailed location information. We use the{' '}
                    <Link
                      link="https://developers.google.com/maps/documentation/places/web-service/overview"
                      text="Google Places API"
                    ></Link>
                    , the programmatic equivalent of a Google Maps search, in
                    order to guess the exact location of every facility reported
                    by the telecom rate calculators given its name + state.
                  </div>
                  <div className="mt-2 font-bold">
                    Joining with external data
                  </div>
                  <div className="mt-2">
                    A core goal of PTDP is to make it possible for researchers
                    to contextualize the rates reported by telecom providers.
                    By, for example, providing information about the population
                    of facilities paying a particular rate. The challenge here
                    is that the facility names reported by telecom providers may
                    vary in subtle and significant ways from the facility names
                    reported by external data providers (like the Department of
                    Homeland Security).{' '}
                  </div>
                  <div className="mt-2">
                    Compare for example, "FSL LA TUNA (EL PASO)", Homeland
                    Security's canonical name for a Federal facility in El Paso
                    with GTL's name for the same facility "Federal Bureau of
                    Prisons TX-La Tuna FSL (El Paso)."
                  </div>
                  <div className="mt-2">
                    In order to perform the data join, we do a combination of
                    spatial joins (checking whether the Google Places reported
                    latitude and longitude is within .5 miles of the external
                    data source's reported latitude and longitude), and fuzzy
                    string matching (
                    <Link
                      text="checking whether the token set ratio is > 75"
                      link="https://github.com/seatgeek/fuzzywuzzy/tree/9a4bc22c7483198fcb96afacc42f5f700fb803ed#token-set-ratio"
                    />
                    ).{' '}
                    <b>
                      By default, we hide any rate data that we are unable to
                      confidently tie to a canonical facility in the Department
                      of Homeland Security's Prison Boundary Dataset. We only
                      reintroduce such rates after manual review.
                    </b>{' '}
                    You can view the details of our approach to reconciling
                    facilities{' '}
                    <Link
                      link="https://github.com/PTDP/ptdp/blob/master/utils/notebooks/reconcile_facilities.ipynb"
                      text="Jupyter notebook."
                    ></Link>
                  </div>
                  <div className="mt-2 font-bold">Manual Correction</div>
                  <div className="mt-2">
                    The above approach to joining vendor reported data to
                    external data is by its nature imprecise. We rely on
                    volunteers to audit our final results, and provide manual
                    corrections to fields to compensate for the imprecision of
                    the automated approach.
                  </div>
                </span>
                <span style={{ position: 'relative' }}></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
