import { Dto } from '@blagost/api';
import { Link, StyledProps, VStack } from 'native-base';
import React from 'react';

type Props = {
  sx?: StyledProps;
  links: Dto.LinkDto[];
};

export const LectorLinks = ({ sx, links }: Props) => {
  return (
    <VStack space="1" px="2" {...sx}>
      {links.map((link) => (
        <Link
          _text={{ color: 'cyan.500', fontSize: 'lg' }}
          color="cyan.500"
          href={link.href}
          key={link.id}
        >
          {link.label}
        </Link>
      ))}
    </VStack>
  );
};
