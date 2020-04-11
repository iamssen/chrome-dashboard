import styled from 'styled-components';

export const Section = styled.div`
  --color: #203752;
  --background-color: #ffffff;

  background-color: var(--background-color);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 0 10px -3px rgba(0, 0, 0, 0.1);

  font-size: 13px;
  color: var(--color);

  h3 {
    margin: 0;
    text-transform: uppercase;

    sub {
      background-color: var(--color);
      color: var(--background-color);
      opacity: 0.3;

      font-size: 0.6em;
      font-weight: normal;
      padding: 2px 5px;
      border-radius: 8px;

      margin-left: 3px;
      vertical-align: 0.25em;
    }
  }

  > :nth-child(2) {
    margin-top: 10px;
  }

  ul {
    margin: 0;
    padding: 0;

    list-style: none;

    ul {
      margin-left: 1.5em;
    }

    li {
      line-height: 1.7em;

      display: block;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: keep-all;

      vertical-align: middle;

      * {
        vertical-align: middle;
      }

      svg {
        font-size: 1em;
        height: 1em;
      }
    }
  }

  a {
    opacity: 0.8;
    text-decoration: none;
    color: currentColor;
  }
`;

export const FocusSection = styled(Section)`
  --background-color: #f8ce2a;
  --color: #261e44;
`;

export const ImportantSection = styled(Section)`
  --background-color: #4424a9;
  --color: white;
`;
