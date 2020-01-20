//  this file is not imported anywhere

// when building out a new page, duplicate `template-page` as a starting point and then copy the corresponding
// item from this object into the `pageContent.entities` object

export default {
  'local-jobs': [
    {
      Title: 'Description',
      renderString: ({ data, contentData }): string =>
        '<p>This indicator shows the estimated number of jobs in the local area, on an annual basis back to 2001. The dataset is derived from the National Economics microsimulation model, based on the ABS labour force survey, and is generally higher than the figure provided by Census, because it is updated every year, and is not subject to Census undercount.<br><br>A count of jobs is one of the most fundamental economic indicators of the size of the local economy, and increasing numbers of jobs generally represent a growing economy. However, jobs are not necessarily full-time and the value of a job varies across areas. For this reason, jobs numbers should be viewed in conjunction with <a href="employment-by-industry-fte?" title="FTE workers link">Employment by industry (FTE)</a> and <a href="worker-productivity-by-industry?" title="Worker Productivity link">Worker Productivity</a> datasets.</p>',
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        'There were [Econ_Ind_LocalJobs].[LocalJobNumber].{0:#,#} jobs located in the [A] in the year ending June [Econ_Ind_LocalJobs].[YearEnding].',
      StoredProcedure: 'sp_Condition_IsLiteClient',
      Params: [
        {
          ClientID: '0',
        },
      ],
      Value: '177',
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        'There were [Econ_Ind_LocalJobsLite].[LocalJobNumber].{0:#,#} jobs located in the [A] in the year ending June [Econ_Ind_LocalJobsLite].[YearEnding].',
      StoredProcedure: 'sp_Condition_IsLiteClient',
      Params: [
        {
          ClientID: '0',
        },
      ],
      Value: '178',
    },
  ],
  'industry-composition': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        'In [Parameter].[sStartYear], the [AboutTheAreas_Broad_Industry].[Top1Label] sector accounted for [AboutTheAreas_Broad_Industry].[Top1Per].{0:0.0}% of employment in [theC]. The importance of this sector has [AboutTheAreas_Broad_Industry].[Compare_Top1Per] over the last 10 years ([AboutTheAreas_Broad_Industry].[Top1Per10YearAgo].{0:0.0}% in [Parameter].[sEndYear])',
    },
  ],
  'employed-residents': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In ${data.currentAreaName}, there were [Econ_Ind_EmployedResidents].[LocalJobNumber].{0:#,#} residents employed in the year ending June [Econ_Ind_EmployedResidents].[YearEnding].`,
      StoredProcedure: 'sp_Condition_IsLiteClient',
      Params: [
        {
          ClientID: '0',
        },
      ],
      Value: '177',
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In ${data.currentAreaName}, there were [Econ_Ind_EmployedResidentsLite].[LocalJobNumber].{0:#,#} residents employed in the year ending June [Econ_Ind_EmployedResidentsLite].[YearEnding].`,
      StoredProcedure: 'sp_Condition_IsLiteClient',
      Params: [
        {
          ClientID: '0',
        },
      ],
      Value: '178',
    },
    {
      Title: 'Description',
      renderString: ({ data, contentData }): string =>
        '<p>This indicator shows the estimated number of employed residents of the local area, on an annual basis back to 2001. Employed residents may have a workplace anywhere, inside or outside the area. The dataset is derived from the National Economics microsimulation model, based on the ABS labour force survey.<br><br>A growing number of resident employed can indicate a growing economy, or a growing residential population, supplying labour to other areas. To build a more complete picture of the residential economy, this dataset should be viewed in conjunction with <a href="local-jobs?" title="local employment link">Local employment</a>, <a href="employed-locally?" title="employment self-containment link">Employment self-containment</a>, <a href="residents-place-of-work-industry?" title="residents place of work by industry link">Residents place of work by industry</a> and <a href="residents-place-of-work-occupation?" title="residents-place-of-work-occupation link">Residents place of work by occupation</a> datasets.</p>',
    },
  ],
  unemployment: [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In the [Econ_Ind_Unemployment].[Year] [Econ_Ind_Unemployment].[Month] quarter, the unemployment rate in ${data.currentAreaName} was [Econ_Ind_Unemployment].[UnemRate].{0:0.00}%.`,
    },
    {
      Title: 'Description',
      renderString: ({ data, contentData }): string =>
        '<p>The unemployment rate is derived from the ABS labour force survey and Centrelink data and compiled by the Department of Employment. It is published quarterly in the Small Area Labour Markets publication, for Local Government Areas. The unemployment rate shown here is the proportion of the resident labour force (those in work or looking for work and aged over 15) who are looking for work. Unemployment does not include people who don’t have a job but are not seeking a job.<br><br>Unemployment is an important indicator of the economic success of an area. A low unemployment rate can indicate an affluent area with a high rate of access to jobs, or a place where those who can’t find jobs leave the area. A high rate can indicate a declining economy with closures of key industries, or a residential area with a significantly disadvantaged population.</p><p>Note: The Department of Employment advise that <strong>highly disaggregated labour force and unemployment estimates at the LGA level can display significant variability and should be viewed with caution.</strong> The figures are smoothed using a four-quarter (annual) average to minimise the variability inherent in small area estimates.</p><p>This page presents unemployment estimates for benchmark regions which are headline figures widely published by government and media sites but are not directly comparable to the LGA estimates as they are not annual averages. For more information, see the data notes. </p>',
    },
  ],
  'housing-prices': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        "At June [Indicators - Housing Values].[LatestYear], the median house valuation in ${data.currentAreaName} was [Indicators - Housing Values].[MedianChange_Num].{0:$#,0;$#,0;' '} [Indicators - Housing Values].[Compare_Median] to [ST].",
    },
    {
      Title: 'Description',
      renderString: ({ data, contentData }): string =>
        '<p>This indicator shows the value of houses and units in [theC] and wider region during the period [Indicators - Housing Values].[MinYear]-[Indicators - Housing Values].[LatestYear]. Housing values are an indicator of the level of demand for housing in the area, as well as the type of housing available. Housing demand may be related to the desirability of the area and proximity to major employment destinations.</p>',
    },
  ],
  'retail-trade': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        'In [Econ_Ind_RetailSales].[Month] [Econ_Ind_RetailSales].[Year], the retail trade estimate for [ST] [Econ_Ind_RetailSales].[Compared_PerRate] [Econ_Ind_RetailSales].[PerRate1].{0:0.00}% from the previous year.',
    },
    {
      Title: 'Description',
      renderString: ({ data, contentData }): string =>
        '<p>Retail Trade turnover is an important indicator of economic health. Increasing retail turnover can indicate a high level of consumer confidence and increased money in the economy. Retail Trade is not available at the local level, so the data presented here is annual percentage change for the state of [CAPCITY], updated monthly.</p>',
    },
  ],
  'housing-rental': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        "At June [Indicators - Housing Rental].[LatestYear], the median weekly rental for houses in ${data.currentAreaName} was [Indicators - Housing Rental].[MedianChange_Num].{0:$#,0;$#,0;' '} [Indicators - Housing Rental].[Compare_Median] to [ST].",
    },
    {
      Title: 'Description',
      renderString: ({ data, contentData }): string =>
        '<p>This indicator shows the weekly rental of houses and units in [theC] and wider region during the period [Indicators - Housing Rental].[MinYear]-[Indicators - Housing Rental].[LatestYear]. Housing weekly rentals are an indicator of the level of demand for housing in the area, as well as the type of housing available. Housing demand may be related to the desirability of the area and proximity to major employment destinations.</p>',
    },
  ],
  'employed-residents1': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `Household disposable income for ${data.currentAreaName} [Econ_Ind_DisposableIncome].[Compare_DisposableIncome] $[Econ_Ind_DisposableIncome].[DisposableIncome].{0:#,#} in 2012 from the previous year.`,
    },
  ],
  'consumer-price-index': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        "<p class=\"main\">In the year to [Econ_Ind_CPI].[Month] [Econ_Ind_CPI].[Year], the CPI for [Econ_Ind_CPI].[AreaName] [Econ_Ind_CPI].[Compared_CPIPerRate] [Econ_Ind_CPI].[CPIPerRate].{0:' '0.0'%';' '0.0'%';''}. During the same period, the CPI for the eight capital cities in Australia [Econ_Ind_CPI].[Compared_CPIPerRateBM] [Econ_Ind_CPI].[CPIPerRateBM].{0:' '0.0'%';' '0.0'%';''}.</p>",
    },
    {
      Title: 'Description',
      renderString: ({ data, contentData }): string =>
        '<p>The Consumer Price Index is an indicator of the inflation rate run by the Australian Bureau of Statistics. It measures the changing price of a fixed basket of goods and services purchased by the average household in 8 capital cities around Australia. This is combined into an index number, calculated quarterly, and the percentage change for the year to the latest quarter is shown.<br><br>Data on CPI is a proxy for the rate of inflation in the consumer sector, and does not necessarily translate into inflation for goods purchased by industry. However it is an easily accessible measure of the inflation rate and can be used to assess the changing value of money over time. CPI is not available for small areas, so the nearest capital city rate is shown on economy.id.</p>',
    },
  ],

  'gross-regional-product': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        '[A]’s Gross Regional Product was $[Econ_GrossRegionalProduct].[NumLatest].{0:#,##0,.00} billion in the year ending June [Econ_GrossRegionalProduct].[YearLatest], [Econ_GrossRegionalProduct].[Compare0] [Econ_GrossRegionalProduct].[PerLatest].{0:0.0}% since the previous year.',
    },
  ],

  'Employment-census': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        ` [Econ_Structure_IndustryABS].[Top1Label] is the largest employer in ${data.currentAreaName}, making up [Econ_Structure_IndustryABS].[Top1Per].{0:0.0}% of total employment.`,
    },
  ],
  'employment-by-industry': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In ${data.currentAreaName}, [Econ_Employment].[Top1Label] is the largest employer, generating [Econ_Employment].[Top1Number] local jobs in [Parameter].[sStartYearLabel].`,
    },
  ],
  'value-add-by-industry': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In ${data.currentAreaName}, [Econ_ValueAdd].[Top1Label] is the most productive industry, generating $[Econ_ValueAdd].[Top1Number].{0:#,#} million in [Parameter].[sStartYearLabel].`,
    },
  ],
  'output-by-industry': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In ${data.currentAreaName}, [Econ_Output].[Top1Label] had the largest output by industry, generating $[Econ_Output].[Top1Number].{0:#,#} million in [Parameter].[sStartYearLabel].`,
    },
  ],
  'exports-by-industry': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In ${data.currentAreaName}, [Econ_Exports].[Top1Label] had the largest total exports by industry, generating $[Econ_Exports].[Top1Number].{0:#,#} million in [Parameter].[sStartYearLabel].`,
      StoredProcedure: 'sp_Condition_Exports',
      Params: [
        {
          exptype: '1',
        },
      ],
      Value: '1',
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In ${data.currentAreaName}, [Econ_ExportsInterRegional].[Top1Label] had the largest total domestic exports by industry, generating $[Econ_ExportsInterRegional].[Top1Number].{0:#,#} million in [Parameter].[sStartYearLabel].`,
      StoredProcedure: 'sp_Condition_Exports',
      Params: [
        {
          exptype: '1',
        },
      ],
      Value: '2',
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In ${data.currentAreaName}, [Econ_ExportsInternational].[Top1Label] had the largest total international exports by industry, generating $[Econ_ExportsInternational].[Top1Number].{0:#,#} million in [Parameter].[sStartYearLabel].`,
      StoredProcedure: 'sp_Condition_Exports',
      Params: [
        {
          exptype: '1',
        },
      ],
      Value: '3',
    },
  ],
  'imports-by-industry': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In ${data.currentAreaName}, [Econ_Imports].[Top1Label] had the largest total imports by industry, generating $[Econ_Imports].[Top1Number].{0:#,#} million in [Parameter].[sStartYearLabel].`,
      StoredProcedure: 'sp_Condition_Imports',
      Params: [
        {
          imptype: '1',
        },
      ],
      Value: '1',
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In ${data.currentAreaName}, [Econ_DomesticImports].[Top1Label] had the largest domestic imports by industry, generating $[Econ_DomesticImports].[Top1Number].{0:#,#} million in [Parameter].[sStartYearLabel].`,
      StoredProcedure: 'sp_Condition_Imports',
      Params: [
        {
          imptype: '1',
        },
      ],
      Value: '2',
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In ${data.currentAreaName}, [Econ_ImportsInternatoinal].[Top1Label] had the largest international imports by industry, generating $[Econ_ImportsInternatoinal].[Top1Number].{0:#,#} million in [Parameter].[sStartYearLabel].`,
      StoredProcedure: 'sp_Condition_Imports',
      Params: [
        {
          imptype: '1',
        },
      ],
      Value: '3',
    },
  ],
  'local-sales-by-industry': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In ${data.currentAreaName}, [Econ_LocalSales].[Top1Label] had the highest local sales, generating $[Econ_LocalSales].[Top1Number].{0:#,#} million in [Parameter].[sStartYearLabel].`,
    },
  ],
  'worker-productivity-by-industry': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In ${data.currentAreaName}, [Econ_WorkerProductivity].[Top1Label] had the highest productivity by industry, generating $[Econ_WorkerProductivity].[Top1Number].{0:#,#} per worker in [Parameter].[sStartYearLabel].`,
      StoredProcedure: 'sp_Condition_Productivity',
      Params: [
        {
          prodtype: '1',
        },
      ],
      Value: '1',
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In ${data.currentAreaName}, [Econ_WorkerProductivityHour].[Top1Label] had the highest productivity by industry, generating $[Econ_WorkerProductivityHour].[Top1Number].{0:#,#} per hour in [Parameter].[sStartYearLabel].`,
      StoredProcedure: 'sp_Condition_Productivity',
      Params: [
        {
          prodtype: '1',
        },
      ],
      Value: '2',
    },
  ],
  'industry-sector-analysis-series': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In [Econ_IndustrySectorAnalysis_Annual].[LatestYearLabel], [IndkeyNieirAlt1] worker productivity ($ per worker) in ${data.currentAreaName} was [Econ_IndustrySectorAnalysis_Annual].[Compare_WorkerProduct] [BM].`,
      StoredProcedure: 'sp_Condition_Measure',
      Params: [
        {
          Measure: '0',
        },
      ],
      Value: '100001',
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In [Econ_IndustrySectorAnalysis_Annual].[LatestYearLabel], ${data.currentAreaName} contributed [Econ_IndustrySectorAnalysis_Annual].[LatestYearPer]% to [BM]’s [IndkeyNieirAlt1] [Toggles].[MeasureDisplayLabel].`,
      StoredProcedure: 'sp_Condition_Measure',
      Params: [
        {
          Measure: '0',
        },
      ],
      Value: '0',
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In [Econ_IndustrySectorAnalysis_Annual].[LatestYearLabel], ${data.currentAreaName} contributed [Econ_IndustrySectorAnalysis_Annual].[LatestYearPer]% to [BM]’s [IndkeyNieirAlt1] [Toggles].[MeasureDisplayLabel].`,
      StoredProcedure: 'sp_Condition_Measure',
      Params: [
        {
          Measure: '0',
        },
      ],
      Value: '10001',
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In [Econ_IndustrySectorAnalysis_Annual].[LatestYearLabel], ${data.currentAreaName} contributed [Econ_IndustrySectorAnalysis_Annual].[LatestYearPer]% to [BM]’s [IndkeyNieirAlt1] [Toggles].[MeasureDisplayLabel].`,
      StoredProcedure: 'sp_Condition_Measure',
      Params: [
        {
          Measure: '0',
        },
      ],
      Value: '20001',
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In [Econ_IndustrySectorAnalysis_Annual].[LatestYearLabel], ${data.currentAreaName} contributed [Econ_IndustrySectorAnalysis_Annual].[LatestYearPer]% to [BM]’s [IndkeyNieirAlt1] [Toggles].[MeasureDisplayLabel].`,
      StoredProcedure: 'sp_Condition_Measure',
      Params: [
        {
          Measure: '0',
        },
      ],
      Value: '30001',
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In [Econ_IndustrySectorAnalysis_Annual].[LatestYearLabel], ${data.currentAreaName} contributed [Econ_IndustrySectorAnalysis_Annual].[LatestYearPer]% to [BM]’s [IndkeyNieirAlt1] [Toggles].[MeasureDisplayLabel].`,
      StoredProcedure: 'sp_Condition_Measure',
      Params: [
        {
          Measure: '0',
        },
      ],
      Value: '40001',
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In [Econ_IndustrySectorAnalysis_Annual].[LatestYearLabel], ${data.currentAreaName} contributed [Econ_IndustrySectorAnalysis_Annual].[LatestYearPer]% to [BM]’s [IndkeyNieirAlt1] [Toggles].[MeasureDisplayLabel].`,
      StoredProcedure: 'sp_Condition_Measure',
      Params: [
        {
          Measure: '0',
        },
      ],
      Value: '90001',
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In [Econ_IndustrySectorAnalysis_Annual].[LatestYearLabel], ${data.currentAreaName} contributed [Econ_IndustrySectorAnalysis_Annual].[LatestYearPer]% to [BM]’s [IndkeyNieirAlt1] [Toggles].[MeasureDisplayLabel].`,
      StoredProcedure: 'sp_Condition_Measure',
      Params: [
        {
          Measure: '0',
        },
      ],
      Value: '50000',
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In [Econ_IndustrySectorAnalysis_Annual].[LatestYearLabel], ${data.currentAreaName} contributed [Econ_IndustrySectorAnalysis_Annual].[LatestYearPer]% to [BM]’s [IndkeyNieirAlt1] [Toggles].[MeasureDisplayLabel].`,
      StoredProcedure: 'sp_Condition_Measure',
      Params: [
        {
          Measure: '0',
        },
      ],
      Value: '70000',
    },
  ],
  'industry-sector-analysis': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In [Parameter].[sStartYearLabel], ${data.currentAreaName} contributed [Econ_IndustryAnalysis].[EmploymentPer].{0:0.0}% of [BM]’s [IndkeyNieirAlt1] employment and [Econ_IndustryAnalysis].[ValueAddedPer].{0:0.0}% of its value added.`,
    },
  ],

  'employment-locations': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        'The destination zone with the greatest number ([Econ_Destination_Zones_Data].[Top1Num].{0:#,0}) of [IndkeyTitle] workers employs [Econ_Destination_Zones_Data].[Top1Per].{0:0.0}% of the [IndkeyTitle] local workers within [theC].',
    },
  ],
  'business-locations': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        '[ABRInd] [Econ_BusinessLocation].[Sum_Total].{0:#,0} active and registered for GST businesses in [theC]. The largest subcategory within this is [Econ_BusinessLocation].[TopIndustry].',
    },
  ],

  'workers-place-of-residence': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        'Of the [WorkerLocation1].[Sum_Total].{0:#,0} people who work in [theC], [WorkerLocation1].[Sum_Inside].{0:#,0} or [WorkerLocation1].[Sum_InsidePer].{0:0.0}% also live in the area.',
      StoredProcedure: 'sp_Condition_SingleSLA',
      Params: [
        {
          ClientID: '0',
        },
      ],
      Value: '1',
    },
  ],
  'workers-place-of-residence-industry': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `Of the [WorkerLocationIndustry].[Sum_Total].{0:#,0} local workers [IndkeyAlt1] in ${data.currentAreaName}, [WorkerLocationIndustry].[Sum_Inside].{0:#,0} or [WorkerLocationIndustry].[Sum_InsidePer].{0:0.0}% also live in the area.`,
    },
  ],
  'workers-place-of-residence-occupation': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        'Of the [WorkerLocationOccupation].[Sum_Total].{0:#,0} local workers [OccuAlt] in [theC], [WorkerLocationOccupation].[Sum_Inside].{0:#,0} or [WorkerLocationOccupation].[Sum_InsidePer].{0:0.0}% also live in the area.',
    },
  ],
  'workers-place-of-residence-industry-wa': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `Of the [WorkerLocationIndustry_WA].[Sum_Total].{0:#,0} local workers [IndkeyAlt1] in ${data.currentAreaName}, [WorkerLocationIndustry_WA].[Sum_Inside].{0:#,0} or [WorkerLocationIndustry_WA].[Sum_InsidePer].{0:0.0}% also live in the area.`,
    },
  ],
  'workers-place-of-residence-industry-sa2': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `Of the [WorkerLocationIndustrySA2].[Sum_Total].{0:#,0} local workers [IndkeyAlt1] in ${data.currentAreaName} based on the best fit of SA2s, [WorkerLocationIndustrySA2].[Sum_Inside].{0:#,0} or [WorkerLocationIndustrySA2].[Sum_InsidePer].{0:0.0}% also live in the area.`,
    },
  ],
  'workers-place-of-residence-occupation-sa2': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        'Of the [WorkerLocationOccupationSA2].[Sum_Total].{0:#,0} local workers [OccuAlt] in [theC] based on the best fit of SA2s, [WorkerLocationOccupationSA2].[Sum_Inside].{0:#,0} or [WorkerLocationOccupationSA2].[Sum_InsidePer].{0:0.0}% also live in the area.',
    },
  ],
  'residents-place-of-work': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        '[ResidentLocation1SingleSLA].[Sum_Outside].{0:#,0} or [ResidentLocation1SingleSLA].[Sum_OutsidePer].{0:0.0}% of [theC]’s resident workers travel outside of the area to work.',
      StoredProcedure: 'sp_Condition_SingleSLA',
      Params: [
        {
          ClientID: '0',
        },
      ],
      Value: '0',
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        '[ResidentLocation1].[Sum_Outside].{0:#,0} or [ResidentLocation1].[Sum_OutsidePer].{0:0.0}% of [theC]’s resident workers travel outside of the area to work.',
      StoredProcedure: 'sp_Condition_SingleSLA',
      Params: [
        {
          ClientID: '0',
        },
      ],
      Value: '1',
    },
  ],
  'residents-place-of-work-industry': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        '[ResidentLocation1Industry].[Sum_Outside].{0:#,0} or [ResidentLocation1Industry].[Sum_OutsidePer].{0:0.0}% of [theC]’s resident workers [IndkeyAlt1] travel outside of the area to work.',
      StoredProcedure: 'sp_Condition_SingleSLA',
      Params: [
        {
          ClientID: '0',
        },
      ],
      Value: '1',
    },
  ],
  'residents-place-of-work-occupation': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        '[ResidentLocation1Occupation].[Sum_Outside].{0:#,0} or [ResidentLocation1Occupation].[Sum_OutsidePer].{0:0.0}% of [theC]’s resident workers [OccuAlt] travel outside of the area to work.',
    },
  ],
  'residents-place-of-work-industry-wa': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        '[ResidentLocation1Industry_WA].[Sum_Outside].{0:#,0} or [ResidentLocation1Industry_WA].[Sum_OutsidePer].{0:0.0}% of [theC]’s resident workers [IndkeyAlt1] travel outside of the area to work.',
    },
  ],
  'residents-place-of-work-industry-sa2': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        '[ResidentLocation1IndustrySA2].[Sum_Outside].{0:#,0} or [ResidentLocation1IndustrySA2].[Sum_OutsidePer].{0:0.0}% of [theC]’s resident workers [IndkeyAlt1] travel outside of the area to work based on the best fit of SA2s.',
    },
  ],
  'residents-place-of-work-occupation-sa2': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        '[ResidentLocation1OccupationSA2].[Sum_Outside].{0:#,0} or [ResidentLocation1OccupationSA2].[Sum_OutsidePer].{0:0.0}% of [theC]’s resident workers [OccuAlt] travel outside of the area to work based on the best fit of SA2s.',
    },
  ],
  'employed-locally': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        'In [Parameter].[StartYear], [Econ_SelfContainment].[Top1Per].{0:0.0}% of [A]’s resident workers were employed locally<span class="hidden"> and this proportion has [Econ_SelfContainment].[Compare1] since [Parameter].[EndYear]</span>.<span class="hidden">1 [Econ_SelfContainment].[Regression_Error_RowCount]</span>',
      StoredProcedure: 'sp_Condition_Topic_Type',
      Params: [
        {
          t: '1',
        },
      ],
      Value: '1',
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        'In [Parameter].[StartYear], [Econ_SelfContainmentOccu].[Top1Per].{0:0.0}% of [A]’s resident workers were employed locally<span class="hidden"> and this proportion has [Econ_SelfContainmentOccu].[Compare1] since [Parameter].[EndYear]</span><span class="hidden">1 [Econ_SelfContainmentOccu].[Regression_Error_RowCount]</span>.</p>',
      StoredProcedure: 'sp_Condition_Topic_Type',
      Params: [
        {
          t: '1',
        },
      ],
      Value: '2',
    },
  ],
  'employed-locally-wa': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        "In [Parameter].[StartYear], [Econ_SelfContainment_WA].[Top1Per].{0:0.0}% of [A]’s working residents were employed locally, with '[Econ_SelfContainment_WA].[TopIndRes]' being the top industry.",
    },
  ],
  'local-employment': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `"In [Parameter].[StartYear], [Econ_SelfSuff].[Top1Per].{0:0.0}% of ${data.currentAreaName}’s local workers were residents<span class="hidden">and this proportion has [Econ_SelfSuff].[Compare1] since 2006</span>.`,
      StoredProcedure: 'sp_Condition_Topic_Type',
      Params: [
        {
          t: '1',
        },
      ],
      Value: '1',
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `"In 2011 [Econ_SelfSuffOccu].[Top1Per].{0:0.0}% of ${data.currentAreaName}’s local workers were residents<span class="hidden">and this proportion has [Econ_SelfSuffOccu].[Compare1] since 2006</span>.`,
      StoredProcedure: 'sp_Condition_Topic_Type',
      Params: [
        {
          t: '1',
        },
      ],
      Value: '2',
    },
  ],
  'local-employment-wa': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        "In 2011 [Econ_SelfSuff_WA].[Top1Per].{0:0.0}% of ${data.currentAreaName}’s local workers were resident workers with '[Econ_SelfSuff_WA].[TopIndRes]' being the top industry.",
    },
  ],
  'labourforce-key-statistics-lite': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        "[LF_keyStats].[Num_LF].{0:#,#} people or [LF_keyStats].[Per_LFUnem].{0:0.0}% of ${data.currentAreaName}'s ${data.currentGenderName} resident workers [IndkeyCap] have a tertiary qualification.",
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string => 'Not available in lite version of economy.',
    },
  ],

  'labourforce-key-statistics': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        "[LF_keyStats].[Num_LF].{0:#,#} people or [LF_keyStats].[Per_LFUnem].{0:0.0}% of ${data.currentAreaName}'s ${data.currentGenderName} resident workers [IndkeyCap] have a tertiary qualification.",
    },
  ],
  'age-structure': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In ${data.currentAreaName}, [Econ_LF_Age].[Compare_under451] in the ${data.currentGenderName} resident workers [IndkeyCap].`,
    },
  ],
  'hours-worked': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `[Econ_LF_HoursWorked].[Sum_Over40].{0:0.0}% of the ${data.currentGenderName} resident workers [IndkeyCap] in ${data.currentAreaName} work 40 or more hours, compared to [Econ_LF_HoursWorked].[Sum_BM_Over40].{0:0.0}% in [Parameter].[IGBMIDLabel].`,
    },
  ],
  occupations: [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `There are more ${data.currentGenderName} resident workers [IndkeyCap] [Econ_LF_Occupations].[Top1Label] in ${data.currentAreaName} than any other occupation.`,
    },
  ],
  'field-of-qualification': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `There are more ${data.currentGenderName} resident workers [IndkeyCap] qualified in [Econ_LF_FieldOfQual].[Top1Label] in ${data.currentAreaName} than in any other field.`,
    },
  ],
  qualifications: [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `[Econ_LF_Qualifications].[Sum_Quals].{0:0.0}% of the ${data.currentGenderName} resident workers [IndkeyCap] in ${data.currentAreaName} have qualifications, compared to [Econ_LF_Qualifications].[Sum_BM_Quals].{0:0.0}% for [Parameter].[IGBMIDLabel].`,
    },
  ],
  income: [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        '${data.currentAreaName} [lftypeSW] labour force [IndkeyCap] have a [Econ_LF_Income].[Compare_high] proportion of [gendersP] with high incomes ($1,750 or more per week) [Econ_LF_Income].[Compare_hightext] [Parameter].[IGBMIDLabel].',
    },
  ],
  industry: [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `[Econ_LF_Industry].[Top1Label] employs more of ${data.currentAreaName}’s [chartlftype] than any other industry sector.`,
    },
  ],
  'workers-key-statistics': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In ${data.currentAreaName} [WP_keyStats].[Per_Male].{0:0.0}% of the local workers are males and [WP_keyStats].[Per_Female].{0:0.0}% are female.`,
    },
  ],
  'travel-to-work': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `The ${data.currentGenderName} resident workers in ${data.currentAreaName} have a [Econ_LF_MethodOfTravel].[Compare_PT] proportion of people using public transport to get to work [Econ_LF_MethodOfTravel].[Compare_PTtext] [Parameter].[IGBMIDLabel].`,
    },
  ],
  'unemployed-keystats': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `[Unemployment_KeyStats].[Per_LFUnem].{0:0.0}% of the [chartlftype] of ${data.currentAreaName} were unemployed in 2011, compared to [Unemployment_KeyStats].[Per_LFUnemBM].{0:0.0}% in [theBM].`,
    },
  ],
  'workers-income-quartile': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        "In ${data.currentAreaName}, the '[Econ_WP_IncomeQuartiles].[Top1Label]' quartile is the largest group, comprising [Econ_WP_IncomeQuartiles].[Top1Per].{0:0}% of local workers.",
    },
  ],
  'income-quartiles': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        "In ${data.currentAreaName}, the '[Econ_LF_IncomeQuartiles].[Top1Label]' quartile is the largest group, comprising [Econ_LF_IncomeQuartiles].[Top1Per].{0:0}% of the ${data.currentGenderName} resident workers [IndkeyCap].",
    },
  ],
  'workers-key-statistics-lite': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In ${data.currentAreaName} [WP_keyStatslite].[Per_Male].{0:0.0}% of the local workers are males and [WP_keyStatslite].[Per_Female].{0:0.0}% of the local workers are female.`,
    },
  ],
  'workers-age-structure': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In ${data.currentAreaName}, [Econ_WP_Age].[Compare_under45] in the [IndkeyAlt] local worker population.`,
    },
  ],
  'workers-hours-worked': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `[Econ_WP_HoursWorked].[Sum_Under35].{0:0.0}% of [IndkeyAlt] local workers in ${data.currentAreaName} are employed part-time and [Econ_WP_HoursWorked].[Sum_Over34].{0:0.0}% are employed full-time.`,
    },
  ],
  'workers-level-of-qualifications': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In ${data.currentAreaName}, the [IndkeyAlt] workforce has a [Econ_WP_Qualifications].[Compare_Higher] proportion with tertiary qualifications compared to [IGBMIDAltTitle].`,
    },
  ],
  'workers-occupations': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `Within ${data.currentAreaName}, the [IndkeyTitle] ${data.currentGenderName} workforce has a [Econ_WP_Occupations].[CompareDerived] proportion of Managers and Professionals [Econ_WP_Occupations].[Comparetext] [IGBMIDAltTitle].`,
    },
  ],
  'workers-income': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In ${data.currentAreaName}, [Econ_WP_Income].[Sum_high].{0:0.0}% of the [IndkeyAlt] earned $1,750 or more per week.`,
    },
  ],
  'workers-travel-to-work': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `Within ${data.currentAreaName}, there is a [Econ_WP_MethodOfTravel].[Compare_PT] proportion of local [IndkeyAlt] workers using public transport to get to work [Econ_WP_MethodOfTravel].[Compare_PTtext] [IGBMIDAltTitle].`,
    },
  ],
  'income-sources': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `Households in ${data.currentAreaName} have [Econ_SourceIncome].[Compare_Dispoasable] amount of disposable income compared to [BM].`,
    },
  ],
  'market-characteristics': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        '[theC] has [LocalMarketKeyStatistics].[Compare_0to14] proportion of households in the medium to high income category compared to [BM].',
    },
  ],
  'Employment-capacity': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `The jobs to residents ratio for ${data.currentAreaName} in [Parameter].[sStartYearLabel] was [Econ_EmploymentCapacity].[Sum_total].{0:0.00}, meaning that there were [Econ_EmploymentCapacity].[Compare1] jobs than resident workers. [Econ_EmploymentCapacity].[Sum_high_label] had the highest ratio ([Econ_EmploymentCapacity].[Sum_high].{0:0.00}), while the lowest ratio was found in [Econ_EmploymentCapacity].[Sum_low_Label] ([Econ_EmploymentCapacity].[Sum_low].{0:0.00}).`,
    },
  ],
  'household-expenditure': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In [Parameter].[sStartYearLabel], household expenditure on utilities was $[Econ_HouseholdExpenditure].[DisposableIncome].{0:#,0} in ${data.currentAreaName}, [Econ_HouseholdExpenditure].[Compare1] [BM].`,
    },
  ],

  'shift-share': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        'In [A], the strongest regional competitive effect between [Parameter].[sEndYearLabel] and [Parameter].[sStartYearLabel] was experienced in [Econ_Economic_output].[Top1Label].',
    },
  ],
  'location-quotient': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        'In [Parameter].[sStartYearLabel], [Econ_LocationQuotient].[Top1Label]  was a major specialisation in [A] in terms of [Toggles].[LoQoLabel].',
    },
  ],

  'value-of-agriculture': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        'In 2015/16, the total value of agricultural output in [A] was $[Econ_Agriculture].[Sum_OccYear1].{0:#,#0,,}m. The largest commodity produced was [Econ_Agriculture].[Top1Label], which accounted for [Econ_Agriculture].[Top1Per].{0:0.0}% of [A]’s total agricultural output in value terms.',
    },
  ],
  'tourism-visitor-summary': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `For [Econ_TRA_SummaryNumber].[LatestYear], there were [Econ_TRA_SummaryNumber].[LatestYearNumber].{0:#,0} international visitors nights in ${data.currentAreaName}, accounting for  [Econ_TRA_SummaryPercentage].[LatestYearPer].{0:0.0}% of the total visitor nights.`,
      StoredProcedure: 'sp_Condition_Tourism_SummTableChart',
      Params: [
        {
          ClientID: '0',
        },
        {
          WebID: '10',
        },
        {
          BMID: '0',
        },
      ],
      Value: '0',
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `For [Econ_TRA_SummaryNumber].[LatestYear], there were [Econ_TRA_SummaryNumber].[LatestYearNumber].{0:#,0} international visitors nights in ${data.currentAreaName}.`,
      StoredProcedure: 'sp_Condition_Tourism_SummTableChart',
      Params: [
        {
          ClientID: '0',
        },
        {
          WebID: '10',
        },
        {
          BMID: '0',
        },
      ],
      Value: '1',
    },
  ],
  'tourism-value': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        'In [Parameter].[sStartYearLabel] , the total tourism and hospitality sales in [A] was $[Econ_TourismValue].[Sum_OutputYear1].{0:#,#.0}m, the total value added was $[Econ_TourismValue].[Sum_ValueAddedYear1].{0:#,#.0}m.',
    },
  ],

  'tourism-workforce': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `<p>In [Parameter].[StartYear], there were [Tourism_keyStats].[Num_LF].{0:#,0} people who make up the tourism and hospitality workforce in ${data.currentAreaName}, of this [Tourism_keyStats].[Per_FullTime].{0:0.0}% worked full-time and [Tourism_keyStats].[Per_PartTime].{0:0.0}% worked part-time or were away from work.</p>`,
    },
  ],

  'tourism-visitors-nights': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In the 5 years up to [Econ_TRA_InternationalNights].[LatestYear], there were an average of [Econ_TRA_InternationalNights].[LatestYearNumber].{0:#,0} international visitors to ${data.currentAreaName}. Average length stay for international visitors was [Econ_TRA_InternationalNights].[LatestYearAvg].{0:0.0} days, [Econ_TRA_InternationalNights].[Compare_Avg] the average for [BM].`,
      StoredProcedure: 'sp_Condition_Tourism',
      Params: [
        {
          Tourismtype: '1',
        },
      ],
      Value: '1',
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In the 5 years up to [Econ_TRA_DomesticNights].[LatestYear], there were an average of [Econ_TRA_DomesticNights].[LatestYearNumber].{0:#,0} domestic overnight visitors to ${data.currentAreaName}. Average length stay for domestic daytrip visitors was [Econ_TRA_DomesticNights].[LatestYearAvg].{0:0.0} days, [Econ_TRA_DomesticNights].[Compare_Avg] the average for [BM].`,
      StoredProcedure: 'sp_Condition_Tourism',
      Params: [
        {
          Tourismtype: '1',
        },
      ],
      Value: '2',
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In the 5 years up to [Econ_TRA_DomesticDaytrips].[LatestYear], there were an average of [Econ_TRA_DomesticDaytrips].[LatestYearNumber].{0:#,0} domestic daytrip visitors to ${data.currentAreaName}, representing [Econ_TRA_DomesticDaytrips].[LatestYearPerBM].{0:0.0}% of the daytrip visitors to [BM].`,
      StoredProcedure: 'sp_Condition_Tourism',
      Params: [
        {
          Tourismtype: '1',
        },
      ],
      Value: '3',
    },
  ],

  'tourism-visitors-reason': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In the 5 years up to [Econ_TRA_MinMaxFinYear].[LatestYear], international visitors to ${data.currentAreaName} were more likely to be visiting [Econ_TRA_InternationalReason].[Top1_Label], accounting for [Econ_TRA_InternationalReason].[Top1_Per].{0:0.0}% of all visitors.`,
      StoredProcedure: 'sp_Condition_Tourism',
      Params: [
        {
          Tourismtype: '1',
        },
      ],
      Value: '1',
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In the 5 years up to [Econ_TRA_MinMaxFinYear].[LatestYear], domestic overnight visitors to ${data.currentAreaName} were more likely to be visiting [Econ_TRA_DomesticReasonNight].[Top1_Label], accounting for [Econ_TRA_DomesticReasonNight].[Top1_Per].{0:0.0}% of all visitors.`,
      StoredProcedure: 'sp_Condition_Tourism',
      Params: [
        {
          Tourismtype: '1',
        },
      ],
      Value: '2',
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In the 5 years up to [Econ_TRA_MinMaxFinYear].[LatestYear], domestic daytrip visitors to ${data.currentAreaName} were more likely to be visiting [Econ_TRA_DomesticReasonDay].[Top1_Label], accounting for [Econ_TRA_DomesticReasonDay].[Top1_Per].{0:0.0}% of all visitors.`,
      StoredProcedure: 'sp_Condition_Tourism',
      Params: [
        {
          Tourismtype: '1',
        },
      ],
      Value: '3',
    },
  ],

  'rental-listings': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        "At June [Parameter].[hStartYear], [theC] had a median house rental of $[Econ_Housing_Rent].[Sum_Median].{0:#,0}, [Econ_Housing_Rent].[MedianChange_Num].{0:$#,0;$#,0;' '}  [Econ_Housing_Rent].[Compare_Median] the median house rental for [BM].",
    },
  ],
  'housing-values': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        "At June [Parameter].[hStartYear], [Parameter].[WebIDLabel] had a median house valuation of $[Econ_Housing_Value].[Sum_Median].{0:#,0}, [Econ_Housing_Value].[MedianChange_Num].{0:$#,0;$#,0;' '}  [Econ_Housing_Value].[Compare_Median] the median house valuation for [BM].",
    },
  ],

  testpage: [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        ` [fn_WP_Industry_Sex_1Digit_2016].[Top1Label] is the largest employer in ${data.currentAreaName}, making up [fn_WP_Industry_Sex_1Digit_2016].[Top1Per].{0:0.0}% of total employment.`,
    },
  ],
  'testpage-JTW': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `Of the [WorkerLocationIndustry].[Sum_Total].{0:#,0} local workers [IndkeyAlt1] in ${data.currentAreaName}, [WorkerLocationIndustry].[Sum_Inside].{0:#,0} or [WorkerLocationIndustry].[Sum_InsidePer].{0:0.0}% also live in the area.`,
    },
  ],
  'industry-sector-analysis-quarterly': [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In [Parameter].[sStartYearLabel], ${data.currentAreaName} contributed [Econ_IndustryAnalysis].[EmploymentPer].{0:0.0}% of [BM]’s [IndkeyNieirAlt1] employment and [Econ_IndustryAnalysis].[ValueAddedPer].{0:0.0}% of its value added.`,
    },
  ],

  coldstoragepaddy: [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        "[RLF_keyStats].[Num_LF] people or [RLF_keyStats].[Per_LFUnem] of ${data.currentAreaName}'s regional resident workers have a tertiary qualification.",
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `There are more [chartlftype] qualified in [Econ_RLF_FieldOfQual].[Top1Label] in ${data.currentAreaName} than in any other field.`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In ${data.currentAreaName}, [Econ_RLF_Age].[Compare_under451] in the regional resident worker population.`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `[Econ_RLF_Industry].[Top1Label] employs more of ${data.currentAreaName}’s [chartlftype] than any other industry sector.`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        '${data.currentAreaName} [lftype] have a [Econ_RLF_Income].[Compare_high] proportion of [gendersP] with high incomes ($1500 or more per week) [Econ_RLF_Income].[Compare_hightext] [Parameter].[BMIDLabel].',
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `There are more [chartlftype] [Econ_RLF_Occupations].[Top1Label] in ${data.currentAreaName} than any other occupation.`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `[Econ_RLF_HoursWorked].[Sum_Over40] of the [chartlftype] in ${data.currentAreaName} work over 40 hours, compared to [Econ_RLF_HoursWorked].[Sum_BM_Over40] in [Parameter].[BMIDLabel].`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `[Econ_RLF_Qualifications].[Sum_Quals] of the [chartlftype] in ${data.currentAreaName} have qualifications, compared to [Econ_RLF_Qualifications].[Sum_BM_Quals] for [Parameter].[BMIDLabel].`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        "In ${data.currentAreaName}, the '[Econ_RLF_IncomeQuartiles].[Top1Label]' quartile is the largest group, comprising [Econ_RLF_IncomeQuartiles].[Top1Per].{0:0}% of [chartlftype].",
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `[RLF_Unem_keyStats].[Per_LFUnem] of the [chartlftype] of ${data.currentAreaName} were unemployed in 2011, compared to [RLF_Unem_keyStats].[Per_LFUnemBM]in the benchmark.`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In ${data.currentAreaName}, [Econ_ValueAdd].[Top1Label] is the most productive industry, generating $[Econ_ValueAdd].[Top1Number] million in [Parameter].[sStartYearLabel].`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        "<p class=\"main\">[Internet].[Sum_BB].{0:0'% of';-0'% of','No'} homes in ${data.currentAreaName} have a broadband internet connection.</p>",
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        "[IndigenousEducationInstitute].[Sum_AttendingPer].{0:0}% of [theC]'s Aboriginal and Torres Strait Islander population attend an educational institution.",
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In ${data.currentAreaName}, [fn_JTW_Employment_1Digit - Copy].[Top1Label] is the largest employer, generating [fn_JTW_Employment_1Digit - Copy].[Top1Number] local jobs in [Parameter].[sStartYearLabel].`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        '${data.currentAreaName} have a [chartlftype] [RLF_keyStats].[Num_LF] people, of which [RLF_keyStats].[Per_LFUnem] were unemployed.',
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `The [chartlftype] in ${data.currentAreaName} have a [Econ_RLF_MethodOfTravel].[Compare_PT] proportion of people using public transport to get to work [Econ_RLF_MethodOfTravel].[Compare_PTtext] [BM].`,
    },
  ],
};
