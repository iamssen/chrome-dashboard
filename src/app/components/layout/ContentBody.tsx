import styled from 'styled-components';
import { sidebarWidth } from './SideBar';

export const ContentBody = styled.div`
  display: flex;

  margin-left: ${sidebarWidth}px;

  > div {
    min-width: 0;
    flex: 1;
    margin-right: 20px;

    &:first-child {
      margin-left: 20px;
    }

    > div {
      margin: 20px 0;
    }
  }
`;
