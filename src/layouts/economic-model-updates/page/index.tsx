import { TopList, SubTitleAlt } from '../../../styles/MainContentStyles';
import styled from 'styled-components';

const Lead = styled.p`
  font-weight: 600;
`;

const EconomicModelUpdatesPage = () => {
  return (
    <>
      <Lead>
        Many of the datasets this economic profile are underpinned by the NIEIR-ID economic model, which is updated each
        financial year. In the 2017-18 update you can expect to see differences in some of the numbers to previous
        updates, particularly with historical data in Gross Regional Product, Value-added for some industries, and
        employment.
      </Lead>
      <SubTitleAlt>Why has historical data changed?</SubTitleAlt>
      <TopList>
        <li>
          <strong>For datasets based on population count</strong> (such as Employment), the availability of a new Census
          leads to adjustments to series to which the Local Government Area data estimates are benchmarked. This affects
          not just the current year, but past years going back to 2001.
        </li>
        <li>
          <strong>For money-based datasets</strong> (such as industry value added, gross regional product, household
          disposable income), NIEIR-ID estimates are benchmarked for Local Government Areas using a price base derived
          from ABS National and State Accounts. Because this price base changes each financial year, all corresponding
          money-based ($m) series of data get historically revised according to these new benchmarks. For some
          industries (particularly those based mainly on commodities), changes to the price base can mean significant
          changes to previous GRP and growth rate estimates.
        </li>
      </TopList>
      <p>Continue reading for more details.</p>

      <SubTitleAlt>The 2016 Census</SubTitleAlt>
      <p>
        The 2016 Census results are fully incorporated into the updated estimates. There is some confusion with this new
        data after a Census - why are the Census estimates of employment below (in some cases well below) the employment
        estimates from the NIEIR economic data? The reason is that NIEIR’s data base is benchmarked to the Australian
        Bureau of Statistics (ABS) Labour Force Survey, in which the ABS makes adjustments for the under-counting of
        employment in the Census. It takes time for the ABS to do this, and the adjustment of the Labour Force Survey
        estimates are not yet fully completed. Therefore, further adjustments in this regard may flow on into the
        2018-19 update. In general, however, even though Census 2016 data imputed work location for those people who
        didn’t state it, it is still an undercount compared to actual employment as measured by the Labour Force Survey.
      </p>
      <SubTitleAlt>Why do data series constantly change?</SubTitleAlt>
      <p>
        Other than the employment issue the main question which arises from the issue of an updated version of the
        NIEIR-ID data base is why do historical series going back decades change compared to the previous versions of
        the data in general and the most recent version in particular? A general rule with statistical estimates is that
        in more recent years better estimates are made by the ABS for past data, so these are revised. The updated data
        base issued after a new Census will also most likely change the estimates for the 2011 to 2016 period. The
        question is why the data series for an LGA going right back to 2001 should also change.
      </p>
      <p>
        In understanding these changes, it is useful to distinguish between money-based ($m) series and straightforward
        count series, such as estimates of employment and population.
      </p>
      <SubTitleAlt>Changes in $m series: Price bases</SubTitleAlt>
      <p>
        From one period to another the quantities and prices comprising transactions in the economy change. This means
        that when the current price value of an aggregate, such as GRP or value added, in one period is compared with
        the current price value in another period, the difference between them usually reflects both changes in quantity
        and changes in price. In order to estimate by how much the 'volume' of GRP has changed between the two periods
        we need to exclude the direct effects of price change.
      </p>
      <p>
        This means that one of the main changes to the value aggregates is due to changing the price base – that is the
        chain volume measure (CVM) year – changes each year in accordance with the price (or CVM) year of the latest ABS
        National and State Accounts. This is because the LGA data series are benchmarked to the corresponding National
        and State Accounts. Therefore, as the price base changes in the latest National and State accounts, so will the
        price base of the LGA estimates.
      </p>
      <p>
        For the current data update the price base is the 2016-17 fiscal year. For last year’s data base the price base
        was the prices of the 2015-16 fiscal year. Generally, the price base year is one year prior to the latest
        reference year of the data.
      </p>
      <p>This can have a significant impact on series such as </p>
      <TopList>
        <li>industry value added;</li>
        <li>gross regional product; and</li>
        <li>household disposable income, etc.</li>
      </TopList>
      <p>
        Generally, the largest variation is for mining gross product because of changes to commodity prices. Agriculture
        can be equally unstable because of the volatility of output prices.
      </p>
      <SubTitleAlt>Changes in $m series: Relative prices</SubTitleAlt>
      <p>Changes in relative prices can have a large impact on industry value added and GRP growth rates profiles.</p>
      <p>
        For a single unique product (e.g. steel production), a change in the price base will not impact on the growth
        rates of the series by quarter or annually. This is because steel is measured by tonnes; the amount of tonnes
        produced is unaffected by the price base.{' '}
      </p>
      <p>
        However, the change in CVM year price base will change the <em>relative prices</em> of products and services
        within each given industry and therefore the growth rates year-by-year or quarter-by-quarter. This is because
        the NIEIR-ID data base is the 86 2-digit ANZSIC industries; each industry is a composite of many products and
        services.
      </p>
      <p>
        As an illustration, take the most important composite series in the NIEIR-ID data base: gross regional product.
        For an LGA in 2013-14 CVM price year mining gross product is $100 million and services $150 million, giving a
        total GRP of $250 million. For the 2014-15 CVM year the output price of mining fell by around 50 per cent,
        reducing gross product to $60 million. Although there was no change in the real CVM growth rate for mining gross
        product between 2013-14 and 2014-15, this implies a 2014-15 CVM value of mining gross product of $50 million for
        the 2013-14 price year.{' '}
      </p>
      <p>
        In the year earlier CVM price year the mining gross product was double this estimate. As can be seen from Table
        1, although each of the two industry components of GRP have the same growth rates irrespective of the CVM price
        year, the growth rates for GRP are different. For the 2013-14 CVM price year, the 2014-15 and 2013-14 growth
        rates for GRP is 10.8 per cent, compared to 8.5 per cent for the 2014-15 CVM price year. The reason is the lower
        weight given to mining gross product in determination of GRP for the latter CVM year compared to the earlier
        price base year.
      </p>
      <p>
        This is typical of the change in GRP growth rates for mining-dominated LGAs between the estimates of different
        vintages (CVM years) as mining prices fell and mining output increased rapidly.
      </p>
      <p>
        Table 1 illustrates the case of the impact of the change in the CVM price year on the growth rate of gross
        regional product for an LGA.
      </p>

      <p>
        The cumulative impact over four to five years of a change in the price base year could result in a 10 to 12 per
        cent growth-rate difference, compared to the previous year data base, based on a different CVM year. This is
        perhaps the main source for the difference between GRP estimates for last year compared to this year after
        adjustment for the aggregate change in the price base.
      </p>
      <p>
        In reality Services in Table 1 will be a composite series of 85 other industries nearby, all of which will have
        growth rates changed from the selection of the CVM years, meaning the growth rate profile for gross regional
        product could well be further altered by changes to all industries, not just from mining.
      </p>
      <p>
        The conclusion is that for a series dealing with industry activity changes in the CVM year is generally not
        comparable with previous year’s estimates. For these series each update creates a unique reality of the
        statistical profile in terms of the history of the series of how the LGA has performed and its comparison with
        other LGAs. For some LGAs, especially those with high shares for the mining and agriculture industries, the
        gross regional product level and historical growth rates will look very different when compared to the previous
        year estimate, to the extent that some will conclude it must be a different LGA.
      </p>
      <p>
        Some may conclude that the solution to this is to fix the price base year and hold it for many years. There are
        two reasons why this cannot/should not be done. Firstly, one would have to ignore benchmarking the LGA data to
        the actual National and State Accounts and construct a new set of accounts based on a fixed price year. This
        would result in a growing disconnect between the LGA data base and the official accounts for the state and the
        nation. Secondly, when the ABS did hold the price base constant for many years, the structure of the economy
        reflected in the accounts became increasingly distorted from the reality of the structure of the economy that
        was emerging.
      </p>
      <p>
        The only thing to do is simply to accept that the historical and relative reality that an LGA may well change
        with a change in the CVM year. For many LGAs, especially those with high services production, the change in the
        CVM year may have only have a relative minor impact in growth rate terms if not the value of the series.
      </p>

      <SubTitleAlt>
        <a id="The_20142016_national_inputoutput_tables_13"></a>The 2014-15 national input-output tables
      </SubTitleAlt>
      <p>
        The current data base incorporates the latest national input-output tables, which is for the 2014-15 fiscal year
        and updated to 2016-17. The individual cells in the input-output tables for the direct allocation of
        international imports become the constraints for the estimates of interregional trade flows by industry between
        LGAs.
      </p>

      <SubTitleAlt>Changes in count series: Resident employment</SubTitleAlt>
      <p>
        The analysis above does not apply to “count” series, such as for employment and population series. However, they
        can change simply because, as noted at the beginning of this note, the availability of a new Census leads to
        adjustments to series which the LGA data estimates are benchmarked to.
      </p>
      <p>
        In terms of the methodology of data development in the preparation of the NIEIR-ID data base, the first and most
        important step is to prepare estimates of total resident employment by LGA. To do this a number of data sources
        are used, including labour-force statistics, tax and social security data. This is the reference series which
        influences the outcome for the development of all subsequent series. Given the importance of this series and the
        fact that it’s a count series not influenced by changes in the CVM year, the comparison of the resident
        employment estimates for the 2017 data base for the 2016 year compared to the estimates for 2016 resident
        employment from the 2018 data base will give an indication of the performance of the NIEIR-ID methodology in
        estimating data well beyond the year of the last Census.
      </p>
      <p>
        There is a catch however. The basic benchmark in estimating resident employment is the working-age population,
        which in turn is taken directly from the ABS estimates. In effect the various series used to estimate resident
        employment are expressed in terms of per capita of the working-age population; the final estimate is derived
        from multiplying the average estimates from the different sources by the ABS estimate of the working-age
        population.
      </p>
      <p>
        The ABS make significant adjustments to the Estimated Resident Population (and working-age component of it)
        after each Census. For instance, after the 2016 Census, Victoria “gained” 115,000 extra people, while WA “lost”
        59,000 people. How well did the ABS do in estimating working-age population (that is, the population aged
        between 15 and 64)?{' '}
      </p>
      <p>
        If the NIEIR-ID estimates of resident employment for resident employment made in 2017 for 2016 compared to the
        2016 estimate made in the current data base after correcting for changes in the estimates of the working age
        population, the mean difference is 0.5 per cent and the mean absolute difference is 2.2 per cent.
      </p>
      <p>
        This indicates that, on average, most of the variation in the resident employment estimates was the result of
        revision after the Census in the ABS population estimates, not in the NIEIR-ID methodology of estimation.
        However, as the NIEIR-ID estimates are always benchmarked to population, we are constrained by the estimates
        that ABS produce, which do get revised.
      </p>

      <SubTitleAlt>
        <a id="Labourforce_benchmarks_for_the_2018_data_base_0"></a>Labour-force benchmarks for the 2018 data base
      </SubTitleAlt>
      <p>
        The NIEIR methodology in deriving the employment and hours estimates is to employ a range of benchmarks from LGA
        total employment, regional (a combination of LGA industry employment and hours estimates at the SA4 level) and
        state industry employment and hours estimates. The methodology results in an iterative process (at least a 30
        repeat sequence for a given quarter), which benchmarks the individual LGA industry estimates to each constraint
        in turn until convergence is achieved. That is when all the possible benchmarks produce an unchanged outcome for
        any given LGA industry employment or hours estimate. This is the same methodology that is employed by the ABS in
        developing national input output tables. It is called the RAS method.
      </p>
      <p>
        Unfortunately, it is not always possible to achieve convergence for some industries – especially for the first
        update after the availability of a new census. An outcome for the update for the 2011 census issued in early
        2013, or the 2013 data base, will illustrate the issue. After the 2013 data base was issued it was identified
        that the data base had eliminated 3000 defense employees from the City of Rockingham that were in the 2011
        census estimates. The reason was that the final benchmarking was to the labour-force estimates and these defense
        employees, as at the beginning of 2013, were not included in the Western Australian industry labour-force
        estimates. These employees were in the labour-force estimates available by early 2014, so there was not a
        problem of benchmarking for the final estimates at the last stage of the RAS method to the labour-force
        estimates.
      </p>
      <p>
        The NIEIR method now imposes constraints that ensure no employment or hours estimate at an industry level for an
        individual LGA could fall below the census estimate. If the labour-force estimates have not been fully adjusted
        there will be a discrepancy between the sum of the LGA industry estimates and the state control totals if the
        final step is not to benchmark to the labour-force estimates. However, to preserve the integrity of the census
        results, the final step is to benchmark the data to the LGA total employment control estimates (the importance
        of these is explained below); these in turn are benchmarked to the total state employment labour-force estimates
        but not the individual industry estimates. The problem that arises from this from the current data base can be
        illustrated with the case of Victorian agriculture. At the one-digit industry level the census employment in
        Victorian agriculture is around 65,000. The current labour-force estimates for the third quarter of 2016 (the
        time of the census) is around 91,000. The current SA4 agriculture employment estimate for Victoria, when summed
        across the relevant SA4, is over 100,000 for the same quarter. The estimate from the 2018 data bank of the sum
        of Victorian LGAs is 86,000. The expectation is that when the final labour-force estimates are prepared by the
        ABS incorporating all the changes from the 2016 census, Victorian agricultural employment will be closer to this
        estimate than the current estimate. If this is not the case, two things could happen: either total Victorian
        employment will have to be revised upwards, or the current two-digit employment estimates of a number of other
        industries will have to be revised downwards.
      </p>
      <p>
        This means that for this data base there will generally be a discrepancy for agriculture and other industries’
        state control totals and the sum of the estimates from the State LGAs. Eliminating these discrepancies would
        involve reducing individual LGA employment and hours worked estimates below census benchmarks.
      </p>
      <p>
        Hopefully these problems will be greatly mitigated for the 2019 data base when the ABS has completed
        benchmarking labour-force estimates. Even for this data base update there is not a significant problem for the
        majority of industries. The standout case for possible downward revision of total employment estimates is the
        case of the manufacturing sector. Final resolution on the issue of manufacturing employment will have to wait
        until next year.
      </p>
    </>
  );
};

export default EconomicModelUpdatesPage;
