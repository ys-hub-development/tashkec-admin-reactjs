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
    title: 'main',
    path: '/main',
    children: [
      {
        title: 'banner',
        path: '/main/banner',
      },
      {
        title: 'logo',
        path: '/main/logo',
      },
    ],
  },
  {
    title: 'employees',
    path: '/employees',
    children: [
      {
        title: 'specialists_add',
        path: 'specialists/add',
        hidden: true,
      },
      {
        title: 'specialists',
        path: 'specialists',
      },
      {
        title: 'departments',
        path: 'departments',
      },
      {
        title: 'positions',
        path: 'positions',
      },
    ],
  },
  {
    title: 'instruction',
    path: '/instruction',
  },
]