import styled from 'styled-components';

const TimeCardContainer = styled.div`
  color: red;
  font-size: 100px;
`;

const TimeCard = ({ children, className, ...otherProps }) => {
  return (
    <TimeCardContainer className={className}>
      {children}
    </TimeCardContainer>
  );
};

export default TimeCard;
