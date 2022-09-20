import {
  MainPath,
  NewsPath,
  AboutPath,
  GalleryPath,
  MaterialPath,
  MainPathTitle,
  NewsPathTitle,
  SchedulerPath,
  AboutPathTitle,
  InstitutionPath,
  GalleryPathTitle,
  MaterialPathTitle,
  SchedulerPathTitle,
  InstitutionPathTitle,
  FaqPathTitle,
  FaqPath,
} from 'Constants/Navigation'

export type AppNavigationBasic = {
  title: string
  path: string
  hidden?: boolean
}

export type AppNavigation = AppNavigationBasic & {
  children?: AppNavigationBasic[]
}

export const appNavigation: AppNavigation[] = [
  {
    title: MainPathTitle.main,
    path: MainPath.main,
    children: [
      { title: MainPathTitle.banner, path: MainPath.banner },
      { title: MainPathTitle.logo, path: MainPath.logo },
    ],
  },
  {
    title: AboutPathTitle.main,
    path: AboutPath.main,
    children: [
      { title: AboutPathTitle.greeting, path: AboutPath.greeting },
      { title: AboutPathTitle.structure, path: AboutPath.structure },
      { title: AboutPathTitle.history, path: AboutPath.history },
      { title: AboutPathTitle.plan, path: AboutPath.plan },
      { title: AboutPathTitle.address, path: AboutPath.address },
    ],
  },
  {
    title: NewsPathTitle.main,
    path: NewsPath.main,
    children: [
      { title: NewsPathTitle['center-news'], path: NewsPath['center-news'] },
      { title: NewsPathTitle['center-events'], path: NewsPath['center-events'] },
      { title: NewsPathTitle.edu, path: NewsPath.edu },
    ],
  },
  {
    title: MaterialPathTitle.main,
    path: MaterialPath.main,
    children: [
      { title: MaterialPathTitle.topik, path: MaterialPath.topik },
      { title: MaterialPathTitle.edu, path: MaterialPath.edu },
    ],
  },
  {
    title: SchedulerPathTitle.main,
    path: SchedulerPath.main,
  },
  {
    title: InstitutionPathTitle.main,
    path: InstitutionPath.main,
  },
  {
    title: FaqPathTitle.main,
    path: FaqPath.main,
  },
  {
    title: GalleryPathTitle.main,
    path: GalleryPath.main,
  },
  {
    title: 'UIKit',
    path: 'uikit',
    hidden: true,
  },
]
