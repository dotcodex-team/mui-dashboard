import Router from 'next/router';
import Link from 'next/link';
import React, { Children } from 'react';

const NavLink = ({ children, ...props }) => {
  const child = Children.only(children);
  const {router} = Router;
  let className = child.props.className || '';
  if (router.asPath === props.href && props.activeClassName) {
    className = `${className} ${props.activeClassName}`.trim();
  }
  delete props.activeClassName;

  return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};

export default NavLink;