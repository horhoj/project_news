export interface DocView {
  description: Doc['abstract'];
  date: string;
  source: Doc['source'];
  img: string;
  isShowDate: boolean;
  url: string;
}

export interface NewsResponse {
  copyright: string;
  response: Response;
}

export interface Response {
  docs: Doc[];
  meta: Meta;
}

export interface Doc {
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  source: Source;
  multimedia: Multimedia[];
  headline: Headline;
  keywords: Keyword[];
  pub_date: string;
  document_type: DocumentType;
  news_desk: NewsDesk;
  section_name: SectionName;
  byline: Byline;
  type_of_material: TypeOfMaterial;
  _id: string;
  word_count: number;
  uri: string;
  print_section?: PrintSection;
  print_page?: string;
  subsection_name?: string;
}

export interface Byline {
  original: string;
  person: Person[];
  organization: Source | null;
}

export enum Source {
  TheAssociatedPress = 'The Associated Press',
  TheEditorialBoard = 'The Editorial Board',
  TheLearningNetwork = 'The Learning Network',
  TheModernLovePodcastTeam = 'The Modern Love Podcast Team',
  TheNewYorkTimes = 'The New York Times',
  TheStaffOfTheMorning = 'The staff of The Morning',
  TheStylesDesk = 'The Styles Desk',
  TheUpshotStaff = 'The Upshot Staff',
}

export interface Person {
  firstname: string;
  middlename: null | string;
  lastname: string;
  qualifier: null | string;
  title: null;
  role: Role;
  organization: string;
  rank: number;
}

export enum Role {
  Reported = 'reported',
}

export enum DocumentType {
  Article = 'article',
  Multimedia = 'multimedia',
}

export interface Headline {
  main: string;
  kicker: null | string;
  content_kicker: null;
  print_headline: string;
  name: null;
  seo: null;
  sub: null;
}

export interface Keyword {
  name: Name;
  value: string;
  rank: number;
  major: Major;
}

export enum Major {
  N = 'N',
}

export enum Name {
  CreativeWorks = 'creative_works',
  Glocations = 'glocations',
  Organizations = 'organizations',
  Persons = 'persons',
  Subject = 'subject',
}

export interface Multimedia {
  rank: number;
  subtype: Subtype;
  caption: null;
  credit: null;
  type: Type;
  url: string;
  height: number;
  width: number;
  subType: Subtype;
  crop_name: CropName;
  legacy: Legacy;
}

export enum CropName {
  ArticleLarge = 'articleLarge',
  Jumbo = 'jumbo',
  SuperJumbo = 'superJumbo',
  ThumbLarge = 'thumbLarge',
  ThumbStandard = 'thumbStandard',
}

export interface Legacy {
  xlarge?: string;
  xlargewidth?: number;
  xlargeheight?: number;
  thumbnail?: string;
  thumbnailwidth?: number;
  thumbnailheight?: number;
}

export enum Subtype {
  Jumbo = 'jumbo',
  SuperJumbo = 'superJumbo',
  ThumbLarge = 'thumbLarge',
  Thumbnail = 'thumbnail',
  Xlarge = 'xlarge',
}

export enum Type {
  Image = 'image',
}

export enum NewsDesk {
  Arts = 'Arts',
  ArtsLeisure = 'Arts&Leisure',
  BookReview = 'BookReview',
  Books = 'Books',
  Briefing = 'Briefing',
  Business = 'Business',
  Climate = 'Climate',
  Corrections = 'Corrections',
  Culture = 'Culture',
  Dining = 'Dining',
  Editorial = 'Editorial',
  ElectionAnalytics = 'Election Analytics',
  Empty = '',
  Express = 'Express',
  Foreign = 'Foreign',
  Games = 'Games',
  Graphics = 'Graphics',
  Insider = 'Insider',
  Investigative = 'Investigative',
  Learning = 'Learning',
  Letters = 'Letters',
  LocalInvestigations = 'Local Investigations',
  Magazine = 'Magazine',
  Metro = 'Metro',
  Metropolitan = 'Metropolitan',
  Movies = 'Movies',
  NYTNow = 'NYTNow',
  National = 'National',
  NewYork = 'New York',
  NewsDeskRealEstate = 'Real Estate',
  Obits = 'Obits',
  OpEd = 'OpEd',
  Opinion = 'Opinion',
  Photo = 'Photo',
  Podcasts = 'Podcasts',
  Politics = 'Politics',
  RealEstate = 'RealEstate',
  Science = 'Science',
  SpecialSections = 'SpecialSections',
  Styles = 'Styles',
  Summary = 'Summary',
  SundayBusiness = 'SundayBusiness',
  TStyle = 'TStyle',
  TheLearningNetwork = 'The Learning Network',
  TheUpshot = 'The Upshot',
  Travel = 'Travel',
  US = 'U.S.',
  Upshot = 'Upshot',
  Video = 'Video',
  Washington = 'Washington',
  Weather = 'Weather',
  Weekend = 'Weekend',
  Well = 'Well',
  World = 'World',
}

export enum PrintSection {
  A = 'A',
  Ar = 'AR',
  B = 'B',
  Br = 'BR',
  Bu = 'BU',
  C = 'C',
  D = 'D',
  M2 = 'M2',
  MB = 'MB',
  Mm = 'MM',
  PrintSectionA = 'a',
  Re = 'RE',
  Sr = 'SR',
  St = 'ST',
}

export enum SectionName {
  Arts = 'Arts',
  Books = 'Books',
  Briefing = 'Briefing',
  BusinessDay = 'Business Day',
  Climate = 'Climate',
  Corrections = 'Corrections',
  CrosswordsGames = 'Crosswords & Games',
  FashionStyle = 'Fashion & Style',
  Food = 'Food',
  Health = 'Health',
  Lens = 'Lens',
  Magazine = 'Magazine',
  Movies = 'Movies',
  NewYork = 'New York',
  Obituaries = 'Obituaries',
  Opinion = 'Opinion',
  Podcasts = 'Podcasts',
  ReaderCenter = 'Reader Center',
  RealEstate = 'Real Estate',
  Science = 'Science',
  Sports = 'Sports',
  Style = 'Style',
  TMagazine = 'T Magazine',
  Technology = 'Technology',
  TheLearningNetwork = 'The Learning Network',
  TheUpshot = 'The Upshot',
  Theater = 'Theater',
  TimesInsider = 'Times Insider',
  Travel = 'Travel',
  US = 'U.S.',
  Weather = 'Weather',
  Well = 'Well',
  World = 'World',
  YourMoney = 'Your Money',
}

export enum TypeOfMaterial {
  Briefing = 'briefing',
  Correction = 'Correction',
  Editorial = 'Editorial',
  Empty = '',
  InteractiveFeature = 'Interactive Feature',
  Letter = 'Letter',
  NYTCooking = 'NYT Cooking',
  News = 'News',
  NewsAnalysis = 'News Analysis',
  ObituaryObit = 'Obituary (Obit)',
  OpEd = 'Op-Ed',
  Quote = 'Quote',
  Review = 'Review',
  Video = 'Video',
}

export interface Meta {
  hits: number;
}
