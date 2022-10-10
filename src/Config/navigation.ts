import {
  AboutPath,
  AboutPathTitle,
  CommonPath,
  FaqPath,
  FaqPathTitle,
  GalleryPath,
  GalleryPathTitle,
  InstitutionPath,
  InstitutionPathTitle,
  MainPath,
  MainPathTitle,
  MaterialPath,
  MaterialPathTitle,
  NewsPath,
  NewsPathTitle,
  SchedulerPath,
  SchedulerPathTitle,
  SettingsPath,
  SettingsPathTitle,
  UserPath,
  UserPathTitle,
} from 'Constants/Navigation'

export type AppNavigationBasic = {
  title: string
  path: string
  hidden?: boolean
}

export type AppNavigation = AppNavigationBasic & {
  children?: AppNavigationBasic[]
}

export const appPublicNavigation: AppNavigation[] = [
  {
    title: MainPathTitle.main,
    path: MainPath.main,
    children: [
      { title: MainPathTitle.banner, path: MainPath.banner },
      { title: MainPathTitle.logo, path: MainPath.logo },
      { title: MainPathTitle.popup, path: MainPath.popup },
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
      { title: NewsPathTitle['study-in-korea'], path: NewsPath['study-in-korea'] },
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
    children: [
      { title: InstitutionPathTitle['college-lyceum'], path: InstitutionPath['college-lyceum'] },
      { title: InstitutionPathTitle['korean-university'], path: InstitutionPath['korean-university'] },
      { title: InstitutionPathTitle['uzbekistan-university'], path: InstitutionPath['uzbekistan-university'] },
      { title: InstitutionPathTitle.school, path: InstitutionPath.school },
    ],
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
    title: SettingsPathTitle.profile,
    path: SettingsPath.profile,
    hidden: true,
    children: [
      {
        title: SettingsPathTitle.settings,
        path: SettingsPath.settings,
        hidden: true,
      },
    ],
  },
  {
    title: 'UIKit',
    path: 'uikit',
    hidden: true,
  },
]

export const appAdminNavigation: AppNavigation[] = [
  {
    title: UserPathTitle.main,
    path: UserPath.main,
    children: [
      {
        title: UserPathTitle.add,
        path: CommonPath.add,
        hidden: true,
      },
      {
        title: UserPathTitle.edit,
        path: `${CommonPath.edit}`,
        hidden: true,
      },
    ],
  },
]

export const appNavigation = [...appPublicNavigation, ...appAdminNavigation]
