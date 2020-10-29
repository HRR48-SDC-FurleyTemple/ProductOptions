import React from 'react';
import styled from 'styled-components';
import ReviewBar from './mini-components/ReviewBar.jsx';
import ReviewsOverview from './mini-components/ReviewsOverview.jsx';

const ScoreAverage = styled.div`
  display: grid;
  grid-template: repeat(6, 1fr) / repeat(2, 1fr);
`;

const ScoreName = styled.h3`
  color: #484848;
  font-size: 0.75rem;
`;

const Rating = styled.div`
  position: absolute;
  right: -20%;
  top: 0;
  font-size: 0.75rem;
`;


const Entry = styled.div`
  flex: 0 0 100%;
  padding-top: 2rem;
  margin-bottom: 2rem;
  border-top: 1px solid #f5f5f5;
  color: #484848;
  font-size: 0.9rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const Title = styled.div`
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Body = styled.div`

`;

const Recommended = styled.div`
  margin: 1.5rem;
  font-size: 0.75rem;
`;

const Stars = styled.div`

`;

const Created = styled.div`
  font-size: 0.75rem;
  justify-self: end;
`;

const ReviewEntry = (props) => {
  const { review } = props;

  const wouldRecommend = review.iRecommendThisProduct ? 'Yes, I recommend this product' : 'No, I don\'t recommend this product'

  return (
    <Entry>
      <Header>
        <ReviewsOverview overallRating={review.overallRating} />
        <Created>{review.createdAt}</Created>
      </Header>
      <Title>{review.header}</Title>
      <Body>{review.body}</Body>
      <Recommended>{wouldRecommend}</Recommended>
      <ScoreAverage>
        <ScoreName>Ease of assembly/installation</ScoreName>
        <ReviewBar rating={review.easeOfAssembly} />
        <ScoreName>Value for money</ScoreName>
        <ReviewBar rating={review.valueForMoney} />
        <ScoreName>Product quality</ScoreName>
        <ReviewBar rating={review.productQuality} />
        <ScoreName>Appearance</ScoreName>
        <ReviewBar rating={review.appearance} />
        <ScoreName>Works as expected</ScoreName>
        <ReviewBar rating={review.worksAsExpected} />
      </ScoreAverage>
    </Entry>
  );
};

export default ReviewEntry;
