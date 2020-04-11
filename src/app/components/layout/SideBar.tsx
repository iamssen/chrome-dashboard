import styled from 'styled-components';

export const sidebarWidth: number = 50;

export const SideBar = styled.div`
  font-size: 16px;

  background-color: #ffffff;
  box-shadow: 0 0 10px -3px rgba(0, 0, 0, 0.1);

  position: fixed;
  left: 0;
  top: 0;

  width: ${sidebarWidth}px;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  ul {
    width: ${sidebarWidth}px;

    margin: 0;
    padding: 0;

    list-style: none;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    font-size: 1.5rem;
    width: 1em;
    height: 1em;
  }

  .MuiIconButton-root {
    padding: 8px;
  }
`;
