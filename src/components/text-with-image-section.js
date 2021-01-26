import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import parse from 'html-react-parser'

import ImageWithStroke from './image-with-stroke'
import { Container, Section, SoloHeading } from './styled/global'

import vars from '../vars'

const Content = styled.div`
  display: grid;
  gap: 1.5rem;
  align-items: center;
  justify-items: center;

  @media (min-width: ${vars.breakpointLarge}) {
    grid-template-columns: repeat(2, 1fr);

    div:last-child {
      justify-self: end;
    }
  }
`

const TextWithImageSection = ({
  angledBackgroundTransition,
  headingText,
  sectionBackgroundColor,
  textContent,
  image,
}) => {
  const imageData = {
    desktop: image?.localFile?.childImageSharp?.desktop,
    mobile: image?.localFile?.childImageSharp?.mobile,
    altText: image?.altText,
  }
  return (
    <Section bg={sectionBackgroundColor} angled={angledBackgroundTransition}>
      <Container>
        <Content>
          <div>
            <SoloHeading color={vars.colorGreen}>{headingText}</SoloHeading>
            {parse(textContent)}
          </div>
          <ImageWithStroke
            fixed={[
              imageData.mobile,
              {
                ...imageData.desktop,
                media: `(min-width: ${vars.breakpointLarge})`,
              },
            ]}
            altText={imageData.altText}
            backgroundColor={vars.colorGreen}
            rounded
          />
        </Content>
      </Container>
    </Section>
  )
}

export const fragment = graphql`
  fragment TextWithImageSection on WpPage_Layoutsections_Components_TextContentWithImage {
    angledBackgroundTransition
    fieldGroupName
    headingText
    sectionBackgroundColor
    textContent
    image {
      altText
      localFile {
        childImageSharp {
          desktop: fixed(width: 572) {
            ...GatsbyImageSharpFixed_noBase64
          }
          mobile: fixed(width: 350) {
            ...GatsbyImageSharpFixed_noBase64
          }
        }
      }
    }
  }
`

export default TextWithImageSection