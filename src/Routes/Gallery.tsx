import { MainLayout } from 'Components/Layouts'
import { SuspenseUI } from 'Components/UI'
import { CommonPath, GalleryPath } from 'Constants/Navigation'
import { GalleryAddPage, GalleryEditPage, GalleryPage } from 'Views/Gallery'

export const galleryRoutes = {
  path: '',
  children: [
    {
      path: GalleryPath.main,
      element: <MainLayout />,
      children: [
        {
          path: '',
          element: (
            <SuspenseUI>
              <GalleryPage />
            </SuspenseUI>
          ),
        },
        {
          path: CommonPath.add,
          element: (
            <SuspenseUI>
              <GalleryAddPage />
            </SuspenseUI>
          ),
        },
        {
          path: `${CommonPath.edit}/:galleryId`,
          element: (
            <SuspenseUI>
              <GalleryEditPage />
            </SuspenseUI>
          ),
        },
      ],
    },
  ],
}