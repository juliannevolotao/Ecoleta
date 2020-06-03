import React from 'react';

import './styles.scss';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = (props) => {

  return (
    <>
      <div>{props.title}</div>
    </>
  )
}

export default Header;