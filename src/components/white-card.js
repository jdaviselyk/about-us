import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import parse from 'html-react-parser'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import { Section, SectionHeading, HeroHeading } from './styled/global'
import Card from './card'
import Button from './button'

import vars from '../vars'
//
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  @media (min-width: ${vars.breakpointMedium}) {
    grid-template-columns: 2fr;
  }
`
/*<GatsbyImage
              image={getImage(picture.localFile)}
              alt={picture.altText}
            />*/
const WhiteCards = ({
  description,
  fieldGroupName,
  name,
  title,
  image,
  cards,
}) => {
  const imageData = {
    desktop: cards.image?.localFile?.childImageSharp?.desktop,
    mobile: cards.image?.localFile?.childImageSharp?.mobile,
    altText: cards.image?.altText,
  }
  //const cardImage = topImage?.localFile?.childImageSharp?.fluid
  return (
    <Section bg="colorBlack">
      <Container>
        {cards.map(
          ({ title, description, image, name, imageData }, cardIndex) => (
            <CardGrid>
              <Inner>
                <Portrait>
                  <GatsbyImage
                    image={getImage(image.localFile)}
                    alt={image.altText}
                  />
                </Portrait>
                <Title>{title}</Title>
                <Name>{name}</Name>
                <Description>{description && parse(description)}</Description>
              </Inner>
            </CardGrid>
          )
        )}
      </Container>
    </Section>
  )
}

export const fragment = graphql`
  fragment AboutWhiteCard on WpPage_Layoutsections_Components_AboutWhiteCard {
    fieldGroupName
    cards {
      description
      name
      title
      image {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`

const Inner = styled.div`
  border-radius: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 35%;
`

const Portrait = styled.div`
  max-width: 100%;
  max-height: 100%;
  .gatsby-image-wrapper {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    overflow: hidden;
    max-width: 100%;
    max-height: 100%;
  }
`

const Container = styled.div`
  width: 100%;
  max-width: 90rem;
  margin: 0 auto;
  padding: 0 1rem;
`

const Name = styled.div`
  display: flex;
  color: black;
  flex-direction: column;
  align-items: left;
  justify-content: left;
  text-align: left;
  font-size: ${vars.fontSizeHeading3};
  font-weight: 600;
`

const Title = styled.div`
  display: flex;
  color: green;
  flex-direction: column;
  align-items: left;
  justify-content: left;
  text-align: left;
  font-size: ${vars.fontSizeHeading1};
  font-weight: 600;
  padding: 0.5em;
`

const Description = styled.div`
  display: flex;
  color: black;
  flex-direction: column;
  align-items: left;
  justify-content: left;
  text-align: left;
  font-weight: 500;
  padding: 1em;
`

export default WhiteCards
