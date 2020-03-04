import { LinkBuilder } from '../../../components/ui/links';
import { useContext } from 'react';
import { PageContext, ClientContext } from '../../../utils/context';
import { SubTitleAlt, TopList } from '../../../styles/MainContentStyles';

const IndustrySectorDefinitionsPage = () => {
  const { LongName } = useContext(ClientContext);
  const {
    entityData: { prefixedAreaName },
  } = useContext(PageContext);
  return (
    <>
      <p>
        Industries are classified according to an industry coding system. The{' '}
        <strong>2006 Australian and New Zealand Standard Industrial Classification (ANZSIC)</strong> is the lastest
        standard and was used to code the 2006 and 2011 Census industry data. This standard includes more industry
        divisions than previous standards and better reflects the structure of the Australian economy and its emerging
        industries.{' '}
      </p>
      <p>
        For more information please refer to the{' '}
        {LinkBuilder('http://www.abs.gov.au/ausstats/abs@.nsf/mf/2901.0', ' 2011 Census Dictionary')}, and{' '}
        {LinkBuilder(
          'http://www.abs.gov.au/AUSSTATS/abs@.nsf/ProductsbyCatalogue/A77D93484DC49D63CA25712300056842?OpenDocument',
          'ANZSIC classification',
        )}
        .
      </p>
      <SubTitleAlt>Agriculture, Forestry and Fishing</SubTitleAlt>
      <p>
        The Agriculture, Forestry and Fishing Division includes units mainly engaged in growing crops, raising animals,
        growing and harvesting timber, and harvesting fish and other animals from farms or their natural habitats. The
        division makes a distinction between two basic activities: production and support services to production.
        Included as production activities are horticulture, livestock production, aquaculture, forestry and logging, and
        fishing, hunting and trapping.
      </p>
      <p>
        The term 'agriculture' is used broadly to refer to both the growing and cultivation of horticultural and other
        crops (excluding forestry), and the controlled breeding, raising or farming of animals (excluding aquaculture).
      </p>
      <p>
        Aquacultural activities include the controlled breeding, raising or farming of fish, molluscs and crustaceans.
      </p>
      <p>
        Forestry and logging activities include growing, maintaining and harvesting forests, as well as gathering forest
        products.
      </p>
      <p>
        Fishing, hunting and trapping includes gathering or catching marine life such as fish or shellfish, or other
        animals, from their uncontrolled natural environments in water or on land.
      </p>
      <p>
        Also included in the division are units engaged in providing support services to the units engaged in production
        activities.
      </p>
      <p>Agriculture, Forestry and Fishing includes the following groups and sub-categories:</p>
      <TopList>
        <li>
          Agriculture
          <TopList>
            <li>Nursery and Floriculture Production</li>
            <li>Mushroom and Vegetable Growing</li>
            <li>Fruit and Tree Nut Growing</li>
            <li>Sheep, Beef Cattle and Grain Farming</li>
            <li>Other Crop Growing</li>
            <li>Dairy Cattle Farming</li>
            <li>Poultry Farming</li>
            <li>Deer Farming</li>
            <li>Other Livestock Farming</li>
          </TopList>
        </li>
        <li>Aquaculture</li>
        <li>Forestry and Logging</li>
        <li>
          Fishing, Hunting and Trapping
          <TopList>
            <li>Fishing</li>
            <li>Hunting and Trapping</li>
          </TopList>
        </li>
        <li>
          Agriculture, Forestry and Fishing Support Services
          <TopList>
            <li>Forestry Support Services</li>
            <li>Agriculture and Fishing Support Services</li>
          </TopList>
        </li>
      </TopList>
      <SubTitleAlt>Mining</SubTitleAlt>
      <p>
        The Mining Division includes units that mainly extract naturally occurring mineral solids, such as coal and
        ores; liquid minerals, such as crude petroleum; and gases, such as natural gas. The term mining is used in the
        broad sense to include underground or open cut mining; dredging; quarrying; well operations or evaporation pans;
        recovery from ore dumps or tailings as well as beneficiation activities (i.e. preparing, including crushing,
        screening, washing and flotation) and other preparation work customarily performed at the mine site, or as a
        part of mining activity.
      </p>
      <p>The Mining Division distinguishes two basic activities: mine operation and mining support activities.</p>
      <p>
        Mine operation includes units operating mines, quarries, or oil and gas wells on their own account, or for
        others on a contract or fee basis, as well as mining sites under development.
      </p>
      <p>
        Mining support activities include units that perform mining services on a contract or fee basis, and exploration
        (except geophysical surveying).
      </p>
      <p>
        Units in the Mining Division are grouped and classified according to the natural resource mined or to be mined.
        Industries include units that extract natural resources, and/or those that beneficiate the mineral mined.
        Beneficiation is the process whereby the extracted material is reduced to particles that can be separated into
        mineral and waste, the former suitable for further processing or direct use. The operations that take place in
        beneficiation are primarily mechanical, such as grinding, washing, magnetic separation, and centrifugal
        separation. In contrast, manufacturing operations primarily use chemical and electro-chemical processes, such as
        electrolysis and distillation.
      </p>
      <p>Mining includes the following groups and sub-categories:</p>
      <TopList>
        <li>Coal Mining</li>
        <li>Oil and Gas Extraction</li>
        <li>Metal Ore Mining</li>
        <li>
          Non-Metallic Mineral Mining and Quarrying
          <TopList>
            <li>Construction Material Mining</li>
            <li>Other Non-Metallic Mineral Mining and Quarrying</li>
          </TopList>
        </li>
        <li>
          Exploration and Other Mining Support Services
          <TopList>
            <li>Exploration</li>
            <li>Other Mining Support Services</li>
          </TopList>
        </li>
      </TopList>
      <SubTitleAlt>Manufacturing</SubTitleAlt>
      <p>
        The Manufacturing Division includes units mainly engaged in the physical or chemical transformation of
        materials, substances or components into new products (except agriculture and construction).
      </p>
      <p>
        Units in the Manufacturing Division are often described as plants, factories or mills and characteristically use
        power-driven machines and other materials-handling equipment. However, units that transform materials,
        substances or components into new products by hand, or in the unit's home, are also included. Activities
        undertaken by units incidental to their manufacturing activity, such as selling directly to the consumer
        products manufactured on the same premises from which they are sold, such as bakeries and custom tailors, are
        also included in the division. If, in addition to self-produced products, other products that are not
        manufactured by the same unit are also sold, the rules for the treatment of mixed activities have to be applied
        and units classified according to their predominant activity.
      </p>
      <p>The subdivisions in the Manufacturing Division include:</p>
      <TopList>
        <li>
          Food Product Man.
          <TopList>
            <li>Meat & Meat Product Man.</li>
            <li>Seafood Processing</li>
            <li>Dairy Product Man.</li>
            <li>Fruit & Vegetable Processing</li>
            <li>Oil & Fat Man.</li>
            <li>Grain Mill & Cereal Product Man.</li>
            <li>Bakery Product Man.</li>
            <li>Sugar & Confectionery Man.</li>
            <li>Other Food Product Man.</li>
          </TopList>
        </li>
        <li>
          Beverage & Tobacco Product Man.
          <TopList>
            <li>Beverage Man.</li>
            <li>Cigarette & Tobacco Product Man.</li>
          </TopList>
        </li>
        <li>
          Textile, Leather, Clothing & Footwear Man.
          <TopList>
            <li>Textile Man.</li>
            <li>Leather Tanning, Fur Dressing & Leather Product Man.</li>
            <li>Textile Product Man.</li>
            <li>Knitted Product Man.</li>
            <li>Clothing & Footwear Man.</li>
          </TopList>
        </li>
        <li>
          Wood Product Man.
          <TopList>
            <li>Log Sawmilling & Timber Dressing</li>
            <li>Other Wood Product Man.</li>
          </TopList>
        </li>
        <li>
          Pulp, Paper & Converted Paper Product Man.
          <TopList>
            <li>Pulp, Paper & Paperboard Man.</li>
            <li>Converted Paper Product Man.</li>
          </TopList>
        </li>
        <li>
          Printing (including the Reproduction of Recorded Media)
          <TopList>
            <li>Printing & Printing Support Services</li>
            <li>Reproduction of Recorded Media</li>
          </TopList>
        </li>
        <li>Petroleum & Coal Product Man.</li>
        <li>
          Basic Chemical & Chemical Product Man.
          <TopList>
            <li>Basic Chemical Man.</li>
            <li>Basic Polymer Man.</li>
            <li>Fertiliser & Pesticide Man.</li>
            <li>Pharmaceutical & Medicinal Product Man.</li>
            <li>Cleaning Compound & Toiletry Preparation Man.</li>
            <li>Other Basic Chemical Product Man.</li>
          </TopList>
        </li>
        <li>
          Polymer Product & Rubber Product Man.
          <TopList>
            <li>Polymer Product Man.</li>
            <li>Natural Rubber Product Man.</li>
          </TopList>
        </li>
        <li>
          Non-Metallic Mineral Product Man.
          <TopList>
            <li>Glass & Glass Product Man.</li>
            <li>Ceramic Product Man.</li>
            <li>Cement, Lime, Plaster & Concrete Product Man.</li>
            <li>Other Non-Metallic Mineral Product Man.</li>
          </TopList>
        </li>
        <li>
          Primary Metal & Metal Product Man.
          <TopList>
            <li>Basic Ferrous Metal Man.</li>
            <li>Basic Ferrous Metal Product Man.</li>
            <li>Basic Non-Ferrous Metal Man.</li>
            <li>Basic Non-Ferrous Metal Product Man.</li>
          </TopList>
        </li>
        <li>
          Fabricated Metal Product Man.
          <TopList>
            <li>Iron & Steel Forging</li>
            <li>Structural Metal Product Man.</li>
            <li>Metal Container Man.</li>
            <li>Sheet Metal Product Man. (except Metal Structural & Container Products)</li>
            <li>Other Fabricated Metal Product Man.</li>
          </TopList>
        </li>
        <li>
          Transport Equipment Man.
          <TopList>
            <li>Motor Vehicle & Motor Vehicle Part Man.</li>
            <li>Other Transport Equipment Man.</li>
          </TopList>
        </li>
        <li>
          Machinery & Equipment Man.
          <TopList>
            <li>Professional & Scientific Equipment Man.</li>
            <li>Computer & Electronic Equipment Man.</li>
            <li>Electrical Equipment Man.</li>
            <li>Domestic Appliance Man.</li>
            <li>Pump, Compressor, Heating & Ventilation Equipment Man.</li>
            <li>Specialised Machinery & Equipment Man.</li>
            <li>Other Machinery & Equipment Man.</li>
          </TopList>
        </li>
        <li>
          Furniture & Other Man.
          <TopList>
            <li>Furniture Man.</li>
            <li>Other Man.</li>
          </TopList>
        </li>
      </TopList>
      <SubTitleAlt>Electricity, Gas, Water and Waste Services</SubTitleAlt>
      <p>
        The Electricity, Gas, Water and Waste Services Division comprises units engaged in the provision of electricity;
        gas through mains systems; water; drainage; and sewage services. This division also includes units mainly
        engaged in the collection, treatment and disposal of waste materials; remediation of contaminated materials
        (including land); and materials recovery activities.
      </p>
      <p>
        Electricity supply activities include the generation, transmission and distribution of electricity and the
        on-selling of electricity via power distribution systems operated by others.
      </p>
      <p>
        Gas supply includes the distribution of gas, such as natural gas or liquefied petroleum gas, through mains
        systems.
      </p>
      <p>
        Water supply includes the storage, treatment and distribution of water; drainage services include the operation
        of drainage systems; and sewage services include the collection, treatment and disposal of waste through sewer
        systems and sewage treatment facilities.
      </p>
      <p>Electricity, Gas, Water and Waste Services includes the following groups and sub-categories:</p>
      <TopList>
        <li>
          Electricity Supply
          <TopList>
            <li>Electricity Generation</li>
            <li>Electricity Transmission</li>
            <li>Electricity Distribution</li>
            <li>On Selling Electricity and Electricity Market Operation</li>
          </TopList>
        </li>
        <li>Gas Supply</li>
        <li>Water Supply, Sewerage and Drainage Services</li>
        <li>
          Waste Collection, Treatment and Disposal Services
          <TopList>
            <li>Waste Collection Services</li>
          </TopList>
        </li>
      </TopList>
      <SubTitleAlt>Construction</SubTitleAlt>
      <p>
        The Construction Division includes units mainly engaged in the construction of buildings and other structures,
        additions, alterations, reconstruction, installation, and maintenance and repairs of buildings and other
        structures.
      </p>
      <p>
        Units engaged in demolition or wrecking of buildings and other structures, and clearing of building sites are
        included in Division E Construction. It also includes units engaged in blasting, test drilling, landfill,
        levelling, earthmoving, excavating, land drainage and other land preparation.
      </p>
      <p>Construction includes the following groups and sub-categories:</p>
      <TopList>
        <li>
          Building Construction
          <TopList>
            <li>Residential Building Construction</li>
            <li>Non-Residential Building Construction</li>
          </TopList>
        </li>
        <li>Heavy and Civil Engineering Construction</li>
        <li>
          Construction Services
          <TopList>
            <li>Land Development and Site Preparation Services</li>
            <li>Building Structure Services</li>
            <li>Building Installation Services</li>
            <li>Building Completion Services</li>
            <li>Other Construction Services</li>
          </TopList>
        </li>
      </TopList>
      <SubTitleAlt>Wholesale Trade</SubTitleAlt>
      <p>
        The Wholesale Trade Division includes units mainly engaged in the purchase and onselling, the commission-based
        buying, and the commission-based selling of goods, without significant transformation, to businesses. Units are
        classified to the Wholesale Trade Division in the first instance if they buy goods and then onsell them
        (including on a commission basis) to businesses.
      </p>
      <p>
        Wholesalers' premises are usually a warehouse or office with little or no display of their goods, large storage
        facilities, and are not generally located or designed to attract a high proportion of walk-in customers.
        Wholesaling is often characterised by high value and/or bulk volume transactions, and customers are generally
        reached through trade-specific contacts.
      </p>
      <p>The Wholesale Trade Division distinguishes two types of wholesalers:</p>
      <TopList>
        <li>merchant wholesalers who take title to the goods they sell, including import/export merchants; and</li>
        <li>
          {' '}
          units whose main activity is the commission-based buying and/or the commission-based selling of goods, acting
          as wholesale agents or brokers, or business to business electronic markets, both of whom arrange the sale of
          goods on behalf of others for a commission or fee without taking title to the goods.
        </li>
      </TopList>
      <p>
        A unit which sells to both businesses and the general public will be classified to the Wholesale Trade Division
        if it operates from premises such as warehouses or offices with little or no display of goods, has large storage
        facilities, and is not generally located or designed to attract a high proportion of walk-in customers
      </p>
      <p>
        For units that have goods manufactured for them on commission and then sell those goods, the following treatment
        guidelines are to be followed:
      </p>
      <TopList>
        <li>
          units that own the material inputs and own the final outputs, but have the production done by others will be
          included in the Manufacturing Division;
        </li>
        <li>
          units that do not own the material inputs but own the final outputs and have the production done by others
          will not be included in the Manufacturing Division (these may be included in Wholesale Trade or other
          divisions); and
        </li>
        <li>
          units that do not own the material inputs, do not own the final outputs but undertake the production for
          others will be included in the Manufacturing Division.
        </li>
      </TopList>
      <p>
        As a result, units that have goods manufactured for them on commission will be included in the Wholesale Trade
        Division where they do not own the material inputs to the manufacturing process, but take title to the outputs
        and sell them in the manner prescribed above for typical wholesaling units.
      </p>
      <p>Wholesale Trade includes the following groups and sub-categories:</p>
      <TopList>
        <li>
          Basic Material Wholesaling
          <TopList>
            <li>Agricultural Product Wholesaling</li>
            <li>Mineral, Metal and Chemical Wholesaling</li>
            <li>Timber and Hardware Goods Wholesaling</li>
          </TopList>
        </li>
        <li>
          Machinery and Equipment Wholesaling
          <TopList>
            <li>Specialised Industrial Machinery and Equipment Wholesaling</li>
            <li>Other Machinery and Equipment Wholesaling</li>
          </TopList>
        </li>
        <li>Motor Vehicle and Motor Vehicle Parts Wholesaling</li>
        <li>Grocery, Liquor and Tobacco Product Wholesaling</li>
        <li>
          Other Goods Wholesaling
          <TopList>
            <li>Textile, Clothing and Footwear Wholesaling</li>
            <li>Pharmaceutical and Toiletry Goods Wholesaling</li>
            <li>Furniture, Floor Covering and Other Goods Wholesaling</li>
          </TopList>
        </li>
        <li>Commission-Based Wholesaling</li>
      </TopList>
      <SubTitleAlt>Retail Trade</SubTitleAlt>
      <p>
        The Retail Trade Division includes units mainly engaged in the purchase and onselling, the commission-based
        buying, and the commission-based selling of goods, without significant transformation, to the general public.
        The Retail Trade Division also includes units that purchase and onsell goods to the general public using
        non-traditional means, including the internet. Units are classified to the Retail Trade Division in the first
        instance if they buy goods and then onsell them (including on a commission basis) to the general public.
      </p>
      <p>
        Retail units generally operate from premises located and designed to attract a high volume of walk-in customers,
        have an extensive display of goods, and/or use mass media advertising designed to attract customers. The display
        and advertising of goods may be physical or electronic.
      </p>
      <p>
        Physical display and advertising includes shops, printed catalogues, billboards and print advertisements.
        Electronic display and advertising includes catalogues, internet websites, television and radio advertisements
        and infomercials. While non-store retailers, by definition, do not posses the physical characteristics of
        traditional retail units with a physical shop-front location, these units share the requisite function of the
        purchasing and onselling of goods to the general public, and are therefore included in this division. A unit
        which sells to both businesses and the general public will be classified to the Retail Trade Division if it
        operates from shop-front premises, arranges and displays stock to attract a high proportion of walk-in customers
        and utilises mass media advertising to attract customers.
      </p>
      <p>Retail Trade includes the following groups and sub-categories:</p>
      <TopList>
        <li>
          Motor Vehicle and Motor Vehicle Parts Retailing
          <TopList>
            <li>Motor Vehicle Retailing</li>
            <li>Motor Vehicle Parts and Tyre Retailing</li>
          </TopList>
        </li>
        <li>Fuel Retailing</li>
        <li>
          Food Retailing
          <TopList>
            <li>Supermarket and Grocery Stores</li>
            <li>Specialised Food Retailing</li>
          </TopList>
        </li>
        <li>
          Other Store-Based Retailing
          <TopList>
            <li>Furniture, Floor Coverings, Houseware and Textile Goods Retailing</li>
            <li>Electrical and Electronic Goods Retailing</li>
            <li>Hardware, Building and Garden Supplies Retailing</li>
            <li>Recreational Goods Retailing</li>
            <li>Clothing, Footwear and Personal Accessory Retailing</li>
            <li>Department Stores</li>
            <li>Pharmaceutical and Other Store-Based Retailing</li>
          </TopList>
        </li>
        <li>
          Non-Store Retailing and Retail Commission-Based Buying and/or Selling
          <TopList>
            <li>Non-Store Retailing</li>
            <li>Retail Commission-Based Buying and/or Selling</li>
          </TopList>
        </li>
      </TopList>
      <SubTitleAlt>Accommodation and Food Services</SubTitleAlt>
      <p>
        The Accommodation and Food Services Division includes units mainly engaged in providing short-term accommodation
        for visitors. Also included are units mainly engaged in providing food and beverage services, such as the
        preparation and serving of meals and the serving of alcoholic beverages for consumption by customers, both on
        and off-site.
      </p>
      <p>Accommodation and Food Services includes the following groups and sub-categories:</p>
      <TopList>
        <li>Accommodation</li>
        <li>
          Food and Beverage Services
          <TopList>
            <li>Cafes, Restaurants and Takeaway Food Services</li>
            <li>Pubs, Taverns and Bars</li>
            <li>Clubs (Hospitality)</li>
          </TopList>
        </li>
      </TopList>
      <SubTitleAlt>Transport, Postal and Warehousing</SubTitleAlt>
      <p>
        The Transport, Postal and Warehousing Division includes units mainly engaged in providing transportation of
        passengers and freight by road, rail, water or air. Other transportation activities such as postal services,
        pipeline transport and scenic and sightseeing transport are included in this division.
      </p>
      <p>Units mainly engaged in providing goods warehousing and storage activities are also included.</p>
      <p>
        The division also includes units mainly engaged in providing support services for the transportation of
        passengers and freight. These activities include stevedoring services, harbour services, navigation services,
        airport operations and customs agency services.
      </p>
      <p>Transport, Postal and Warehousing includes the following groups and sub-categories:</p>
      <TopList>
        <li>
          Road Transport
          <TopList>
            <li>Road Freight Transport</li>
            <li>Road Passenger Transport</li>
          </TopList>
        </li>
        <li>
          Rail Transport
          <TopList>
            <li>Rail Freight Transport</li>
            <li>Rail Passenger Transport</li>
          </TopList>
        </li>
        <li>
          Water Transport
          <TopList>
            <li>Water Freight Transport</li>
            <li>Water Passenger Transport</li>
          </TopList>
        </li>
        <li>Air and Space Transport</li>
        <li>
          Other Transport
          <TopList>
            <li>Scenic and Sightseeing Transport</li>
            <li>Pipeline and Other Transport</li>
          </TopList>
        </li>
        <li>Postal and Courier Pick-up and Delivery Services</li>
        <li>
          Transport Support Services
          <TopList>
            <li>Water Transport Support Services</li>
            <li>Airport Operations and Other Air Transport Support Services</li>
            <li>Other Transport Support Services</li>
          </TopList>
        </li>
        <li>Warehousing and Storage Services</li>
      </TopList>
      SubTitleAlt
      <SubTitleAlt>Information Media and Telecommunications</SubTitleAlt>
      <p>The Information Media and Telecommunications Division includes units mainly engaged in:</p>
      <TopList>
        <li>creating, enhancing and storing information products in media that allows for their dissemination; </li>
        <li>
          transmitting information products using analogue and digital signals (via electronic, wireless, optical and
          other means); and
        </li>
        <li>
          providing transmission services and/or operating the infrastructure to enable the transmission and storage of
          information and information products.
        </li>
      </TopList>
      <p>
        Information products are defined as those which are not necessarily tangible, and, unlike traditional goods, are
        not associated with a particular form. The value of the information products is embedded in their content rather
        than in the format in which they are distributed. For example, a movie can be screened at a cinema, telecast on
        television or copied to video for sale or rental. The division includes some activities that primarily create,
        enhance and disseminate information products, subject to copyright.
      </p>
      <p>
        It is the intangible nature of the information products which determines their unique dissemination process,
        which may include via a broadcast, electronic means, or physical form. They do not usually require direct
        contact between the supplier/producer and the consumer, which distinguishes them from distribution activities
        included in the Wholesale Trade and Retail Trade Divisions.
      </p>
      <p>Excluded from the division are units mainly engaged in:</p>
      <TopList>
        <li>
          the mass storage or duplication of information products such as printing newspapers, CDs, DVDs, etc.
          (Manufacturing Division);
        </li>
        <li>
          purchasing and on-selling information products in their tangible form (Wholesale Trade and Retail Trade
          Divisions);
        </li>
        <li>
          providing specialised computer services such as programming and systems design services, graphic design
          services and advertising services, as well as gathering, tabulating and presenting marketing and opinion data
          (Professional, Scientific and Technical Services Division);
        </li>
        <li>
          providing a range of creative artistic activities such as the creation of an artistic original (e.g. a
          painting), or the provision of a live musical performance by a group or artist (Arts and Recreation Services
          Division); and{' '}
        </li>
        <li>
          units undertaking a range of activities such as directing, acting, writing and performing (Arts and Recreation
          Services Division).
        </li>
      </TopList>
      <p>Information Media and Telecommunications includes the following groups and sub-categories:</p>
      <TopList>
        <li>
          Publishing (except Internet and Music Publishing)
          <TopList>
            <li>Newspaper, Periodical, Book and Directory Publishing</li>
            <li>Software Publishing</li>
          </TopList>
        </li>
        <li>
          Motion Picture and Sound Recording Activities
          <TopList>
            <li>Motion Picture and Video Activities</li>
            <li>Sound Recording and Music Publishing</li>
          </TopList>
        </li>
        <li>
          Broadcasting (except Internet)
          <TopList>
            <li>Radio Broadcasting</li>
            <li>Television Broadcasting</li>
          </TopList>
        </li>
        <li>Internet Publishing and Broadcasting</li>
        <li>Telecommunications Services</li>
        <li>
          Internet Service Providers, Web Search Portals and Data Processing Services
          <TopList>
            <li>Internet Service Providers and Web Search Portals</li>
            <li>Data Processing, Web Hosting and Electronic Information Storage Services</li>
          </TopList>
        </li>
        <li>
          Library and Other Information Services
          <TopList>
            <li>Libraries and Archives</li>
            <li>Other Information Services</li>
          </TopList>
        </li>
      </TopList>
      <SubTitleAlt>Financial and Insurance Services</SubTitleAlt>
      <p>
        The Financial and Insurance Services Division includes units mainly engaged in financial transactions involving
        the creation, liquidation, or change in ownership of financial assets, and/or in facilitating financial
        transactions.
      </p>
      <p>
        The range of activities include raising funds by taking deposits and/or issuing securities and, in the process,
        incurring liabilities; units investing their own funds in a range of financial assets; pooling risk by
        underwriting insurance and annuities; separately constituted funds engaged in the provision of retirement
        incomes; and specialised services facilitating or supporting financial intermediation, insurance and employee
        benefit programs.
      </p>
      <p>
        Also included in this division are central banking, monetary control and the regulation of financial activities.
      </p>
      <p>Financial and Insurance Services includes the following groups and sub-categories:</p>
      <TopList>
        <li>
          Finance
          <TopList>
            <li>Central Banking</li>
            <li>Depository Financial Intermediation</li>
            <li>Non-Depository Financing</li>
            <li>Financial Asset Investing</li>
          </TopList>
        </li>
        <li>
          Insurance and Superannuation Funds
          <TopList>
            <li>Life Insurance</li>
            <li>Health and General Insurance</li>
            <li>Superannuation Funds</li>
          </TopList>
        </li>
        <li>
          Auxiliary Finance and Insurance Services
          <TopList>
            <li>Auxiliary Finance and Investment Services</li>
            <li>Auxiliary Insurance Services</li>
          </TopList>
        </li>
      </TopList>
      <SubTitleAlt>Rental, Hiring and Real Estate Services</SubTitleAlt>
      <p>
        The Rental, Hiring and Real Estate Services Division includes units mainly engaged in renting, hiring, or
        otherwise allowing the use of tangible or intangible assets (except copyrights), and units providing related
        services.
      </p>
      <p>
        The assets may be tangible, as in the case of real estate and equipment, or intangible, as in the case with
        patents and trademarks.
      </p>
      <p>
        The division also includes units engaged in providing real estate services such as selling, renting and/or
        buying real estate for others, managing real estate for others and appraising real estate.
      </p>
      <p>Rental, Hiring and Real Estate Services includes the following groups and sub-categories:</p>
      <TopList>
        <li>
          Rental and Hiring Services (except Real Estate)
          <TopList>
            <li>Motor Vehicle and Transport Equipment Rental and Hiring</li>
            <li>Farm Animal and Bloodstock Leasing</li>
            <li>Other Goods and Equipment Rental and Hiring</li>
            <li>Non-Financial Intangible Assets (Except Copyrights) Leasing</li>
          </TopList>
        </li>
        <li>
          Property Operators and Real Estate Services
          <TopList>
            <li>Property Operators</li>
            <li>Real Estate Services</li>
          </TopList>
        </li>
      </TopList>
      <SubTitleAlt>Professional, Scientific and Technical Services</SubTitleAlt>
      <p>
        The Professional, Scientific and Technical Services Division includes units mainly engaged in providing
        professional, scientific and technical services. Units engaged in providing these services apply common
        processes where labour inputs are integral to the production or service delivery. Units in this division
        specialise and sell their expertise. In most cases, equipment and materials are not major inputs. The activities
        undertaken generally require a high level of expertise and training and formal (usually tertiary level)
        qualifications.
      </p>
      <p>
        These services include scientific research, architecture, engineering, computer systems design, law,
        accountancy, advertising, market research, management and other consultancy, veterinary science and professional
        photography.
      </p>
      <p>
        Excluded are units mainly engaged in providing health care and social assistance services, which are included in
        Division Q Health Care and Social Assistance.
      </p>
      <p>Professional, Scientific and Technical Services includes the following groups and sub-categories:</p>
      <TopList>
        <li>
          Professional, Scientific and Technical Services (Except Computer System Design and Related Services)
          <TopList>
            <li>Scientific Research Services</li>
            <li>Architectural, Engineering and Technical Services</li>
            <li>Legal and Accounting Services</li>
            <li>Advertising Services</li>
            <li>Market Research and Statistical Services</li>
            <li>Management and Related Consulting Services</li>
            <li>Veterinary Services</li>
            <li>Other Professional, Scientific and Technical Services</li>
          </TopList>
        </li>
        <li>Computer System Design and Related Services</li>
      </TopList>
      <SubTitleAlt>Administrative and Support Services</SubTitleAlt>
      <p>
        The Administrative and Support Services Division includes units mainly engaged in performing routine support
        activities for the day-to-day operations of other businesses or organisations.
      </p>
      <p>
        Units providing administrative support services are mainly engaged in activities such as office administration;
        hiring and placing personnel for others; preparing documents; taking orders for clients by telephone; providing
        credit reporting or collecting services; and arranging travel and travel tours.
      </p>
      <p>
        Units providing other types of support services are mainly engaged in activities such as building and other
        cleaning services; pest control services; gardening services; and packaging products for others.
      </p>
      <p>
        The activities undertaken by units in this division are often integral parts of the activities of units found in
        all sectors of the economy. Recent trends have moved more towards the outsourcing of such non-core activities.
        The units classified in this division specialise in one or more of these activities and can, therefore, provide
        services to a variety of clients.
      </p>
      <p>Administrative and Support Services includes the following groups and sub-categories:</p>
      <TopList>
        <li>
          Administrative Services
          <TopList>
            <li>Employment Services</li>
            <li>Travel Agency and Tour Arrangement Services</li>
            <li>Other Administrative Services</li>
          </TopList>
        </li>
        <li>
          Building Cleaning, Pest Control and Other Support Services
          <TopList>
            <li>Building Cleaning, Pest Control and Gardening Services</li>
          </TopList>
        </li>
      </TopList>
      <SubTitleAlt>Public Administration and Safety</SubTitleAlt>
      <p>
        The Public Administration and Safety Division includes units mainly engaged in Central, State or Local
        Government legislative, executive and judicial activities; in providing physical, social, economic and general
        public safety and security services; and in enforcing regulations. Also included are units of military defence,
        government representation and international government organisations.
      </p>
      <p>
        Central, State or Local Government legislative, executive and judicial activities include the setting of policy;
        the oversight of government programs; collecting revenue to fund government programs; creating statute laws and
        by-laws; creating case law through the judicial processes of civil, criminal and other courts; and distributing
        public funds.
      </p>
      <p>
        The provision of physical, social, economic and general public safety and security services, and enforcing
        regulations, includes units that provide police services; investigation and security services; fire protection
        and other emergency services; correctional and detention services; regulatory services; border control; and
        other public order and safety services.
      </p>
      <p>
        Also included are units of military defence, government representation and international government
        organisations.
      </p>
      <p>
        Government ownership is not a criterion for classification to this industry division. Government units producing
        'private sector like' goods and services are classified to the same industry as private sector units engaged in
        similar activities. Private sector units engaged in public administration or military defence are classified to
        the Public Administration and Safety Division. Units that engage in a combination of public administration and
        service delivery activities are to be classified to this division.
      </p>
      <p>Public Administration and Safety includes the following groups and sub-categories:</p>
      <TopList>
        <li>
          Public Administration
          <TopList>
            <li>Central Government Administration</li>
            <li>State Government Administration</li>
            <li>Local Government Administration</li>
            <li>Justice</li>
            <li>Government Representation</li>
          </TopList>
        </li>
        <li>Defence</li>
        <li>
          Public Order, Safety and Regulatory Services
          <TopList>
            <li>Public Order and Safety Services</li>
            <li>Regulatory Services</li>
          </TopList>
        </li>
      </TopList>
      <SubTitleAlt>Education and Training</SubTitleAlt>
      <p>
        The Education and Training Division includes units mainly engaged in the provision and support of education and
        training, except those engaged in the training of animals e.g. dog obedience training, horse training.
      </p>
      <p>
        Education may be provided in a range of settings, such as educational institutions, the workplace, or the home.
        Generally, instruction is delivered through face-to-face interaction between teachers/instructors and students,
        although other means and mediums of delivery, such as by correspondence, radio, television or the internet, may
        be used.
      </p>
      <p>
        Education and training is delivered by teachers or instructors who explain, tell or demonstrate a wide variety
        of subjects. The commonality of processes involved, such as the labour inputs of teachers and instructors, and
        their subject matter knowledge and teaching expertise, uniquely distinguishes this industry from other
        industries.
      </p>
      <p>
        Education support services include a range of support services which assist in the provision of education, such
        as curriculum setting and examination marking.
      </p>
      <p>Education and Training includes the following groups and sub-categories:</p>
      <TopList>
        <li>
          Preschool and School Education
          <TopList>
            <li>Preschool Education</li>
            <li>School Education</li>
          </TopList>
        </li>
        <li>Tertiary Education</li>
        <li>Adult, Community and Other Education</li>
        <li>Educational Support Services</li>
      </TopList>
      <SubTitleAlt>Health Care and Social Assistance</SubTitleAlt>
      <p>
        The Health Care and Social Assistance Division includes units mainly engaged in providing human health care and
        social assistance. Units engaged in providing these services apply common processes, where the labour inputs of
        practitioners with the requisite expertise and qualifications are integral to production or service delivery.
      </p>
      <p>Health Care and Social Assistance includes the following groups and sub-categories:</p>
      <TopList>
        <li>Hospitals</li>
        <li>
          Medical and Other Health Care Services
          <TopList>
            <li>Medical Services</li>
            <li>Pathology and Diagnostic Imaging Services</li>
            <li>Allied Health Services</li>
            <li>Other Health Care Services</li>
          </TopList>
        </li>
        <li>Residential Care Services</li>
        <li>
          Social Assistance Services
          <TopList>
            <li>Child Care Services</li>
            <li>Other Social Assistance Services</li>
          </TopList>
        </li>
      </TopList>
      <SubTitleAlt>Arts and Recreation Services</SubTitleAlt>
      <p>
        The Arts and Recreation Services Division includes units mainly engaged in the preservation and exhibition of
        objects and sites of historical, cultural or educational interest; the production of original artistic works
        and/or participation in live performances, events, or exhibits intended for public viewing; and the operation of
        facilities or the provision of services that enable patrons to participate in sporting or recreational
        activities, or to pursue amusement interests.
      </p>
      <p>
        This division excludes units that are involved in the production, or production and distribution of motion
        pictures, videos, television programs or television and video commercials. These units are included in the
        Information Media and Telecommunications Division.
      </p>
      <p>Arts and Recreation Services includes the following groups and sub-categories:</p>
      <TopList>
        <li>
          Heritage Activities
          <TopList>
            <li>Museum Operation</li>
            <li>Parks and Gardens Operations</li>
          </TopList>
        </li>
        <li>Creative and Performing Arts Activities</li>
        <li>
          Sports and Recreation Activities
          <TopList>
            <li>Sports and Physical Recreation Activities</li>
            <li>Horse and Dog Racing Activities</li>
            <li>Amusement and Other Recreation Activities</li>
          </TopList>
        </li>
        <li>Gambling Activities</li>
      </TopList>
      <SubTitleAlt>Other Services</SubTitleAlt>
      <p>
        The Other Services Division includes a broad range of personal services; religious, civic, professional and
        other interest group services; selected repair and maintenance activities; and private households employing
        staff. Units in this division are mainly engaged in providing a range of personal care services, such as hair,
        beauty and diet and weight management services; providing death care services; promoting or administering
        religious events or activities; or promoting and defending the interests of their members.
      </p>
      <p>
        Also included are units mainly engaged in repairing and/or maintaining equipment and machinery (except ships,
        boats, aircraft, or railway rolling stock) or other items (except buildings); as well as units of private
        households that engage in employing workers on or about the premises in activities primarily concerned with the
        operation of households.
      </p>
      <p>
        The Other Services Division excludes units mainly engaged in providing buildings or dwellings repair and
        maintenance services (included in the Construction or Administrative and Support Services Divisions as
        appropriate), and units mainly engaged in providing repair and maintenance services of books, ships, boats,
        aircraft or railway rolling stock (included in the Manufacturing Division).
      </p>
      <p>Other Services includes the following groups and sub-categories:</p>
      <TopList>
        <li>
          Repair and Maintenance
          <TopList>
            <li>Automotive Repair and Maintenance</li>
            <li>Machinery and Equipment Repair and Maintenance</li>
            <li>Other Repair and Maintenance</li>
          </TopList>
        </li>
        <li>
          Personal and Other Services
          <TopList>
            <li>Personal Care Services</li>
            <li>Funeral, Crematorium and Cemetery Services</li>
            <li>Other Personal Services</li>
            <li>Religious Services</li>
            <li>Civic, Professional and Other Interest Group Services</li>
          </TopList>
        </li>
        <li>
          Private Households Employing Staff and Undifferentiated Goods- and Service-Producing Activities of Households
          for Own Use
        </li>
      </TopList>
      <SubTitleAlt>Total industries</SubTitleAlt>
      <p>Includes the sum of all industry categories.</p>
    </>
  );
};

export default IndustrySectorDefinitionsPage;
