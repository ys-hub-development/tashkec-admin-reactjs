import { StyledHeader } from '../Atoms'
import { Grid } from '@mui/material'
import { HeaderHeading, HeaderSearch, ProfileMenu } from '../Molecules'
import { useMemo } from 'react'
import {
  AboutPath,
  CulturePath, FaqPath, GalleryPath,
  InstitutionPath,
  MaterialPath,
  NewsPath,
  StudyPath,
  UserPath,
} from 'Constants/Navigation'
import { useLocation } from 'react-router-dom'

const searchHavePages = [
  // About
  `/${AboutPath.main}/${AboutPath.history}`,
  `/${AboutPath.main}/${AboutPath.plan}`,
  // News
  `/${NewsPath.main}/${NewsPath['center-news']}`,
  `/${NewsPath.main}/${NewsPath['center-events']}`,
  // Study in Korea
  `/${StudyPath.main}/${StudyPath['program-of-gks']}`,
  `/${StudyPath.main}/${StudyPath['association-gks']}`,
  `/${StudyPath.main}/${StudyPath['news-of-study']}`,
  `/${StudyPath.main}/${StudyPath['program-for-kor']}`,
  // Culture of Korea
  `/${CulturePath.main}/${CulturePath['creative-mugs']}`,
  `/${CulturePath.main}/${CulturePath['culture-of-korea']}`,
  // Materials
  `/${MaterialPath.main}/${MaterialPath['topik-materials']}`,
  `/${MaterialPath.main}/${MaterialPath['topik-levels']}`,
  `/${MaterialPath.main}/${MaterialPath['study-material']}`,
  // Institution
  `/${InstitutionPath.main}/${InstitutionPath['college-lyceum']}`,
  `/${InstitutionPath.main}/${InstitutionPath['korean-university']}`,
  `/${InstitutionPath.main}/${InstitutionPath['uzbekistan-university']}`,
  `/${InstitutionPath.main}/${InstitutionPath.school}`,
  // FAQ
  `/${FaqPath.main}/${FaqPath.answers}`,
  // Gallery
  `/${GalleryPath.main}`,
  // Users
  `/${UserPath.main}`,
]

export const Header = () => {
  const { pathname } = useLocation()
  const isHaveSearch = useMemo(() => searchHavePages.includes(pathname), [ pathname ])

  return (
    <StyledHeader>
      <Grid container alignItems='center' spacing={1}>
        <Grid item>
          <HeaderHeading />
        </Grid>
        {
          isHaveSearch && (
            <Grid item xs={4} marginLeft='auto' marginRight='auto'>
              <HeaderSearch />
            </Grid>
          )
        }
        <Grid item marginLeft={!isHaveSearch ? 'auto' : undefined}>
          <ProfileMenu />
        </Grid>
      </Grid>
    </StyledHeader>
  )
}
